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
  color: string
  desc: string
  isDefault?: boolean
  isHintingEnabled?: boolean
}

type ThemeColorMode = 'light' | 'dark'

type GameStatus = 'paused' | 'finished'

interface SavedGame {
  id: string
  difficultyKey: string
  difficultyText: string
  initialGameKey: string
  currentGameKey: string
  elapsedSeconds: number
  status: GameStatus
  filledCount: number
  totalCount: number
  progressPercent: number
  createdAt: number
  updatedAt: number
}

export type {
  DifficultyLevel,
  Field,
  ThemeColorMode,
  GameStatus,
  SavedGame
}
