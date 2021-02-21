# Trello clone FP version

For this experiment I wanted to leverage functional programming patterns to manage complex state from the bottom up.

Rather than reaching for the common reducer pattern, I aimed to move the logic for making updates into functions that compose as they are passed down the component tree. I think the resulting `updateColumn` function (defined in `useBoard.js`) is much more elegant than a typical reducer function with a switch statement.

Each `Column` instance (defined in `useBoard.js`) carries its own methods for handling state updates, e.g. `changeName`, `addTodo`, etc. Each method closes over some existing props (e.g. `name`, `color`) and returns a new `Column` instance with those same props, plus one or more modified props passed as arguments. Of course, the new `Column` instance carries the same methods, with new closures over the new props. _Each column instance carries methods for generating its own replacement as the result of some transformation._

`Column` instances are held in an array named `boardState` (defined in `useBoard.js`). In the `<BoardView />` component we map over `boardState` and return a `<ColumnView />` component for each `Column` instance in the `boardState` array.

Each `<ColumnView />` component receives the column transformation methods we just discussed, but naively calling these methods won't be enough to see changes in the UI. React is rendering `boardState`, so it's expecting a call to `setBoardState` before it rerenders.

If we want our column transformation methods to produce changes in the UI, we need to compose those transformation methods with a call to `setBoardState`.

Line 46 from `useBoard.js`:

```
const updateColumn = (columnIdx) => (updateFn, arity = 1) =>
  arity > 1
    ? (...args) => updateColumn(columnIdx)(updateFn(...args), arity - 1)
    : (...args) => {
        setBoardState((prevState) =>
          prevState.map((column, i) =>
            i === columnIdx ? updateFn(...args) : column
          )
        )
      }
```

When mapping over the `boardState` in the `<BoardView />` component, we call `updateColumn` with the column index and pass the returned function down to each `<ColumnView />` as a prop with the same name. (See lines 25 and 35 of `BoardView.js`.)

At the `<ColumnView />` level, `updateColumn` expects an `updateFn` (assume `arity` = 1) and returns a new composition with a closed-over reference to `setBoardState`. We can pass one of our column transformation methods&mdash;for example `addTodo`&mdash;as the `updateFn` and get back a function awaiting its final argument(s). We then pass this function to a component that can initiate a change in the board state. Like so:

```
const ColumnView = ({
  name,
  changeName,
  addTodo,
  updateColumn
}) => (
  <div>
    <Title changeName={updateColumn(changeName)}>{name}</Title>
    <AddTodo addTodo={updateColumn(addTodo)} />
  </div>
)
```

Handling changes to the board state is then a simple matter of suppyling the function's final argument and evaluating it. Via closure, the function has in scope everything needed to produce a new board state.

It has:

1. An identifier for the column component whose child initiated the update (`columnIdx`)
2. A column transformation method (`updateFn`)
3. Whatever argument(s) we want to pass to 2 (`...args`).

The update to the state of the board happens as follows:

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
