import React from 'react'
import { Backdrop, Box, Button, Chip, colors, Fade, Modal, Typography } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import MenuIcon from '@mui/icons-material/Menu'
import DifficultyLevelList from 'constants/DifficultLevelList'
import Colors from 'constants/Colors'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 300,
  color: Colors.IMP_ORANGE,
  bgcolor: colors.grey[900],
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MenuModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        size='large'
        variant="text"
        onClick={handleOpen}
        startIcon={<MenuIcon />}
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
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <div style={{ textAlign: 'center', marginBottom: 2 }}>
              <Typography variant="h2">Game Menu</Typography>
              <Typography variant="h6">Sudoku by <i>Indie Imp</i></Typography>
              <br />
              <Typography variant="h4" gutterBottom={true}>New Game</Typography>
              {
                DifficultyLevelList.map(({ key, text, staticTiles, isHintingEnabled}) => (
                  <Button
                    size='large'
                    key={key}
                    variant='outlined'
                    onClick={() => {
                      window.location.href = `/${key}`
                    }}
                    fullWidth={true}
                    sx={{ marginBottom: 1, color: colors.grey[100] }}
                  >
                    <Chip icon={<HelpCenterIcon />} label={`${81 - staticTiles}`} sx={{ position: 'absolute', left: 5, color: colors.grey[400] }} />
                    {`${text} `}
                    {isHintingEnabled && <Chip icon={<LightbulbIcon />} label={`hints`} sx={{ position: 'absolute', right: 5, color: colors.grey[400] }} />}
                  </Button>)
                )
              }
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default MenuModal
