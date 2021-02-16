# Trello clone FP version

For this experiment I wanted to leverage functional programming patterns to manage complex state from the bottom up.

Rather than reaching for the common reducer pattern, I aimed to move the logic for making updates to the board into the column components. I think the resulting `updateColumn` function of `useBoard` is much cleaner than a typical reducer function with a switch statement.

While the state we display is in the end held at the board level, the instructions for making changes to that state are composed as the component tree is generated:

`boardState` (from `useBoard`) is an array of `Column` instances.

Each `Column` carries its own methods for returning a new `Column` instance reflecting an addition to or removal from its todo list. Each `<ColumnView />` React component receives these methods, as well as curried functions for updating the board state from `useBoard`, including `updateColumn`.

These latter curried functions are supplied with arguments as they travel down the component tree, and where we might ordinarily "dispatch an action" we instead call the completed function. All the information needed to make updates has been closed over in the process of generating the component tree.
