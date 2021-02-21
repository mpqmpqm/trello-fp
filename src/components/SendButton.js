import React from "react"
import styled from "styled-components"

const Button = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding-bottom: 3px;
`

const SendButton = ({ sendTodo, children }) => (
  <Button onClick={sendTodo} className="send-todo">
    {children}
  </Button>
)

export default SendButton
