import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import HistoryIcon from '@mui/icons-material/History'
import GetAppIcon from '@mui/icons-material/GetApp'
import CloseIcon from '@mui/icons-material/Close'
import IosShareIcon from '@mui/icons-material/IosShare'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch'
import { getSavedGames } from 'helpers/savedGamesStorage'
import { usePwaInstall } from 'pwa'

const Start: React.FC = () => {
  const navigate = useNavigate()
  const savedGamesCount = useMemo(() => getSavedGames().length, [])
  const { shouldShowInstallButton, installApp } = usePwaInstall()
  const [installInfoOpen, setInstallInfoOpen] = useState(false)

  const handleInstallClick = async () => {
    const res = await installApp()
    if (!res.triggered) {
      setInstallInfoOpen(true)
    }
  }

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
      <Typography variant="subtitle2" sx={{ opacity: 0.75, mb: 3 }}>
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

          {shouldShowInstallButton && (
            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<GetAppIcon />}
              onClick={handleInstallClick}
              sx={{
                py: 1.2,
                fontSize: '0.95rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                opacity: 0.9
              }}
            >
              Install App
            </Button>
          )}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.65, mb: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Theme
            </Typography>
            <ThemeSwitch />
          </Box>
        </Stack>
      </StyledPaper>

      {/* Helper Dialog for iOS Safari & manual desktop installation */}
      <Dialog
        open={installInfoOpen}
        onClose={() => setInstallInfoOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <GetAppIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Install Sudoku PWA
            </Typography>
          </Stack>
          <IconButton onClick={() => setInstallInfoOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ py: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You can install Sudoku on your device for quick offline access:
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: (t) => t.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <IosShareIcon fontSize="small" /> iOS (Safari)
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.85 }}>
                Tap the <strong>Share</strong> button in Safari toolbar, then select <strong>Add to Home Screen</strong> (<AddBoxOutlinedIcon sx={{ fontSize: 14, verticalAlign: 'text-bottom' }} />).
              </Typography>
            </Box>

            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: (t) => t.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <GetAppIcon fontSize="small" /> Chrome / Edge / Android
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.85 }}>
                Click the <strong>Install</strong> icon in your browser's address bar or menu.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 2, py: 1.5 }}>
          <Button onClick={() => setInstallInfoOpen(false)} variant="contained" fullWidth>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </StyledStart>
  )
}

export default Start
