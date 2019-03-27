---
title: Using Firebase with React Hooks
date: '2019-03-30T02:50:11.311Z'
spoiler: This tutorial will demonstrate how you can use in your React application to better integrate firebase authentication and firestore data fetching.
---

This tutorial demonstrates the use of [hooks](https://reactjs.org/docs/hooks-reference.html) in your react application to better integrate firebase authentication and firestore data fetching. Before starting, it's helpful to have a basic understanding of [hooks](https://reactjs.org/docs/hooks-intro.html), firebase [authentication](https://firebase.google.com/docs/auth/) and [firestore](https://firebase.google.com/docs/firestore/). By the end, we will be building some of the hooks found in our example application, [Julienne.app](https://github.com/bmcmahen/julienne).

### Monitoring authentication

Using a combination of hooks and [context](https://reactjs.org/docs/context.html) makes it easy to access user sessions anywhere in your React application. We can store the user session in context, and pass that context to our child components. These components can then make use of hooks to access the session object.

First, create our context.

```jsx
const userContext = React.createContext({
  user: null,
})
```

We supply our context with a default value containing a null session object. This will change when we use firebase to monitor changes to our session.

Next, we will create a hook that allows us to access our context.

```jsx
export const useSession = () => {
  const { user } = useContext(userContext)
  return user
}
```

Finally, let's create a hook that monitors the firebase authentication state. This hook will create state which uses a `useState` callback to determine whether a user session already exists. The callback is a useful way to initialize state with a value only upon the first mount of a componment.

Next, we use an `effect` which monitors authentication changes. When you trigger a login using one of the many firebase login methods (or you log out), the `onChange` function will be called with the current authentication state.

Finally, we return our authentication state.

```jsx{2-8,16}
export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
    }
  })

  function onChange(user) {
    setUser({ initializing: false, user })
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChange(onChange)

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}
```

We can then use this hook at the top level of our app and use our context provider to supply the user session to child components.

```jsx{2,9-11}
function App() {
  const { initializing, user } = useAuth()

  if (initializing) {
    return <div>Loading</div>
  }

  return (
    <userContext.Provider value={{ user }}>
      <UserProfile />
    </userContext.Provider>
  )
}
```

Finally, within child components we can use our `useSession` hook to gain access to our user session.

```jsx{2}
function UserProfile() {
  const { user } = useSession()
  return <div>Hello, {user.displayName}</div>
}
```

To actually sign in or sign out, you really don't need to use hooks at all. Simply call `firebase.auth().signOut()` or the various [sign in methods](https://firebase.google.com/docs/auth/) in your event handlers.

### Fetching a document

Hooks are useful for monitoring individual document queries using firestore. In this example, we want to fetch a recipe when provided an `id`. We'll want to provide our components with `error`, `loading`, and `recipe` state.

```jsx{3-5,12-24}
function useRecipe(id) {
  // initialize our default state
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [recipe, setRecipe] = React.useState(null)

  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(
    () => {
      const unsubscribe = firebase
        .firestore()
        .collection('recipes')
        .doc(id)
        .onSnapshot(
          doc => {
            setLoading(false)
            setRecipe(doc)
          },
          err => {
            setError(err)
          }
        )

      // returning the unsubscribe function will ensure that
      // we unsubscribe from document changes when our id
      // changes to a different value.
      return () => unsubscribe()
    },
    [id]
  )

  return {
    error,
    loading,
    recipe,
  }
}
```

### Fetching a collection

Fetching a collection is very similar, but we instead subscribe to a collection of documents.

```jsx{12-25}
function useIngredients(id) {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [ingredients, setIngredients] = React.useState([])

  useEffect(
    () => {
      const unsubscribe = firebase
        .firestore()
        .collection('recipes')
        .doc(id)
        .collection('ingredients')
        .onSnapshot(
          snapshot => {
            const ingredients = []
            snapshot.forEach(doc => {
              ingredients.push(doc)
            })

            setLoading(false)
            setIngredients(ingredients)
          },
          err => {
            setError(err)
          }
        )

      return () => unsubscribe()
    },
    [id]
  )

  return {
    error,
    loading,
    ingredients,
  }
}
```

If you plan to use hooks with firebase throughout your application, I recommend checking out
[react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks). It provides some useful helpers that allows us to reuse some of the logic that we wrote above.

For an example of a fully functioning app built with Firebase, React, and Typescript, check out [Julienne](https://github.com/bmcmahen/julienne).
