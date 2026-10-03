import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { DifficultyLevel } from 'interfaces'
import { StyledButton, StyledWinnerBlend, StyledTime, StyledEmoji, StyledCongrats } from 'components/WinnerBlend/WinnerBlend.styled'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import type { RootState } from 'stores/stopwatch'

interface WinnerBlend {
  difficultyLevel: DifficultyLevel
  isGameFinished: boolean
}

const WinnerBlend = ({ difficultyLevel }: WinnerBlend) => {
  const navigate = useNavigate()
  const time = useSelector((state: RootState) => state.stopwatch.time)

  return (
  <StyledWinnerBlend>
    <StyledTime>
      <AccessTimeTwoToneIcon sx={{fontSize: '1em'}} />&nbsp;{time}
    </StyledTime>
    <StyledEmoji variant='h1' >🐇</StyledEmoji>
    <StyledCongrats>Yeah, bunny!</StyledCongrats>
    <StyledButton
      variant='contained'
      onClick={() => {
        navigate(`/${difficultyLevel.key}`)
      }}
    >
      Another&nbsp;<u><b>{difficultyLevel.text}</b></u>&nbsp;game ?
    </StyledButton>
  </StyledWinnerBlend>
)}

export default WinnerBlend
