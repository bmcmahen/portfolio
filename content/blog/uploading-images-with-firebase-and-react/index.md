---
title: Uploading Images using Firebase and React
date: '2019-02-08T20:37:14.808Z'
---

In this tutorial I'm going to demonstrate how you can use `firebase`, `react` and `filepond` to create a fully functional image uploading service on your website. By the end of this tutorial, you should be able to upload an image and display it on your website. This tutorial assumes that you have a functioning react application and have set up firebase with the correct configuration. You'll end up with something like this:

<div class="video">
<video autoplay="true" loop="true">
  <source type="video/mp4" muted src="./demo.m4v"></source>
</video>
</div>

First up, install the necessary dependencies. We will be using [filepond](https://pqina.nl/filepond/), a seriously slick file upload widget plus a few plugins to handle the UI for the image uploads.

```
yarn add react-filepond filepond filepond-plugin-image-exif-orientation filepond-plugin-image-preview shortid
```

Create a new file and import the necessary libraries.

```javascript
import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import shortid from 'shortid
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// And import the necessary css
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// register the filepond plugins for additional functionality
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// make a reference to our firebase storage
const storage = firebase.storage().ref();
```

Next, we are going to create a basic react component to handle our uploads. We want this component to:

- Accept a reference to an existing image, used when editing documents that contain uploaded images.
- Provide a callback for saving an image. `onRequestSave` will be called when a new image has been uploaded. We may want to attach the id of this image to a parent document, such as a recipe, profile, etc., so that we can save it.
- Provide a callback for clearing an image. `onRequestClear` will be used when a user removes the image. We may want to disassociate the image from its parent document.

```javascript
export function ImageUpload({
  onRequestSave,
  onRequestClear,
  defaultFiles = [],
}) {
  // use a useState hook to maintain our files collection
  const [files, setFiles] = React.useState(defaultFiles)

  return (
    <FilePond
      files={files}
      allowMultiple={false}
      maxFiles={1}
      onupdatefiles={fileItems => {
        if (fileItems.length === 0) {
          onRequestClear()
        }

        setFiles(fileItems.map(fileItem => fileItem.file))
      }}
      server={server} // todo: add custom server functionality using firebase
    />
  )
}
```

So far, this code doesn't really do much. We have provided a means to provide a default image to our `ImageUpload` component and we utilize local state to control the `FilePond` component. But we can't yet actually upload or load images from a server. To do this, we need to implement the `server` functionality which allows `FilePond` to utilize custom uploads and loading provided by firebase.

```javascript
const server = {
  // this uploads the image using firebase
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    // create a unique id for the file
    const id = shortid.generate()

    // upload the image to firebase
    const task = storage.child('images/' + id).put(file, {
      contentType: 'image/jpeg',
    })

    // monitor the task to provide updates to FilePond
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snap => {
        // provide progress updates
        progress(true, snap.bytesTransferred, snap.totalBytes)
      },
      err => {
        // provide errors
        error(err.message)
      },
      () => {
        // the file has been uploaded
        load(id)
        onRequestSave(id)
      }
    )
  },

  // this loads an already uploaded image to firebase
  load: (source, load, error, progress, abort) => {
    // reset our progress
    progress(true, 0, 1024)

    // fetch the download URL from firebase
    storage
      .child('images/' + source)
      .getDownloadURL()
      .then(url => {
        // fetch the actual image using the download URL
        // and provide the blob to FilePond using the load callback
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function(event) {
          let blob = xhr.response
          load(blob)
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(err => {
        error(err.message)
        abort()
      })
  },
}
```

There we have it. It's relatively complicated, but we have a lot of functionality here, including progress updates and image previews. Filepond will pass the image to firebase, which will then upload it to our server. We can also load images from firebase by retrieving the download url and fetching a blob of the image.

You can see this code in action on a quick recipe sharing app I built called [allofmy.recipes](http://allofmy.recipes).

Stay tuned for more posts that show how you can resize images using firebase functions and efficiently load images using a custom image component.
