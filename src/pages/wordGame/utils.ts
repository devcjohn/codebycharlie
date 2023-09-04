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

export const getSquareColorClass = (square: Square) => {
  switch (square.result) {
    case 'CORRECT':
      return 'bg-green-500'
    case 'MISPLACED':
      return 'bg-yellow-500'
    case 'INCORRECT':
      return 'bg-gray-500'
    default: // Empty
      return 'bg-gray-300'
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
