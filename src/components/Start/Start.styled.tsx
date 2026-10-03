import styled from 'styled-components'
import { Paper } from '@mui/material'

const StyledStart = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
`

const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 420px;
  border-radius: 16px !important;
  padding: 2rem 1.75rem !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const StyledLogo = styled.img`
  width: 90px;
  height: auto;
  pointer-events: none;
  margin-bottom: 0.5rem;
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
