import React from 'react'
import {
  Button,
  Chip,
  colors,
  Grid,
} from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import DifficultyLevelList from 'constants/DifficultLevelList'

type DifficultyLevelMenu = {
  isRwd: boolean
}
const DifficultyLevelMenu: React.FC<any> = ({ isRwd }) => {
  const rwd = isRwd ? { md: 8, sm: 10, xs: 12 } : { md: 12, sm: 12, xs: 12}
  return (
    <>
      {
        DifficultyLevelList.map(({key, text, staticTiles, isHintingEnabled, isDefault}) => (
            <Grid key={key} item md={rwd.md} sm={rwd.sm} xs={rwd.xs}>
              <Button
                size="large"
                key={key}
                variant="outlined"
                onClick={() => {
                  window.location.href = `/${key}`
                }}
                fullWidth={true}
                sx={{
                  marginBottom: 1,
                  color: colors.grey[100],
                  textDecoration: isDefault ? "underline" : "inherit",
                  textDecorationColor: 'gray'
                }}
              >
                <Chip
                  size="small"
                  icon={<AppRegistrationIcon style={{color: colors.grey[600]}}/>}
                  label={`${staticTiles} / 81`}
                  sx={{position: 'absolute', left: 5, color: colors.grey[400]}}
                />
                {`${text}`}
                {isHintingEnabled && <Chip size="small" icon={<LightbulbIcon style={{color: colors.grey[600] }} />} label="Hints"
                                           sx={{position: 'absolute', right: 5, color: colors.grey[400]}}/>}
              </Button>
            </Grid>
          )
        )
      }
    </>
  )
}

export default DifficultyLevelMenu
