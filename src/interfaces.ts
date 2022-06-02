import Group from 'constants/Group'

type Field = {
  order: number
  id: string
  x: number
  y: number
  square: Group
  hLine: Group
  vLine: Group
  generatedValue: number | null
  value: number | null
  isStatic: boolean
  isValid: boolean
}

type DifficultyLevel = {
  level: number
  key: string
  staticTiles: number
  tilesPerSquare: number[]
  text: string
  isDefault?: boolean
}

export type {
  Field,
  DifficultyLevel
}
