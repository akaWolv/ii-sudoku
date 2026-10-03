import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CheckIcon from '@mui/icons-material/Check'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DifficultyLevelList from 'constants/DifficultLevelList'
import { SavedGame } from 'interfaces'
import { deleteSavedGame, getSavedGames } from 'helpers/savedGamesStorage'
import ThemeSwitch from 'components/ThemeSwitch'
import {
  StyledEmptyState,
  StyledFilterPaper,
  StyledGameCard,
  StyledHeader,
  StyledSavedGamesContainer
} from './SavedGames.styled'

const GameProgressCircle: React.FC<{ progressPercent: number; isCompleted: boolean }> = ({
  progressPercent,
  isCompleted
}) => {
  const circleColor = isCompleted ? '#22c55e' : '#eab308'

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={54}
        thickness={4}
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          position: 'absolute'
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progressPercent}
        size={54}
        thickness={4}
        sx={{
          color: circleColor,
          strokeLinecap: 'round'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isCompleted ? (
          <CheckIcon sx={{ color: '#22c55e', fontSize: '1.6rem', fontWeight: 'bold' }} />
        ) : (
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontWeight: 800,
              fontSize: '0.75rem',
              color: (theme) => (theme.palette.mode === 'light' ? '#854d0e' : '#fde047')
            }}
          >
            {`${progressPercent}%`}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

const getLevelColor = (key: string): string => {
  return DifficultyLevelList.find((level) => level.key === key)?.color || '#000000'
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins >= 60) {
    const hours = Math.floor(mins / 60)
    const remMins = mins % 60
    return `${hours}h ${String(remMins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const SavedGames: React.FC = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState<SavedGame[]>(() => getSavedGames())
  const [statusFilter, setStatusFilter] = useState<'all' | 'paused' | 'finished'>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'updatedAt_desc' | 'createdAt_desc' | 'progress_desc'>('updatedAt_desc')

  const [gameToDelete, setGameToDelete] = useState<SavedGame | null>(null)

  const handleDeleteClick = (game: SavedGame, e: React.MouseEvent) => {
    e.stopPropagation()
    setGameToDelete(game)
  }

  const handleConfirmDelete = () => {
    if (!gameToDelete) return
    const updated = deleteSavedGame(gameToDelete.id)
    setGames(updated)
    setGameToDelete(null)
  }

  const handleCancelDelete = () => {
    setGameToDelete(null)
  }

  const handleResume = (game: SavedGame) => {
    navigate(`/${game.difficultyKey}/${game.currentGameKey}`)
  }

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games]

    if (statusFilter !== 'all') {
      result = result.filter((g) => g.status === statusFilter)
    }

    if (difficultyFilter !== 'all') {
      result = result.filter((g) => g.difficultyKey === difficultyFilter)
    }

    result.sort((a, b) => {
      if (sortBy === 'createdAt_desc') {
        return b.createdAt - a.createdAt
      }
      if (sortBy === 'progress_desc') {
        return b.progressPercent - a.progressPercent
      }
      return b.updatedAt - a.updatedAt
    })

    return result
  }, [games, statusFilter, difficultyFilter, sortBy])

  return (
    <StyledSavedGamesContainer>
      <StyledHeader>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => navigate('/')} aria-label="back to menu">
            <ArrowBackIcon />
          </IconButton>
          <div>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 400 }}>
              Load game
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {games.length} {games.length === 1 ? 'game' : 'games'} in local storage
            </Typography>
          </div>
        </Stack>
        <ThemeSwitch />
      </StyledHeader>

      <StyledFilterPaper elevation={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <MenuItem value="all">All statuses</MenuItem>
                <MenuItem value="paused">In Progress</MenuItem>
                <MenuItem value="finished">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="diff-filter-label">Difficulty</InputLabel>
              <Select
                labelId="diff-filter-label"
                value={difficultyFilter}
                label="Difficulty"
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <MenuItem value="all">All levels</MenuItem>
                {DifficultyLevelList.map(({ key, text }) => (
                  <MenuItem key={key} value={key}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <MenuItem value="updatedAt_desc">Last played</MenuItem>
                <MenuItem value="createdAt_desc">Date started</MenuItem>
                <MenuItem value="progress_desc">Completion %</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </StyledFilterPaper>

      {filteredAndSortedGames.length === 0 ? (
        <StyledEmptyState elevation={1}>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
            {games.length === 0 ? 'No saved games found.' : 'No games match selected filters.'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6, mb: 3 }}>
            {games.length === 0
              ? 'Start a new game from the main menu, and your progress will be automatically saved here.'
              : 'Try changing status or difficulty filters above.'}
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Go to Main Menu
          </Button>
        </StyledEmptyState>
      ) : (
        filteredAndSortedGames.map((game) => (
          <StyledGameCard key={game.id} elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: { xs: 1.5, sm: 2 }
              }}
            >
              {/* Left group: Circular Progress + Info */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                <GameProgressCircle
                  progressPercent={game.progressPercent}
                  isCompleted={game.status === 'finished'}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Top: Cells count + Difficulty chip + Time */}
                  <Stack direction="row" spacing={1.2} alignItems="center" flexWrap="wrap" sx={{ mb: 0.5 }}>
                    <Typography variant="body1" component="span" sx={{ fontWeight: 700 }}>
                      {game.filledCount} / {game.totalCount} cells
                    </Typography>

                    <Chip
                      label={game.difficultyText || game.difficultyKey}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 22,
                        borderColor: getLevelColor(game.difficultyKey)
                      }}
                    />

                    <Chip
                      label={formatTime(game.elapsedSeconds)}
                      variant="outlined"
                      color="primary"
                      icon={<AccessTimeIcon />}
                      size="small"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 22
                      }}
                    />
                  </Stack>

                  {/* Bottom: Started + Last played */}
                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
                      Started: {formatDate(game.createdAt)}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
                      Last played: {formatDate(game.updatedAt)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* Right group: Actions */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                sx={{
                  pt: { xs: 1, sm: 0 },
                  borderTop: {
                    xs: (theme) =>
                      `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
                    sm: 'none'
                  },
                  flexShrink: 0
                }}
              >
                <Tooltip title="Delete game">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleDeleteClick(game, e)}
                    aria-label="delete game"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleResume(game)}
                  sx={{ minWidth: 95 }}
                >
                  {game.status === 'finished' ? 'View Board' : 'Resume'}
                </Button>
              </Stack>
            </Box>
          </StyledGameCard>
        ))
      )}

      <Dialog
        open={Boolean(gameToDelete)}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete saved game?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this {gameToDelete?.difficultyText || gameToDelete?.difficultyKey} game ({gameToDelete?.progressPercent}% completed)? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledSavedGamesContainer>
  )
}

export default SavedGames
