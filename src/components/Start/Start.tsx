import React, { useEffect } from 'react'
import { Button, Chip, colors, Grid, Typography } from '@mui/material'
import { StyledGrid, StyledLogo, StyledPaper, StyledStart } from 'components/Start/Start.styled'
import DifficultyLevelList from 'constants/DifficultLevelList'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import logo from 'indieimp.svg'

const Start: React.FC<any> = () => {
  return <StyledStart>
    <StyledGrid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {/*<StyledLogo src={logo_o} className="App-logo" alt="logo" />*/}
        <StyledLogo src={logo} className="App-logo" alt="logo" />
        {/*<StyledLogo src={logo_p} className="App-logo" alt="logo" />*/}
      </Grid>
      <Grid item xs={12}>
        <StyledPaper elevation={4}>
          <Typography variant="h2">Sudoku</Typography>
        </StyledPaper>
      </Grid>
          {
            DifficultyLevelList.map(({ key, text, staticTiles, isHintingEnabled}) => (
              <Grid key={key} item xs={12}>
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
                  {isHintingEnabled && <Chip icon={<LightbulbIcon />} label="Hints" sx={{ position: 'absolute', right: 5, color: colors.grey[400] }} />}
                </Button>
              </Grid>
              )
            )
          }
    </StyledGrid>
  </StyledStart>
}

export default Start
