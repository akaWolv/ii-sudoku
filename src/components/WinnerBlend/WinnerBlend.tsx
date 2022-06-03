import { Button } from '@mui/material'
import React from 'react'
import { DifficultyLevel } from 'interfaces'
import { StyledWinnerBlend, StyledTime, StyledEmoji, StyledCongrats } from 'components/WinnerBlend/WinnerBlend.styled'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';

interface WinnerBlend {
  difficultyLevel: DifficultyLevel
  getStopwatch: Function
}

const WinnerBlend = ({ difficultyLevel, getStopwatch }: WinnerBlend) => (
  <StyledWinnerBlend>
    <StyledTime>
      <AccessTimeTwoToneIcon sx={{fontSize: '1em'}} />&nbsp;{getStopwatch()}
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
)

export default WinnerBlend
