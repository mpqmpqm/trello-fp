import React from "react"
import styled from "styled-components"
import TodoListView from "./TodoListView"
import AddTodo from "./AddTodo"

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  background-color: white;
  flex-basis: 25%;
  flex-shrink: 0;
  height: fit-content;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  box-shadow: 0px 0px 12px -8px black;
  margin-top: 12px;
  max-height: 80vh;
  overflow: auto;
`

const H2 = styled.h2`
  background-color: lightgray;
  background-color: ${({ color }) => color};
  padding: 4px 12px;
  text-align: center;
`

const ColumnView = ({
  name,
  color,
  todos,
  addTodo,
  editTodo,
  updateColumn,
  sendTodo,
  getNeighbors,
}) => {
  return (
    <Div>
      <H2 {...{ color }}>{name}</H2>
      {todos.length ? (
        <TodoListView
          {...{
            todos,
            editTodo,
            updateColumn,
            sendTodo,
            neighbors: getNeighbors(),
          }}
        />
      ) : null}
      <AddTodo {...{ addTodo, updateColumn }} />
    </Div>
  )
}

export default ColumnView
