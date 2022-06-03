import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';

const StyledStartLevel = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StartLevel: React.FC<any> = (props) => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey, getBoardCode, resetStopwatch } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))
  const { generateBoard, getReport } = useBoardGenerator(difficultyLevel)

  useEffect(() => {
    resetStopwatch()
    const generatedBoardCode = getBoardCode(generateBoard())
    window.location.href = `/${difficultyLevel.key}/${generatedBoardCode}`
  }, [])

  return <StyledStartLevel>
    <HourglassTopTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'><u>{difficultyLevelKey}</u> game is loading...</Typography>
  </StyledStartLevel>
}

export default StartLevel
