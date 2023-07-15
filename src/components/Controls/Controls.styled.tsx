import { Button, Grid } from '@mui/material'
import styled from 'styled-components'
import Colors from 'constants/Colors'

type ControlsContainer = {
  $isHighlightedField: boolean
}
const ControlsContainer = styled.div<ControlsContainer>`
  margin-top: 1em;
  position: relative;
  filter: ${({ $isHighlightedField }) => $isHighlightedField ? 'none': 'blur(1px) grayscale(100%) opacity(40%)'};
  max-width: 300px;
  @media only screen and (max-width:850px)
  {
    max-width: 450px;
  }
`
const Bland = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled(Grid)`
  aspect-ratio: 1 / 1;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledControlButton = styled(Button)<{
  $isDisabled: boolean
}>`
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${Colors.IMP_LIGHT_GREY} !important;
  opacity: ${({ $isDisabled }) => $isDisabled ? '0.3' : '1'};
`
const StyledSpan = styled.span`
  color: ${Colors.IMP_ORANGE};
  font-size: 1.9em;
`

export {
  ControlsContainer,
  Bland,
  ButtonContainer,
  StyledControlButton,
  StyledSpan
}
