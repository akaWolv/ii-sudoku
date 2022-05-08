import { useState } from 'react'
import { Box, Button, Grid, Popper } from '@mui/material'
import styled from '@emotion/styled'
import { purple } from '@mui/material/colors'

const ButtonContainer = styled(Grid)`
  flex-grow: 1;
  aspect-ratio: 1 / 1;
`;
const ControlButton = styled(Button)`
  flex-grow: 1;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 6.5vw;
`;
const StyledSpan = styled.span`
  color: ${purple[200]}
`

const ControlsItems = [
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' },
  { text: '5' },
  { text: '6' },
  { text: '7' },
  { text: '8' },
  { text: '9' },
  { text: 'x' },
]

function Controls() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'controls-popper' : undefined;

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        <Grid container spacing={0} columns={3}>
          {
            ControlsItems.map(({ text }) => (
              <ButtonContainer item xs={1}>
                <ControlButton variant="outlined">
                  <StyledSpan>
                    {text}
                  </StyledSpan>
                </ControlButton>
              </ButtonContainer>
            ))
          }
        </Grid>
      </Box>
    </Popper>
  )
}

export default Controls
