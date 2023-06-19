import React from 'react'
import { Chip, Grid, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import MenuModal from 'components/MenuModal'
import { DifficultyLevel } from 'interfaces'
import { StyledLogo, StyledPaper, StyledTopBar } from 'components/TopBar/TopBar.styled'

type Props = {
  difficultyLevel: DifficultyLevel
  getStopwatch: Function
}
const TopBar: React.FC<Props> = ({ difficultyLevel , getStopwatch}) => {
  return (
    <StyledTopBar
      container
      spacing={0}
      direction={"row"}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        item
        xs={12}
        sm={11}
        md={11}
        lg={11}
      >
        <Grid item xs={4} sx={{position: 'relative'}}>
          <StyledPaper elevation={3}>
            <Typography variant="h5">SUDOKU</Typography>
            <Typography variant="caption">{difficultyLevel.text}</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column'}}>
          <a href="http://indieimp.com">
            <StyledLogo src={logo} className="App-logo" alt="logo" />
          </a>
          <div>
            <Chip label={getStopwatch()}  />
          </div>
        </Grid>
        <Grid item  xs={4}>
          <StyledPaper elevation={3}>
            <MenuModal />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledTopBar>
  )
}
export default TopBar
