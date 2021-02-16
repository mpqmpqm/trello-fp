import React from "react"

import styled from "styled-components"

const Button = styled.button`
  background: none;
  border: none;
  color: darkgray;
  cursor: pointer;
  padding: 12px;
  font-size: 1em;
  font-style: italic;
`

const AddTodo = ({ updateColumn, addTodo }) => {
  const handleClick = () => {
    const text = window.prompt(`New todo?`)
    text && updateColumn(addTodo(text))
  }
  return <Button onClick={handleClick}>Add todo</Button>
}

export default AddTodo
