---
title: A Beginner's Guide to Understanding Generics in Typescript
date: '2019-07-12T18:36:24.131Z'
spoiler: What are generics and how do you use them?
---

Can't quite wrap your head around generics in typescript? The best way to explain generics, in my opinion, is by analogy.

Consider a courier service like UPS or Puralator that delivers packages around the world. The courier service doesn't need to know the exact nature of the parcel - they don't need to know if it's a toy, book, clothing item, etc., - but the expectation is that the recipient will receive that which was sent. If a toy is sent, a toy will be received. The courier is in charge of delivering that package, but doesn't need to know the exact type of content that it's deliverying.

In this analogy, the courier service is our function and the package is our generic. Let's try to clarify this analogy with some code. This example (which doesn't use generics) shows a courier function which receives a string as an argument, and returns a string. Our return value `delivery` is correctly typed as a string.

```ts
function courier(package: string): string {
  return package
}

// delivery is typed as a string
const delivery = courier('book')

console.log(delivery)
```

But presumably we want our courier function to be able to handle more than just strings. We should be able to handle numbers, objects, or anything...

We might be tempted to achieve this using the `any` type.

```ts
function courier(package: any): any {
  return package
}

// delivery is typed as any
const delivery = courier('book')

console.log(delivery)
```

This works, but now our `delivery` value is typed as `any`. But shouldn't the caller of the function - the person sending the package - know the type of the package returned? In other words, wouldn't it be nice if our `delivery` value retained whatever type the `package` was initially assigned? If our `package` is a string, our `delivery` should be a string. If it's a number, our `delivery` should be a number... and so on.

This is where generics come in. Let's write the same function using generics:

```ts
function courier<T>(package: T): T {
  return package
}

// delivery is typed as string
const delivery = courier('book')

// lucknumber is typed as number
const luckynumber = courier(7)
```

`T` is a `type variable`. You don't need to use `T`, but it's standard practice. Basically, this syntax reads as: "Courier accepts a generic type, represented as `T`. This generic type is defined by our `package` argument, and our courier function returns a value of the same type."

Maybe our `courier` should be able to accept multiple packages at once.

```ts
function courier<T>(package: T[]): T[] {
  return package
}

// typed as [string, number]
const delivery = courier(['book', 7])
```

And there you have it. Our courier function now accepts an arbitrarily long array of packages, and correctly types that array in the return value.

This is just the start, but hopefully you see how generics are particularly useful for creating reusable, flexible functions and classes.
