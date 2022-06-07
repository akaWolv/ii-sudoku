import { alpha, Button, Grid } from '@mui/material'
import { colors } from '@mui/material'
import TileVariant from 'constants/TileVariant'
import styled from 'styled-components'
import Colors from 'constants/Colors'

const StyledButton = styled(Button)`
  && {
    padding: 0;
    margin: 0;
    font-size: 5vw;
    border: 0;
    min-width: 100%;
  }
`
const highlightedBorder = colors.grey[500]
const normalBorder = colors.grey[900]

const StyledTile = styled(Grid)<{
  $isHighlighted: boolean;
  $isHighlightedVertically: boolean;
  $isHighlightedHorizontally: boolean;
  $isHighlightedSameNumber: boolean;
  $isValid: boolean;
  $variant: TileVariant;
}>`
  background-color: ${({ $variant, $isHighlighted, $isValid, $isHighlightedSameNumber }) => {
  if (!$isValid) {
    return colors.red[900]
  }
  if ($isHighlightedSameNumber) {
    return alpha(Colors.IMP_ORANGE, 0.1)
  }
  if ($isHighlighted) {
    return colors.grey[900]
  }
  return $variant === TileVariant.A ? colors.grey[800] : alpha(colors.grey[800], 0.6)
}};
  border-top: solid 1px ${({ $isHighlightedHorizontally }) => $isHighlightedHorizontally ? highlightedBorder : normalBorder};
  border-bottom: solid 1px ${({ $isHighlightedHorizontally }) => $isHighlightedHorizontally ? highlightedBorder : normalBorder};
  border-left: solid 1px ${({ $isHighlightedVertically }) => $isHighlightedVertically ? highlightedBorder : normalBorder};
  border-right: solid 1px ${({ $isHighlightedVertically }) => $isHighlightedVertically ? highlightedBorder : normalBorder};
  flex-grow: 1;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type StyledSpan = {
  isStatic: boolean
}
const StyledSpan = styled.span<StyledSpan>`
  color: ${({isStatic}) => isStatic ? colors.grey[100] : colors.amber[700]};
  font-size: 1.4rem;
`

export {
  StyledButton,
  StyledTile,
  StyledSpan
}
