import { Field } from 'interfaces'
import Group from 'constants/Group'
import { useState } from 'react'

const defaultFieldList: Field[] = [
  { order: 1, id: '1-9', x: 1, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  }, { order: 2, id: '2-9', x: 2, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 3, id: '3-9', x: 3, y: 9, square: Group.SQUARE_1_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: true, isValid: true  },
  { order: 4, id: '4-9', x: 4, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 5, id: '5-9', x: 5, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 6, id: '6-9', x: 6, y: 9, square: Group.SQUARE_2_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 7, id: '7-9', x: 7, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: true, isValid: true  },
  { order: 8, id: '8-9', x: 8, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 9, id: '9-9', x: 9, y: 9, square: Group.SQUARE_3_3, hLine: Group.H_LINE_9, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 10, id: '1-8', x: 1, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 11, id: '2-8', x: 2, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 12, id: '3-8', x: 3, y: 8, square: Group.SQUARE_1_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: true, isValid: true  },
  { order: 13, id: '4-8', x: 4, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 14, id: '5-8', x: 5, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 15, id: '6-8', x: 6, y: 8, square: Group.SQUARE_2_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 16, id: '7-8', x: 7, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 17, id: '8-8', x: 8, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 18, id: '9-8', x: 9, y: 8, square: Group.SQUARE_3_3, hLine: Group.H_LINE_8, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 19, id: '1-7', x: 1, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 20, id: '2-7', x: 2, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 21, id: '3-7', x: 3, y: 7, square: Group.SQUARE_1_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 22, id: '4-7', x: 4, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 23, id: '5-7', x: 5, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 24, id: '6-7', x: 6, y: 7, square: Group.SQUARE_2_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 25, id: '7-7', x: 7, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 26, id: '8-7', x: 8, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 27, id: '9-7', x: 9, y: 7, square: Group.SQUARE_3_3, hLine: Group.H_LINE_7, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 28, id: '1-6', x: 1, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 29, id: '2-6', x: 2, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 30, id: '3-6', x: 3, y: 6, square: Group.SQUARE_1_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 31, id: '4-6', x: 4, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: true, isValid: true  },
  { order: 32, id: '5-6', x: 5, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 33, id: '6-6', x: 6, y: 6, square: Group.SQUARE_2_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 34, id: '7-6', x: 7, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 35, id: '8-6', x: 8, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 36, id: '9-6', x: 9, y: 6, square: Group.SQUARE_3_2, hLine: Group.H_LINE_6, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 37, id: '1-5', x: 1, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 38, id: '2-5', x: 2, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 39, id: '3-5', x: 3, y: 5, square: Group.SQUARE_1_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 40, id: '4-5', x: 4, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 41, id: '5-5', x: 5, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 42, id: '6-5', x: 6, y: 5, square: Group.SQUARE_2_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: true, isValid: true  },
  { order: 43, id: '7-5', x: 7, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 44, id: '8-5', x: 8, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 45, id: '9-5', x: 9, y: 5, square: Group.SQUARE_3_2, hLine: Group.H_LINE_5, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 46, id: '1-4', x: 1, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 47, id: '2-4', x: 2, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 48, id: '3-4', x: 3, y: 4, square: Group.SQUARE_1_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 49, id: '4-4', x: 4, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 50, id: '5-4', x: 5, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 51, id: '6-4', x: 6, y: 4, square: Group.SQUARE_2_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 52, id: '7-4', x: 7, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 53, id: '8-4', x: 8, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 54, id: '9-4', x: 9, y: 4, square: Group.SQUARE_3_2, hLine: Group.H_LINE_4, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 55, id: '1-3', x: 1, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 56, id: '2-3', x: 2, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 57, id: '3-3', x: 3, y: 3, square: Group.SQUARE_1_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 58, id: '4-3', x: 4, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 59, id: '5-3', x: 5, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 60, id: '6-3', x: 6, y: 3, square: Group.SQUARE_2_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 61, id: '7-3', x: 7, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 62, id: '8-3', x: 8, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 63, id: '9-3', x: 9, y: 3, square: Group.SQUARE_3_1, hLine: Group.H_LINE_3, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 64, id: '1-2', x: 1, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 65, id: '2-2', x: 2, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 66, id: '3-2', x: 3, y: 2, square: Group.SQUARE_1_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 67, id: '4-2', x: 4, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 68, id: '5-2', x: 5, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 69, id: '6-2', x: 6, y: 2, square: Group.SQUARE_2_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 70, id: '7-2', x: 7, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 71, id: '8-2', x: 8, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 72, id: '9-2', x: 9, y: 2, square: Group.SQUARE_3_1, hLine: Group.H_LINE_2, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },

  { order: 73, id: '1-1', x: 1, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_1, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 74, id: '2-1', x: 2, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_2, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 75, id: '3-1', x: 3, y: 1, square: Group.SQUARE_1_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_3, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 76, id: '4-1', x: 4, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_4, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 77, id: '5-1', x: 5, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_5, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 78, id: '6-1', x: 6, y: 1, square: Group.SQUARE_2_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_6, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 79, id: '7-1', x: 7, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_7, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 80, id: '8-1', x: 8, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_8, generatedValue: null, value: null, isStatic: false, isValid: true  },
  { order: 81, id: '9-1', x: 9, y: 1, square: Group.SQUARE_3_1, hLine: Group.H_LINE_1, vLine: Group.V_LINE_9, generatedValue: null, value: null, isStatic: false, isValid: true  },
]

