---
path: /blog/react-class-vs-functional-components
date: "2019-03-02"
title: When should you use Class vs Function Components in React.js?
category: blog
thumbnail: "./thumbnail.jpg"
tags: ["React.js", “Interview Prep"]
---

##### Update: with state hooks, a lot of this is now no longer relevant as you can use track state using hooks in a function component. [React docs](https://reactjs.org/docs/hooks-state.html)

> As I start to prepare to interview for a “_real_” developer job, I've quickly come to realize that I'm woefully unprepared for the technical coding questions. So this is my attempt to formalize my thoughts, and hopefully come up with succinct answers to these ((allegedly)) commonly asked questions.

### Using the right component for the job
Components are the basic building blocks of React. A quick skim through the [documentation](https://reactjs.org/docs/getting-started.html) shows that there are two types, Function Components and Class Components. Their purpose is to return a single React element, and they do so in different ways. Sometimes, you should use Class Components, and while other times Function Components are better for the job. 

Here, we will go through what each of them does, and when you should use them so let's jump in.

### Function Components are the rank and file
Function Components are the simpler of the two. Here is the canonical example from the documentation:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```
As you can see, a Function Component is literally a JavaScript function. It takes some props as an argument, and using JSX, is able to parse JavaScript expressions - it this example, {props.name}.

Think of it as the plain-vanilla component. It is easy to understand and is a staple of React projects. 

### Class Components have special abilities
Class Components, on the other hand, have more functionality it inherits from React's Component class. Before we get there, here's the same example written using a Class Component:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Right off the bat, there is a bit more boilerplate code that makes things slightly more verbose. And this is just a simple presentational component. But let's have a look at what you gain.

#### Local State to keep track of things
Props allow parent components to pass data down to a child. However, if a child component tries to change its props, all sorts of bad things happen. React was just not designed that way. Here is where state comes into play.

Say you have a button in a child component and want to keep a count of how many times that button is clicked. This is a great use case for a counter in the state. Here is how it would be written:

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(state => ({
      count: state.count + 1
    }));
  }
  
  render() {
  return (
    <div>
      <h2>{this.state.count}</h2>
      <button onClick={handleClick}>
        click
      </button>
    </div>
  )
}
```
To explain, we first set up 'count' to be tracked in the state. We also created a click handler that calls [setState](https://reactjs.org/docs/state-and-lifecycle.html) to increment the count and update the state. In the render method, we set the button to call the click handler.

The great thing about updating the state is that React rerenders just the parts that need to be updated and not the entire page, making it almost instantaneous.

#### Lifecycle methods
Like living things, React components too, go through a lifecycle. From the time it gets created to when it gets mounted to the DOM to when it gets unmounted and later destoryed. Class Components lets us access these methods that get called at each phase of the lifecycle. What they are and how to use them is a story for another time. But suffice to say, this lets our React app perform a variety of tasks at the right time.

You've already seen one in the earlier example. The constructor method is called right when the component is created. We used this to initialize a count as part of the component's state.

### So when should I use Function Components vs Class ones? Why not just use all Class, all the time?
Class Components can perform everything a Function Component can, and have access to a lot more features. So a question then seems to come up is why not just use Class Components? Consistency in itself has a value.

It boils down to a couple of things. Function Components are easier to read and understand. It signals to anyone coming back to maintain the code that it is stateless. Having no state or lifecycle methods mean that a Function Component lends itself well to be reusable. 

### The succinct answer
Class Components have access to features like state and lifecycle methods that Function Components do not. If you need any of those, Class Components are the way to go, otherwise, stick with Function Components and convert them later if the need arises. 