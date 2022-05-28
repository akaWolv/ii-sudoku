import '../App.css'
import { Grid } from '@mui/material'
import Tile from './Tile'
import { Field } from 'interfaces'

interface Board {
  fieldList: Field[]
  highlightedField: Field|undefined,
  setHighlightedField: Function
}

function Board({ fieldList, highlightedField, setHighlightedField }: Board) {
  return (
    <div>
      <Grid container spacing={0} columns={9}>
        {
          fieldList.map(field => {
              const { id } = field
              return (
                <Tile
                  key={id}
                  field={field}
                  highlightedField={highlightedField}
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
