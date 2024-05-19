import { Grid, Paper } from '@mui/material'
import styled from 'styled-components'
import Colors from 'constants/Colors'

const StyledPaper = styled(Paper)`
  padding: 1em;
  color: ${Colors.IMP_ORANGE} !important;
`

const StyledTopBar = styled(Grid)`
  margin-bottom: 1em;
`

const StyledLogo = styled.img`
  height: 70px;
  width: 70px;
  pointer-events: none;
`

export {
  StyledPaper,
  StyledTopBar,
  StyledLogo
}
