import { useState, useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker'
import { loadChecker, checkWord } from '../src/dictionary/wordChecker'

//todo:
// show win/loss message
// Shake on incorrect (maybe message too)
// when game is over, don't allow more letters to be entered
// support hard mode
// Show keyboard

export const Wordle = () => {
  const inputRef = useRef() as any

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    loadChecker()
  })

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
      newValue?: string | null, //undefined: do not set. null: clear the square
      newResult?: GuessResult | null //undefined: do not set. null: clear the square
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

    // Main Gameplay loop
    const handleKeyDown = (event: KeyboardEvent) => {
      const answerArray = answer.split('')

      const pressedKey: string = event.key
      const isDelete = pressedKey === 'Backspace' || pressedKey === 'Delete'
      if (isDelete) {
        if (activeSquare === 0) {
          // Cannot delete if on first square in row
          return
        }
        if (activeSquare === COLS - 1 && !board[turn][activeSquare].value) {
          //Handle delete at end of row when last character is empty
          const newBoard = updateSquare(board, turn, activeSquare - 1, null)
          setBoard(newBoard)
          setActiveSquare((as) => as - 1)
          return
        }
        if (activeSquare === COLS - 1) {
          //Handle delete at end of row when last character is filled
          const newBoard = updateSquare(board, turn, activeSquare, null)
          setBoard(newBoard)
          return
        } else {
          //Handle delete in middle of row
          const newBoard = updateSquare(board, turn, activeSquare - 1, null)
          setBoard(newBoard)
          setActiveSquare((as) => as - 1)
          return
        }
      }
      const isAlphabetic = isAlpha(pressedKey)
      if (!isAlphabetic || pressedKey.length > 1) {
        return // Ignore nonalphabetic input
      }

      const enteredLetter = pressedKey.toUpperCase()
      let newBoard = updateSquare(board, turn, activeSquare, enteredLetter)

      if (activeSquare !== COLS - 1) {
        //Not at end of row
        setBoard(newBoard)
        setActiveSquare((as) => as + 1)
      } else {
        // at end of row

        const userWord = newBoard[turn].map((square) => square.value).join('')
        const checkResult = checkWord(userWord)
        if (!checkResult) {
          // Invalid word
          console.log('Invalid word.')
        } else {
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
        }
        setBoard(newBoard)

        if (isLost(newBoard)) {
          console.log('You lost!')
          return
        }
        if (isWon(newBoard)) {
          console.log('You won!')
          return
        }

        // Proceed to the next turn if word is valid
        if (checkResult) {
          setTurn((t) => t + 1)
          setActiveSquare(0)
        }
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

  const getBorderClass = (isActive: boolean) => {
    // If square is active, show with a border
    return isActive ? 'border-8 border-black' : ''
  }

  const renderRow = (row: Row, colIndex: number) =>
    row.map((square, rowIndex) => {
      const isSquareActive = colIndex === turn && rowIndex === activeSquare
      return (
        <span
          key={`${colIndex}-${rowIndex}`}
          data-testid={`square-${colIndex}-${rowIndex}`}
          className={` ${getSquareColorClass(square)} 
            ${getBorderClass(isSquareActive)}
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
        <div>Popular Word Game</div>
        <div>Word Length (Columns): {COLS}</div>
        <div>Guesses (Rows): {ROWS}</div>
        <div className="">{renderBoard()}</div>
        <button onClick={() => reset()}>RESET</button>
      </div>
    </>
  )
}
