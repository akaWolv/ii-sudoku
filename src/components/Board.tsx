import '../App.css'
import { Grid } from '@mui/material'
import Tile from './Tile'
import { DifficultyLevel, Field } from 'interfaces'
import styled from 'styled-components'
import React from 'react'
import WinnerBlend from 'components/WinnerBlend'

const StyledBoard = styled(Grid)`
  position: relative;
`

interface Board {
  fieldList: Field[]
  highlightedField: Field | undefined
  setHighlightedField: Function
  isGameFinished: boolean
  difficultyLevel: DifficultyLevel
  getStopwatch: Function
}

function Board(
  {
    fieldList,
    highlightedField,
    setHighlightedField,
    difficultyLevel,
    isGameFinished,
    getStopwatch
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
              />
            )
          }
        )
      }
      {isGameFinished && <WinnerBlend difficultyLevel={difficultyLevel} getStopwatch={getStopwatch} />}
    </StyledBoard>
  )
}

export default Board
