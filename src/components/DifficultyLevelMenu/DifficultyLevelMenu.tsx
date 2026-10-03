import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Chip, Grid } from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import DifficultyLevelList from 'constants/DifficultLevelList'

type DifficultyLevelMenu = {
  isRwd: boolean
}
const DifficultyLevelMenu: React.FC<any> = ({ isRwd }) => {
  const navigate = useNavigate()
  const rwd = isRwd ? { md: 8, sm: 10, xs: 12 } : { md: 12, sm: 12, xs: 12 }
  return (
    <>
      {
        DifficultyLevelList.map(({ key, text, staticTiles, isHintingEnabled, isDefault }) => (
          <Grid key={key} item md={rwd.md} sm={rwd.sm} xs={rwd.xs}>
            <Button
              size="large"
              key={key}
              variant="outlined"
              onClick={() => {
                navigate(`/${key}`)
              }}
              fullWidth={true}
              sx={{
                marginBottom: 1,
                textDecoration: isDefault ? "underline" : "inherit",
                textDecorationColor: 'gray'
              }}
            >
              <>
                <Chip
                  size="small"
                  variant='outlined'
                  icon={<AppRegistrationIcon />}
                  label={`${staticTiles} / 81`}
                  sx={{ position: 'absolute', left: 5 }}
                />
                {text}
                {
                  isHintingEnabled
                  || (
                    <Chip
                      size="small"
                      variant='outlined'
                      label="no hints"
                      sx={{ position: 'absolute', right: 5 }}
                    />
                  )
                }
              </>
            </Button>
          </Grid>
        )
        )
      }
    </>
  )
}

export default DifficultyLevelMenu
