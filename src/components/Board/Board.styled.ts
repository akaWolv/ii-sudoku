import styled from 'styled-components'
import { Grid } from '@mui/material'

const StyledBoard = styled(Grid)`
  position: relative;
  max-width: 800px;
  @media only screen and (max-width:850px)
  {
    max-width: 60vh;
  }
`

export {
  StyledBoard
}
