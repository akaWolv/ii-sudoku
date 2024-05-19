import React  from 'react'
import { Grid, Typography } from '@mui/material'
import { StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import logo from 'indieimp.svg'
import DifficultyLevelMenu from '../DifficultyLevelMenu';
import ThemeSwitch from 'components/ThemeSwitch';

const Start: React.FC<any> = () => {
  return (
    <StyledStart>
        <StyledLogo src={logo} className="App-logo" alt="logo" />
        <Typography variant="h2">Sudoku</Typography>
        <Typography variant="subtitle2">
          by <a href={'http://indieimp.com'}>IndieImp.com</a>
        </Typography>
        <StyledPaper elevation={4}>
          <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }} >Start New Game</Typography>
          <Grid container alignItems="center" justifyContent="center">
            <DifficultyLevelMenu isRwd={true} />
          </Grid>
        </StyledPaper>
        <ThemeSwitch />
    </StyledStart>
  )
}

export default Start
