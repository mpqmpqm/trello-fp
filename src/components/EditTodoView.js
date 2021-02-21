import React, { useEffect, useRef, useState } from "react"

const EditInput = ({ text, editTodo, close }) => {
  const [inputVal, setInputVal] = useState(text)
  const input = useRef()

  useEffect(() => {
    input.current.select()
  }, [])

  const saveEdit = (e) => {
    e.preventDefault()
    close()
    editTodo(inputVal)
  }

  return (
    <form onSubmit={saveEdit}>
      <input
        value={inputVal}
        onBlur={saveEdit}
        onChange={(e) => {
          setInputVal(e.target.value)
        }}
        ref={input}
      ></input>
    </form>
  )
}

export default EditInput
