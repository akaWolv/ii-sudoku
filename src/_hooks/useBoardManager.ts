import { DifficultyLevel, Field } from 'interfaces'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import useStopwatchManager from '_hooks/useStopwatchManager'
import { getSavedGameByGameKey, saveOrUpdateGame } from 'helpers/savedGamesStorage'

const useBoardManager = (difficultyLevel: DifficultyLevel) => {
  const navigate = useNavigate()
  const { stopTimer, resumeTimer, resetTimer, getElapsedSeconds } = useStopwatchManager()
  const difficultyLevelRef = useRef(difficultyLevel)
  difficultyLevelRef.current = difficultyLevel

  const {
    getBoardCode,
    getBoardFromCode,
    getInvalidValuesForField,
    validateFields,
    getFieldsFromSameGroups
  } = useBoardHelper()
  const { getReport } = useBoardGenerator(difficultyLevel)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [fieldList, setFieldList] = useState<Field[]>([])
  const [highlightedField, setHighlightedField] = useState<Field | undefined>(undefined)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const lastLoadedKey = useRef<string | null>(null)
  const { isHintingEnabled } = difficultyLevel

  // Stop timer and persist latest elapsed seconds on unmount
  useEffect(() => {
    return () => {
      stopTimer()
      if (lastLoadedKey.current) {
        saveOrUpdateGame({
          difficultyKey: difficultyLevelRef.current.key,
          difficultyText: difficultyLevelRef.current.text,
          currentGameKey: lastLoadedKey.current,
          elapsedSeconds: getElapsedSeconds()
        })
      }
      resetTimer(0)
    }
  }, [])

  const checkAndHandleGameFinished = (fields: Field[], currentElapsed?: number): boolean => {
    const finished = fields.length === 81 && fields.every(
      ({ value, isStatic, isValid }) => (isStatic || Boolean(value)) && isValid
    )
    setIsGameFinished(finished)
    if (finished) {
      stopTimer()
      if (lastLoadedKey.current) {
        saveOrUpdateGame({
          difficultyKey: difficultyLevelRef.current.key,
          difficultyText: difficultyLevelRef.current.text,
          currentGameKey: lastLoadedKey.current,
          elapsedSeconds: currentElapsed !== undefined ? currentElapsed : getElapsedSeconds(),
          isFinished: true
        })
      }
    }
    return finished
  }

  const getFieldListFromKey = (gameKey?: string): Field[] | false => {
    if (!gameKey) {
      return false
    }
    if (lastLoadedKey.current === gameKey) {
      return fieldList
    }
    const predefinedFieldList = getBoardFromCode(gameKey)
    if (predefinedFieldList) {
      if (lastLoadedKey.current && lastLoadedKey.current !== gameKey) {
        saveOrUpdateGame({
          difficultyKey: difficultyLevelRef.current.key,
          difficultyText: difficultyLevelRef.current.text,
          currentGameKey: lastLoadedKey.current,
          elapsedSeconds: getElapsedSeconds()
        })
      }

      lastLoadedKey.current = gameKey
      setFieldList(predefinedFieldList)
      setIsLoaded(true)

      // Start/restore timer per game
      const existing = getSavedGameByGameKey(gameKey)
      const initialSeconds = existing ? existing.elapsedSeconds : 0

      const isFinished = checkAndHandleGameFinished(predefinedFieldList, initialSeconds)

      if (!isFinished) {
        resumeTimer(initialSeconds)
      } else {
        stopTimer()
        resetTimer(initialSeconds)
      }

      if (!existing) {
        saveOrUpdateGame({
          difficultyKey: difficultyLevel.key,
          difficultyText: difficultyLevel.text,
          currentGameKey: gameKey,
          elapsedSeconds: 0,
          isFinished
        })
      }

      return predefinedFieldList
    }
    return false
  }

  const getFieldList = () => {
    return fieldList
  }

  const getStepsToGenerate = () => {
    if (!getReport().length) {
      return 0
    }

    return getReport()
      .filter(({ action }) => action === 'square_recursion')
      .map(({ tries }) => tries)
      .reduce((accumulator, current) => accumulator + current)
  }

  const changeSelectedFieldValue = (value: number) => {
    if (!highlightedField) {
      return
    }

    const val = value || null
    const updatedFieldList = fieldList.map((field) => {
      if (field.id === highlightedField.id) {
        return { ...field, value: val }
      }
      return { ...field }
    })

    const validated = validateFields(updatedFieldList)
    setFieldList(validated)

    const updatedHighlighted = validated.find((field) => field.id === highlightedField.id)
    if (updatedHighlighted) {
      setHighlightedField(updatedHighlighted)
    }

    checkAndHandleGameFinished(validated)

    const boardCode = getBoardCode(validated)
    lastLoadedKey.current = boardCode

    saveOrUpdateGame({
      difficultyKey: difficultyLevel.key,
      difficultyText: difficultyLevel.text,
      currentGameKey: boardCode,
      elapsedSeconds: getElapsedSeconds(),
      isFinished: isGameFinished
    })

    navigate(`/${difficultyLevel.key}/${boardCode}`)
  }

  const getIsGameFinished = (): boolean => isGameFinished
  const getHighlightedField = (): Field | undefined => highlightedField
  const getIsGenerated = (): boolean => isLoaded
  const getForbiddenValuesForField = (field: Field): number[] => getInvalidValuesForField(field, fieldList)

  return {
    getIsGenerated,
    getHighlightedField,
    getForbiddenValuesForField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldList,
    getFieldListFromKey,
    getStepsToGenerate,
    getReport: getReport(),
    getFieldsFromSameGroups,
    isGameFinished: getIsGameFinished,
    isHintingEnabled: Boolean(isHintingEnabled)
  }
}


export default useBoardManager
