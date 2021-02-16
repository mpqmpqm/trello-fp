import React from "react"
import styled from "styled-components"

const Button = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: darkgray;
  margin: 0 6px;
  cursor: pointer;
`

const SendButton = ({ sendTodo, children }) => {
  return (
    <Button onClick={sendTodo} className="send-todo">
      {children}
    </Button>
  )
}

export default SendButton
