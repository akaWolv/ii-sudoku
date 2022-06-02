import { Chip, colors, Grid, Paper, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import React, { useEffect } from 'react'
import MenuModal from 'components/MenuModal'
import styled from 'styled-components'
import { DifficultyLevel } from 'interfaces'
import Colors from 'constants/Colors'

const StyledPaper = styled(Paper)`
  background-color: ${Colors.IMP_LIGHT_GREY} !important;
  padding: 1em;
  color: ${Colors.IMP_PINK} !important;
`

const StyledTopBar = styled(Grid)`
  margin-bottom: 1em;
`

const StyledLogo = styled.img`
  height: 70px;
  pointer-events: none;
`
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
        sm={12}
        md={8}
        lg={6}
      >
        <Grid item xs={4} sx={{position: 'relative'}}>
          <StyledPaper elevation={3}>
            <Typography variant="h5">SUDOKU</Typography>
            <Typography variant="caption">{difficultyLevel.text}</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', flexDirection: 'column'}}>
          <StyledLogo src={logo} className="App-logo" alt="logo" />
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
