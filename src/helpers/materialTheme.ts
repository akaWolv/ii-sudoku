import { Theme, createTheme } from '@mui/material/styles'
import { colors } from '@mui/material'
import Colors from 'constants/Colors'
const { IMP_DARK_GREY, IMP_DARK_WHITE, IMP_LIGHT_GREY, IMP_LIGHT_WHITE, IMP_PINK, IMP_ORANGE } = Colors

const generateTheme = (selectedThemeColor: 'light' | 'dark' = 'light'): Theme => {
  const themeColor = (light: string, dark: string): string => selectedThemeColor == 'light' ? light : dark
  return createTheme({
    palette: {
      mode: selectedThemeColor,
      primary: {
        light: IMP_LIGHT_WHITE,
        main: IMP_ORANGE,
        dark: IMP_LIGHT_GREY
      },
      secondary: {
        light: IMP_DARK_WHITE,
        main: IMP_PINK,
        dark: IMP_DARK_GREY
      }
    },
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
        fontWeight: 200
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 200
      },
      h4: {
        fontSize: '1.3rem',
        fontWeight: 200
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: 200
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 200,
        lineHeight: 1.5
      },
      caption: {
        fontSize: '1em',
        fontWeight: 400,
        lineHeight: 1.3
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 850,
        lg: 950,
        xl: 1100
      },
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            overscrollBehavior: 'none',
            minHeight: '100%',
          },
          body: {
            color: IMP_ORANGE,
            backgroundImage: themeColor(
              `linear-gradient(130deg, ${IMP_LIGHT_WHITE}, ${IMP_DARK_WHITE});`,
              `linear-gradient(130deg, ${IMP_LIGHT_GREY}, ${IMP_DARK_GREY});`
            ),
            margin: '2vh 0',
            padding: '10px 0',
            minHeight: '100%',
            fontFamily: 'Lato, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }
        }
      },
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
            color: themeColor(colors.grey[800], colors.grey[400]),
            boxShadow: 'none'
          },
          contained: {
            color: themeColor(colors.grey[100], colors.grey[800]),
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: themeColor(IMP_ORANGE, colors.grey[400])
          },
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            color: IMP_ORANGE,
            backgroundColor: themeColor(IMP_DARK_WHITE, IMP_DARK_GREY),
            padding: '10px',
            marginBottom: '10px',
          },
        },
      },
    }
  })
}

export default generateTheme
