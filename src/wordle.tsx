import { useState, useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker'

//todo:
// support backspace
// show answer when game is over
// show win/loss message
// when game over, don't allow more letters to be entered
// support hard mode

export const Wordle = () => {
  const inputRef = useRef() as any

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [])

  const getEmptyBoard = () => {
    const res = new Array(ROWS).fill(
      new Array(COLS).fill({ value: null, result: null })
    )
    return res
  }

  function isAlpha(str: string) {
    return /^[A-Z]+$/i.test(str)
  }

  const getRandomWord = (): string => {
    const candidateWord = faker.word.sample(5)
    if (!isAlpha(candidateWord)) {
      console.log(`Rejecting ${candidateWord} because it is not alphabetic`)
      return getRandomWord()
    }
    return candidateWord
  }

  const [COLS] = useState(5)
  const [ROWS] = useState(6)
  const [turn, setTurn] = useState(0)
  const [activeSquare, setActiveSquare] = useState(0)
  const [board, setBoard] = useState<Board>(getEmptyBoard())
  const [answer, setAnswer] = useState<string>(getRandomWord())

  const reset = () => {
    setTurn(0)
    setActiveSquare(0)
    setBoard(getEmptyBoard())
    setAnswer(getRandomWord())
  }

  type GuessResult = 'CORRECT' | 'INCORRECT' | 'MISPLACED'

  type Square = {
    value: string | null
    result: GuessResult | null
  }

  type Row = Square[]

  type Board = Row[]

  useEffect(() => {
    // Returns an updated board with the square at the specified row and column updated
    const updateSquare = (
      currentBoard: Board,
      rowIndex: number,
      columnIndex: number,
      newValue?: string,
      newResult?: GuessResult
    ) => {
      const newBoard = [...currentBoard]

      if (!newBoard[rowIndex]) {
        return newBoard //Game is over
      }

      // Copy the row that needs to be updated
      const newRow: Row = [...newBoard[rowIndex]]

      // Update the square in the copied row
      // If newValue or newResult are provided, use them; otherwise, keep the existing values
      newRow[columnIndex] = {
        value: newValue !== undefined ? newValue : newRow[columnIndex].value,
        result:
          newResult !== undefined ? newResult : newRow[columnIndex].result,
      }

      newBoard[rowIndex] = newRow

      return newBoard // Return the updated board
    }

    const isWon = (currentBoard: Board) => {
      const activeRow = currentBoard[turn]
      return activeRow.every((square) => square.result === 'CORRECT')
    }

    const isLost = (currentBoard: Board) => {
      if (isWon(currentBoard)) {
        return false
      }
      return turn === ROWS - 1
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const answerArray = answer.split('')

      const pressedKey: string = event.key
      if (pressedKey === 'Backspace') {
        if (activeSquare > 0) {
          return
        } else {
          // Handle backspace
          //setActiveSquare((as) => as - 1)
          return
        }
      }
      if (pressedKey.length > 2) {
        // Ignore unusual key presses
        return
      }
      let newBoard = updateSquare(board, turn, activeSquare, pressedKey)

      if (activeSquare !== COLS - 1) {
        //Not at end of row
        setBoard(newBoard)
        setActiveSquare((as) => as + 1)
      } else {
        // at end of row
        // Grade the last row
        for (let i = 0; i < COLS; i++) {
          const userLetter: string = newBoard[turn][i].value as string
          const answerLetter = answerArray[i]

          let res: GuessResult
          if (userLetter === answerLetter) {
            // CORRECT
            res = 'CORRECT'
          } else if (answerArray.includes(userLetter)) {
            // MISPLACED
            res = 'MISPLACED'
          } else {
            // INCORRECT
            res = 'INCORRECT'
          }
          newBoard = updateSquare(newBoard, turn, i, undefined, res)
        }
        setBoard(newBoard)

        if (isLost(newBoard)) {
          console.log('you lost!')
          return
        }
        if (isWon(newBoard)) {
          console.log('you won!')
          return
        }

        // Proceed to the next turn
        setTurn((t) => t + 1)
        setActiveSquare(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }),
    [COLS, activeSquare, answer, turn, board]

  const getSquareColorClass = (square: Square) => {
    switch (square.result) {
      case 'CORRECT':
        return 'bg-green-500'
      case 'MISPLACED':
        return 'bg-yellow-500'
      case 'INCORRECT':
        return 'bg-gray-500'
      default:
        return 'bg-gray-300'
    }
  }

  const renderRow = (row: Row, colIndex: number) =>
    row.map((square, rowIndex) => {
      return (
        <span
          key={`${colIndex}-${rowIndex}`}
          className={` ${getSquareColorClass(square)} 
            text-white 
            p-1 m-1 
            flex items-center justify-center 
            overflow-hidden
          `}
        >
          {square.value || '_'}
        </span>
      )
    })

  const renderBoard = () => {
    return board.map((row, colIndex) => {
      return (
        <div
          key={colIndex}
          className={`grid grid-cols-5 gap-1 font-mono uppercase`}
        >
          {renderRow(row, colIndex)}
        </div>
      )
    })
  }

  return (
    <>
      <div className="text-5xl p-5 m-5 min-w-full min-h-full flex flex-col items-center justify-center">
        <div>Word Length (Columns): {COLS}</div>
        <div>Guesses (Rows): {ROWS}</div>
        <div>Turn: {turn + 1}</div>
        <div className="">{renderBoard()}</div>
        <button onClick={() => reset()}>RESET</button>
      </div>
    </>
  )
}
