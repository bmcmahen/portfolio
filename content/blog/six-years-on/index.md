---
title: The State of Web Development, Six Years on
date: '2019-03-25T20:46:10.080Z'
spoiler: Rewriting a web application that I haven't touched in 5 years reveals the ways in which the web has (and hasn't) improved since.
---

Last week I decided to rewrite a [captioning web application](https://captioner.app) that I originally wrote about 6 years ago using the Meteor framework, and the process was revealing in two primary ways: First, I’m (thankfully) a much better developer and designer than I was back then. And second, the state of developing for the web has dramatically improved in most, but not all, ways.

I want to record my thoughts - and I’d encourage others to re-approach a project they haven’t touched in many years, if for no other reason to remind themselves how far they (and we) have come.

---

### Ways in which the web has improved

#### Legacy browsers begone!

This one is huge. Most of us don’t need to worry about supporting legacy browsers. Using grid and flex based layouts are a godsend. Like, seriously - remember how difficult it was to centre things before flex box? Remember when you had to wonder whether alpha transparencies were only partially supported? Remember when the `clearfix` was a standard hack in your css? Building responsive layouts with today’s CSS is actually pretty damn easy and maybe even fun.

#### Better frameworks, like React

Our frameworks are better. Backbone, Meteor, and such were wonderful tools at the time and a big improvement upon writing jQuery, but today’s frameworks are so much better.

React has changed how we write applications. More importantly, it’s changed how we _think_ about writing applications. State is no longer coupled with the DOM - instead, we tend to model state separately and build our UI to react to it, which makes reasoning about an application much, much easier.

Furthermore, the Component model in React makes it easy to write reusable elements which can be composed and altered in a flexible, intuitive way. Code feels more organized and readable than ever.

#### Better services, like Firebase

Meteor was great at the time because it made you feel like you had access to a real-time database directly in your client code, and writing authentication logic was dead simple. For my updated version of Captioner, I replaced pretty much all of this code with Firebase which handles my entire data modelling layer, local (and offline) persistence, and authentication. You take it for granted after having used it for a few years, but the functionality Firebase provides out of the box is seriously impressive.

#### Better tooling, like Webpack

Tools like Webpack (and before that, browserify) make organizing our code much easier than before. Remember when there weren’t modules? Remember when you couldn’t easily “import” or “export” code? Remember require.js? It wasn’t that long ago that this functionality either didn’t exist, or was in its infancy. We loooove to bitch and moan about configuring webpack, but bundlers like this (plus tools built on top of it, like create-react-app or next.js) make building complex, large applications possible.

#### Good design is easier

Maybe it's just me, but making beautiful designs seems much easier today than it did five years ago. I think it's in part because our _thinking_ on design has changed, primarily with the newfound emphasis on building design systems. Yes, everyone has their own design system ([even I do!](https://sancho-ui.com)), but for good reason. Design systems provide powerful primitives which make building beautiful apps much easier.

The popularity of design systems is a product of 1) a greater emphasis on design on the web in general, and 2) the emergence of libraries like React and Vue which emphasize developing reusable, composable components as part of their model.

---

### But it's not all good news

#### Performance is kinda crap

Don't get me wrong - performance has improved, or at least the devices that we use to access the web have improved. But man, it’s still sometimes really tough to build highly performant layouts and animations, particularly on mobile devices. It’s absurd to imagine that my iPhone can play complex 3d games. Meanwhile, I’m still struggling to get my dialog animations to run at 60fps.

#### Mobile is a challenge

Building a good mobile experience is still difficult. Thankfully we not longer needs hacks to overcome touch delays, but adapting hover and focus states for touch interfaces still feels cumbersome. It's almost impossible to fully emulate the feel and functionality of a native application using web technologies, and because of this, I'd generally recommend not even trying.

Focus on building a mobile website that is simple and performant, which relies on native elements (hello, select menu), and makes use of a combination of vertical and horizontal scrolling with fixed or sticky elements. You can make a pleasant, functional experience, but it's hard to make a truly beautiful and fluid experience which matches native.

---

### We've come a long ways

Overall, redoing this project has made me really excited for the web and the progress that’s been made in the last 5 years. I’m also excited for the progress that I’ve made, and for this reason, I’d recommend you pick a project that you haven’t touched in a few years to see what you can accomplish.
