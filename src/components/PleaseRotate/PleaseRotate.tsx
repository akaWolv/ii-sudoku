import React from 'react'
import logo from 'indieimp.svg'
import { Typography } from '@mui/material'
import {
  StyledLogo,
  StyledPhoneIphoneIcon,
  StyledPhoneAndroidIcon,
  StyledPleaseRotate,
  StyledRotatingCombined
} from './PleaseRotate.styled'

const PleaseRotate: React.FC<any> = () => {
  const isiOS = (() => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  })()

  return (
    <StyledPleaseRotate>
      <StyledRotatingCombined>
        <StyledLogo src={logo} alt="logo" $isiOS={isiOS} />
        {
          isiOS
            ? <StyledPhoneIphoneIcon sx={{ fontSize: 150 }} />
            : <StyledPhoneAndroidIcon sx={{ fontSize: 150 }} />
        }
      </StyledRotatingCombined>
      <Typography variant="h2">Please rotate your device!</Typography>
    </StyledPleaseRotate>
  )
}

export default PleaseRotate
