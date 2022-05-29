import { DifficultyLevel, Field } from 'interfaces'
import Group from 'constants/Group'
import { useState } from 'react'
import DefaultFieldList from 'constants/DefaultFieldList'
import useBoardHelper from '_hooks/useBoardHelper'

const SQUARE_ORDER: Group[] = [
  Group.SQUARE_1_3,
  Group.SQUARE_2_3,
  Group.SQUARE_3_3,

  Group.SQUARE_1_2,
  Group.SQUARE_2_2,
  Group.SQUARE_3_2,

  Group.SQUARE_1_1,
  Group.SQUARE_2_1,
  Group.SQUARE_3_1,
]

const useBoardGenerator = (difficultyLevel: DifficultyLevel) => {
  const { getFieldsFromSameGroups } = useBoardHelper()
  const [report, setReport] = useState<any[]>([])

  const calculateAvailableNumbers = (
    field: Field,
    fieldList: Field[]
  ): number[] => {
    const excludedNumbers: (number | null)[] = getFieldsFromSameGroups(field, fieldList)
      .map(({ generatedValue }) => generatedValue)
    const baseNumbers = Array.from(Array(10).keys()).slice(1)
    const availableNumbers = baseNumbers.filter(x => !excludedNumbers.includes(x))
    console.log({
      id: field.id,
      excludedNumbers: JSON.stringify(excludedNumbers),
      availableNumbers: JSON.stringify(availableNumbers),
      availableCount: availableNumbers.length
    })
    return availableNumbers;
  }

  const generateField = (
    field: Field,
    fieldList: Field[]
  ): Field => {
    const availableNumbers = calculateAvailableNumbers(field, fieldList)
    const pickedNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)]

    // fill number
    field.generatedValue = pickedNumber

    return field
  }

  const generateSquare = (previouslyGeneratedfieldList: Field[], squareLevel: number, report: any[]): Field[] => {
    const currentSquare = SQUARE_ORDER[squareLevel]
    const fieldsToIterate = DefaultFieldList.filter(({ square }) => square === currentSquare)

    const generatedSquareFieldList: Field[] = []
    while (fieldsToIterate.length > 0) {
      const field = generateField(
        fieldsToIterate.shift() as Field,
        [...previouslyGeneratedfieldList, ...generatedSquareFieldList]
      )

      if (field.generatedValue) {
        generatedSquareFieldList.push(field)
      } else {
        report.push({
          action: 'incomplete_square',
          square: Group[squareLevel],
          fieldsGenerated: generatedSquareFieldList.length
        })
        throw new Error('square error')
      }
    }

    if (undefined !== SQUARE_ORDER[squareLevel + 1] && squareLevel < 9) {
      let tries = 0
      while (tries++ < 10) {
        try {
          const generatedFields = generatedSquareFieldList.concat(
            generateSquare(
              [...previouslyGeneratedfieldList, ...generatedSquareFieldList],
              squareLevel + 1,
              report
            )
          )
          report.push({ action: 'square_recursion', square: Group[squareLevel + 1], tries })
          return generatedFields
        } catch (err) {
        }
      }

      throw new Error(`tried ${tries} but failed - going back`)
    }

    return generatedSquareFieldList
  }

  const DEFAULT_LEVEL = 2
  const pickStaticFields = (fieldList: Field[]): Field[] => {
    // 38 fields for easy
    // 32 fields for medium
    // 28 fields for hard
    // 22 fields for expert
    // 16 fields for master
    // const difficultyLevel = DifficultyLevelList.filter(({ level }) => level === DEFAULT_LEVEL)[0]
    const { tilesPerSquare } = difficultyLevel
    const fieldIdListToMakeStatic: string[] = []
    SQUARE_ORDER.forEach((square) => {
      const randNumber = Math.floor(Math.random() * tilesPerSquare.length)
      const numberOfTilesToMakeStatic = tilesPerSquare.splice(randNumber, 1).pop()
      fieldIdListToMakeStatic.push(
        ...fieldList
          .filter((field) => field.square === square)
          .sort(() => Math.random() - 0.5)
          .slice(0, numberOfTilesToMakeStatic)
          .map(({ id }) => id)
      )
    })

    return fieldList.map((field) => {
      if (fieldIdListToMakeStatic.includes(field.id)) {
        field.isStatic = true
        field.value = field.generatedValue
        return {...field}
      }
      return field
    })
  }

  const generateBoard = () => {
    const squareLevel = 0
    const fieldListInSquares = generateSquare([], squareLevel, report)
    setReport(report)
    const generatedFieldsList = fieldListInSquares.flat().sort((a, b) => a.order - b.order)
    return pickStaticFields(generatedFieldsList)
  }

  const getReport = () => report

  return {
    generateBoard,
    getReport
  }
}

export default useBoardGenerator
