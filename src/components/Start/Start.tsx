import React  from 'react'
import {
  colors,
  Grid,
  Typography
} from '@mui/material'
import { StyledGrid, StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import logo from 'indieimp.svg'
import DifficultyLevelMenu from '../DifficultyLevelMenu';

const Start: React.FC<any> = () => {
  return (
    <StyledStart>
      <StyledGrid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <StyledPaper elevation={4}>
            <Grid container direction="row" alignItems="center" justifyContent="center">
              <Grid item>
                <StyledLogo src={logo} className="App-logo" alt="logo" />
              </Grid>
              <Grid item sx={{ textAlign: 'left', paddingLeft: '1em' }}>
                <Typography variant="h2">Sudoku</Typography>
                <Typography variant="subtitle2">
                  by <a href={'http://indieimp.com'}>IndieImp.com</a>
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} alignItems="center" justifyContent="center">
          <StyledPaper elevation={4}>
            <Typography variant="h5" sx={{ fontWeight: 'lighter', marginBottom: '1em' }} >New Game</Typography>
            <Grid container alignItems="center" justifyContent="center">
              <DifficultyLevelMenu isRwd={true} />
            </Grid>
          </StyledPaper>
        </Grid>
      </StyledGrid>
    </StyledStart>
  )
}

export default Start
