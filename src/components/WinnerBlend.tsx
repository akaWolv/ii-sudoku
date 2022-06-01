import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { alpha, Button, Chip, colors, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { DifficultyLevel } from 'interfaces'

const StyledWinnerBlend = styled.div`
  background-color: ${alpha(colors.lightGreen[900], 0.7)};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  -webkit-transition: opacity 2s ease-in;
  -moz-transition: opacity 2s ease-in;
  -o-transition: opacity 2s ease-in;
  -ms-transition: opacity 2s ease-in;
  transition: opacity 2s ease-in;
`

interface WinnerBlend {
  difficultyLevel: DifficultyLevel
  getStopwatch: Function
}

const WinnerBlend = ({ difficultyLevel, getStopwatch }: WinnerBlend) => (
  <StyledWinnerBlend>
    <Chip label={getStopwatch()} sx={{ fontSize: '2em' }} />
    <RocketLaunchIcon sx={{ fontSize: 220 }} color="primary" />
    <Chip label={'Solved!'} sx={{ fontSize: '2em', marginBottom: '0.8em' }} />
    <Button
      variant='contained'
      onClick={() => {
        window.location.href = `/${difficultyLevel.key}/`
      }}
    >
      New&nbsp;<b>{difficultyLevel.text}</b>&nbsp;Game
    </Button>
  </StyledWinnerBlend>
)

export default WinnerBlend
