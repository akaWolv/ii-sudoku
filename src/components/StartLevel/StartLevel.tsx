import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { StyledStartLevel } from 'components/StartLevel/StartLevel.styled'
import useStopwatchManager from '_hooks/useStopwatchManager'

const StartLevel: React.FC<any> = () => {
  const navigate = useNavigate()
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey, getBoardCode } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))
  const { generateBoard } = useBoardGenerator(difficultyLevel)
  const { resetTimer } = useStopwatchManager()

  useEffect(() => {
    resetTimer(0)
    const generatedBoardCode = getBoardCode(generateBoard())
    navigate(`/${difficultyLevel.key}/${generatedBoardCode}`, { replace: true })
  }, [])

  return <StyledStartLevel>
    <HourglassBottomTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'><u>{difficultyLevelKey}</u> game is loading...</Typography>
  </StyledStartLevel>
}

export default StartLevel
