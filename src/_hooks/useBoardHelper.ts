import { DifficultyLevel, Field } from 'interfaces'
import DifficultLevelList from 'constants/DifficultLevelList'

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
    return DifficultLevelList.filter(({key}) => key === levelKey).pop()
    ||  DifficultLevelList.filter(({isDefault}) => Boolean(isDefault)).pop()
    || DifficultLevelList[0]
  }

  return {
    getFieldsFromSameGroups,
    getDifficultyLevelByKey
  }
}

export default useBoardHelper
