import { useState } from 'react'
import logo from '../indieimp.svg'
import '../App.css'
import { Grid } from '@mui/material'
import Tile from './Tile'
import Group from 'constants/Group'
import { Field } from 'interfaces'


function Board() {
  const [highlightedField, setHighlightedField] = useState<Field | null>(null)
  const value = () => Math.floor(Math.random() * (9 - 1)) + 1
  const fieldList: Field[] = [
    { id: '1-9', x: 1, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_1, value: value()},
    { id: '2-9', x: 2, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_2, value: value()},
    { id: '3-9', x: 3, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_3, value: value(), isStatic: true},
    { id: '4-9', x: 4, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_4, value: value()},
    { id: '5-9', x: 5, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_5, value: value()},
    { id: '6-9', x: 6, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_6, value: value()},
    { id: '7-9', x: 7, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_7, value: value(), isStatic: true},
    { id: '8-9', x: 8, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_8, value: value()},
    { id: '9-9', x: 9, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_9, value: value()},

    { id: '1-8', x: 1, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_1, value: value()},
    { id: '2-8', x: 2, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_2, value: value()},
    { id: '3-8', x: 3, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_3, value: value(), isStatic: true},
    { id: '4-8', x: 4, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_4, value: value()},
    { id: '5-8', x: 5, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_5, value: value()},
    { id: '6-8', x: 6, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_6, value: value()},
    { id: '7-8', x: 7, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_7, value: value()},
    { id: '8-8', x: 8, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_8, value: value()},
    { id: '9-8', x: 9, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_9, value: value()},

    { id: '1-7', x: 1, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_1, value: value()},
    { id: '2-7', x: 2, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_2, value: value()},
    { id: '3-7', x: 3, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_3, value: value()},
    { id: '4-7', x: 4, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_4, value: value()},
    { id: '5-7', x: 5, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_5, value: value()},
    { id: '6-7', x: 6, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_6, value: value()},
    { id: '7-7', x: 7, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_7, value: value()},
    { id: '8-7', x: 8, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_8, value: value()},
    { id: '9-7', x: 9, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_9, value: value()},

    { id: '1-6', x: 1, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_1, value: value()},
    { id: '2-6', x: 2, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_2, value: value()},
    { id: '3-6', x: 3, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_3, value: value()},
    { id: '4-6', x: 4, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_4, value: value(), isStatic: true},
    { id: '5-6', x: 5, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_5, value: value()},
    { id: '6-6', x: 6, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_6, value: value()},
    { id: '7-6', x: 7, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_7, value: value()},
    { id: '8-6', x: 8, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_8, value: value()},
    { id: '9-6', x: 9, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_9, value: value()},

    { id: '1-5', x: 1, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_1, value: value()},
    { id: '2-5', x: 2, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_2, value: value()},
    { id: '3-5', x: 3, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_3, value: value()},
    { id: '4-5', x: 4, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_4, value: value()},
    { id: '5-5', x: 5, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_5, value: value()},
    { id: '6-5', x: 6, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_6, value: value(), isStatic: true},
    { id: '7-5', x: 7, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_7, value: value()},
    { id: '8-5', x: 8, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_8, value: value()},
    { id: '9-5', x: 9, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_9, value: value()},

    { id: '1-4', x: 1, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_1, value: value()},
    { id: '2-4', x: 2, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_2, value: value()},
    { id: '3-4', x: 3, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_3, value: value()},
    { id: '4-4', x: 4, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_4, value: value()},
    { id: '5-4', x: 5, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_5, value: value()},
    { id: '6-4', x: 6, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_6, value: value()},
    { id: '7-4', x: 7, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_7, value: value()},
    { id: '8-4', x: 8, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_8, value: value()},
    { id: '9-4', x: 9, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_9, value: value()},

    { id: '1-3', x: 1, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_1, value: value()},
    { id: '2-3', x: 2, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_2, value: value()},
    { id: '3-3', x: 3, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_3, value: value()},
    { id: '4-3', x: 4, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_4, value: value()},
    { id: '5-3', x: 5, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_5, value: value()},
    { id: '6-3', x: 6, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_6, value: value()},
    { id: '7-3', x: 7, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_7, value: value()},
    { id: '8-3', x: 8, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_8, value: value()},
    { id: '9-3', x: 9, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_9, value: value()},

    { id: '1-2', x: 1, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_1, value: value()},
    { id: '2-2', x: 2, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_2, value: value()},
    { id: '3-2', x: 3, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_3, value: value()},
    { id: '4-2', x: 4, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_4, value: value()},
    { id: '5-2', x: 5, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_5, value: value()},
    { id: '6-2', x: 6, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_6, value: value()},
    { id: '7-2', x: 7, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_7, value: value()},
    { id: '8-2', x: 8, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_8, value: value()},
    { id: '9-2', x: 9, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_9, value: value()},

    { id: '1-1', x: 1, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_1, value: value()},
    { id: '2-1', x: 2, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_2, value: value()},
    { id: '3-1', x: 3, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_3, value: value()},
    { id: '4-1', x: 4, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_4, value: value()},
    { id: '5-1', x: 5, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_5, value: value()},
    { id: '6-1', x: 6, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_6, value: value()},
    { id: '7-1', x: 7, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_7, value: value()},
    { id: '8-1', x: 8, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_8, value: value()},
    { id: '9-1', x: 9, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_9, value: value()},
  ]

  return (
    <div>
      {/*<header className="App-header">*/}
      {/*  Sudoku*/}
      {/*</header>*/}
      <img src={logo} className="App-logo" alt="logo" />
      <span style={{ position: 'absolute', top: 5, left: 5 }}>{highlightedField?.id || 'none'}</span>
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
