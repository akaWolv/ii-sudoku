import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StopwatchWrapper from 'common/AppProvider/StopwatchWrapper'
import AppProvider from 'common/AppProvider'
import Start from 'components/Start'
import StartLevel from 'components/StartLevel'
import Game from 'components/Game'
import PleaseRotate from './components/PleaseRotate'

const App = () => {
  return (
    <AppProvider>
      <StopwatchWrapper>
        <div className="App">
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/:difficultyLevelKey" element={<StartLevel />} />
                <Route path="/:difficultyLevelKey/:gameKey" element={<Game />} />
              </Routes>
          </BrowserRouter>
        </div>
      </StopwatchWrapper>
      <PleaseRotate />
    </AppProvider>
  )
}

export default App
