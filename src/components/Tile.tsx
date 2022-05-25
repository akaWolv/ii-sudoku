import { alpha, Button, Grid } from '@mui/material'
import { colors } from '@mui/material'
import TileVariant from 'constants/TileVariant'
import Group from 'constants/Group'
import { Field } from 'interfaces'
import styled from 'styled-components'

const VariantASquares = [
  Group.SQUARE_2_1,
  Group.SQUARE_1_2,
  Group.SQUARE_3_2,
  Group.SQUARE_2_3
]

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
  $isValid: boolean;
  variant: TileVariant
}>`
  background-color: ${({ variant, $isHighlighted, $isValid }) => {
  if (!$isValid) {
    return colors.red[900]
  }
  if ($isHighlighted) {
    return colors.grey[900]
  }
  return variant === TileVariant.A ? colors.grey[800] : alpha(colors.grey[800], 0.6)
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

type StyledSpanProps = {
  isStatic: boolean
}
const StyledSpan = styled.span<StyledSpanProps>`
  color: ${({isStatic}) => isStatic ? colors.grey[100] : colors.amber[700]}
`

type Props = {
  field: Field,
  handlePick: Function,
  highlightedField?: Field,
}
const Tile: React.FC<Props> = (
  {
    field,
    highlightedField,
    handlePick
  }) => {

  const { id, square, hLine, vLine, generatedValue, value, isStatic, isValid } = field
  const { id :highlightedId, hLine: highlightedHLine, vLine: highlightedVLine } = highlightedField || {}

  const pickTileVariant = (square: Group): TileVariant =>
    VariantASquares.includes(square) ? TileVariant.A : TileVariant.B

  return (
    <StyledTile
      item
      xs={1}
      $isHighlighted={highlightedId === id}
      $isHighlightedVertically={highlightedVLine === vLine}
      $isHighlightedHorizontally={highlightedHLine === hLine}
      $isValid={isValid}
      variant={pickTileVariant(square)}
    >
      <StyledButton
        variant='outlined'
        onClick={() => {
          isStatic ? handlePick(undefined) : handlePick(field)
        }}
      >
        <StyledSpan isStatic={isStatic}>{String((isStatic ? generatedValue : value) || '-')}</StyledSpan>
      </StyledButton>
    </StyledTile>
  )
}
export default Tile
