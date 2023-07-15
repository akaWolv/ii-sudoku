import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../App.css'
import { Grid } from '@mui/material'
import useBoardManager from '_hooks/useBoardManager'
import Controls from 'components/Controls'
import Board from 'components/Board'
import TopBar from 'components/TopBar'
import { StyledGame } from 'components/Game/Game.styled'
import useBoardHelper from '_hooks/useBoardHelper'

function  Game() {
  const { difficultyLevelKey, gameKey } = useParams()

  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  const {
    getIsGenerated,
    getHighlightedField,
    getForbiddenValuesForField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldListFromKey,
    isGameFinished,
    getFieldList,
    isHintingEnabled
  } = useBoardManager(difficultyLevel)

  useEffect(() => {
    getFieldListFromKey(gameKey)
  }, [gameKey])

  if (!getFieldList()) {
    return <>game code is corrupted</>
  }

  const getForbiddenValuesForFieldIfPossible = (): number[] => {
    const field = getHighlightedField()
    return field ? getForbiddenValuesForField(field) : []
  }

  return (
    <StyledGame>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={10} md={7} lg={6}>
          <TopBar
            difficultyLevel={difficultyLevel}
          />
        </Grid>
        <Grid item xs={11} sm={7} md={3} lg={3} />
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ padding: 0 }}
      >
        <Grid
          item
          xs={12} sm={12} md={7} lg={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          style={{ width: '100%' }}>
          <div style={{ maxHeight: '95%', maxWidth: "85%", aspectRatio: "1 / 1" }}>
            {(!getIsGenerated()) ? 'Loading' : (
              <Board
                fieldList={getFieldList()}
                highlightedField={getHighlightedField()}
                setHighlightedField={setHighlightedField}
                isGameFinished={isGameFinished()}
                difficultyLevel={difficultyLevel}
              />
            )}
          </div>
        </Grid>
        <Grid
          item
          xs={11} sm={7} md={3} lg={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Controls
            changeSelectedFieldValue={changeSelectedFieldValue}
            highlightedField={getHighlightedField()}
            forbiddenValuesForField={getForbiddenValuesForFieldIfPossible()}
            isHintingEnabled={isHintingEnabled}
          />
        </Grid>
      </Grid>
    </StyledGame>
  )
}

export default Game
