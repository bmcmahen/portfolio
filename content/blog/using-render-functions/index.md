---
title: Mastering React component composition using children
date: '2018-13-06T22:12:03.284Z'
---

In my last article I wrote about how to use React children to build flexible, reusable components. I want to go one step further and demonstrate how render functions (or children as functions) can provide even more flexibility and power. If you use popular React components then you’ll likely have come across the render function technique — React-motion, Apollo-client, and React-router all make excellent use of render functions to build flexible, reusable components.

So when should you use render functions? Render functions allow us to encapsulate a logic that derives a particular state within a component, and expose that state to our parent component. React-motion determines the x & y position or other animation state and exposes that through a render function. Apollo-client fetches data and exposes it through a render function. React-router determines the correct route to render, parses params, and exposes that in a render callback. So render functions are incredibly powerful within this context — when you want to encapsulate and reuse a specific (but configurable) logic that derives state, and then pass that state back to the parent component to render components in light of this state.

So let’s look at an example: Let’s build a component that monitors and measures window dimensions and provides a custom render function with those dimensions provided. This is a great use for render functions. We want to derive state (from monitoring window size) and we want to expose this state to our parent component, which can then render whatever it wants while utilizing these dimensions.

```javascript
import React from 'react'

class Measure extends React.Component {
  state = {
    width: null,
    height: null,
  }
  // When the component mounts monitor window resizing and make
  // an initial call to onResize.
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
  // Ensure that we remove our event listener when our unmounting.
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }
  // call the `render` prop with our state which contains the window
  // width and height.
  render() {
    return this.props.render(this.state)
  }
}
```

And now we can utilize this component to get quick access to window measurements.

```javascript
const Box = () => (
  <div>
    <div>This box is half the size of our window</div>
      <Measure render={({ width, height }) => (
        <div style={{
           width / 2 + 'px',
           height / 2 + 'px',
           background: 'black'
         }} />
       )}
      />
  </div>
)
```

A few years ago it used to be common to use React.CloneElement used with React children to provide additional functionality to that child — perhaps to add an className, or to add other props. But I think it almost always makes sense to use a render callback with suggested props instead. This pattern also does a nice job of replacing mixins with reusable lifecycle patterns (attaching event handlers, for instance) now being delegated to components within the render function.

When should you not use a render function? If your component does not use any component specific functionality — i.e, you’re not making use of lifecycle methods and you’re not actually rendering any additional content, then a regular function is often the way to go. Simply sorting an array? It’s probably best just to create a regular sort function.

And finally, you’ll notice that some libraries provide render specific props, while others use children as render functions. Which should you use? Honestly, I don’t think it matters. Use whatever you feel comfortable with and be consistent.
