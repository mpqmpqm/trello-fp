import React from "react"
import styled from "styled-components"
import SendButton from "./SendButton"

const LI = styled.li`
  list-style-type: none;
  display: flex;
  background-color: white;
  align-items: center;
`

const TodoView = ({ text, editTodo, updateColumn, sendTodo, neighbors }) => {
  const handleClick = () => {
    const newText = window.prompt(`new text?`)
    if (newText) updateColumn(editTodo(newText))
    else updateColumn(editTodo(text))
  }

  const { left, right } = neighbors
  return (
    <LI>
      {typeof left === `number` && (
        <SendButton sendTodo={sendTodo(text, left)}>&larr;</SendButton>
      )}
      <p onClick={handleClick}>{text}</p>
      {typeof right === `number` && (
        <SendButton sendTodo={sendTodo(text, right)}>&rarr;</SendButton>
      )}
    </LI>
  )
}

export default TodoView
