import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { StyledBox } from './MenuModal.styled'
import ThemeSwitch from 'components/ThemeSwitch'
import { calculateProgress, getInitialTemplateId } from 'helpers/savedGamesStorage'

const MenuModal = () => {
  const navigate = useNavigate()
  const { difficultyLevelKey, gameKey } = useParams()
  const [open, setOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [shareType, setShareType] = useState<'empty' | 'current' | null>(null)
  const [copied, setCopied] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleQuitToMainMenu = () => {
    handleClose()
    navigate('/')
  }

  const handleLoadGame = () => {
    handleClose()
    navigate('/saved')
  }

  const handleOpenShare = () => {
    handleClose()
    setShareType(null)
    setCopied(false)
    setShareOpen(true)
  }

  const progress = gameKey ? calculateProgress(gameKey) : null
  const progressPercent = progress ? progress.progressPercent : 0

  const getShareUrl = (type: 'empty' | 'current') => {
    if (!gameKey || !difficultyLevelKey) return ''
    const origin = window.location.origin
    const key = type === 'empty' ? getInitialTemplateId(gameKey) : gameKey
    return `${origin}/${difficultyLevelKey}/${key}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
        return
      }
    } catch (err) {
      console.warn('Clipboard writeText failed, trying fallback', err)
    }
    try {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Copy fallback failed:', err)
    }
  }

  const handleSelectShareType = (type: 'empty' | 'current') => {
    setShareType(type)
    const url = getShareUrl(type)
    copyToClipboard(url)
  }

  const activeUrl = shareType ? getShareUrl(shareType) : ''

  return (
    <>
      <Button
        size="large"
        variant="text"
        onClick={handleOpen}
        startIcon={<MenuIcon style={{ fontSize: '1.3em' }} />}
        sx={{ fontSize: '0.8em' }}
      >
        Menu
      </Button>
      <Modal
        open={open}
        disableAutoFocus={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <StyledBox>
            <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <div style={{ textAlign: 'center', marginBottom: 2 }}>
              <Typography variant="h2" sx={{ fontWeight: 'lighter' }}>Sudoku</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'lighter' }}>
                by <a href={'http://indieimp.com'}>IndieImp.com</a>
              </Typography>
              <br />
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={handleLoadGame}
                sx={{ marginBottom: '1em' }}
              >
                Load Game
              </Button>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={handleOpenShare}
                startIcon={<ShareIcon />}
                disabled={!gameKey}
                sx={{ marginBottom: '1em' }}
              >
                Share this board
              </Button>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={handleQuitToMainMenu}
                sx={{ marginBottom: '1.5em' }}
              >
                Quit to main menu
              </Button>
              <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }}>
                Change theme
              </Typography>
              <Stack alignItems="center">
                <ThemeSwitch />
              </Stack>
            </div>
          </StyledBox>
        </Fade>
      </Modal>

      <Dialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px', p: 1 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ShareIcon color="primary" />
            <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
              Share this board
            </Typography>
          </Stack>
          <IconButton onClick={() => setShareOpen(false)} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ py: 2.5 }}>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>
            Choose which state of this puzzle you would like to share:
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <Button
              variant={shareType === 'empty' ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleSelectShareType('empty')}
              sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                textTransform: 'none',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Share empty
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Starting puzzle without entered numbers
              </Typography>
            </Button>

            <Button
              variant={shareType === 'current' ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleSelectShareType('current')}
              sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                textTransform: 'none',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Share current game state ({progressPercent}%)
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Includes your entered numbers and progress
              </Typography>
            </Button>
          </Stack>

          {shareType && (
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)' }}>
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, opacity: 0.85 }}>
                {shareType === 'empty' ? 'Link to empty board:' : `Link to current game state (${progressPercent}%):`}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="stretch">
                <TextField
                  fullWidth
                  size="small"
                  value={activeUrl}
                  InputProps={{
                    readOnly: true,
                    sx: { fontFamily: 'monospace', fontSize: '0.85rem' }
                  }}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <Button
                  variant="contained"
                  onClick={() => copyToClipboard(activeUrl)}
                  startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                  sx={{ whiteSpace: 'nowrap', px: 2.5, minWidth: '110px' }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Stack>

              {copied && (
                <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1, fontWeight: 600 }}>
                  Link copied to clipboard!
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 1.5 }}>
          <Button onClick={() => setShareOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MenuModal
