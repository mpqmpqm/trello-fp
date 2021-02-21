import React from "react"
import styled from "styled-components"
import { useBoard } from "../useBoard"
import AddColumn from "./AddColumn"
import ColumnView from "./ColumnView"

const BoardFlex = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: space-between;
`

const ColumnFlex = styled.div`
  display: flex;
  overflow: auto;
  flex-grow: 1;
  padding: 0 12px;
`

const BoardView = () => {
  const {
    boardState,
    addColumn,
    updateColumn,
    sendTodo,
    getNeighbors,
  } = useBoard()
  return (
    <BoardFlex className="board">
      <ColumnFlex>
        {boardState.map((column, i) => (
          <ColumnView
            key={column.name + i}
            updateColumn={updateColumn(i)}
            sendTodo={sendTodo(i)}
            getNeighbors={getNeighbors(i)}
            {...column}
          />
        ))}
      </ColumnFlex>
      <AddColumn {...{ addColumn }} />
    </BoardFlex>
  )
}

export default BoardView
