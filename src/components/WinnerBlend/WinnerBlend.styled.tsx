import { alpha, Button, colors, Paper, Typography } from '@mui/material'
import styled from 'styled-components'

const StyledWinnerBlend = styled.div`
  background-color: ${alpha(colors.lightGreen[800], 0.9)};
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
const StyledTime = styled(Paper)`
  font-size: 2em !important;
  margin-bottom: 0.2em;
  background-color: ${colors.lightGreen[900]} !important;
  padding: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.grey[200]} !important;
`
const StyledCongrats = styled(Paper)`
  font-size: 1.5em !important;
  margin-bottom: 0.8em !important;
  background-color: ${colors.lightGreen[900]} !important;
  padding: 0.3em;
  color: ${colors.grey[300]} !important;
`
const StyledEmoji = styled(Typography)`
  font-size: 100px !important;
`
const StyledButton = styled(Button)`
  color: ${colors.grey[100]} !important;
`

export {
  StyledButton,
  StyledWinnerBlend,
  StyledTime,
  StyledEmoji,
  StyledCongrats
}
