import { Field } from 'interfaces'
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

const useBoardGenerator = () => {
  const { getFieldsFromSameGroups } = useBoardHelper()
  const [report, setReport] = useState<any[]>([])

  const calculateAvailableNumbers = (
    field: Field,
    fieldList: Field[]
  ): number[] => {
    const excludedNumbers: (number|null)[] = getFieldsFromSameGroups(field, fieldList).map(({value}) => value)
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
    field.value = field.generatedValue = pickedNumber

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

      if (field.value) {
        generatedSquareFieldList.push(field)
      } else {
        report.push({ action: 'incomplete_square', square: Group[squareLevel], fieldsGenerated: generatedSquareFieldList.length })
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

  const generateBoard = () => {
    const squareLevel = 0
    const fieldListInSquares = generateSquare([], squareLevel, report)
    setReport(report)
    return fieldListInSquares.flat().sort((a, b) => a.order - b.order)
  }

  const getReport = () => report

  return {
    generateBoard,
    getReport
  }
}

export default useBoardGenerator
