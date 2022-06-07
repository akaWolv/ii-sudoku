import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBoardHelper from '_hooks/useBoardHelper'
import { Typography } from '@mui/material'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';

import { StyledStart } from 'components/Start/Start.styled'

const Start: React.FC<any> = () => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  useEffect(() => {
      window.location.href = `/${difficultyLevel.key}`
  }, [])

  return <StyledStart>
    <HourglassTopTwoToneIcon sx={{ fontSize: 120 }} />
    <Typography variant='h4'>game is loading...</Typography>
  </StyledStart>
}

export default Start
