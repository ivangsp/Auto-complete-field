# Part 2

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Pure component is more less the same as ordinary component except Pure component does a shallow comparison of the props and only re-renders the component when the props have changed.
Because it does  a shallow comparison, pure component re-renders if you pass an object as a prop regardless of whether the props have changed or not.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Let's assume that you have a component that takes `a` as a prop and you implement `ShouldComponentUpdate` based on the prop `a` , in the future if you pass additional props in the component and you forget to update `ShouldComponentUpdate` the component will not re-render even when the additional props will have changed.

## 3. Describe 3 ways to pass information from a component to its PARENT.

- Passing a a callback function which accepts arguments as a prop to the child component. When the function is called the data is passed from the child component to the parent component.

- Using state manager like Redux. We can dispatch an action that updates the state from the child component, the parent component can listen to changes in the state.

- Using React Context, we can have a centralised state where each component can update and access the information with the state. We can update the context state in the child component and the state value can be easily accessed in the parent component.

## 4. Give 2 ways to prevent components from re-rendering.

- Memoizing the component props using `React.memo`.

- Using memoized selectors when accessing the data from the state like redux.

- Using `useRef` rather than `useState`.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Because each React component returns a single node, we use Fragment to group together multiple  components without the need to adding extra HTML. I couldn't think of an example where it could break the app.


## 6. Give 3 examples of the HOC pattern.
HOC is a component that takes another component as an argument and return an enhanced component. We mostly use HOC if there is a logic that is shared across multiple components for example if we have some components that require a loader, we can create a HOC called `withLoader` that can be used on all the components that load data on initial render.

I don't know about the different patterns but I can give an example of HOC

```jsx
    export default function withLoader(Component, url){
        return (props) => {
            const [data, setData] = useState(null);
            const [isLoading, setIsLoading] = useState(true);

            useEffect((){
                // fetch the data using the passed url
                const loadData = async () => {
                    const resp = await fetch(url);
                    setData(resp);
                    setIsLoading(false);
                }   
                
            }, []);

            if(isLoading) {
                return <Loader />;
            }
            return <Component data={data} {...props} />;
        }
    }

```

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

### Handling exceptions in Promise

We can use `try catch` block  or the `catch` callback function to handle exception.
```js
    function A(num){
        return new Promise((resolve, reject) => {
            if(num === 1){
                reject();
            }  else {
                resolve(num);
            }
        })
    }

    async function B() {
        try {
            await A(1);
        }
        catch(e){
            console.log('error', e);
        }
    }

    // alternatively
    function B() {
        A(1)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    }
```

### Handling exceptions in async

Async return a promise therefore We can use `try catch` to handle exceptions  as shown above.

### Handling exceptions in callbacks

We can pass the error as argment to the callback functions

```js
    function A(num, callback){
        setTimeout(() => {
            if(num === 0 ){
                callback(null, new Error())
            }
            callback(num);
        }, 100)
    }

    A(0, (error) => {
        console.log(error);
    })
 ```


## 8. How many arguments does setState take and why is it async.

`setState` takes one argument, which can either be the new state value or a callback function.`setState` is async because it causes the component to re-render and this is an expensive operation that can cause the browser to be unresponsive.


## 9. List the steps needed to migrate a Class to Function Component.

- Replace key word `class` with `function`.

- Replace `extends React.Component` with the class name and the props as the argument for example `App(props)` .

- Replace `this.state` with `setState`

- Remove `this` from every where its used.

- Remove `constructor`

- Remove `render()` function.


## 10. List a few ways styles can be used with components.

- Importing a style file inside a component. The component should have corresponding classes used in the style file

- Inline style using the `style` property.

- Using css modules

- using libraries such as emotion or styled components


### 11. How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML`  attribute


