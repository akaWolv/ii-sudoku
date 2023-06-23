import TileVariant from 'constants/TileVariant'
import Group from 'constants/Group'
import { DifficultyLevel, Field } from 'interfaces'
import { StyledButton, StyledSpan, StyledTile } from 'components/Tile/Tile.styled'

const VariantASquares = [
  Group.SQUARE_2_1,
  Group.SQUARE_1_2,
  Group.SQUARE_3_2,
  Group.SQUARE_2_3
]

type Tile = {
  field: Field,
  handlePick: Function,
  difficultyLevel: DifficultyLevel,
  highlightedField?: Field
}
const Tile: React.FC<Tile> = (
  {
    field,
    highlightedField,
    difficultyLevel,
    handlePick
  }) => {
  const { id, square, hLine, vLine, generatedValue, value, isStatic, isValid } = field
  const { isHintingEnabled } = difficultyLevel
  const {
    id :highlightedId,
    hLine: highlightedHLine,
    vLine: highlightedVLine,
    value: highlightedValue
  } = highlightedField || {}

  const tileValue: number = (isStatic ? generatedValue : value) || 0
  const pickTileVariant = (square: Group): TileVariant => VariantASquares.includes(square)
    ? TileVariant.A
    : TileVariant.B

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
      $isHintingEnabled={Boolean(isHintingEnabled)}
    >
      <StyledButton
        variant='outlined'
        onClick={() => handlePick(field)}
      >
        <StyledSpan $isStatic={isStatic} $isEmpty={!Boolean(tileValue)}>
          {String(tileValue)}
        </StyledSpan>
      </StyledButton>
    </StyledTile>
  )
}
export default Tile
