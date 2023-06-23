import 'App.css'
import Tile from 'components/Tile'
import { DifficultyLevel, Field } from 'interfaces'
import React from 'react'
import WinnerBlend from 'components/WinnerBlend'
import { StyledBoard } from './Board.styled'

interface Board {
  fieldList: Field[]
  highlightedField: Field | undefined
  setHighlightedField: Function
  isGameFinished: boolean
  difficultyLevel: DifficultyLevel
}

function Board(
  {
    fieldList,
    highlightedField,
    setHighlightedField,
    difficultyLevel,
    isGameFinished
  }: Board
) {
  return (
    <StyledBoard container spacing={0} columns={9}>
      {
        fieldList.map(field => {
            const { id } = field
            return (
              <Tile
                key={id}
                field={field}
                highlightedField={highlightedField}
                handlePick={setHighlightedField}
                difficultyLevel={difficultyLevel}
              />
            )
          }
        )
      }
      {isGameFinished && <WinnerBlend difficultyLevel={difficultyLevel} isGameFinished={isGameFinished} />}
    </StyledBoard>
  )
}

export default Board
