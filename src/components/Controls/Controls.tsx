import { Grid } from '@mui/material'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Field } from 'interfaces'
import {
  Bland,
  ButtonContainer,
  StyledControlButton,
  ControlsContainer,
  StyledSpan
} from 'components/Controls/Controls.styled'

const ControlsItems = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' },
  { value: 5, text: '5' },
  { value: 6, text: '6' },
  { value: 7, text: '7' },
  { value: 8, text: '8' },
  { value: 9, text: '9' },
  { value: 0, text: <BackspaceRoundedIcon /> },
]

type Props = {
  changeSelectedFieldValue: Function,
  forbiddenValuesForField: number[],
  isHintingEnabled: boolean,
  highlightedField?: Field
}

const Controls: React.FC<Props> = (
  {
    changeSelectedFieldValue,
    isHintingEnabled,
    forbiddenValuesForField,
    highlightedField
  }) => {
  const isHighlightedField = () => Boolean(highlightedField && !highlightedField.isStatic)

  return (
    <ControlsContainer $isHighlightedField={isHighlightedField()}>
      <div>
        <Grid
          container
          columns={10}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {
            ControlsItems.map(({ text, value }) => {
              let isDisabled = false
              if (isHintingEnabled) {
                isDisabled = (highlightedField && highlightedField.value === null && value === 0)
                  || forbiddenValuesForField.includes(value)
              }

              return (
                <ButtonContainer key={String(value)} item xs={2} sm={2} md={4} lg={4} xl={3}>
                  <StyledControlButton
                    variant="outlined"
                    onClick={() => {
                      changeSelectedFieldValue(value)
                    }}
                    disabled={isDisabled}
                    $isDisabled={isDisabled}
                  >
                    <StyledSpan>
                      {text}
                    </StyledSpan>
                  </StyledControlButton>
                </ButtonContainer>
              )
            })
          }
        </Grid>
        {!isHighlightedField() && <Bland />}
      </div>
    </ControlsContainer>
  )
}

export default Controls
