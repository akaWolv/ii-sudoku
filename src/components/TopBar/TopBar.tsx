import React  from 'react'
import { Chip, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import logo from 'indieimp.svg'
import MenuModal from 'components/MenuModal'
import { DifficultyLevel } from 'interfaces'
import { StyledLogo, StyledPaper, StyledTopBar } from 'components/TopBar/TopBar.styled'
import type { RootState } from 'stores/stopwatch'

type TopBar = {
  difficultyLevel: DifficultyLevel
}
const TopBar: React.FC<TopBar> = ({ difficultyLevel}) => {
  const time = useSelector((state: RootState) => state.stopwatch.time)
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
            <Chip label={time || <span style={{ opacity: 0.5 }}>00:00</span>}  />
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
