import { DifficultyLevel, Field } from 'interfaces'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'
import useStopwatchManager from '_hooks/useStopwatchManager'

const useBoardManager = (difficultyLevel: DifficultyLevel) => {
  const navigate = useNavigate()
  const { stopTimer } = useStopwatchManager()
  const { getBoardCode, getBoardFromCode, getInvalidValuesForField } = useBoardHelper()
  const { getReport } = useBoardGenerator(difficultyLevel)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [fieldList, setFieldList] = useState<Field[]>([])
  const [highlightedField, setHighlightedField] = useState<Field | undefined>(undefined)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const { isHintingEnabled } = difficultyLevel

  const getFieldsFromSameGroups = (
    { square, vLine, hLine }: Field,
    fieldList: Field[]
  ) => {
    return fieldList
      .filter((field) => {
        switch (true) {
          case field.square === square:
          case field.vLine === vLine:
          case field.hLine === hLine:
            return true
        }
        return false
      })
  }

  const getFieldListFromKey = (gameKey?: string): Field[] | false => {
    const predefinedFieldList = getBoardFromCode(gameKey || '')
    if (predefinedFieldList) {
      setFieldList(predefinedFieldList)
      setIsLoaded(true)
      const isGameFinished = predefinedFieldList
          .filter(({ value, isStatic, isValid }) => (isStatic || Boolean(value)) && isValid)
          .length === 81
      setIsGameFinished(isGameFinished)
      if (isGameFinished) {
        stopTimer()
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
    highlightedField.value = value
    fieldList.forEach((field) => {
      if (field.id === highlightedField.id) {
        field.value = value
      }
    })

    setHighlightedField({ ...highlightedField })
    const boardCode = getBoardCode(fieldList)
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
