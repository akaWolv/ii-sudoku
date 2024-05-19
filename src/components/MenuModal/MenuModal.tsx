import React from 'react'
import { Backdrop, Button, Fade, IconButton, Modal, Stack, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DifficultyLevelMenu from '../DifficultyLevelMenu';
import { StyledBox } from './MenuModal.styled';
import ThemeSwitch from 'components/ThemeSwitch';
import CloseIcon from '@mui/icons-material/Close';

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
        startIcon={<MenuIcon style={{ fontSize: '1.3em' }} />}
        sx={{ fontSize: '0.8em'}}
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
          <StyledBox>
            <IconButton sx={{position: 'absolute', top: 0, right: 0}} onClick={handleClose}><CloseIcon /></IconButton>
            <div style={{ textAlign: 'center', marginBottom: 2 }}>
              <Typography variant="h2" sx={{ fontWeight: 'lighter' }}>Sudoku</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'lighter' }}>
                by <a href={'http://indieimp.com'}>IndieImp.com</a>
              </Typography>
              <br />
              <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }} >Start New Game</Typography>
              <DifficultyLevelMenu />
              <br />
              <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }} >Change theme</Typography>
              <Stack alignItems="center">
                <ThemeSwitch />
              </Stack>
            </div>
          </StyledBox>
        </Fade>
      </Modal>
    </>
  )
}
export default MenuModal
