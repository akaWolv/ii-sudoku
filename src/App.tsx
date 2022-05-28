import React, { useEffect, VoidFunctionComponent } from 'react'
import AppProvider from 'common/AppProvider'
import Game from 'components/Game'
import logo from 'indieimp.svg'

const App = () => {
  useEffect(() => {
    console.log('render! APP');
  }, [])

  return (
    <AppProvider>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Game />
      </div>
    </AppProvider>
  )
}

export default App
