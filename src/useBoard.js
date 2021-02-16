import { useState } from "react"

const Column = ({
  name,
  color = `lightgray`,
  todos = [`${name} 1`, `${name} 2`],
}) => ({
  name,
  color,
  todos,
  addTodo: (text) => () => Column({ name, color, todos: [...todos, text] }),
  editTodo: (idx) => (text) => () =>
    Column({
      name,
      color,
      todos: todos.map((todo, i) => (i === idx ? text : todo)),
    }),
  removeTodo: (idx) => () =>
    Column({ name, color, todos: todos.filter((_, i) => i !== idx) }),
})

const defaultBoardState = [
  { name: `MPQ` },
  { name: `Alice`, color: `lightpink` },
  { name: `Sam`, color: `aliceblue` },
].map(Column)

export const useBoard = (initialState) => {
  const [boardState, setBoardState] = useState(
    initialState || defaultBoardState
  )

  const addColumn = ({ name, color }) => {
    setBoardState([...boardState, Column({ name, color, todos: [] })])
  }

  const updateColumn = (idx) => (updateFn) => {
    setBoardState((prevState) =>
      prevState.map((column, i) => (i === idx ? updateFn() : column))
    )
  }

  const getNeighbors = (idx) => () => {
    const first = idx === 0
    const last = idx === boardState.length - 1
    const only = first && last

    const neighbors = {
      left: null,
      right: null,
    }

    if (only) return neighbors

    if (!first) neighbors.left = idx - 1
    if (!last) neighbors.right = idx + 1

    return neighbors
  }

  const sendTodo = (originIdx) => (removalIdx) => (text, targetIdx) => () => {
    const { removeTodo } = boardState[originIdx]
    const { addTodo } = boardState[targetIdx]

    updateColumn(originIdx)(removeTodo(removalIdx))
    updateColumn(targetIdx)(addTodo(text))
  }

  return { boardState, addColumn, updateColumn, sendTodo, getNeighbors }
}
