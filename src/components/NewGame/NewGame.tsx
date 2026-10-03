import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BoltIcon from '@mui/icons-material/Bolt'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import DifficultyLevelList from 'constants/DifficultLevelList'
import ThemeSwitch from 'components/ThemeSwitch'

const NewGame: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 }
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: 3,
          p: { xs: 2.5, sm: 3 },
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            edge="start"
            aria-label="Back to main menu"
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              New Game
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Select your difficulty level
            </Typography>
          </Box>
        </Box>

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          {DifficultyLevelList.map((level) => {
            const color = level.color || '#d18800'
            const isOneShot = level.key === 'test'
            const title = isOneShot ? 'One Shot' : level.text.charAt(0).toUpperCase() + level.text.slice(1)
            const description = level.desc

            return (
              <Card
                key={level.key}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderLeft: `5px solid ${color}`,
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  m: 0,
                  p: 0,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/${level.key}`)}
                  sx={{ px: 2, py: 1, m: 0 }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                        {title}
                      </Typography>
                      {level.isDefault && (
                        // <Chip
                        //   size="small"
                        //   label="Default"
                        //   color="primary"
                        //   sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }}
                        // />
                        <Chip
                          size="small"
                          icon={<BoltIcon sx={{ fontSize: '14px !important' }} />}
                          label="Default"
                          variant='outlined'
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            borderColor: '#0091ffff'
                          }}
                        />
                      )}
                      {isOneShot && (
                        <Chip
                          size="small"
                          icon={<BoltIcon sx={{ fontSize: '14px !important' }} />}
                          label="Speedrun"
                          variant='outlined'
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            borderColor: '#ffb300'
                          }}
                        />
                      )}
                    </Stack>

                    <Stack direction="row" spacing={0.5}>
                      {!level.isHintingEnabled && (
                        <Chip
                          size="small"
                          variant="outlined"
                          color="error"
                          label="no hints"
                          sx={{ height: 22, fontSize: '0.75rem', }}
                        />
                      )}
                      <Chip
                        size="small"
                        variant="outlined"
                        color="primary"
                        label={`${level.staticTiles}/81`}
                        sx={{ height: 22, fontSize: '0.75rem', fontWeight: 500 }}
                      />
                    </Stack>
                  </Box>

                  <Typography variant="body2" sx={{ opacity: 0.75, fontSize: '0.9rem', my: 1 }}>
                    {description}
                  </Typography>
                </CardActionArea>
              </Card>
            )
          })}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <ThemeSwitch />
        </Box>
      </Paper>
    </Box>
  )
}

export default NewGame
