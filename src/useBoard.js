import { useState } from "react"

const Column = ({
  name,
  color = `#666666`,
  todos = [`${name} 1`, `${name} 2`],
}) => ({
  name,
  color,
  todos,
  changeName: (name) => Column({ name, color, todos }),
  changeColor: (color) => Column({ name, color, todos }),
  addTodo: (text) => Column({ name, color, todos: [...todos, text] }),
  editTodo: (idx) => (text) =>
    Column({
      name,
      color,
      todos: todos.map((todo, i) => (i === idx ? text : todo)),
    }),
  removeTodo: (idx) =>
    Column({ name, color, todos: todos.filter((_, i) => i !== idx) }),
})

const defaultBoardState = [
  { name: `MPQ` },
  { name: `Alice`, color: `#d57676` },
  { name: `Sam`, color: `#88c729` },
].map(Column)

export const useBoard = (initialState) => {
  const [boardState, setBoardState] = useState(
    initialState || defaultBoardState
  )

  const addColumn = ({ name, color }) => {
    setBoardState([...boardState, Column({ name, color, todos: [] })])
  }

  /*
    updateColumn(0)(edit, 3) =>   
      (...args) => updateColumn(0)(edit(...args), 2) => 
        (...args) => updateColumn(0)(edit(...args), 1) => 
          (...args) => setBoardState...
   */

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

  const getNeighbors = (columnIdx) => () => {
    const first = columnIdx === 0
    const last = columnIdx === boardState.length - 1
    const only = first && last

    return only
      ? { left: null, right: null }
      : {
          left: first ? null : columnIdx - 1,
          right: last ? null : columnIdx + 1,
        }
  }

  const sendTodo = (originColumnIdx) => (removalTodoIdx) => (
    text,
    targetColumnIdx
  ) => () => {
    const { removeTodo } = boardState[originColumnIdx]
    const { addTodo } = boardState[targetColumnIdx]

    updateColumn(originColumnIdx)(removeTodo)(removalTodoIdx)
    updateColumn(targetColumnIdx)(addTodo)(text)
  }

  return { boardState, addColumn, updateColumn, sendTodo, getNeighbors }
}
