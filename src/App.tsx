import React, { useEffect, VoidFunctionComponent } from 'react'
import AppProvider from 'common/AppProvider'
import Board from './components/Board'
import Controls from 'components/Controls'

const App = () => {
  useEffect(() => {
    console.log('render! APP');
  }, [])

  return (
    <AppProvider>
      <div className="App">
        <Board />
        <Controls />
      </div>
    </AppProvider>
  )
}

export default App
