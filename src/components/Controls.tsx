import { Button, Grid } from '@mui/material'
import styled from '@emotion/styled'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';

import { purple } from '@mui/material/colors'
import { Field } from 'interfaces'

type ControlsContainer = {
  $isHighlightedField: boolean
}
const ControlsContainer = styled.div<ControlsContainer>`
  margin-top: 1em;
  position: relative;
  filter: ${({$isHighlightedField}) => $isHighlightedField ? 'none': 'blur(1px) grayscale(100%) opacity(40%)'};
`;
const Bland = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled(Grid)`
  margin-bottom: 0.5em;
`;
const ControlButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.9em;
`;
const StyledSpan = styled.span`
  color: ${purple[100]}
`
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
