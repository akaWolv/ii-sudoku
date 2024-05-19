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

const StyledTile = styled(Grid) <{
  $isHighlighted: boolean;
  $isHighlightedVertically: boolean;
  $isHighlightedHorizontally: boolean;
  $isHighlightedSameNumber: boolean;
  $isValid: boolean;
  $variant: TileVariant;
  $isHintingEnabled: boolean;
}>`
  background-color: ${({
  theme,
  $variant,
  $isHighlighted,
  $isValid,
  $isHighlightedSameNumber,
  $isHintingEnabled,
  $isHighlightedHorizontally,
  $isHighlightedVertically
}) => {
    if (theme.palette.mode === 'light') {
      if (!$isValid) {
        return colors.red[100]
      }
      if ($isHighlighted) {
        return colors.orange[200]
      }
      if ($isHintingEnabled && $isHighlightedSameNumber) {
        return colors.amber[100]
      }
      if ($isHintingEnabled && ($isHighlightedHorizontally || $isHighlightedVertically)) {
        return alpha($variant === TileVariant.A ? colors.orange[500] : colors.orange[100], 0.2)
      }
      return $variant === TileVariant.A ? colors.grey[300] : colors.grey[100]
    } else {
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
    }
  }};
  ${({ theme, $isHintingEnabled, $isHighlightedHorizontally, $isHighlightedVertically }) => {
    if (theme.palette.mode === 'dark') {
      return `filter: brightness(${($isHintingEnabled && ($isHighlightedHorizontally || $isHighlightedVertically)) ? '120%' : '100%'});`
    } else {
      return ''
    }
  }}
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme, $isHintingEnabled, $isHighlightedHorizontally, $isHighlightedVertically }) => {
    const highlightedBorder = theme.palette.mode === 'light' ? colors.orange[300] : colors.grey[500]
    const normalBorder = theme.palette.mode === 'light' ? colors.grey[400] : colors.grey[900]
    if ($isHintingEnabled) {
      return `
        border-top: solid 1px ${$isHighlightedHorizontally ? highlightedBorder : normalBorder};
        border-bottom: solid 1px ${$isHighlightedHorizontally ? highlightedBorder : normalBorder};
        border-left: solid 1px ${$isHighlightedVertically ? highlightedBorder : normalBorder};
        border-right: solid 1px ${$isHighlightedVertically ? highlightedBorder : normalBorder};
      `
    }
    return `
      border-top: solid 1px ${normalBorder};
      border-bottom: solid 1px ${normalBorder};
      border-left: solid 1px ${normalBorder};
      border-right: solid 1px ${normalBorder};
    `
  }}
  border: solid 1px ${({ $isHighlighted }) => $isHighlighted ? colors.orange[900] : 'inherit'};
`

type StyledSpan = {
  $isStatic: boolean;
  $isEmpty: boolean;
}
const StyledSpan = styled.span<StyledSpan>`
  color: ${({ theme, $isStatic, $isEmpty }) => {
    if ($isEmpty) {
      return 'transparent'
    }
    if (theme.palette.mode === 'light') {
      return $isStatic ? colors.grey[800] : colors.orange[800]
    } else {
      return $isStatic ? colors.grey[100] : colors.amber[700]
    }
  }};
  font-weight: ${({ $isStatic }) => $isStatic ? 'bolder' : 'light'};
  font-size: 1.4rem;
`

export {
  StyledButton,
  StyledTile,
  StyledSpan
}
