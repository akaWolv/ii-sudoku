import React, { useEffect, useState } from 'react'
import '../App.css'
import { Grid } from '@mui/material'
import useBoardManager from '_hooks/useBoardManager'
import Controls from 'components/Controls'
import Board from 'components/Board'
import styled from 'styled-components'

const StyledGame = styled.div`
  padding: 1em;
`

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
    <StyledGame>
      {/*<header className="App-header">*/}
      {/*  Sudoku*/}
      {/*</header>*/}
      <span style={{ position: 'absolute', top: 5, left: 5 }}>steps: {getStepsToGenerate()}</span>
      <span style={{ position: 'absolute', top: 20, left: 5 }}>id: {getHighlightedField()?.id || 'none'}</span>
      <Grid
        container
        spacing={0}
        direction={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={5} lg={4}>
          {(!getIsGenerated()) ? 'Loading' : (
            <Board
              fieldList={fieldList}
              highlightedField={getHighlightedField()}
              setHighlightedField={setHighlightedField}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <Controls
            changeSelectedFieldValue={changeSelectedFieldValue}
            highlightedField={getHighlightedField()}
          />
        </Grid>
      </Grid>
    </StyledGame>
  )
}

export default Game
