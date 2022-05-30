import React, { useEffect } from 'react'
import AppProvider from 'common/AppProvider'
import Game from 'components/Game'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from 'components/Start'
import StartLevel from 'components/StartLevel'

const App = () => {
  useEffect(() => {
    console.log('render! APP');
  }, [])

  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/:difficultyLevelKey" element={<StartLevel />} />
            <Route path="/:difficultyLevelKey/:gameKey" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  )
}

export default App
