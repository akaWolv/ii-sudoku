import TileVariant from 'constants/TileVariant'
import Group from 'constants/Group'
import { Field } from 'interfaces'
import { StyledButton, StyledSpan, StyledTile } from 'components/Tile/Tile.styled'

const VariantASquares = [
  Group.SQUARE_2_1,
  Group.SQUARE_1_2,
  Group.SQUARE_3_2,
  Group.SQUARE_2_3
]

type Props = {
  field: Field,
  handlePick: Function,
  highlightedField?: Field
}
const Tile: React.FC<Props> = (
  {
    field,
    highlightedField,
    handlePick
  }) => {
  const { id, square, hLine, vLine, generatedValue, value, isStatic, isValid } = field
  const {
    id :highlightedId,
    hLine: highlightedHLine,
    vLine: highlightedVLine,
    value: highlightedValue
  } = highlightedField || {}

  const pickTileVariant = (square: Group): TileVariant =>
    VariantASquares.includes(square) ? TileVariant.A : TileVariant.B

  return (
    <StyledTile
      item
      xs={1}
      $isHighlighted={highlightedId === id}
      $isHighlightedVertically={highlightedVLine === vLine}
      $isHighlightedHorizontally={highlightedHLine === hLine}
      $isHighlightedSameNumber={Boolean(highlightedValue) && highlightedValue === value}
      $isValid={isValid}
      $variant={pickTileVariant(square)}
    >
      <StyledButton
        variant='outlined'
        onClick={() => handlePick(field)}
      >
        <StyledSpan isStatic={isStatic}>
          {String((isStatic ? generatedValue : value) || ' ')}
        </StyledSpan>
      </StyledButton>
    </StyledTile>
  )
}
export default Tile
