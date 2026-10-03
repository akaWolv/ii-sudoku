import { SavedGame } from 'interfaces'

const STORAGE_KEY = 'ii_sudoku_saved_games'
const BOARD_SIZE = 81

export const getInitialTemplateId = (gameKey: string): string => {
  return gameKey.replace(/[1-9]/g, ',')
}

export const calculateProgress = (gameKey: string) => {
  const emptyCount = (gameKey.match(/,/g) || []).length
  const filledCount = Math.max(0, Math.min(BOARD_SIZE, BOARD_SIZE - emptyCount))
  const progressPercent = Math.round((filledCount / BOARD_SIZE) * 100)
  return {
    filledCount,
    totalCount: BOARD_SIZE,
    progressPercent
  }
}

export const getSavedGames = (): SavedGame[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to load saved games:', err)
    return []
  }
}

export const getSavedGameById = (id: string): SavedGame | undefined => {
  const games = getSavedGames()
  return games.find((g) => g.id === id)
}

export const getSavedGameByGameKey = (gameKey: string): SavedGame | undefined => {
  const id = getInitialTemplateId(gameKey)
  return getSavedGameById(id)
}

interface SaveGameParams {
  difficultyKey: string
  difficultyText: string
  currentGameKey: string
  elapsedSeconds?: number
  isFinished?: boolean
}

export const saveOrUpdateGame = ({
  difficultyKey,
  difficultyText,
  currentGameKey,
  elapsedSeconds = 0,
  isFinished = false
}: SaveGameParams): SavedGame => {
  const id = getInitialTemplateId(currentGameKey)
  const now = Date.now()
  const { filledCount, totalCount, progressPercent } = calculateProgress(currentGameKey)
  const games = getSavedGames()
  const existingIndex = games.findIndex((g) => g.id === id)

  if (existingIndex >= 0) {
    const existing = games[existingIndex]
    const updated: SavedGame = {
      ...existing,
      difficultyKey: difficultyKey || existing.difficultyKey,
      difficultyText: difficultyText || existing.difficultyText,
      currentGameKey,
      elapsedSeconds: Math.max(existing.elapsedSeconds, elapsedSeconds),
      status: (isFinished || existing.status === 'finished') ? 'finished' : 'paused',
      filledCount,
      totalCount,
      progressPercent: isFinished ? 100 : progressPercent,
      updatedAt: now
    }
    games[existingIndex] = updated
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
    } catch (err) {
      console.error('Failed to save game update:', err)
    }
    return updated
  }

  const newGame: SavedGame = {
    id,
    difficultyKey,
    difficultyText,
    initialGameKey: id,
    currentGameKey,
    elapsedSeconds,
    status: isFinished ? 'finished' : 'paused',
    filledCount,
    totalCount,
    progressPercent: isFinished ? 100 : progressPercent,
    createdAt: now,
    updatedAt: now
  }

  games.unshift(newGame)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  } catch (err) {
    console.error('Failed to save new game:', err)
  }
  return newGame
}

export const deleteSavedGame = (id: string): SavedGame[] => {
  const games = getSavedGames().filter((g) => g.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  } catch (err) {
    console.error('Failed to delete saved game:', err)
  }
  return games
}
