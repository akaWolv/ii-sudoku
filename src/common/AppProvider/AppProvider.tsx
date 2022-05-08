import React, { ReactElement, ReactNode } from 'react'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material'
import theme from 'helpers/materialTheme'

const AppProvider = ({ children }: {children: ReactNode}): ReactElement => (
    <MaterialThemeProvider theme={theme}>
      {children}
    </MaterialThemeProvider>
)

export default AppProvider
