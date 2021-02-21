import React from "react"
import styled from "styled-components"
import TodoListView from "./TodoListView"
import AddTodo from "./AddTodo"
import ColumnTitle from "./ColumnTitle"

const Div = styled.div.attrs(({ color }) => ({
  style: {
    color,
    outlineColor: color,
    borderTop: `2px solid ${color}`,
    borderLeft: `2px solid ${color}`,
    borderRight: `2px solid ${color}`,
    borderBottom: `none`,
  },
}))`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  flex-basis: 22%;
  flex-shrink: 0;
  height: fit-content;
  border-left: 1px solid lightseagreen;
  border-right: 1px solid lightseagreen;
  box-shadow: 0px 0px 12px -10px darkslategray;
  margin-top: 12px;
  max-height: 80vh;
  overflow: auto;
  border-radius: 12px 12px 0 0;
`

const ColumnView = ({
  name,
  color,
  todos,
  changeName,
  changeColor,
  addTodo,
  editTodo,
  updateColumn,
  sendTodo,
  getNeighbors,
}) => (
  <Div {...{ color }}>
    <ColumnTitle
      {...{ name, color }}
      changeName={updateColumn(changeName)}
      changeColor={updateColumn(changeColor)}
    />
    {todos.length ? (
      <TodoListView
        {...{
          todos,
          sendTodo,
          getNeighbors,
        }}
        editTodo={updateColumn(editTodo, 2)}
      />
    ) : null}
    <AddTodo addTodo={updateColumn(addTodo)} />
  </Div>
)

export default ColumnView
