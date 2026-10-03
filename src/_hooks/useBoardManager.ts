import { DifficultyLevel, Field } from 'interfaces'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import useStopwatchManager from '_hooks/useStopwatchManager'

const useBoardManager = (difficultyLevel: DifficultyLevel) => {
  const navigate = useNavigate()
  const { stopTimer } = useStopwatchManager()
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

  const checkAndHandleGameFinished = (fields: Field[]): boolean => {
    const finished = fields.length === 81 && fields.every(
      ({ value, isStatic, isValid }) => (isStatic || Boolean(value)) && isValid
    )
    setIsGameFinished(finished)
    if (finished) {
      stopTimer()
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
      lastLoadedKey.current = gameKey
      setFieldList(predefinedFieldList)
      setIsLoaded(true)
      checkAndHandleGameFinished(predefinedFieldList)
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
