import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'

const StartLevel: React.FC<any> = (props) => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey, getBoardCode, resetStopwatch } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))
  const { generateBoard, getReport } = useBoardGenerator(difficultyLevel)

  useEffect(() => {
    const generatedBoardCode = getBoardCode(generateBoard())
    resetStopwatch()
    console.log(getReport)
    window.location.href = `/${difficultyLevel.key}/${generatedBoardCode}`
  }, [])

  return <span>{difficultyLevelKey} game is loading...</span>
}

export default StartLevel
