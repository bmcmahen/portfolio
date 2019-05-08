---
title: Building React Components with Gesture Support
date: '2019-05-08T18:07:33.883Z'
spoiler: It's 2019! The web deserves better gestures, and building them might not be as difficult as you imagine.
---

It's perhaps not suprising that gesture support isn't particularly common on the web. Adding intuitive gestures that match their native counterparts can seem quite daunting and often not worth the trouble. But c'mon, it's 2019 and the mobile web deserves some decent gesture support!

This article will walk you through the creation of a basic list item which allows you to swipe left to "like" it -- a pattern fairly common in native apps, and one that I use quite often in Spotify. Here's what our final version will look like:

<iframe src="https://codesandbox.io/embed/jnz1q8ymvy?fontsize=14&view=preview" title="gesture-tutorial-final" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Before getting started, it's useful to have a basic understanding of [React](http://reactjs.org) and [React hooks](https://reactjs.org/docs/hooks-intro.html). Ready? Let's do this.

#### The basic component layout

Before adding any gestures, we need a basic component skeleton & layout. Let's create a component with a wrapper div element and two children: one will be our background with the heart icon, and the other will provide our sliding foreground element.

Our component will look something like this:

```jsx
import React from 'react'
import { Heart } from 'react-feather'

function Slider({ children }) {
  return (
    <div className="list-item">
      <div className="background">
        <Heart />
      </div>
      <div className="sliding-pane">{children}</div>
    </div>
  )
}
```

Our styles are fairly simple. Let's use a predefined width and height for the `list-item` element and give it a relative position. And then let's assign an absolute position to our `sliding-pane`. Our full css will look like this:

```css
.list-item {
  position: relative;
  width: 300px;
  height: 75px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 0.5rem;
}

.sliding-pane {
  cursor: -webkit-grab;
  background-color: #121212;
  color: rgba(255, 255, 255, 0.9);
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 1.25em;
  font-weight: 600;
}

.sliding-pane:active {
  cursor: -webkit-grabbing;
}

.background {
  align-self: stretch;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
```

Alright, we have our basic skeleton. But it doesn't do anything! Time for some gestures.

#### Adding drag gestures with react-gesture-responder.

To add gestures we are going to use a library that I developed called [react-gesture-responder](https://github.com/bmcmahen/react-gesture-responder). React gesture responder is a hook that binds to an element and provides gesture callbacks for that element. It's a fairly low-level library that allows you to build (and negotiate between) complex gestures. Let's add it to our component:

```jsx{4-13,20}
import { useGestureResponder } from 'react-gesture-responder'

function Slider({ children }) {
  const { bind } = useGestureResponder({
    // the view should claim the responder when touched
    onStartShouldSet: () => true,
    onMove: state => {
      // move callback
    },
    onRelease: state => {
      // release callback
    },
  })

  return (
    <div className="list-item">
      <div className="background">
        <Heart />
      </div>
      <div {...bind} className="sliding-pane">
        {children}
      </div>
    </div>
  )
}
```

The `useGestureResponder` hook returns a `bind` object and accepts a number of callbacks. These callbacks help us control and respond to our gestures.

The `bind` object should be spread on the element you want to accept gesture controls. What is the `bind` object, exactly? It's a collection of event callbacks, such as `onTouchStart`, `onTouchMove`, etc., which the hook uses to determine its gestures.

The `onStartShouldSet` callback tells the view to `claim` the responder for itself. Typically, you'll always return true for this unless you want to disable gesture interactions altogether. (Note: you may want to return false in more complex cases involving negotation between competing gestures. But that's for another tutorial.)

The `onMove` function is called when a drag is performed, while `onRelease` is called when that drag ends.

Let's use these callbacks to update the position of our slider.

```jsx{2,6-12,21-23}
function Slider({ children }) {
  const [x, setX] = useState(0)

  const { bind } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: state => {
      const [x] = state.delta
      setX(x)
    },
    onRelease: state => {
      setX(0)
    },
  })

  return (
    <div className="list-item">
      <div className="background">
        <Heart />
      </div>
      <div
        {...bind}
        style={{
          transform: `translateX(${x}px)`,
          transition: `transform 0.2s ease`,
        }}
        className="sliding-pane"
      >
        {children}
      </div>
    </div>
  )
}
```

Our slider now responds to our drag movements and animates back into place upon release.

But there are a few problems with this code:

