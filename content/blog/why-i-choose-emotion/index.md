---
title: Writing your CSS with Emotion
date: '2019-03-01T21:53:20.098Z'
spoiler: I have tried almost every way to write css for the web, and Emotion's css prop is easily my favourite.
---

I have written css for the web in just about every way imaginable. I've used css modules, preprocessors including Sass, Less, and Stylus, BEM, functional css (using Tachyons), and I've used numerous CSS-in-JS libraries including Styled-components, and react-native stylesheets. I've tried all of this, and using Emotion's css prop is easily my favourite. I'll try to explain why.

#### CSS prop vs Styled

Let's assume that you're already on the CSS-in-JS bandwagon. If you're not, it's worth perusing the many [great](https://www.youtube.com/watch?v=R1_nGU0x3Wk) [articles](<(https://mxstbr.com/thoughts/css-in-js/)>) and [videos](https://vimeo.com/116209150) about the benefits of writing css in Javascript.

My main task here is to argue that using the `css` prop from [Emotion](https://emotion.sh) is the best way to style your apps. In truth, Emotion shares much with the other behomoth in the CSS-in-JS realm, [Styled-components](https://www.styled-components.com/). Both Emotion and Styled-components allow you to style components using a `css` attribute (Styled-components [added this](https://www.styled-components.com/docs/api#css-prop) in version 4). Emotion even exposes a `styled` api that basically mimics how styled-components works. But in comparing the two libraries, I'm really comparing two distinct options for styling your components.

One is the `styled` way:

```jsx{3-8}
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

The styled method uses the `styled.button` style API combined with template literals to create buttons with styles. You can see why it's popular. With examples like this, it's a beautiful API.

In contrast, with the css prop we can add styles much as you'd use the `style` prop.

```jsx{6-10}
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

On first glance, the styled example seems more elegant. But I've found that over the long run, I generally prefer the `css` style api for the following reasons:

#### You're still writing regular React components.

Especially when working with typescript, I consider this beneficial. You type a `Button` component just as you would a regular React component, allowing you to clearly specify which props are accepted. As a result, you're less likely to pollute your dom with odd attributes—a problem I found common when passing custom attributes to styled components.

#### Object styles are easier to work with.

When working with typescript, I love that all of my css is typechecked and provides robust autocompletion. And I generally find it easier to insert theme variables into objects instead of using the `${theme.color.red}` style notation. The small downside to objects is that they are slightly more cumbersome to write and aren't easily copied from browsers. (Note that as of v4 Styled-components also [supports objects](https://www.styled-components.com/docs/advanced#style-objects)).

#### Naming things is hard. And I'm lazy.

When working with the styled api you generally need to create names for components with distinct styles. This results in many components which lack obvious semantic importance which nevertheless require distinct names. Naming these components with a meaningful descriptor can be tough. Furthermore, the boilerplate often feels burdensome when applying small custom styles, such as altering margins or padding. So, because I'm lazy, I find myself often resorting to using the `style` prop for quick adjustments.

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

#### You colocate styles with elements.

With the `css` prop, what you see is what you get. It's a small point, but not having to scroll away from an element to find your style definition really improves my workflow. It feels more efficient and keeps me in the flow when writing my components. Need to delete an element? There's no need to hunt down the orphaned style definition.

#### Composition is dead easy.

Consider our `Button` component. What if we want to provide a margin to it?

```jsx{4}
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

#### Choosing Emotion

The styled api is wonderful and combined with something like [styled-system](https://github.com/styled-system/styled-system) you can get the benefits of functional style css which can alleviate some of the naming issues. But I've found that using the `css` prop, especially with typescript, reduces the need for something like styled-system and generally provides the most flexible means of writing your styles in Javascript.

**Suggested links**:

[Emotion.sh](https://emotion.sh/docs/introduction)
