export const COLS = 5
export const ROWS = 6

export type GuessResult = 'CORRECT' | 'INCORRECT' | 'MISPLACED'

export type GameState = 'IN_PROGRESS' | 'WON' | 'LOST'

export type Square = {
  value: string | null
  result: GuessResult | null
}

export type Row = Square[]

export type Board = Row[]

export const getEmptyBoard = () =>
  new Array(ROWS).fill(new Array(COLS).fill({ value: null, result: null }))

export const isAlpha = (str: string) => /^[A-Z]+$/i.test(str)

export const isWon = (currentBoard: Board, turn: number) => {
  const activeRow = currentBoard[turn]
  return activeRow.every((square) => square.result === 'CORRECT')
}

export const isLost = (currentBoard: Board, turn: number) => {
  if (isWon(currentBoard, turn)) {
    return false
  }
  return turn === ROWS - 1
}

export const getSquareTitle = (isSquareActive: boolean, square: Square) => {
  const activeText = isSquareActive ? '- active' : ''
  const resultText = square.result ? `- ${square.result}` : ''
  const valueText = square.value ? square.value : 'Empty'
  return `${valueText} ${resultText} ${activeText}`
}

export const getSquareColorClass = (square: Square) => {
  if (!square.result) {
    // Square is ungraded.  Ungraded squares with letters have thicker borders
    const borderStyle = square.value ? 'border-black' : 'border-black-800'
    return 'bg-white border border-2 text-black text-bold ' + borderStyle
  }
  switch (square.result) {
    case 'CORRECT':
      return 'bg-green-500 text-white'
    case 'MISPLACED':
      return 'bg-yellow-500 text-white'
    case 'INCORRECT':
      return 'bg-gray-500 text-white'
  }
}

export const updateSquare = (
  currentBoard: Board,
  rowIndex: number,
  columnIndex: number,
  newValue?: string | null, //undefined: do not set. null: clear the square
  newResult?: GuessResult | null //undefined: do not set. null: clear the square
) => {
  if (!currentBoard[rowIndex]) {
    return currentBoard //Game is over
  }

  const newBoard = [...currentBoard]
  const newRow: Row = [...newBoard[rowIndex]]

  // Update the square in the copied row
  // If newValue or newResult are provided, use them; otherwise, keep the existing values
  newRow[columnIndex] = {
    value: newValue !== undefined ? newValue : newRow[columnIndex].value,
    result: newResult !== undefined ? newResult : newRow[columnIndex].result,
  }

  // Update and return the board
  newBoard[rowIndex] = newRow
  return newBoard
}
