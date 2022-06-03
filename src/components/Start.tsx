import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBoardHelper from '_hooks/useBoardHelper'
import { Typography } from '@mui/material'
import styled from 'styled-components'
import HourglassEmptyTwoToneIcon from '@mui/icons-material/HourglassEmptyTwoTone';

const StyledStart = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Start: React.FC<any> = (props) => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  useEffect(() => {
      window.location.href = `/${difficultyLevel.key}`
  }, [])

  return <StyledStart>
    <HourglassEmptyTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'>game is loading...</Typography>
  </StyledStart>
}

export default Start
