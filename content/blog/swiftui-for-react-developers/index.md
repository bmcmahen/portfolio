---
title: An Introduction to SwiftUI for React Developers
date: '2019-06-12T21:34:59.687Z'
spoiler: Are you a React developer that wants to learn SwiftUI? I'll be walking through some basic SwiftUI design patterns from the perspective of a React and Javascript developer.
---

If you've been working with React for a while and you take a quick glance at Swift UI you can probably spot the similarities almost immediately. Both are declarative UI frameworks which emphasize a separation between state and the templates used to generate views. Both emphasize reactivity - update your state to update your views. And both emphasize the creation of components which can be composed together to create reusable, complex views.

Honestly, your biggest hurdle in picking up SwiftUI will probably be [learning Swift itself](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) and working with a typed language. Having some experience with typed languages, including Typescript, is useful.

In this article I'll be walking through some very basic SwiftUI design patterns from the perspective of a React and Javascript developer. You can find more of these patterns in the [react-meets-swiftui](https://github.com/bmcmahen/react-meets-swiftui) github repository.

#### Using state in Swift UI

Let's take a look at a very simple SwiftUI component.

```swift
struct Counter : View {
    @State var counter = 0

    func increment () {
        counter += 1
    }

    var body: some View {
        VStack {
            Text("Count: \(counter)")
            Button(action: increment) {
                Text("Increment")
            }
        }
    }
}
```

This looks quite similar to creating a React component class. We are defining a [struct](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html) named `Counter` which is a class-like construct that includes properties and functions. `View` describes a [protocol](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html) that our `Counter` must follow -- i.e., it must contain a `body` property which returns some `View`. If we remove the `body` property from our struct the compiler will complain that we aren't adhering to the `View` protocol.

This `body` property is similar to the `render` function that you find in React. And its contents are similar to JSX. In this case, we have composed 4 Views (VStack, Text, Button, and Text) in our counter to create a vertical stack containing a text label and a button which increments our value.

The `@State` property defines our local component state. `@State` defines a [property wrapper](https://mecid.github.io/2019/06/12/understanding-property-wrappers-in-swiftui/) which is a new Swift language feature. It ensures that our property is reactive. We define its default value as `0` and its type as `Int` is automatically inferred. To reactively update the value we can simply change the `counter` property and our view will rerender accordingly. This is the equivalent of running `setState` in React.

#### Passing props to components

Passing props is as easy as defining arguments in a function. Let's look more closely at the `body` property of our `Counter` view.

```swift
var body: some View {
    VStack {
        Text("Count: \(counter)")
        Button(action: increment) {
            Text("Increment")
        }
    }
}
```

Notice that both `Text` and `Button` are view structs which accept arguments. These arguments are the equivalent of React's props. In this case, `Text` accepts a `String` while our button accepts a function which is called when a touch occurs.

But what about that value which is contained within the brackets after `VStack` and `Button`? This is a [trailing closure](https://www.hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax) and a relatively new feature of Swift. Basically, the trailing closure syntax is a piece of syntatic sugar which allows you to write the final argument of a function (when it's a closure) after the function declaration.

Instead of:

```swift
Button(action: increment, content: () -> Text("Increment"))
```

We can write:

```swift
 Button(action: increment) {
    Text("Increment")
}
```

To understand how to create a custom View which accepts props, let's create another View which will help us render our counter. It should accept a `count` prop from the parent component.

```swift{2}
struct CountDisplay : View {
    var count: Int

    var body: some View {
        HStack {
          Text("Your count total:")
          Text("\(count)")
        }
    }
}
```

And let's pass the `count` prop from our parent view to our `CountDisplay`.

```swift{3}
var body: some View {
    VStack {
        CountDisplay(count: counter)
        Button(action: increment) {
            Text("Increment")
        }
    }
}
```

Similar to React, isn't it?

#### Updating parent state in child views using binding

One common pattern in React is to pass `onChange` callback functions to child components such that parent components can update and change its local state, which will then propagate to the child components. You can do the same in SwiftUI, but SwiftUI goes one better -- it allows child components to update parent state.

Let's refactor our `Counter` example so that our `Button` appears in a child component.

```swift{2}
struct IncrementButton : View {
    @Binding var counter: Int

    func increment () {
        counter += 1
    }

    var body: some View {
      Button(action: increment) {
          Text("Increment")
      }
    }
}
```

So now our child `IncrementButton` accepts a `counter` prop, and it can actually update that prop itself. No `onChange` callback necessary! It updates that prop in the parent component where it came from. Pretty cool! We use the special `@Binding` property decorator to ensure that a `bound` variable is passed as a prop to our components.

How do we pass a bound variable? Let's redo our parent component.

```swift{7}
struct ContentView : View {
    @State var count = 0

    var body: some View {
        VStack(spacing: 1.0) {
            Text("Press the button below")
            IncrementButton(counter: $count)
        }
    }
}
```

We simply prepend an `$` symbol prior to the state variable that we are passing.

#### Other React Design Patterns in SwiftUI

Obviously, this is just the start when it comes to implementing React design patterns in SwiftUI. But I'll be exploring additional patterns over the coming months and recording my observations.

**You can view additional React patterns in the [react-meets-swiftui](https://github.com/bmcmahen/react-meets-swiftui) repository.** If you're a React developer and want to learn the basics of SwiftUI, this is a great place to start.