type GroupValues = {
  [Key in Group]: number[]
}
const defaultGroupsValues: GroupValues = {
  [Group.SQUARE_1_3]: [],
  [Group.SQUARE_2_3]: [],
  [Group.SQUARE_3_3]: [],
  [Group.SQUARE_1_2]: [],
  [Group.SQUARE_2_2]: [],
  [Group.SQUARE_3_2]: [],
  [Group.SQUARE_1_1]: [],
  [Group.SQUARE_2_1]: [],
  [Group.SQUARE_3_1]: [],
  [Group.V_LINE_1]: [],
  [Group.V_LINE_2]: [],
  [Group.V_LINE_3]: [],
  [Group.V_LINE_4]: [],
  [Group.V_LINE_5]: [],
  [Group.V_LINE_6]: [],
  [Group.V_LINE_7]: [],
  [Group.V_LINE_8]: [],
  [Group.V_LINE_9]: [],
  [Group.H_LINE_1]: [],
  [Group.H_LINE_2]: [],
  [Group.H_LINE_3]: [],
  [Group.H_LINE_4]: [],
  [Group.H_LINE_5]: [],
  [Group.H_LINE_6]: [],
  [Group.H_LINE_7]: [],
  [Group.H_LINE_8]: [],
  [Group.H_LINE_9]: [],
}

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

const useBoardManager = () => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [fieldList, setFieldList] = useState<Field[]>([])
  // const [groupsValues, setGroupsValues] = useState<{ [Key in Group]: Number[] }>({...defaultGroupsValues})
  const [report, setReport] = useState<any[]>([])

  const calculateAvailableNumbers = (
    { id, square, hLine, vLine }: Field,
    groupsValues: GroupValues
  ): number[] => {
    const excludedNumbers = [groupsValues[square], groupsValues[hLine], groupsValues[vLine]].flat()
    const baseNumbers = Array.from(Array(10).keys()).slice(1)
    const availableNumbers = baseNumbers.filter(x => !excludedNumbers.includes(x))
    // console.log({
    //   id,
    //   excludedNumbers: JSON.stringify(excludedNumbers),
    //   availableNumbers: JSON.stringify(availableNumbers),
    //   availableCount: availableNumbers.length
    // })
    return availableNumbers;
  }

  const generateField = (
    field: Field,
    groupsValues: GroupValues
  ): {field: Field, groupsValues: GroupValues} => {
    const availableNumbers = calculateAvailableNumbers(field, groupsValues)
    const pickedNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)]

    if (!Boolean(availableNumbers.length)) {
      // throw Error('Invalid square')
      return { field, groupsValues }
    }

    // fill number
    field.value = field.generatedValue = pickedNumber
    // add number to groups
    groupsValues[field.square].push(pickedNumber)
    groupsValues[field.hLine].push(pickedNumber)
    groupsValues[field.vLine].push(pickedNumber)

    return { field, groupsValues }
  }

  const generateSquare = (squareLevel: number, groupsValues: GroupValues, report: any[]): Field[] => {
    let currentGroupsValues: GroupValues = groupsValues
    const currentSquare = SQUARE_ORDER[squareLevel]
    const fieldsToIterate = defaultFieldList.filter(({ square }) => square === currentSquare)

    const generatedSquareField: Field[] = []
    while (fieldsToIterate.length > 0) {
      const { field, groupsValues } = generateField(
        fieldsToIterate.shift() as Field,
        currentGroupsValues
      )

      if (field.value) {
        generatedSquareField.push(field)
        currentGroupsValues = groupsValues
      } else {
        report.push({ action: 'incomplete_square', square: Group[squareLevel], fieldsGenerated: generatedSquareField.length })
        throw new Error('square error')
      }
    }

    if (undefined !== SQUARE_ORDER[squareLevel + 1] && squareLevel < 9) {
      let tries = 0
      while (tries++ < 10) {
        try {
          const generatedFields = generatedSquareField.concat(
            generateSquare(
              squareLevel + 1,
              JSON.parse(JSON.stringify(currentGroupsValues)) as GroupValues,
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

    return generatedSquareField
  }

  const generateBoard = () => {
    const squareLevel = 0
    const fieldListInSquares = generateSquare(squareLevel, defaultGroupsValues, report)
    setReport(report)
    return fieldListInSquares.flat().sort((a, b) => a.order - b.order)
  }

  const getFieldList = () => {
    if (!isGenerated) {
      const generatedFieldList = generateBoard()
      console.log(report)
      setFieldList(generatedFieldList)
      setIsGenerated(true)
      return generatedFieldList
    }
    return fieldList
  }

  const getReport = () => {
    return report
  }

  const getStepsToGenerate = () => {
    if (!report.length) {
      return 0
    }

    return report
      .filter(({ action }) => action === 'square_recursion')
      .map(({ tries }) => tries)
      .reduce((accumulator, current) => accumulator + current)
  }

  return {
    getFieldList,
    getStepsToGenerate,
    getReport
  }
}

export default useBoardManager
