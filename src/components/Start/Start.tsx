import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import HistoryIcon from '@mui/icons-material/History'
import RefreshIcon from '@mui/icons-material/Refresh'
import { StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch'
import { getSavedGames } from 'helpers/savedGamesStorage'
import { usePwaInstall } from 'pwa'
import { APP_VERSION } from 'constants/Version'

const Start: React.FC = () => {
  const navigate = useNavigate()
  const savedGamesCount = useMemo(() => getSavedGames().length, [])
  const { isOnline, refreshApp } = usePwaInstall()

  return (
    <StyledStart>
      <StyledLogo src={logo} className="App-logo" alt="logo" />
      <Typography
        variant="h2"
        sx={{
          fontWeight: 300,
          letterSpacing: '0.02em',
          mb: 0.5
        }}
      >
        Sudoku
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.75, mb: 1.5 }}>
        by{' '}
        <a
          href="http://indieimp.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          IndieImp.com
        </a>
      </Typography>

      <StyledPaper elevation={4}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PlayArrowIcon sx={{ fontSize: '1.6rem !important' }} />}
            onClick={() => navigate('/new')}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.03em',
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            New Game
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<HistoryIcon sx={{ fontSize: '1.4rem !important' }} />}
            onClick={() => navigate('/saved')}
            sx={{
              py: 1.3,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            Load Game
            {savedGamesCount > 0 && (
              <Chip
                size="small"
                label={savedGamesCount}
                color="primary"
                sx={{
                  ml: 1.5,
                  height: 22,
                  minWidth: 22,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'white'
                }}
              />
            )}
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            disabled={!isOnline}
            startIcon={<RefreshIcon />}
            onClick={refreshApp}
            sx={{
              py: 1.2,
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              opacity: isOnline ? 0.9 : 0.6
            }}
          >
            {isOnline ? 'Check for app update' : 'No connection (offline)'}
          </Button>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.65, mb: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Theme
            </Typography>
            <ThemeSwitch />
          </Box>
        </Stack>
      </StyledPaper>

      <Typography
        variant="caption"
        sx={{
          mt: 1.5,
          opacity: 0.5,
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          fontSize: '0.8em'
        }}
      >
        v{APP_VERSION}
      </Typography>
    </StyledStart>
  )
}

export default Start
