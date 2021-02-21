import React from "react"
import styled from "styled-components"
import TodoView from "./TodoView"

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  background-color: white;
`

const TodoListView = ({
  todos,
  sendTodo,
  editTodo,
  updateColumn,
  getNeighbors,
}) => (
  <UL>
    {todos.map((text, i) => (
      <TodoView
        key={text + i}
        {...{ text, updateColumn }}
        {...getNeighbors()}
        sendTodo={sendTodo(i)}
        editTodo={editTodo(i)}
      />
    ))}
  </UL>
)

export default TodoListView
