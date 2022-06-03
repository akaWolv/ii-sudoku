import { Grid } from '@mui/material'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Field } from 'interfaces'
import {
  Bland,
  ButtonContainer,
  ControlButton,
  ControlsContainer,
  StyledSpan
} from 'components/Controls/Controls.styled'

const ControlsItems = [
  { value: 0, text: <BackspaceRoundedIcon /> },
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' },
  { value: 5, text: '5' },
  { value: 6, text: '6' },
  { value: 7, text: '7' },
  { value: 8, text: '8' },
  { value: 9, text: '9' },
]

interface Controls {
  changeSelectedFieldValue: Function
  highlightedField?: Field
}

function Controls({ changeSelectedFieldValue, highlightedField }: Controls) {
  const isHighlightedField = () => Boolean(highlightedField && !highlightedField.isStatic)

  return (
    <ControlsContainer $isHighlightedField={isHighlightedField()}>
      <Grid
        container
        spacing={1}
        columns={10}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        {
          ControlsItems.map(({ text, value }) => (
            <ButtonContainer key={String(value)} item xs={2} sm={1} md={4}>
              <ControlButton variant="outlined" onClick={() => {changeSelectedFieldValue(value)}}>
                <StyledSpan>
                  {text}
                </StyledSpan>
              </ControlButton>
            </ButtonContainer>
          ))
        }
      </Grid>
      {!isHighlightedField() && <Bland />}
    </ControlsContainer>
  )
}

export default Controls
