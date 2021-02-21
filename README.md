# Trello clone FP version

Demo (proof of concept ONLY): [link](https://compassionate-mcclintock-d9bf8e.netlify.app/)

For this experiment I wanted to leverage functional programming patterns to manage complex state from the bottom up.

Rather than reaching for the common reducer pattern, I aimed to move the logic for making updates into functions that compose as they are passed down the component tree. I think the resulting `composeDispatch` function (defined in `useBoard.js`) is much more elegant than a typical reducer function with a switch statement.

Each `Column` instance (defined in `useBoard.js`) carries its own methods for handling state updates, e.g. `changeName`, `addTodo`, etc. Each method closes over some existing props (e.g. `name`, `color`) and returns a new `Column` instance with those same props, plus one or more modified props passed as argument(s). Of course, the new `Column` instance carries the same methods, with new closures over the new props. _Each column instance carries methods for generating its own replacement as the result of some transformation._

`Column` instances are held in an array named `boardState` (defined in `useBoard.js`). In the `<BoardView />` component we map over `boardState` and return a `<ColumnView />` component for each `Column` instance in the `boardState` array.

Each `<ColumnView />` component receives the column transformation methods we just discussed, but naively calling these methods won't be enough to see changes in the UI. Since React is rendering `boardState`, it's expecting a call to `setBoardState` before it rerenders.

If we want our column transformation methods to produce changes in the UI, we need to compose those transformation methods with a call to `setBoardState`.

Line 46 from `useBoard.js`:

```
const composeDispatch = (columnIdx) => (updateFn, arity = 1) =>
  arity > 1
    ? (...args) => composeDispatch(columnIdx)(updateFn(...args), arity - 1)
    : (...args) => {
        setBoardState((prevState) =>
          prevState.map((column, i) =>
            i === columnIdx ? updateFn(...args) : column
          )
        )
      }
```

When mapping over the `boardState` in the `<BoardView />` component, we call `composeDispatch` with the column index. We get back a [partially applied](https://en.wikipedia.org/wiki/Partial_application) function with a closed-over reference to `setBoardState`. We pass this function down to each `<ColumnView />` as a prop called `composeAction`:

```
{boardState.map((column, i) => (
  <ColumnView
    key={column.name + i}
    composeAction={composeDispatch(i)}
    sendTodo={sendTodo(i)}
    getNeighbors={getNeighbors(i)}
    {...column}
  />
))}
```

At the `<ColumnView />` level, `composeAction` expects an `updateFn`. (The optional `arity` parameter tells `composeAction` how many arguments the `updateFn` needs. `editTodo`, for example, which takes an `idx` and then a `text`, has an arity of 2).

Remember that each `Column` instance carries methods for generating new state as the result of some transformation. When we pass one of these transformation methods to `composeAction`, we get back another partially applied function awaiting \[arity\] final argument(s). We can compose actions for each of our column transformation methods and pass them down the component tree. Like so:

```
const ColumnView = ({
  name,
  changeName,
  addTodo,
  composeAction
}) => (
  <div>
    <Title changeName={composeAction(changeName)}>{name}</Title>
    <AddTodo addTodo={composeAction(addTodo)} />
  </div>
)
```

This makes for a really clean interface for handling events at our lowest-level components. For example, the actual `<AddTodo />` component:

```
const AddTodo = ({ addTodo }) => {
  const handleClick = () => {
    const text = window.prompt(`New todo?`)
    text && addTodo(text)
  }
  return <Button onClick={handleClick}>Add todo</Button>
}
```

In order to initiate a change to the board state, all we have to do is "fully apply" the `addTodo` function by calling it with the sensible `text` argument. Via closure, `addTodo` has in scope everything needed to produce a new board state.

It has:

1. An identifier for the column component whose child initiated the update (`columnIdx`)
2. A column transformation method (`updateFn`)
3. Whatever argument(s) we want to pass to 2 (`...args`).

The update to the state of the board happens as follows (line 50 from `useBoard.js`):

```
setBoardState((prevState) =>
  prevState.map((column, i) =>
    i === columnIdx ? updateFn(...args) : column
  )
)
```

1. Map over the previous board state.
2. If column `i` initiated the state update (see item 1 in the immediately previous list), return the result of the closed-over column transformation method (item 2 above). This is a new `Column` instance.
3. Else, return the column in place.
