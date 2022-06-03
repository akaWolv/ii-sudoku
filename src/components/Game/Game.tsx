import React, { useEffect } from 'react'
import '../../App.css'
import { Grid } from '@mui/material'
import useBoardManager from '_hooks/useBoardManager'
import Controls from 'components/Controls'
import Board from 'components/Board'
import TopBar from 'components/TopBar'
import { useParams } from 'react-router-dom'

import useBoardHelper from '_hooks/useBoardHelper'
import { StyledGame } from 'components/Game/Game.styled'

function Game() {
  const { difficultyLevelKey, gameKey } = useParams()

  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  const {
    getIsGenerated,
    getHighlightedField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldListFromKey,
    isGameFinished,
    getFieldList,
    getStopwatch
  } = useBoardManager(difficultyLevel)

  useEffect(() => {
    getFieldListFromKey(gameKey)
  }, [gameKey])

  if (!getFieldList()) {
    return <>game code is corrupted</>
  }

  return (
    <StyledGame>
      <TopBar
        difficultyLevel={difficultyLevel}
        getStopwatch={getStopwatch}
      />
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
              fieldList={getFieldList()}
              highlightedField={getHighlightedField()}
              setHighlightedField={setHighlightedField}
              isGameFinished={isGameFinished()}
              difficultyLevel={difficultyLevel}
              getStopwatch={getStopwatch}
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
