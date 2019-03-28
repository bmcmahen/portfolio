---
title: Three Ways to use Hooks to Build Better React Components
date: '2019-02-22T22:56:40.140Z'
spoiler: Learn three ways in which you can replace various old React composition patterns with hooks to build simpler, more reusable components.
---

This article provides three ways in which you can replace various old React composition patterns with hooks to build simpler, more reusable components. Before starting, it helps to have some experience with various patterns related to component composition, including making use of [children](https://benmcmahen.com/mastering-react-component-composition/), using [render props](https://benmcmahen.com/using-render-functions/), [higher order components](https://reactjs.org/docs/higher-order-components.html), and [cloning elements](https://reactjs.org/docs/react-api.html#cloneelement). And it helps if you have an [introductory understanding](https://reactjs.org/docs/hooks-intro.html) of hooks.

#### Tip 1: Replace cloneElement with hooks

**You can often replace instances of cloneElement, higher order components, or render props with hooks.**

The motivation of using one of the above techniques is almost always to provide either some contextual information to child components or to expose some additional logic to components. React's `cloneElement` function is probably the oldest means to achieve this end, but it's always had some downsides: 1) It's usage is dependent on the child being of the correct type. 2) It can overrwrite props, necessitating that you wrap potential props to ensure that each one is applied correctly. 3) It's difficult to properly type child components when using something like Typescript.

Let's explore a better solution using hooks. Let's say we want to make a child component aware of which parent it's in when developing a table so that we can use the correct tagName, either an `td` or `th`. Consider the `cloneElement` way to achieve this:

```jsx{4-6,14-16}
const TableHead = ({ children }) => {
  return (
    <thead>
      {React.cloneElement(children, {
        parent: 'TableHead',
      })}
    </thead>
  )
}

const TableBody = ({ children }) => {
  return (
    <tbody>
      {React.cloneElement(children, {
        parent: 'TableBody',
      })}
    </tbody>
  )
}

const TableCell = ({ parent, children }) => {
  const Component = parent === 'TableHead' ? 'th' : 'td'
  return <Component>{children}</Component>
}
```

This works decently enough. We can create a table and the correct tagNames are used in each case.

```jsx
const Table = () => (
  <table>
    <TableHead>
      <TableCell>Name</TableCell>
      <TableCell>Age</TableCell>
    </TableHead>
    <TableBody>
      <TableCell>Ben McMahen</TableCell>
      <TableCell>Thirty-something</TableCell>
    </TableBody>
  </table>
)
```

We can provide a more flexible solution using hooks and context. Let's rewrite our components to demonstrate:

```jsx{1,6-8,24}
const SectionContext = React.createContext({ parent: 'TableHead' })

const TableHead = ({ children }) => {
  return (
    <thead>
      <SectionContext.Provider value={{ parent: 'TableHead' }}>
        {children}
      </SectionContext.Provider>
    </thead>
  )
}

const TableBody = ({ children }) => {
  return (
    <tbody>
      <SectionContext.Provider value={{ parent: 'TableBody' }}>
        {children}
      </SectionContext.Provider>
    </tbody>
  )
}

const TableCell = ({ children }) => {
  const { parent } = React.useContext(SectionContext)
  const Component = parent === 'TableHead' ? 'th' : 'td'
  return <Component>{children}</Component>
}
```

This is a more flexible solution because it doesn't depend on `TableCell` being a direct descendent of either `TableHead` or `TableBody`. It's also great if you're using typescript because it doesn't polute your `TableCell` props with props that are provided by the parent component.

#### Tip 2: Bind elements to refs

**Return a bind function from your hooks to make reference to dom elements.**

I first came across this pattern in [react-spring](https://www.react-spring.io) and I've used it a ton since. Consider cases where you want to create reusable functionality which makes reference a particular dom element, such as measuring dom elements or focusing them. In my case, I recently needed to create a reusable focus manager that binds to a particular element and either focuses an element if it's showing or returns focus if it's not. [Focus trap](https://github.com/davidtheclark/focus-trap) is a great tool for helping us here. Let's start with a basic hook skeleton.

```jsx{2,5}
export function useFocusElement(showing, options = {}) {
  const elementRef = React.useRef(null)

  return {
    bind: { ref: elementRef },
  }
}
```

So yeah, this doesn't do much. It returns a `bind` object which includes a reference to our `elementRef`. This will allow us to create a reference to any dom element that we want to focus. The `showing` argument will be used to determine if we should assign focus to the `elementRef` or return it to the element originally focused. We can use the hook as follows:

```jsx{3-4}
const Popover = () => {
  const [showing, setShowing] = React.useState(false)
  const bind = useFocusElement(showing)
  return <div {...bind}>Popover!</div>
}
```

Let's implement the rest of the hook to make use of focus trap:

```jsx{2,30}
export function useFocusElement(showing, options = {}) {
  const elementRef = React.useRef(null)
  const trapRef = React.useRef(null)

  function focusElement() {
    const trap = createFocusTrap(elementRef.current, {
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      fallbackFocus: '[tabindex="-1"]',
      ...options,
    })

    trapRef.current = trap
    trap.activate()
  }

  function focusTrigger() {
    trapRef.current.deactivate()
  }

  React.useEffect(
    () => {
      if (showing) focusElement()
      else focusTrigger()
    },
    [showing]
  )

  return {
    bind: { ref: elementRef },
  }
}
```

So here's what's happening: We create two refs: our `elementRef` is binding to our popup menu, while our `trapRef` is referencing our focus trap instantiation. When the `showing` prop changes, we either focus our `elementRef` or we return focus to the trigger element.

This hook doesn't create any additional dom elements and it's incredibly easy to reuse within different components when you need to manage focus for accessibility reasons. I've used it in a popover, modal, and dropdown menu. I recommend being consistent in using a bind object which includes things like `ref` but which can also include additional functions such as `onKeyDown`, `onMouseOver`, etc.

You can see the full implementation of the `useFocus` hook in [sancho-ui](https://github.com/bmcmahen/sancho/blob/master/src/Hooks/focus.ts), and see how it's used in the [Popover](https://github.com/bmcmahen/sancho/blob/master/src/Popover.tsx) implementation.

#### Tip 3: useState takes a callback

When using `useState` with a callback, the callback is run only on the initial mount. This is useful for running expensive computations. Compare these two examples:

```jsx
let counter = 0

function Component() {
  const [number] = useState(counter++)
  return <div>{number}</div>
}
```

With this example, any time our `Component` updates our `counter` will be incremented. Note that this will _not_ update our `number` state, since default state values can only ever be set once on the initial mount of the component.

Let's convert `useState` to use a callback.

```jsx
let counter = 0

function Component() {
  const [number] = useState(() => counter++)
  return <div>{number}</div>
}
```

This will only increment our uid once during the entire lifespan of that component, even if it rerenders. Like the above example, our `number` will remain constant.

The sandbox below demonstrates these differences:

<iframe src="https://codesandbox.io/embed/jl99rjq6v?fontsize=14" title="jl99rjq6v" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
