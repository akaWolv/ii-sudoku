import React, { VoidFunctionComponent } from 'react'
import AppProvider from 'common/AppProvider'
import Board from './components/Board'
import Controls from 'components/Controls'

const App: VoidFunctionComponent = () => (
  <AppProvider>
    <div className="App">
      <Board />
      <Controls />
    </div>
  </AppProvider>
)

export default App
