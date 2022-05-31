import { DifficultyLevel, Field } from 'interfaces'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBoardGenerator from '_hooks/useBoardGenerator'
import useBoardHelper from '_hooks/useBoardHelper'

const useBoardManager = (difficultyLevel: DifficultyLevel) => {
  const navigate = useNavigate()
  const { getBoardCode, getBoardFromCode } = useBoardHelper()
  const { generateBoard, getReport } = useBoardGenerator(difficultyLevel)
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [fieldList, setFieldList] = useState<Field[]>([])
  const [highlightedField, setHighlightedField] = useState<Field | undefined>(undefined)

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

  const getFieldListFromKey = (gameKey?: string): Field[]|false => {
    const predefinedFieldList = getBoardFromCode(gameKey || '')
    if (predefinedFieldList) {
      setFieldList(predefinedFieldList)
      setIsGenerated(true)
      return predefinedFieldList
    }
    return false
  }

  const getFieldList = () => {
    if (!isGenerated) {
      const generatedFieldList = generateBoard()
      console.log(getReport())
      setFieldList(generatedFieldList)
      setIsGenerated(true)
      return generatedFieldList
    }
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

  const validateFields = (highlightedField: Field): Field[] => {
    // pick fields from groups
    const fieldsToCheck = getFieldsFromSameGroups(highlightedField, fieldList)

    // assume highlighted field is valid
    highlightedField.isValid = true

    fieldsToCheck.forEach((field) => {
      if (
        highlightedField.value
        && field.id != highlightedField.id
        && field.value === highlightedField.value
      ) {
        field.isValid = false
        // change also highlighted field
        highlightedField.isValid = false
      } else {
        field.isValid = true
      }
    })

    // change also field on list
    fieldsToCheck.forEach((field) => {
      if (field.id === highlightedField.id) {
        field.isValid = highlightedField.isValid
      }
    })

    return fieldsToCheck
  }

  const reloadFields = (fields: Field[]) => {
    if (!fields) {
      return
    }

    const fieldsIdList = fields.map(({id}) => id)
    setFieldList(fieldList.map((field) => {
      if (fieldsIdList.includes(field.id)) {
        return {...field}
      }
      return field
    }))
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
    const validatedFields = validateFields(highlightedField)
    setHighlightedField({...highlightedField})
    const boardCode = getBoardCode(fieldList)
    navigate(`/${difficultyLevel.key}/${boardCode}`)
    reloadFields([...validatedFields])
  }

  const getHighlightedField= (): Field|undefined  => highlightedField
  const getIsGenerated = (): boolean  => isGenerated

  return {
    getIsGenerated,
    getHighlightedField,
    setHighlightedField,
    changeSelectedFieldValue,
    getFieldList,
    getFieldListFromKey,
    getStepsToGenerate,
    getReport: getReport(),
    getFieldsFromSameGroups
  }
}

export default useBoardManager
