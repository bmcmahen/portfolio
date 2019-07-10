---
title: Displaying Firebase Images with SwiftUI
date: '2019-07-10T19:35:56.796Z'
spoiler: Learn how to load and display firebase storage images with SwiftUI
---

This tutorial assumes that you've installed the Firebase sdk as [indicated here](https://firebase.google.com/docs/ios/setup) and initalized the sdk as indicated [here](https://firebase.google.com/docs/auth/ios/start). Finally, you'll need to set up cloud storage using the [instructions](https://firebase.google.com/docs/storage/ios/start) provided in the firebase documentation. Annnd now, finally, the fun part! Let's load an image from Firebase and render it in SwiftUI!

#### Creating a Reusable FirebaseImage View

Let's aim to create a reusable `FirebaseImage` view which will help us load and render a Firebase image wherever we need it. It will accept an `id` argument which will contain the storage id of the image. We want our API to look something like the following:

```swift
FirebaseImage(id: 'sdfsdf').resizable()
```

Nice and simple, eh? Let's go ahead and create a new SwiftUI View and name it `FirebaseImage`.

Our basic strategy here is to:

- **Attempt to load the image from Firebase.**

- **While loading, display a placeholder image.**

- **Once the image has loaded, display the image.**

Our `FirebaseImage` view will always return an `Image` (whether the actual image or our placeholder image) and thus will always accept `Image` view modifiers, like `resizable` and `aspectRatio`. You'll be able to use `FirebaseImage` just as you would any other image.

Here's our basic `FirebaseImage` view:

```swift
struct FirebaseImage : View {

    init(id: String) {
        self.imageLoader = Loader(id)
    }

    @ObjectBinding private var imageLoader : Loader

    var image: UIImage? {
        imageLoader.data.flatMap(UIImage.init)
    }

    var body: some View {
        Image(uiImage: image ?? placeholder)

    }
}
```

We initalize our view by creating a new `Loader` given the supplied `id` argument (we will get to our Loader class soon). We use `@ObjectBinding` to listen to loading changes within our `Loader`. We define `image` as an optional value which instantiates a `UIImage` with data fetched from Firebase if it exists. Finally, our `View` renders an image which accepts a `uiImage` as an argument - either our Firebase image, if it has loaded, or our placeholder image.

#### Adding a Placeholder Image

A placeholder image is simply a UIImage that refers to an existing, pre-loaded image that exists in your asset catalog. In my case, I've simply created a blank square jpeg and dragged it into the `assets` catalog. I then create a `placeholder` UIImage which can be used in the `FirebaseImage` view.

```swift{1}
let placeholder = UIImage(named: "placeholder.jpg")!

struct FirebaseImage : View {

    init(id: String) {
        self.imageLoader = Loader(id)
    }

    @ObjectBinding private var imageLoader : Loader

    var image: UIImage? {
        imageLoader.data.flatMap(UIImage.init)
    }

    var body: some View {
        Image(uiImage: image ?? placeholder)
    }
}
```

#### Loading the Image from Firebase

Finally, let's create our `Loader` class which adheres to the `BindableObject` protocol. You'll need to import `Combine` and `FirebaseStorage` to make this happen. I've added this class to our existing file.

```swift
import SwiftUI
import Combine
import FirebaseStorage

final class Loader : BindableObject {
    let didChange = PassthroughSubject<Data?, Never>()
    var data: Data? = nil {
        didSet { didChange.send(data) }
    }

    init(_ id: String){
        // the path to the image
        let url = "images/\(id)"
        let storage = Storage.storage()
        let ref = storage.reference().child(url)
        ref.getData(maxSize: 1 * 1024 * 1024) { data, error in
            if let error = error {
                print("\(error)")
            }

            DispatchQueue.main.async {
                self.data = data
            }
        }
    }
}
```

Upon initialization, we take the supplied `id` of the image and we attempt to load it. If it loads successfully, we assign its value to our `data` attribute. This, in turn, rerenders our `FirebaseImage` now using the firebase image instead of the placeholder.

You can see the entire code in the [julienne-swift](https://github.com/bmcmahen/julienne-swift/blob/master/julienne/FirebaseImage.swift) example repo.
