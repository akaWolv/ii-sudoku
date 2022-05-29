import React, { useEffect } from 'react'
import AppProvider from 'common/AppProvider'
import Game from 'components/Game'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    console.log('render! APP');
  }, [])

  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Game />}>
              <Route path=":difficultyLevelKey" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  )
}

export default App
