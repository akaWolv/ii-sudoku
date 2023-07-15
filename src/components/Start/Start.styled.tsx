import styled from 'styled-components'
import { Paper } from '@mui/material'
import Colors from 'constants/Colors'

const StyledPaper = styled(Paper)`
  margin: 1em;
  color: ${Colors.IMP_ORANGE} !important;
  background-color: ${Colors.IMP_DARK_GREY} !important;
  padding-bottom: 1em !important;
`
const StyledStart = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const StyledLogo = styled.img`
  width: 120px;
  pointer-events: none;
  margin: 0.7em;
`

export {
  StyledPaper,
  StyledLogo,
  StyledStart
}
