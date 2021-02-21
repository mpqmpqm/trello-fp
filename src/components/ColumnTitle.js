import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"

const Title = styled.div.attrs(({ color }) => ({
  style: {
    color,
    borderBottom: `2px solid ${color}`,
  },
}))`
  // background-color: lightgray;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`

const H2 = styled.h2`
  flex-grow: 1;
`

const ColumnTitle = ({ name, color, changeName, changeColor }) => {
  const [editingName, setEditingName] = useState(false)

  const closeName = () => setEditingName(false)

  return (
    <Title {...{ color }}>
      {editingName ? (
        <EditName {...{ name, changeName, closeName }} />
      ) : (
        <H2 onClick={() => setEditingName(true)}>{name}</H2>
      )}
      <EditColor {...{ color, changeColor }} />
    </Title>
  )
}

const EditName = ({ name, changeName, closeName }) => {
  const [inputVal, setInputVal] = useState(name)
  const input = useRef()

  useEffect(() => {
    input.current.select()
  }, [])

  const saveEdit = (e) => {
    e.preventDefault()
    changeName(inputVal)
    closeName()
  }

  return (
    <form onSubmit={saveEdit}>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onBlur={saveEdit}
        ref={input}
      ></input>
    </form>
  )
}

const ColorCircle = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: color,
  },
}))`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  border-color: transparent;
`

const EditColor = ({ color, changeColor }) => {
  const [inputVal, setInputVal] = useState(color)
  const input = useRef()

  const saveEdit = (e) => {
    e.preventDefault()
    changeColor(inputVal)
  }

  return (
    <ColorCircle {...{ color }}>
      <input
        value={inputVal}
        onChange={(e) => {
          changeColor(e.target.value)
          setInputVal(e.target.value)
        }}
        onBlur={saveEdit}
        ref={input}
        type="color"
        style={{
          width: `100%`,
          height: `100%`,
          display: `block`,
          opacity: 0,
          cursor: `pointer`,
        }}
      />
    </ColorCircle>
  )
}

export default ColumnTitle
