---
title: A Beginners Guide to using Typescript with React
date: '2019-05-23T20:03:01.414Z'
spoiler: Having spent the last few months developing React applications and libraries using Typescript, I thought I'd share some of the things I've learned along the way.
---

Having spent the last few months developing React applications and libraries using Typescript, I thought I'd share some of the things I've learned along the way. These are the patterns I use with Typescript and React about 80% of the time.

Is it worth learning Typescript for developing React applications? Absolutely. I've found that having robust typing has led to more reliable code and faster iteration especially within a larger codebase. You're likely to be frustrated at first, but as you work through it you'll find that the minimal extra boilderplate is very much worth it. And if you get stuck on something, remember that you can always type something as `any`. Any is your friend!

To bootstrap a react typescript project I recommend using [create-react-app](https://facebook.github.io/create-react-app/docs/adding-typescript).

```
yarn create react-app my-app --typescript
```

Alternatively, you can use [codesandbox](https://codesandbox.io/s/new).

Let's get to the examples.

#### Your basic react component with typescript

So what does a standard react component look like with typescript? Let's compare it to a standard javascript react component.

```jsx
import React from 'react'
import PropTypes from 'prop-types'

export function StandardComponent({ children, title = 'Dr.' }) {
  return (
    <div>
      {title}: {children}
    </div>
  )
}

StandardComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}
```

And now the typescript version:

```tsx
import * as React from 'react'

export interface StandardComponentProps {
  title?: string
  children: React.ReactNode
}

export function StandardComponent({
  children,
  title = 'Dr.',
}: StandardComponentProps) {
  return (
    <div>
      {title}: {children}
    </div>
  )
}
```

Pretty similar, eh? We've replaced our propTypes with a typescript interface. Our title prop remains optional, while a children prop is required and we've exported our interface in case another component needs reference to it.

#### Extending standard HTML attributes

If we want the parent component to be able to provide additional typed `div` attributes, such as `aria-hidden`, `style`, or `className` we can either define these in our `interface` or we can extend a built in interface. In the example below, we are saying that our component accepts any standard `div` props in addition to `title` and `children`.

```tsx
import * as React from 'react'

export interface SpreadingExampleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

export function SpreadingExample({
  children,
  title = 'Dr.',
  ...other
}: SpreadingExampleProps) {
  return (
    <div {...other}>
      {title}: {children}
    </div>
  )
}
```

#### Handling events

We can type our event handlers to ensure that our event argument is typed properly. The below example demonstrates various ways of achieving this:

```tsx
export interface EventHandlerProps {
  onClick: (e: React.MouseEvent) => void
}

export function EventHandler({ onClick }: EventHandlerProps) {
  // handle focus events in a separate function
  function onFocus(e: React.FocusEvent) {
    console.log('Focused!', e.currentTarget)
  }

  return (
    <button
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={e => {
        // When using an inline function, the appropriate argument signature
        // is provided for us
      }}
    >
      Click me!
    </button>
  )
}
```

Unsure which argument signature to use? In your editor trying hovering your cursor over the relevant event handler prop.

#### Using Generics with your react components

This is more of an advanced feature, but one that is really powerful. Typically you'll define data types in your react components with their specific attributes. Let's say your component requires a profile object.

```tsx
interface ProfileType {
  name: string
  image: string
  age: number | null
}

interface ProfilesProps {
  profiles: Array<ProfileType>
}

function Profiles(props: ProfilesProps) {
  // render a set of profiles
}
```

But now let's imagine that you have a component which can accept an array of any type. Generics are analogous to sending a parcel in the mail. The courior (our component) doesn't need to know the exact contents of the parcel that you're sending, but the sender (parent component) expects the recipient to get the contents that they sent.

Here's how we do it:

```tsx
interface GenericsExampleProps<T> {
  children: (item: T) => React.ReactNode
  items: Array<T>
}

export function GenericsExample<T>({
  items,
  children,
}: GenericsExampleProps<T>) {
  return (
    <div>
      {items.map(item => {
        return children(item)
      })}
    </div>
  )
}
```

A bit of a weird example... but it demonstrates the point. The component accepts an array of items of any type, iterates through that array and calls children as a render function with the item object. When our parent component provides the render callback as a child, the `item` will be typed properly!

Don't get it? That's okay. I still don't fully understand generics either, but you're unlikely to need this very often. And the more you work with typescript, the more it'll make sense.

#### Typing hooks

Hooks mostly works out of the box. The two exceptions are sometimes `useRef` and `useReducer`. The below example demonstrates how we can type refs.

```tsx
import * as React from 'react'

interface HooksExampleProps {}

export function HooksExample(props: HooksExampleProps) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef<HTMLDivElement | null>(null)

  // start our timer
  React.useEffect(
    () => {
      const timer = setInterval(() => {
        setCount(count + 1)
      }, 1000)

      return () => clearTimeout(timer)
    },
    [count]
  )

  // measure our element
  React.useEffect(
    () => {
      if (ref.current) {
        console.log(ref.current.getBoundingClientRect())
      }
    },
    [ref]
  )

  return <div ref={ref}>Count: {count}</div>
}
```

Our state is automatically typed, but we have manually typed our `ref` to indicate that it will either be null or contain a `div` element. When we access our ref in our `useEffect` function, we need to ensure that it's not null.

#### Typing a reducer

A reducer is a bit more complex, but having it properly typed is really nice.

```tsx
// Yeah, I don't understand this either. But it gives us nice typing
// for our reducer actions.
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

// our search response type
interface Response {
  id: number
  title: string
}

// reducer actions. These are what you'll "dispatch"
export type ActionType =
  | Action<'QUERY', { value: string }>
  | Action<'SEARCH', { value: Array<Response> }>

// the form that our reducer state takes
interface StateType {
  searchResponse: Array<Response>
  query: string
}

// our default state
const initialState: StateType = {
  searchResponse: [],
  query: '',
}

// the actual reducer
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'QUERY':
      return {
        ...state,
        query: action.value,
      }

    case 'SEARCH':
      return {
        ...state,
        searchResponse: action.value,
      }
  }
}

interface ReducerExampleProps {
  query: string
}

export function ReducerExample({ query }: ReducerExampleProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(
    () => {
      if (query) {
        // emulate async query
        setTimeout(() => {
          dispatch({
            type: 'SEARCH',
            value: [{ id: 1, title: 'Hello world' }],
          })
        }, 1000)
      }
    },
    [query]
  )

  return state.searchResponse.map(response => (
    <div key={response.id}>{response.title}</div>
  ))
}
```

#### Using `typeof` and `keyof` to type component variants

Let's say we wanted to build a button with various appearances, each defined in an object with a set of keys and styles, like this:

```jsx
const styles = {
  primary: {
    color: 'blue',
  },
  danger: {
    color: 'red',
  },
}
```

Our button component should accept a `type` prop which can be any key of the `styles` object (i.e, 'primary' or 'danger'). We can type this quite easily:

```tsx
const styles = {
  primary: {
    color: 'blue',
  },
  danger: {
    color: 'red',
  },
}

// creates a reusable type from the styles object
type StylesType = typeof styles

// ButtonType = any key in styles
export type ButtonType = keyof StylesType

interface ButtonProps {
  type: ButtonType
}

export function Button({ type = 'primary' }: ButtonProps) {
  return <button style={styles[type]}>My styled button</button>
}
```

These examples should get you 80% of the way there. If you get stuck, it's often worth looking at existing open source examples.

[Sancho UI](https://github.com/bmcmahen/sancho) is a set of react components built with typescript and emotion.

[Blueprint](https://github.com/palantir/blueprint) is another set of react components built with typescript.

And here's a CodeSandBox with most of the above examples:

<iframe src="https://codesandbox.io/embed/staging-silence-bm97c?fontsize=14" title="typescript-by-example" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
