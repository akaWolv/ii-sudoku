import { DifficultyLevel, Field } from 'interfaces'
import DifficultLevelList from 'constants/DifficultLevelList'
import DefaultFieldList from 'constants/DefaultFieldList'

const EMPTY = ','
const INT2LETTERS = [EMPTY, 'a', 'b', 'c', 'd', 'e', 'f', 'g','h', 'i']

const useBoardHelper = () => {
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

  const getBoardFromCode = (gameCode: string): Field[]|false => {
    if (!(new RegExp(`^(${EMPTY}|[a-i]|[1-9]){81}$`)).test(gameCode)) {
      console.error('invalid key')
      return false
    }
    const singleCodeList = gameCode.split('')
    const fieldList = [...DefaultFieldList]
    singleCodeList.forEach((singleCode, index) => {
      const translatedValue = INT2LETTERS.indexOf(singleCode)
      if (translatedValue === -1) {
        fieldList[index].value = Number(singleCode)
      } else if (translatedValue > 0) {
        fieldList[index].isStatic = true
        fieldList[index].generatedValue = fieldList[index].value = Number(translatedValue)
      }
    })
    return fieldList
  }

  return {
    getFieldsFromSameGroups,
    getDifficultyLevelByKey,
    getBoardCode,
    getBoardFromCode
  }
}

export default useBoardHelper
