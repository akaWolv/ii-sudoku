import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import { StyledStartLevel } from 'components/StartLevel/StartLevel.styled'

const StartLevel: React.FC<any> = () => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey, getBoardCode, resetStopwatch } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))
  const { generateBoard, getReport } = useBoardGenerator(difficultyLevel)

  useEffect(() => {
    resetStopwatch()
    const generatedBoardCode = getBoardCode(generateBoard())
    setTimeout(() => {
      window.location.href = `/${difficultyLevel.key}/${generatedBoardCode}`
    }, 0)
  }, [])

  return <StyledStartLevel>
    <HourglassTopTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'><u>{difficultyLevelKey}</u> game is loading...</Typography>
  </StyledStartLevel>
}

export default StartLevel
