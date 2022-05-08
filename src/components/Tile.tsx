import styled from '@emotion/styled'
import { alpha, Button, Grid } from '@mui/material'
import { amber, brown, grey, purple } from '@mui/material/colors'
import TileVariant from 'constants/TileVariant'
import Group from 'constants/Group'
import { Field } from 'interfaces'

const VariantASquares = [
  Group.SQUARE_2_1,
  Group.SQUARE_1_2,
  Group.SQUARE_3_2,
  Group.SQUARE_2_3
]

const StyledButton = styled(Button)`
  font-size: 5vw;
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 100%;
`
const highlightedBorder = grey[500]
const normalBorder = grey[900]

type StyledTileProps = {
  isHighlighted: boolean
  isHighlightedVertically: boolean
  isHighlightedHorizontally: boolean
  variant: TileVariant
}
const StyledTile = styled(Grid)<StyledTileProps>`
  background-color: ${({ variant, isHighlighted }) => {
  if (isHighlighted) {
    return grey[900]
  }
  return variant === TileVariant.A ? grey[800] : alpha(grey[800], 0.6)
}};
  border-top: solid 1px ${({ isHighlightedHorizontally }) => isHighlightedHorizontally ? highlightedBorder : normalBorder};
  border-bottom: solid 1px ${({ isHighlightedHorizontally }) => isHighlightedHorizontally ? highlightedBorder : normalBorder};
  border-left: solid 1px ${({ isHighlightedVertically }) => isHighlightedVertically ? highlightedBorder : normalBorder};
  border-right: solid 1px ${({ isHighlightedVertically }) => isHighlightedVertically ? highlightedBorder : normalBorder};
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
  color: ${({isStatic}) => isStatic ? grey[100] : amber[700]}
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

  const { id, square, hLine, vLine, value, isStatic } = field
  const { id :highlightedId, hLine: highlightedHLine, vLine: highlightedVLine } = highlightedField || {}

  const pickTileVariant = (square: Group): TileVariant =>
    VariantASquares.includes(square) ? TileVariant.A : TileVariant.B

  return (
    <StyledTile
      item
      xs={1}
      isHighlighted={highlightedId === id}
      isHighlightedVertically={highlightedVLine === vLine}
      isHighlightedHorizontally={highlightedHLine === hLine}
      variant={pickTileVariant(square)}
    >
      <StyledButton
        variant='outlined'
        onClick={() => {
          isStatic ? handlePick(undefined) : handlePick(field)
        }}
      >
        <StyledSpan isStatic={!!isStatic}>{String(value)}</StyledSpan>
      </StyledButton>
    </StyledTile>
  )
}
export default Tile
