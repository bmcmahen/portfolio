---
title: Mastering React Component Composition using Children
date: '2019-01-26T07:42:49.791Z'
---

When I first started developing with React I had a superficial understanding of composition and the power of the React component model, but I often ended up running into the same problem again and again — the pain of having to pass state down through each branch of my component tree in an effort to implement some particular UI pattern. I bet you’ve experienced the same. To illustrate the problem, consider how I pass the friends prop through the component tree in the code below.

```javascript
const UserProfile = ({ friends, displayName }) => (
  <div>
    <h1>{displayName}</h1>
    <UserFriends friends={friends} />
  </div>
)

const UserFriends = ({ friends }) => (
  <div>
    <h2>Friends</h2>
    {friends.map(friend => (
      <Friend friend={friend} key={friend.id} />
    ))}
  </div>
)

const Friend = ({ friend }) => (
  <div>
    <img src={profile.image} />
    <div>{friend.name}</div>
  </div>
)
```

This is a small example that demonstrates this particular component pattern, but you can imagine the component tree having even more branches with state needing to be passed all of the way down. The pattern works, but you end up frustrated because of all the unnecessary boilerplate. You might even mix up the names of the props. And so, inevitably, you look towards using something like React Context, or more likely, a tool like Redux to handle universal subscriptions. There’s certainly a place for these tools, but we tend to reach for them far too early and often.

You can often avoid the deeply nested component hierarchy by taking full advantage of React children. Consider a simple rewrite of the above components, paying particular attention to how we render our friend’s list.

```javascript
const UserProfile = ({ friends, displayName }) => (
  <div>
    <h1>{displayName}</h1>
    <ProfileSection label="Friends">
      {friends.map(friend => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ProfileSection>
  </div>
)

const ProfileSection = ({ label, children }) => (
  <div>
    <h2>{label}</h2>
    {children}
  </div>
)

const Friend = ({ friend }) => (
  <div>
    <img src={profile.image} />
    <div>{friend.name}</div>
  </div>
)
```

This is a relatively simple change, but it gets the point across. We are taking advantage of children to generalize our ProfileSection component and we avoid having to pass our friends array down through multiple components. The benefit may seem limited in this case, but the primary advantage is that we start building more flexible, reusable components. Let’s take the example further and suppose we want to enable the user to delete an existing friendship in their list.

```javascript
const Friend = ({ friend, children }) => (
  <div>
    <img src={profile.image} />
    <div>{friend.name}</div>
    {children}
  </div>
)

const UserProfile = ({ friends, displayName, isUser }) => (
  <div>
    <h1>{displayName}</h1>
    <ProfileSection label="Friends">
      {friends.map(friend => (
        <Friend friend={friend} key={friend.id}>
          {isUser && (
            <Button onClick={editFriendship}>Unfriend {friend.name}</Button>
          )}
        </Friend>
      ))}
    </ProfileSection>
  </div>
)
```

The real power of this pattern starts to emerge in this context. Not only do we avoid the headache of passing even more props down the component tree (notably, the isUser prop), but more importantly, we are creating flexible, reusable components. If you find that your UserProfile component is getting too complex, you can still choose to encapsulate this particular UI pattern in its own component, but you still maintain benefit of being able to assemble other components out of its children.
