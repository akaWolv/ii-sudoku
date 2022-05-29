import { alpha, colors, Grid, Paper, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import React from 'react'
import MenuModal from 'components/MenuModal'
import styled from 'styled-components'
import { DifficultyLevel } from 'interfaces'

const StyledPaper = styled(Paper)`
  background-color: ${alpha(colors.amber[900], 0.1)} !important;
  padding: 1em;
  color: ${colors.amber[600]} !important;
`

const StyledTopBar = styled(Grid)`
  margin-bottom: 1em;
`

type Props = {
  getStepsToGenerate: Function
  difficultyLevel: DifficultyLevel
}
const TopBar: React.FC<Props> = ({ getStepsToGenerate, difficultyLevel }) => {
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
        <Grid item xs={4}>
          <StyledPaper elevation={3}>
            <Typography variant="h5">Sudoku</Typography>
            <Typography variant="caption">{difficultyLevel.text}</Typography>
          </StyledPaper>
          {/*<span>steps: {getStepsToGenerate()}</span>*/}
        </Grid>
        <Grid item xs={4}>
          <img src={logo} className="App-logo" alt="logo" />
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
