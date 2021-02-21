import React, { useState } from "react"
import styled from "styled-components"
import EditTodoView from "./EditTodoView"
import SendButton from "./SendButton"

const LI = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
`

const TodoView = ({ text, editTodo, sendTodo, left, right }) => {
  const [editing, setEditing] = useState(false)

  const handleClick = () => {
    setEditing(true)
  }

  const close = () => setEditing(false)

  return (
    <LI>
      {typeof left === `number` && (
        <SendButton sendTodo={sendTodo(text, left)}>&larr;</SendButton>
      )}
      {editing ? (
        <EditTodoView {...{ text, editTodo, close }} />
      ) : (
        <p onClick={handleClick}>{text}</p>
      )}
      {typeof right === `number` && (
        <SendButton sendTodo={sendTodo(text, right)}>&rarr;</SendButton>
      )}
    </LI>
  )
}

export default TodoView
