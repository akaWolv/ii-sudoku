import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { StyledStartLevel } from 'components/StartLevel/StartLevel.styled'
import useStopwatchManager from '_hooks/useStopwatchManager'

const StartLevel: React.FC<any> = () => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey, getBoardCode } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))
  const { generateBoard } = useBoardGenerator(difficultyLevel)
  const { restartTimer } = useStopwatchManager()

  useEffect(() => {
    restartTimer()

    const generatedBoardCode = getBoardCode(generateBoard())
    setTimeout(() => {
      window.location.href = `/${difficultyLevel.key}/${generatedBoardCode}`
    }, 0)
  }, [])

  return <StyledStartLevel>
    <HourglassBottomTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'><u>{difficultyLevelKey}</u> game is loading...</Typography>
  </StyledStartLevel>
}

export default StartLevel
