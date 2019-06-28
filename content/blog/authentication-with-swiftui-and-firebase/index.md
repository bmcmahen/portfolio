---
title: Using Firebase Authentication with SwiftUI
date: '2019-06-28T18:29:18.601Z'
spoiler: You can use Firebase to add authentication to your SwiftUI app. This tutorial explains how.
---

Most iOS applications will probably require some form of authentication, and using Firebase is probably the easiest way to acheive this. This article will explain how you can add basic authentication to an app built with SwiftUI.

#### Setting up the Firebase SDK

As a prerequisite, you'll need to install the Firebase sdk as [indicated here](https://firebase.google.com/docs/ios/setup). You'll then need to follow the first few instructions [here](https://firebase.google.com/docs/auth/ios/start) to initialize the SDK. Namely, you'll need to install the required dependencies in your pod file:

```
pod 'Firebase/Analytics'
pod 'Firebase/Auth'
```

And you'll need to initialize the sdk by importing it in your app delegate:

```swift
import Firebase
```

Finally, initialize the `FirebaseApp` in the `application:didFinishLaunchingWithOptions:` method.

```swift
FirebaseApp.configure()
```

#### Listening for authentication states with SwiftUI

Here's our basic strategy:

We want to create a `SessionStore` class which adheres to the [BindableObject](https://github.com/bmcmahen/react-meets-swiftui/blob/master/Redux.md) protocol. This class listens for authentication state changes (using a Firebase provided function) and updates our session information accordingly. Our views will monitor changes in our `SessionStore` and rerender when our authentication state changes. Depending upon our authentication state, we will either render our primary app view or our authentication forms.

Let's start by implementing our `SessionStore`:

```swift
import SwiftUI
import Firebase
import Combine

class SessionStore : BindableObject {
    var didChange = PassthroughSubject<SessionStore, Never>()
    var session: User? { didSet { self.didChange.send(self) }}
    var handle: AuthStateDidChangeListenerHandle?

    func listen () {
        // monitor authentication changes using firebase
        handle = Auth.auth().addStateDidChangeListener { (auth, user) in
            if let user = user {
                // if we have a user, create a new user model
                print("Got user: \(user)")
                self.session = User(
                    uid: user.uid,
                    displayName: user.displayName
                )
            } else {
                // if we don't have a user, set our session to nil
                self.session = nil
            }
        }
    }

    // additional methods (sign up, sign in) will go here
}
```

You'll notice that we've declared that our session property is an optional `User` type, which we haven't yet defined. Let's quickly make one:

```swift
class User {
    var uid: String
    var email: String?
    var displayName: String?

    init(uid: String, displayName: String?, email: String?) {
        self.uid = uid
        self.email = email
        self.displayName = displayName
    }

}
```

Upon calling the `listen` method, our app will monitor authentication state changes. When it does, we either create a new `User` model and assign it to our session property, or we set the session to `nil`.

#### Adding `signUp`, `signIn` and `signOut` methods

Let's add `signUp` and `signIn` methods to our `SessionStore` class.

```swift

class SessionStore : BindableObject {

    // prev code...

    func signUp(
        email: String,
        password: String,
        handler: @escaping AuthDataResultCallback
        ) {
        Auth.auth().createUser(withEmail: email, password: password, completion: handler)
    }

    func signIn(
        email: String,
        password: String,
        handler: @escaping AuthDataResultCallback
        ) {
        Auth.auth().signIn(withEmail: email, password: password, completion: handler)
    }

    func signOut () -> Bool {
        do {
            try Auth.auth().signOut()
            self.session = nil
            return true
        } catch {
            return false
        }
    }
}
```

Finally, we need a way to stop listening to our authentication change handler.

```swift
class SessionStore : BindableObject {

    // prev code...

    func unbind () {
        if let handle = handle {
            Auth.auth().removeStateDidChangeListener(handle)
        }
    }
}
```

#### Listening for changes in SwiftUI

We need to create a View in SwiftUI that listens for session changes. This View should be placed high in your View hierarchy. Let's start with a simple boilerplate view.

```swift
import SwiftUI

struct ContentView : View {
  var body: some View {
    Text("hello world")
  }
}
```

We want our `ContentView` to have access to our `SessionStore` so that it can conditionally render the authentication screen if the user isn't currently logged in. For that, we are going to define our `session` using the `@EnvironmentObject` property wrapper. This means that some parent view needs to pass a `SessionStore` as an environment object (We'll get to this soon).

```swift{5,8-14}
import SwiftUI

struct ContentView : View {

  @EnvironmentObject var session: SessionStore

  var body: some View {
    Group {
      if (session.session != nil) {
        Text("Hello user!")
      } else {
        Text("Our authentication screen goes here...")
      }
    }
  }
}
```

And we need to tell our `SessionStore` to listen for changes. We'll do that when our `ContentView` first mounts.

```swift{7-9,18}
import SwiftUI

struct ContentView : View {

  @EnvironmentObject var session: SessionStore

  func getUser () {
      session.listen()
  }

  var body: some View {
    Group {
      if (session.session != nil) {
        Text("Hello user!")
      } else {
        Text("Our authentication screen goes here...")
      }
    }.onAppear(perform: getUser)
  }
}
```

Finally, we need to provide the `SessionStore` as an environmental object. Let's do it first in our `ContentView_Previews`:

```swift{5}
#if DEBUG
struct ContentView_Previews : PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(SessionStore())
    }
}
#endif
```

And similarly, in `SceneDelgate.swift` find the `scene:` method and attach an environment object to your `ContentView`.

```swift
window.rootViewController = UIHostingController(
  rootView: ContentView().environmentObject(SessionStore())
)
```

Right on! Now our app will conditionally render an authentication message if the user isn't currently logged in. Now we just need to create our authentication forms.

#### Creating a custom authentication screen

You can get really creative here, but we are going to keep things quite basic for the purposes of this tutorial. Let's create a new view to handle user login.

```swift
import SwiftUI

struct SignInView : View {

    @State var email: String = ""
    @State var password: String = ""
    @State var loading = false
    @State var error = false

    @EnvironmentObject var session: SessionStore

    func signIn () {
        loading = true
        error = false
        session.signIn(email: email, password: password) { (result, error) in
            self.loading = false
            if error != nil {
                self.error = true
            } else {
                self.email = ""
                self.password = ""
            }
        }
    }

    var body: some View {
        VStack {
            TextField($email, placeholder: Text("email address"))
            SecureField($password, placeholder: Text("Password"))
            if (error) {
                Text("ahhh crap")
            }
            Button(action: signIn) {
                Text("Sign in")
            }
        }
    }
}
```

We've defined a (really ugly) form which, upon submission, calls our session `signIn` function. Because our session store is listening for authentication changes, it will update with the correct user information if our login succeeds. If it fails, we show an error to the user. A registration form will look very similar to this one, but will call the `signUp` method instead.

Finally, let's fix our `ContentView` to display our login form when the user is not authenticated.

```swift{16}
import SwiftUI

struct ContentView : View {

  @EnvironmentObject var session: SessionStore

  func getUser () {
      session.listen()
  }

  var body: some View {
    Group {
      if (session.session != nil) {
        Text("Hello user!")
      } else {
        SignInView()
      }
    }.onAppear(perform: getUser)
  }
}
```

There we have it! Of course, eventually you'll want to implement password reset functionality and possibly social login. But that's for another tutorial.

**For a complete example, check out [Julienne](https://github.com/bmcmahen/julienne-swift), an open source recipe sharing app built with SwiftUI and Firebase.**
