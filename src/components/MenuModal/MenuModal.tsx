import React from 'react'
import { Backdrop, Box, Button, Chip, colors, Fade, Grid, Modal, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Colors from 'constants/Colors'
import DifficultyLevelMenu from '../DifficultyLevelMenu';

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
  p: 3,
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
              <Typography variant="h2" sx={{ fontWeight: 'lighter' }}>Sudoku</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'lighter' }}>
                by <a href={'http://indieimp.com'}>IndieImp.com</a>
              </Typography>
              <br />
              <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }} >Start New Game</Typography>
              <DifficultyLevelMenu />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default MenuModal
