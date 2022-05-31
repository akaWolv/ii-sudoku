import MilitaryTechTwoToneIcon from '@mui/icons-material/MilitaryTechTwoTone'
import { alpha, Button, colors, Typography } from '@mui/material'
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
`
const WinnerBlend = ({ difficultyLevel }: { difficultyLevel: DifficultyLevel }) => (
  <StyledWinnerBlend>
    <MilitaryTechTwoToneIcon sx={{ fontSize: 200 }} color="primary" />
    <Typography variant='h1' gutterBottom={true}>Solved!</Typography>
    <Button
      variant='contained'
      onClick={() => {
        window.location.href = `/${difficultyLevel.text}/`
      }}
    >
      New&nbsp;<b>{difficultyLevel.text}</b>&nbsp;Game
    </Button>
  </StyledWinnerBlend>
)

export default WinnerBlend
