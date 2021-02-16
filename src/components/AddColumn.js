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
  width: fit-content;
  margin: 0 auto;
}
`

const AddColumn = ({ addColumn }) => {
  const handleClick = () => {
    const name = window.prompt(`Column name?`)
    const color = window.prompt(`Valid HTML color?`)

    if (name) addColumn({ name, color })
  }
  return <Button onClick={handleClick}>Add column</Button>
}

export default AddColumn
