import { createTheme } from '@mui/material/styles'
import { colors } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '2.3rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 400
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    caption: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.3
    }
  },
  // breakpoints: {
  //   values: {
  //     xs: 600,
  //     sm: 1300,
  //     md: 1500,
  //     lg: 1700,
  //     xl: 2000
  //   }
  // },
  palette: {
    mode: 'light',
    primary: {
      light: colors.amber[600],
      main: colors.amber[600],
      dark: colors.amber[600]
    },
    secondary: {
      light: colors.pink[400],
      main: colors.pink[600],
      dark: colors.pink[800]
    },
    text: {
      primary: colors.grey[100],
      secondary: colors.grey[600]
    }

  },
  spacing: 8,
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // color: colors.grey[100],
          // color: colors.purple[200],
          outlined: {
            boxShadow: 'none',
            // backgroundColor: colors.yellow600,
            '&:hover': {
              // backgroundColor: colors.yellow400
            }
          },
          text: {
            boxShadow: 'none',
            '&:hover': {
              // backgroundColor: colors.yellow400
            },
            '&:active': {
            },
          }
        },
      }
    }
  }
})

export default theme
