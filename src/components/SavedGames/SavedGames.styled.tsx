import styled from 'styled-components'
import { Paper } from '@mui/material'

export const StyledSavedGamesContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 85vh;
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const StyledFilterPaper = styled(Paper)`
  padding: 14px 18px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StyledGameCard = styled(Paper)`
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

export const StyledGameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`

export const StyledProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StyledEmptyState = styled(Paper)`
  padding: 40px 20px;
  text-align: center;
  margin-top: 20px;
`
