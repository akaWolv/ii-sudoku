import React, { useEffect, useState } from 'react'
import logo from '../indieimp.svg'
import '../App.css'
import { Grid } from '@mui/material'
import Tile from './Tile'
import { Field } from 'interfaces'
import useBoardManager from '_hooks/useBoardManager'
import Group from 'constants/Group'
import Controls from 'components/Controls'
import Board from 'components/Board'

function Game() {
  const {
    getIsGenerated,
    getHighlightedField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldList,
    getStepsToGenerate
  } = useBoardManager()

  useEffect(() => {
  }, [])

  const fieldList = getFieldList()
  return (
    <div>
      {/*<header className="App-header">*/}
      {/*  Sudoku*/}
      {/*</header>*/}
      <span style={{ position: 'absolute', top: 5, left: 5 }}>steps: {getStepsToGenerate()}</span>
      <span style={{ position: 'absolute', top: 20, left: 5 }}>id: {getHighlightedField()?.id || 'none'}</span>
      {(!getIsGenerated()) ? 'Loading' : (
        <Board
          fieldList={fieldList}
          highlightedField={getHighlightedField()}
          setHighlightedField={setHighlightedField}
        />
      )}
      <Controls
        changeSelectedFieldValue={changeSelectedFieldValue}
        highlightedField={getHighlightedField()}
      />
    </div>
  )
}

export default Game
