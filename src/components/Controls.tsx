import { Button, Grid, IconButton } from '@mui/material'
import styled from '@emotion/styled'

import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import { purple } from '@mui/material/colors'

const ControlsContainer = styled.div`
  margin-top: 2em;
`;

const ButtonContainer = styled(Grid)`
`;
const ControlButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 6.5vw;
`;
const StyledSpan = styled.span`
  color: ${purple[100]}
`
const ControlsItems = [
  { value: 0, text: 'x' },
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

function Controls() {

  return (
    <ControlsContainer>
      <Grid container spacing={1} columns={5}>
        {
          ControlsItems.map(({ text }) => (
            <ButtonContainer key={text} item xs={1}>
              <ControlButton variant="outlined">
                <StyledSpan>
                  {text}
                </StyledSpan>
              </ControlButton>
            </ButtonContainer>
          ))
        }
      </Grid>
    </ControlsContainer>
  )
}

export default Controls
