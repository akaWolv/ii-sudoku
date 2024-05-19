import { ReactElement, ReactNode } from 'react'
import { store } from 'stores/stopwatch'
import { Provider } from 'react-redux'
import ThemeProvider from './ThemeProvider'

const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider>
          {children}
      </ThemeProvider>
    </Provider>
  )
}

export default AppProvider
