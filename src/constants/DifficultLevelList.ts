import { DifficultyLevel } from 'interfaces'

const DifficultyLevelList: DifficultyLevel[] = [
  { level: 1, key: 'easy', staticTiles: 38, tilesPerSquare: [5,5,4,4,4,4,4,4,4], text: 'easy' },
  { level: 2, key: 'medium', staticTiles: 32, tilesPerSquare: [5,4,4,4,3,3,3,3,3], text: 'medium', isDefault: true },
  { level: 3, key: 'hard', staticTiles: 28, tilesPerSquare: [4,3,3,3,3,3,3,3,3], text: 'hard' },
  { level: 4, key: 'expert', staticTiles: 22, tilesPerSquare: [3,3,3,3,2,2,2,2,2], text: 'expert' },
  { level: 5, key: 'master', staticTiles: 16, tilesPerSquare: [2,2,2,2,2,2,2,1,1], text: 'master' },
  { level: 6, key: 'test', staticTiles: 80, tilesPerSquare: [8,9,9,9,9,9,9,9,9], text: 'one shot' },
]
export default DifficultyLevelList
