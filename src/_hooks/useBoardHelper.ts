import { Field } from 'interfaces'

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

  return {
    getFieldsFromSameGroups
  }
}

export default useBoardHelper
