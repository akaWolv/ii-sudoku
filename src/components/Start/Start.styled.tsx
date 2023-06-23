import styled from 'styled-components'
import { Grid, Paper } from '@mui/material'
import Colors from 'constants/Colors'

const StyledGrid = styled(Grid)`
  padding: 5vw;
  max-width: 800px;
`
const StyledPaper = styled(Paper)`
  padding: 10px;
  color: ${Colors.IMP_ORANGE} !important;
  background-color: ${Colors.IMP_DARK_GREY} !important;
`
const StyledStart = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledLogo = styled.img`
  width: 150px;
  pointer-events: none;
`

export {
  StyledPaper,
  StyledGrid,
  StyledLogo,
  StyledStart
}
