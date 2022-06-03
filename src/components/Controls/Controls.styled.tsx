import { Button, Grid } from '@mui/material'
import styled from '@emotion/styled'
import { colors } from '@mui/material/'

type ControlsContainer = {
  $isHighlightedField: boolean
}
const ControlsContainer = styled.div<ControlsContainer>`
  margin-top: 1em;
  position: relative;
  filter: ${({$isHighlightedField}) => $isHighlightedField ? 'none': 'blur(1px) grayscale(100%) opacity(40%)'};
`;
const Bland = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled(Grid)`
  margin-bottom: 0.5em;
`;
const ControlButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.9em;
`;
const StyledSpan = styled.span`
  color: ${colors.purple[100]}
`

export {
  ControlsContainer,
  Bland,
  ButtonContainer,
  ControlButton,
  StyledSpan
}
