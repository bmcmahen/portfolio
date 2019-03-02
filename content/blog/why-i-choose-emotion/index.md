---
title: The Benefits of Writing CSS with Emotion
date: '2019-03-01T21:53:20.098Z'
---

There have been many [great](https://www.youtube.com/watch?v=R1_nGU0x3Wk) [articles](<(https://mxstbr.com/thoughts/css-in-js/)>) and [videos](https://vimeo.com/116209150) about the benefits of writing css in Javascript. In brief, the benefits are:

- It's easier to alter and delete styles with uninteded consequences.

- You get the benefits of using a full programming language to manage variables, colour alterations, and calculations.

- It generally plays nicer in React. Instead of combining strings of classNames depending on the props supplied to a component, you can combine objects of styles and alter individual attributes.

But once you're on the CSS-in-JS bandwagon, which library do you choose?

#### Emotion vs Styled-components

My main task here is to argue that using [Emotion](https://emotion.sh) is the best library with which to style your apps. In truth, Emotion shares much with the other behomoth in the CSS-in-JS realm, [Styled-components](https://www.styled-components.com/). It even exposes a `styled` api that basically mimics how styled-components works. But in comparing the two libraries, I'm really comparing two distinct options for styling your components.

One is the `styled-components` way:

```jsx
import styled from 'styled-components'

const Button = styled.button`
  background: #08e;
  color: white;
  padding: 6px 10px;
  border: none;
`

function Example() {
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  )
}
```

Styled-components uses the `styled.button` style API combined with template literals to create buttons with styles. You can see why it's popular. With examples like this, it's a beautiful API.

In contrast, with Emotion we can add styles to an element using the `css` prop much as you'd use the `style` prop.

```jsx
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Button = props => (
  <button
    css={{
      background: '#08e',
      color: 'white',
      padding: '6px 10px',
      border: 'none',
    }}
    {...props}
  />
)

function Example() {
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  )
}
```

On first glance, the styled-component example seems more elegant. But I've found that over the long run, I generally prefer the `css` style api for the following reasons:

#### You're still writing regular React components.

Especially when working with typescript, I consider this beneficial. You type a `Button` component just as you would a regular React component, allowing you to clearly specify which props are accepted. As a result, you're less likely to pollute your dom with odd attributes—a problem I found common when passing custom attributes to styled components.

#### Object styles are easier to work with.

When working with typescript, I love that all of my css is typechecked and provides robust autocompletion. And I generally find it easier to insert theme variables into objects instead of using the `${theme.color.red}` style notation. The small downside to objects is that they are slightly more cumbersome to write and aren't easily copied from browsers.

#### Naming things is hard. And I'm lazy.

When working with styled-components you generally need to create names for components with distinct styles. This results in many components which lack obvious semantic importance which nevertheless require distinct names. Naming these components with a meaningful descriptor can be tough. Furthermore, the boilerplate often feels burdensome when applying small custom styles, such as altering margins or padding. So, because I'm lazy, I find myself often resorting to using the `style` prop for quick adjustments.

But using the `css` prop avoids these pitfalls, while still providing the opportunity to wrap styles into a component if it's worth reusing and semantically meaningful.

```jsx
function Example() {
  return (
    <div
      css={{
        margin: theme.spacing.sm,
        padding: theme.spacing.sm,
      }}
    >
      <Button variant="primary">Hi there</Button>
    </div>
  )
}
```

#### Composition is dead easy.

Consider our `Button` component. What if we want to provide a margin to it?

```jsx
function Example() {
  return (
    <>
      <Button css={{ marginRight: '1rem' }}>Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  )
}
```

This passes the styles defined in our example to the `Button` element and composes the styles for us, applying the custom margin.

#### Both are great, but I choose Emotion

Styled-components is a wonderful tool and combined with something like [styled-system](https://github.com/styled-system/styled-system) you can get the benefits of functional style css which can alleviate some of the naming issues. But I've found that using the `css` prop, especially with typescript, reduces the need for something like styled-system and generally provides the most flexible means of writing your styles in Javascript.