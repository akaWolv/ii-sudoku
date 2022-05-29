import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, Box, Button, colors, Fade, IconButton, Modal, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import DifficultyLevelList from 'constants/DifficultLevelList'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 300,
  color: colors.amber[600],
  bgcolor: colors.grey[900],
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MenuModal = () => {
  const navigate = useNavigate()
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
                DifficultyLevelList.map(({ key, text , staticTiles}) => (
                  <Button
                    key={key}
                    variant='outlined'
                    onClick={() => {
                      navigate(`/${key}`)
                      window.location.reload()
                    }}
                    fullWidth={true}>
                    {`${text} (${staticTiles} tiles)`}
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
