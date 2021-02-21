import React from "react"

import styled from "styled-components"

const Button = styled.button`
  border: none;
  color: darkgray;
  cursor: pointer;
  padding: 12px;
  font-size: 0.95em;
  font-style: italic;
  appearance: none;
  background-color: var(--board-background);
  margin-top: 6px;
`

const AddTodo = ({ addTodo }) => {
  const handleClick = () => {
    const text = window.prompt(`New todo?`)
    text && addTodo(text)
  }
  return <Button onClick={handleClick}>Add todo</Button>
}

export default AddTodo