- The transition animation is performed even while dragging. It'd be nice if this was immediately responsive while dragging, but animated upon release.
- Performance isn't great because each update to component state causes our entire component to rerender. This might not be a huge issue for a small component like this, but you can imagine performance degrading over time with more complex components.

My preferred solution to these problems is to use an animation library like [react-spring](https://www.react-spring.io/).

#### Using react-spring for better control and performance.

React-spring exposes a `useSpring` hook which we can use in place of our `x` state.

Let's replace this:

```jsx
const [x, setX] = useState(0)
```

with `useSpring`:

```jsx
import { useSpring } from 'react-spring'

const [{ x }, set] = useSpring(() => {
  return { x: 0 }
})
```

We now perform animation updates by calling the `set` function instead of `setX`.

```jsx
set({ x: 100 })
```

React-spring also exports an `animated` component. These should be used in place of regular `div` elements when using spring values such as our `x` value. Let's put this together:

```jsx{4-6,12,15,24-28}
import { useSpring, animated } from 'react-spring'

function Slider({ children }) {
  const [{ x }, set] = useSpring(() => {
    return { x: 0 }
  })

  const { bind } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: state => {
      const [x] = state.delta
      set({ x, immediate: true }) // the immediate flag bypasses the transition animation
    },
    onRelease: state => {
      set({ x: 0, immediate: false })
    },
  })

  return (
    <div className="list-item">
      <div className="background">
        <Heart />
      </div>
      <animated.div
        {...bind}
        style={{
          transform: x.interpolate(x => `translateX(${x}px)`),
        }}
        className="sliding-pane"
      >
        {children}
      </animated.div>
    </div>
  )
}
```

This provides the same functionality as the previous example but fixes both problems mentioned earlier. Performance is improved. And notice the `immediate` option when calling our set function? This disables the spring transition animation, which provides us with responsive dragging. We disable `immediate` on release to enable the animation.

#### Determining when the user has 'liked' the list item.

Lastly, we need to determine when the user has gestured far enough to the left to trigger a "like", and we need to provide visual feedback to the user when they have reached this threshold.

```jsx{2,8-10,16-19,24-26,37-39}
function Slider({ children }) {
  const [isLiking, setIsLiking] = React.useState(false);

  const [{ x }, set] = useSpring(() => {
    return { x: 0 }
  })

  function shouldLike(x) {
    return x < -100
  }

  const { bind } = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: state => {
      const [x] = state.delta
      const like = shouldLike(x)
      if (like !== isLiking) {
        setIsLiking(like)
      }

      set({ x, immediate: true })
    },
    onRelease: state => {
      if (shouldLike(state.delta[0])) {
        cosole.log('User has liked!)
      }

      set({ x: 0, immediate: false })
    },
  })

  return (
    <div className="list-item">
      <div className="background">
        <Heart
          style={{
            color: 'white',
            fill: isLiking ? 'white' : 'transparent',
            transition: 'transform 0.3s ease'
          }}
         />
      </div>
      <animated.div
        {...bind}
        style={{
          transform:  transform: x.interpolate(x => `translateX(${x}px)`),
        }}
        className="sliding-pane"
      >
        {children}
      </animated.div>
    </div>
  )
}
```

Our move callback checks to see if the user has gestured far enough to the like, and updates our `isLiked` state accordingly. Our heart icon changes appearance in response. But we don't actually trigger the like event until the gesture has ended in order to give the user the chance to cancel their gesture.

#### Further enhancements

This gesture can be improved in a few ways:

- Ideally we should provide some resistance once the gesture has entered 'like' mode.
- The heart should move horizontally in response to the gesture.

You can see both of these in the final version:

<iframe src="https://codesandbox.io/embed/jnz1q8ymvy?fontsize=14" title="gesture-tutorial-final" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

#### Examples in the wild

I've created a few open source components that respond to gestures which might be useful for learning.

- [react-gesture-view](https://github.com/bmcmahen/react-gesture-view) offers swipeable views that animate left and right.
- [Sancho-UI](https://github.com/bmcmahen/sancho) offers a number of components which accept gestures, notably [sheet](https://sancho-ui.com/components/sheet/). You can view the [source here](https://github.com/bmcmahen/sancho/blob/master/src/Sheet.tsx).
- React-spring has some absolutely killer [examples](https://www.react-spring.io/docs/hooks/examples) including the [slider](https://codesandbox.io/embed/zrj66y8714) that our example is based on.

Got others you want to share? I'd love to see them!
