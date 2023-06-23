import ReactDOM from 'react-dom/client'
import './index.css'
import AppProvider from './common/AppProvider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)
