import React, { useEffect, useState } from 'react'
import '../App.css'
import { Grid } from '@mui/material'
import useBoardManager from '_hooks/useBoardManager'
import Controls from 'components/Controls'
import Board from 'components/Board'
import TopBar from 'components/TopBar'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import useBoardHelper from '_hooks/useBoardHelper'
import { Field } from 'interfaces'

const StyledGame = styled.div`
  padding: 1em;
`

function Game() {
  const [fieldList, setFieldList] = useState<Field[]|undefined>(undefined);
  const { difficultyLevelKey, gameKey } = useParams()

  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  const {
    getIsGenerated,
    getHighlightedField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldListFromKey,
    getStepsToGenerate
  } = useBoardManager(difficultyLevel)


  // const fieldList = getFieldListFromKey(gameKey)
  useEffect(() => {
    console.log('gameKey')
    // if (unparsedFieldList && unparsedFieldList.length === 81) {
    //   setFieldList(unparsedFieldList)
    // }
    setFieldList(getFieldListFromKey(gameKey) || undefined)
  }, [gameKey])

  if (!fieldList) {
    return <>game code is corrupted</>
  }

  return (
    <StyledGame>
      <TopBar
        getStepsToGenerate={getStepsToGenerate}
        difficultyLevel={difficultyLevel}
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
