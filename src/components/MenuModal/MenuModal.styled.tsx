import { Box, colors } from '@mui/material'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 330px;
  border: 2px solid #000;
  background-color: ${({theme}) => theme.palette.mode == 'light' ? colors.grey[100] : colors.grey[900]};
  padding: 20px;
  box-shadow: 24px;
  border: 0px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px;
`

export {
  StyledBox
}
 