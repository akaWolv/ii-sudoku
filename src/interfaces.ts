import Group from 'constants/Group'

type Field = {
  id: string
  x: number
  y: number
  square: Group
  hLine: Group
  vLine: Group,
  value: Number | null,
  isStatic?: boolean
}
export type { Field }
