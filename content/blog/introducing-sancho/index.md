---
title: Introducing Sancho UI
date: '2019-04-13T18:40:09.269Z'
spoiler: Sancho is a responsive and accessible design system built with React, Typescript and Emotion. Named after the ever-faithful, hilariously acerbic sidekick of Don Quixote, Sancho is designed to help you no matter how quixotic your dreams may be.
---

<p style='max-width: 32rem; text-align: center'><a href='http://sancho-ui.com'>Sancho</a> is an <a href='https://github.com/bmcmahen/sancho'>open source</a> responsive and accessible design system built with React, Typescript and Emotion.</p>

<img src='./preview.jpg' alt='Sancho preview' style='margin-bottom: 1.5rem;' />

#### Sancho aims to provide a beautiful, generic set of components that you can make your own.

The primary goal of Sancho's design is to provide a set of UI components which are beautiful and functional but generic enough to be used in most contexts, and extensible enough to be made your own.

I've found that many recent design systems are built with a particular project in mind with a unique, distinctive style, which makes it difficult to use without your project looking like an existing project. Something like Material-UI is really great, but its style is very much identifiable with the Google brand. Bootstrap has always struck me as different in this regard - it provides a beautiful, somewhat generic set of styles and components which work great out of the box but which can easily be altered. In this sense, it feels like Bootstrap is made for you.

Sancho tries to replicate Bootstrap in this regard. It's design isn't particularly distinctive and it implements many of my favourite ideas from existing design systems. It's also meant to be extensible through a combination of theming variables and component composition techniques.

#### Responsive design is really hard. Sancho makes it easier.

For various reasons, many of the react based design systems don't make responsive design a priority. Sancho does it's best to make mobile designs and touch interactions as good as possible. This comes out in some of the smaller details:

Sancho provides scroll locking in the appropriate context.

Here's an example of scrolling within a `Sheet`.

<div class='video'>
<video autoplay="true" loop="true">
  <source type="video/mp4" src="./prevent-scroll-3.m4v"></source>
</video>
</div>

Sancho provides a responsive popover which acts as a regular popover on larger screens, but turns into a bottom sheet on mobile devices.

<div class='video'>
<video autoplay="true" loop="true">
  <source type="video/mp4" src="./responsive-popover.m4v"></source>
</video>
</div>

Sancho's tabs scroll into view on smaller screens.

<div class='video'>
<video autoplay="true" loop="true">
  <source type="video/mp4" src="./tab-slide.m4v"></source>
</video>
</div>

The goal is to ensure that Sancho looks and _feels_ as good on touch devices as it does on the desktop, a goal which is often surprisingly and frustratingly difficult to achieve.

#### Sancho has a dark mode.

Sancho provides a dark mode for all of its components which makes it relatively easy to build a dark and light mode version of your website.

<img src='./dark-light.jpg' alt='dark and light mode' />
<br />

But perhaps more importantly, dark and light mode can be utilized at the same time on different portions of your website. This makes it easy to convert something like a navigation bar with a dark background to have light themed components and text.

```jsx
import { DarkMode } from 'sancho'

function App() {
  return (
    <div>
      <DarkMode>
        <NavigationBar />
      </DarkMode>
      <Container>
        <MainContent />
      </Container>
    </div>
  )
}
```

You can see this in action on the [toasted-notes](https://toasted-notes.netlify.com/) website which has a dark hero with light text. Even buttons are subtly altered to provide greater contrast on dark backgrounds.

#### Sancho is built with Typescript, Emotion and React.

Sancho is fully typed because it's built with Typescript. Even your theme is typed which ensures that you only access a value that exists on your theme object.

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'sancho'

function App() {
  const theme = useTheme()
  return (
    <div
      css={{
        background: theme.colors.background.tint1,
      }}
    >
      Hello world
    </div>
  )
}
```

With Emotion, we have the full power of the `css` prop and the ability to compose styles. This means we can easily alter the style of existing components.

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Alert, useTheme } from 'sancho'

function MyCustomAlert() {
  const theme = useTheme()
  return (
    <Alert
      title="This Alert has an altered appearance"
      css={{
        maxWidth: '300px',
        '& .Alert__bar': {
          display: 'none',
        },
        '& .Alert__content': {
          padding: theme.spaces.sm,
        },
      }}
    />
  )
}
```

#### Sancho is tree shakable. Bundle only the components that you need.

It's unlikely that you'll need to use all of the components provided Sancho. Sancho is fully tree shakable which means that only those components that you use will be included in your final build.

If you import `Text` and `IconArrowRight` into a `create-react-app` bundled application, the final Sancho related build size is `8.4kb minified`.

#### We've provided two open source projects built with Sancho.

[Julienne](http://julienne.app) is a little app for sharing recipes with family and friends. View the [source](https://github.com/bmcmahen/julienne) on Github.

![Julienne in action](./julienne-screenshot.jpg)

[Captioner](https://captioner.app/) provides a way to create subtitles for videos in your web browser. View the [source](https://github.com/bmcmahen/captioner) on Github.

![Captioner in action](./captioner-screenshot.jpg)

Interested in trying Sancho? Your best best is to start with the [documentation](http://sancho-ui.com) and then check out some of the links below.

#### Further resources

- [Sancho on Github](https://github.com/bmcmahen/sancho)
- [Sancho-UI Documentation](http://sancho-ui.com)
- [Julienne](http://julienne.app)
- [Captioner](http://captioner.app)
- [Toasted notes](https://toasted-notes.netlify.com/)