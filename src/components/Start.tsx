import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useBoardHelper from '_hooks/useBoardHelper'

const Start: React.FC<any> = (props) => {
  const { difficultyLevelKey } = useParams()
  const { getDifficultyLevelByKey } = useBoardHelper()
  const difficultyLevel = getDifficultyLevelByKey(String(difficultyLevelKey))

  useEffect(() => {
      window.location.href = `/${difficultyLevel.key}`
  }, [])

  return <span>game is loading...</span>
}

export default Start
