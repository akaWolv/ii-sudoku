import React, { ReactElement, ReactNode, useEffect } from 'react'

import useStopwatchManager from '_hooks/useStopwatchManager'

const StopwatchWrapper = ({ children }: { children: ReactNode }): ReactElement => {
  const { resumeTimer } = useStopwatchManager()

  useEffect(() => {
    resumeTimer()
  }, [])

  return <>{children}</>
}

export default StopwatchWrapper
