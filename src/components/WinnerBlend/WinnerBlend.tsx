import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { DifficultyLevel } from 'interfaces'
import { StyledWinnerBlend, StyledTime, StyledEmoji, StyledCongrats } from 'components/WinnerBlend/WinnerBlend.styled'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import type { RootState } from 'stores/stopwatch'

interface WinnerBlend {
  difficultyLevel: DifficultyLevel
  isGameFinished: boolean
}

const WinnerBlend = ({ difficultyLevel }: WinnerBlend) => {
  const time = useSelector((state: RootState) => state.stopwatch.time)

  return (
  <StyledWinnerBlend>
    <StyledTime>
      <AccessTimeTwoToneIcon sx={{fontSize: '1em'}} />&nbsp;{time}
    </StyledTime>
    <StyledEmoji variant='h1' >🐇</StyledEmoji>
    <StyledCongrats>Yeah, bunny!</StyledCongrats>
    <Button
      variant='contained'
      onClick={() => {
        window.location.href = `/${difficultyLevel.key}/`
      }}
    >
      Another&nbsp;<u><b>{difficultyLevel.text}</b></u>&nbsp;game ?
    </Button>
  </StyledWinnerBlend>
)}

export default WinnerBlend
