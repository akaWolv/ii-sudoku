import { useContext, useState } from "react";
import { FormGroup, Stack, Switch, Typography } from "@mui/material"
import NightlightIcon from '@mui/icons-material/Nightlight';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ThemeColorModeContext from "context/ThemeColorModeContext";
import Colors from "constants/Colors";

function ThemeSwitch() {
  const {mode, switchTheme} = useContext(ThemeColorModeContext);
  const handleChange = () => switchTheme()
  const checked = mode == 'dark'

  return (
    <FormGroup>
      <Stack direction="row" spacing={0} alignItems="center">
        <Brightness5Icon sx={{color: checked ? Colors.IMP_DARK_WHITE : 'inherited'}} />
        <Switch 
          color="default"
          checked={checked}
          onChange={handleChange}
         />
        <NightlightIcon sx={{color: checked ? 'inherited' : Colors.IMP_LIGHT_GREY}} />
      </Stack>
    </FormGroup>
  )
}

export default ThemeSwitch
