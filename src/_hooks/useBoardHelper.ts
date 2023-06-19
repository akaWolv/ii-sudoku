import { DifficultyLevel, Field } from 'interfaces'
import DifficultLevelList from 'constants/DifficultLevelList'
import DefaultFieldList from 'constants/DefaultFieldList'
import { useCookies } from 'react-cookie'
import { useStopwatch } from 'react-timer-hook'
import { useEffect } from 'react'

const EMPTY = ','
const INT2LETTERS = [EMPTY, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const STOPWATCH_COOKIE = 'stopwatch'

const useBoardHelper = () => {
  const [cookies, setCookie, removeCookie] = useCookies([STOPWATCH_COOKIE])

  const getStopwatchOffset = (): Date => {
    const time = cookies[STOPWATCH_COOKIE] || '0:0'
    const [minutes, seconds] = time.split(':')
    const stopwatchOffset = new Date();
    stopwatchOffset.setMinutes(stopwatchOffset.getMinutes() + Number(minutes))
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + Number(seconds))
    return stopwatchOffset
  }

  const getStopwatch = (): string => `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true, offsetTimestamp: getStopwatchOffset() })

  const resetStopwatch = () => {
    removeCookie(STOPWATCH_COOKIE)
    setCookie(STOPWATCH_COOKIE, `0:0`, { path: '/' })
    reset()
  }
  const pauseStopwatch = () => pause()

  useEffect(() => {
    setCookie(STOPWATCH_COOKIE, `${minutes}:${seconds}`, { path: '/' })
  }, [seconds])

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

  const getDifficultyLevelByKey = (levelKey: string): DifficultyLevel => {
    return DifficultLevelList.filter(({ key }) => key === levelKey).pop()
      || DifficultLevelList.filter(({ isDefault }) => Boolean(isDefault)).pop()
      || DifficultLevelList[0]
  }

  const getBoardCode = (fieldList: Field[]): string => {
    return fieldList.map(({ value, generatedValue, isStatic }) => {
      if (isStatic) {
        return INT2LETTERS[Number(generatedValue)]
      }
      return value || EMPTY
    }).join('')
  }

  const getBoardFromCode = (gameCode: string): Field[] | false => {
    if (!(new RegExp(`^(${EMPTY}|[a-i]|[1-9]){81}$`)).test(gameCode)) {
      console.error('invalid key')
      return false
    }
    const singleCodeList = gameCode.split('')
    const fieldList = [...DefaultFieldList]

    singleCodeList.forEach((singleCode, index) => {
      if (!fieldList[index]) {
        return
      }

      const translatedValue = INT2LETTERS.indexOf(singleCode)
      if (translatedValue === -1) {
        fieldList[index].isStatic = false
        fieldList[index].value = Number(singleCode)
      } else if (translatedValue > 0) {
        fieldList[index].isStatic = true
        fieldList[index].generatedValue = fieldList[index].value = Number(translatedValue)
      } else {
        fieldList[index].isStatic = false
        fieldList[index].value = null
      }
    })

    return validateFields(fieldList)
  }

  const rewriteFields = (fieldList: Field[], fieldsToRewrite: Field[]) => {
    if (!fieldsToRewrite) {
      return fieldList
    }

    const fieldsIdList = fieldsToRewrite.map(({ id }) => id)
    fieldList.map((field) => {
      if (fieldsIdList.includes(field.id)) {
        return { ...field }
      }
      return field
    })

    return fieldList
  }

  const validateFields = (fieldList: Field[]): Field[] => {
    // clear previous validation
    const validatedFieldList = fieldList.map((field): Field => {
        field.isValid = true
        return { ...field }
      }
    )

    validatedFieldList.map((field) => {
      field.isValid = !getInvalidValuesForField(field, validatedFieldList).includes(field.value as number)
      return field
    })

    return validatedFieldList
  }

  const getInvalidValuesForField = (field: Field, fieldList: Field[]): number[] => {
    // pick fields from groups
    const fieldsToCheck = getFieldsFromSameGroups(field, fieldList)
    return fieldsToCheck
      .filter(({ id, value }) => field.id != id && Boolean(value))
      .map(({ value }) => value as number)
  }

  return {
    getFieldsFromSameGroups,
    getDifficultyLevelByKey,
    getBoardCode,
    getBoardFromCode,
    getInvalidValuesForField,
    validateFields,
    rewriteFields,
    getStopwatchOffset,
    getStopwatch,
    pauseStopwatch,
    resetStopwatch
  }
}

export default useBoardHelper
