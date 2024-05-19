import { ReactElement, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { CssBaseline, ThemeProvider as MaterialThemeProvider } from '@mui/material'
import Cookie from 'js-cookie'

import generateTheme from 'helpers/materialTheme'
import { store } from 'stores/stopwatch'
import { Provider } from 'react-redux'
import ThemeColorModeContext from 'context/ThemeColorModeContext';
import { ThemeColorMode } from 'interfaces';

const THEME_MODE_COOKIE_NAME = 'themeMode'

const ThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const savedThemeMode = Cookie.get(THEME_MODE_COOKIE_NAME) as ThemeColorMode || undefined;
  const { mode } = useContext(ThemeColorModeContext);

  const switchTheme = () => {
    setThemeColorMode(({ mode }) => {
      const newMode = mode == 'light' ? 'dark' : 'light'
      Cookie.set(THEME_MODE_COOKIE_NAME, String(newMode))
      return {
        mode: newMode,
        switchTheme
      }
    })
  }
  const [themeColorMode, setThemeColorMode] = useState<ThemeColorModeContext>({ mode: savedThemeMode || mode, switchTheme });

  // is this necessery?
  useEffect(() => {
    // get cookie
    const savedThemeMode = Cookie.get(THEME_MODE_COOKIE_NAME) as ThemeColorMode || undefined;
    if (savedThemeMode) {
      setThemeColorMode({ mode: savedThemeMode, switchTheme })
    } else {
      // set default
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeColorMode({ mode: 'dark', switchTheme })
      } else {
        setThemeColorMode({ mode: 'light', switchTheme })
      }
    }
  }, [])

  useEffect(() => {
    // set browser theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColorMode.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark);
  }, [themeColorMode.mode])

  // const theme = generateTheme(themeColorMode.mode)
  const theme = useMemo(() => generateTheme(themeColorMode.mode), [themeColorMode.mode])
  return (
    <ThemeColorModeContext.Provider value={themeColorMode}>
      <Provider store={store}>
        <MaterialThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </StyledThemeProvider>
        </MaterialThemeProvider>
      </Provider>
    </ThemeColorModeContext.Provider>
  )
}

export default ThemeProvider
