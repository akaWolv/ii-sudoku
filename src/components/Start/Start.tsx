import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import logo from 'indieimp.svg'
import DifficultyLevelMenu from '../DifficultyLevelMenu';
import ThemeSwitch from 'components/ThemeSwitch';
import { getSavedGames } from 'helpers/savedGamesStorage';

const Start: React.FC<any> = () => {
  const navigate = useNavigate()
  const savedGamesCount = useMemo(() => getSavedGames().length, [])

  return (
    <StyledStart>
        <StyledLogo src={logo} className="App-logo" alt="logo" />
        <Typography variant="h2">Sudoku</Typography>
        <Typography variant="subtitle2">
          by <a href={'http://indieimp.com'}>IndieImp.com</a>
        </Typography>
        <StyledPaper elevation={4}>
          {savedGamesCount > 0 && (
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<HistoryIcon />}
              onClick={() => navigate('/saved')}
              sx={{
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              Saved Games ({savedGamesCount})
            </Button>
          )}
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
