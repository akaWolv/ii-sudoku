import { useEffect, useState } from 'react'
import logo from '../indieimp.svg'
import '../App.css'
import { Grid } from '@mui/material'
import Tile from './Tile'
import { Field } from 'interfaces'
import useBoardManager from '_hooks/useBoardManager'
import Group from 'constants/Group'

function Board() {
  const [fieldList, setFieldList] = useState<Field[]>([])

  const [highlightedField, setHighlightedField] = useState<Field | null>(null)
  const { getFieldList, getStepsToGenerate } = useBoardManager()

  useEffect(() => {
    console.log('render!');
    const generatedFielList = getFieldList()
    console.log(generatedFielList)
    setFieldList(generatedFielList)
  }, [])

  console.log('Hello from the component!');

  return (
    <div>
      {/*<header className="App-header">*/}
      {/*  Sudoku*/}
      {/*</header>*/}
      <img src={logo} className="App-logo" alt="logo" />
      <span style={{ position: 'absolute', top: 5, left: 5 }}>steps: {getStepsToGenerate()}</span>
      <span style={{ position: 'absolute', top: 20, left: 5 }}>id: {highlightedField?.id || 'none'}</span>
      <span style={{ position: 'absolute', top: 35, left: 5 }}>s: {undefined != highlightedField?.square ? Group[highlightedField.square] : 'none'}</span>
      <span style={{ position: 'absolute', top: 50, left: 5 }}>h: {undefined != highlightedField?.hLine ? Group[highlightedField.hLine] : 'none'}</span>
      <span style={{ position: 'absolute', top: 65, left: 5 }}>v: {undefined != highlightedField?.vLine ? Group[highlightedField.vLine] : 'none'}</span>
      <Grid container spacing={0} columns={9}>
        {
          fieldList.map(field => {
              const { id } = field
              return (
                <Tile
                  key={id}
                  field={field}
                  highlightedField={highlightedField || undefined}
                  handlePick={setHighlightedField}
                />
              )
            }
          )
        }
      </Grid>
    </div>
  )
}

export default Board
