import { DifficulytLevel } from 'interfaces'

const DifficultyLevelList: DifficulytLevel[] = [
  { level: 1, staticTiles: 38, tilesPerSquare: [5,5,4,4,4,4,4,4,4], text: 'easy' },
  { level: 2, staticTiles: 32, tilesPerSquare: [5,4,4,4,3,3,3,3,3], text: 'medium' },
  { level: 3, staticTiles: 28, tilesPerSquare: [4,3,3,3,3,3,3,3,3], text: 'hard' },
  { level: 4, staticTiles: 22, tilesPerSquare: [3,3,3,3,2,2,2,2,2], text: 'expert' },
  { level: 5, staticTiles: 16, tilesPerSquare: [2,2,2,2,2,2,2,1,1], text: 'master' },
]
export default DifficultyLevelList
