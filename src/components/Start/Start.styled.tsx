import styled from 'styled-components'
import { Paper } from '@mui/material'

const StyledStart = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
`

const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 420px;
  border-radius: 16px !important;
  padding: 1.5rem 1.25rem !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const StyledLogo = styled.img`
  width: 76px;
  height: auto;
  pointer-events: none;
  margin-bottom: 0.25rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(5deg) scale(1.05);
  }
`

export {
  StyledPaper,
  StyledLogo,
  StyledStart
}
