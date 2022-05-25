import Group from 'constants/Group'

type Field = {
  order: number
  id: string
  x: number
  y: number
  square: Group
  hLine: Group
  vLine: Group
  generatedValue: Number | null
  value: Number | null
  isStatic: boolean
  isValid: boolean
}
export type { Field }
