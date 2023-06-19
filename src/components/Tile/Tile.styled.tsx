import { alpha, Button, Grid } from '@mui/material'
import { colors } from '@mui/material'
import TileVariant from 'constants/TileVariant'
import styled from 'styled-components'
import Colors from 'constants/Colors'

const StyledButton = styled(Button)`
  && {
    padding: 0;
    margin: 0;
    border: solid 1px transparent;
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
  $isHintingEnabled: boolean;
}>`
  background-color: ${({ $variant, $isHighlighted, $isValid, $isHighlightedSameNumber }) => {
    if (!$isValid) {
      return Colors.IMP_RED_GREY
    }
    if ($isHighlightedSameNumber) {
      return alpha(Colors.IMP_ORANGE, 0.25)
    }
  
    if ($isHighlighted) {
      return colors.grey[900]
    }
    return $variant === TileVariant.A ? colors.grey[800] : alpha(colors.grey[800], 0.6)
  }};
  filter: brightness(${
    ({ $isHintingEnabled, $isHighlightedHorizontally, $isHighlightedVertically }) =>
      ($isHintingEnabled && ($isHighlightedHorizontally || $isHighlightedVertically)) ? '120%' : '100%'
  });  
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  border-top: solid 1px ${({ $isHintingEnabled, $isHighlightedHorizontally }) =>
    ($isHintingEnabled && $isHighlightedHorizontally) 
      ? highlightedBorder 
      : normalBorder
  };
  border-bottom: solid 1px ${({ $isHintingEnabled, $isHighlightedHorizontally }) =>
    ($isHintingEnabled && $isHighlightedHorizontally)
      ? highlightedBorder 
      : normalBorder
  };
  border-left: solid 1px ${({ $isHintingEnabled, $isHighlightedVertically }) =>
    ($isHintingEnabled && $isHighlightedVertically)
      ? highlightedBorder 
      : normalBorder
  };
  border-right: solid 1px ${({ $isHintingEnabled, $isHighlightedVertically }) =>
    ($isHintingEnabled && $isHighlightedVertically)
      ? highlightedBorder 
      : normalBorder
  };
  
  border: solid 1px ${({ $isHighlighted }) => $isHighlighted ? Colors.IMP_ORANGE : 'inherit'};
`

type StyledSpan = {
  $isStatic: boolean;
  $isEmpty: boolean;
}
const StyledSpan = styled.span<StyledSpan>`
  color: ${
  ({ $isStatic, $isEmpty }) => {
    if ($isEmpty) {
      return 'transparent'
    }
    return $isStatic ? colors.grey[100] : colors.amber[700]
  }};
  font-weight: ${({ $isStatic }) => $isStatic ? 'bolder' : 'light'};
  font-size: 1.4rem;
`

export {
  StyledButton,
  StyledTile,
  StyledSpan
}
