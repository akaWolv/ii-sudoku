import { ThemeColorMode } from 'interfaces';
import { createContext } from 'react';

type ThemeColorModeContext = {
  mode: ThemeColorMode,
  switchTheme: () => void
}

const ThemeColorModeContext = createContext<ThemeColorModeContext>({
  mode: 'light',
  switchTheme: () => {}
})
export default ThemeColorModeContext
