import { createContext } from 'react';
type StopwatchContext = {
  stopwatchTime?: string|null
}
const StopwatchContext = createContext<StopwatchContext>({})
export default StopwatchContext
