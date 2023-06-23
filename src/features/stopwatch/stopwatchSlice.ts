import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  seconds: number
  time: string
  intervalLoopId: null|NodeJS.Timer
}

const initialState: CounterState = {
  seconds: 0,
  time: '',
  intervalLoopId: null
}

const getTime = (seconds: number) => {
  const minutesPresentation = String(Math.floor(seconds / 60)).padStart(2, '0')
  const stringPresentation = String(seconds % 60).padStart(2, '0')
  return `${minutesPresentation}:${stringPresentation}`
}

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload
      state.time = getTime(action.payload)
    },
    setIntervalLoopId: (state, action: PayloadAction<null|NodeJS.Timer>) => {
      state.intervalLoopId = action.payload
    },
  },
})

export const { setTime, setIntervalLoopId } = stopwatchSlice.actions

export default stopwatchSlice.reducer
