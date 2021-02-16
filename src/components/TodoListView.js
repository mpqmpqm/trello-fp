import React from "react"
import styled from "styled-components"
import TodoView from "./TodoView"

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px;
`

const TodoListView = ({
  todos,
  sendTodo,
  editTodo,
  neighbors,
  updateColumn,
}) => (
  <UL>
    {todos.map((text, i) => (
      <TodoView
        key={text + i}
        idx={i}
        {...{ text, neighbors, updateColumn }}
        sendTodo={sendTodo(i)}
        editTodo={editTodo(i)}
      />
    ))}
  </UL>
)

export default TodoListView
