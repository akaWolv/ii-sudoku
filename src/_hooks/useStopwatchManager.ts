import { useDispatch, useSelector } from 'react-redux'
import { setTime } from 'features/stopwatch/stopwatchSlice'
import { RootState } from 'stores/stopwatch'

// Module-level singleton interval ensures exactly ONE timer loop can exist across the entire app
let activeInterval: NodeJS.Timer | null = null
let currentSecondsCount = 0

export const getElapsedSeconds = (): number => currentSecondsCount

const useStopwatchManager = () => {
  const currentSeconds = useSelector((state: RootState) => state.stopwatch.seconds)
  const dispatch = useDispatch()

  const stopTimer = () => {
    if (activeInterval) {
      clearInterval(activeInterval)
      activeInterval = null
    }
  }

  const startTimer = (initialSeconds?: number) => {
    stopTimer()

    if (initialSeconds !== undefined) {
      currentSecondsCount = initialSeconds
      dispatch(setTime(initialSeconds))
    }

    activeInterval = setInterval(() => {
      currentSecondsCount += 1
      dispatch(setTime(currentSecondsCount))
    }, 1000)
  }

  const resetTimer = (newSeconds: number = 0) => {
    currentSecondsCount = newSeconds
    dispatch(setTime(newSeconds))
  }

  const restartTimer = (newSeconds: number = 0) => {
    stopTimer()
    resetTimer(newSeconds)
    startTimer(newSeconds)
  }

  return {
    seconds: currentSeconds,
    getElapsedSeconds,
    startTimer,
    resumeTimer: startTimer,
    resetTimer,
    stopTimer,
    restartTimer
  }
}

export default useStopwatchManager
