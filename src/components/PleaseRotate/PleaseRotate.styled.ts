import styled, { keyframes } from 'styled-components'
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone'
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone'
import Colors from 'constants/Colors';

const StyledPleaseRotate = styled.div`
  display: none;
  @media only screen and (orientation:landscape) and (max-height: 700px)
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.palette.mode == 'light' ? Colors.IMP_LIGHT_WHITE : Colors.IMP_LIGHT_GREY};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${Colors.IMP_ORANGE}
  }
`

const rotateAnimation = keyframes`
  0% { transform: rotate(90deg) }
  50% { transform: rotate(0deg) }
  100% { transform: rotate(0deg) }
`
const StyledRotatingCombined = styled.div`
  margin: 0;
  padding: 0;
  animation: ${rotateAnimation} 1.5s ease-in-out infinite alternate;
`
type StyledLogo = {
  $isiOS: boolean;
}
const StyledLogo = styled.img<StyledLogo>`
  width: ${({ $isiOS }) => $isiOS ? '55px' : '60px' };
  top: 40px;
  left: 45px;
  pointer-events: none;
  position: absolute;
`

const StyledPhoneIphoneIcon = styled(PhoneIphoneTwoToneIcon)`
  color: black;
`
const StyledPhoneAndroidIcon = styled(PhoneAndroidTwoToneIcon)`
  color: black;
`

export {
  StyledLogo,
  StyledPhoneIphoneIcon,
  StyledPhoneAndroidIcon,
  StyledPleaseRotate,
  StyledRotatingCombined
}
