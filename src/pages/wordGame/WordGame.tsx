import {
  Board,
  COLS,
  GuessResult,
  Row,
  Square,
  getSquareColorClass,
  isAlpha,
  isLost,
  isWon,
  updateSquare,
} from './utils'

//todo:
// Shake on incorrect (maybe message too)
// support hard mode
// Improve styling
// - When game is over, keyboard should stay the same size
// - Improve colors
// - Add animations like letters flipping around

import { useCallback, useEffect, useRef } from 'react'
import { checkIsWordReal } from '../../dictionary/wordLib'
import { useGameState } from './useGameState'
import { VirtualKeyboard } from './VirtualKeyboard'

export const WordGame = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const {
    turn,
    setTurn,
    activeSquare,
    setActiveSquare,
    board,
    setBoard,
    answer,
    gameState,
    setGameState,
    startNewGame,
  } = useGameState()

  const answerArray = answer.split('')

  const handleDelete = useCallback(() => {
    if (activeSquare === 0) {
      // Cannot delete if on first square in row
      return
    }
    if (activeSquare === COLS - 1 && !board[turn][activeSquare].value) {
      // Handle delete at end of row when last character is empty
      const newBoard = updateSquare(board, turn, activeSquare - 1, null)
      setBoard(newBoard)
      setActiveSquare((as) => as - 1)
      return
    }
    if (activeSquare === COLS - 1) {
      // Handle delete at end of row when last character is filled
      const newBoard = updateSquare(board, turn, activeSquare, null)
      setBoard(newBoard)
      return
    } else {
      // Handle delete in middle of row
      const newBoard = updateSquare(board, turn, activeSquare - 1, null)
      setBoard(newBoard)
      setActiveSquare((as) => as - 1)
      return
    }
  }, [activeSquare, board, setActiveSquare, setBoard, turn])

  const gradeRow = useCallback(
    (newBoard: Square[][]) => {
      // Word is valid. Grade the row
      let remainingAnswerLetters = answerArray.join()

      // First loop: Grade correct and incorrect letters
      for (let i = 0; i < COLS; i++) {
        const userLetter: string = newBoard[turn][i].value as string
        const answerLetter = answerArray[i]

        let res: GuessResult
        if (userLetter === answerLetter) {
          res = 'CORRECT'
          // remove letter from further consideration as 'MISPLACED'.
          remainingAnswerLetters = remainingAnswerLetters.replace(userLetter, '')
        } else {
          res = 'INCORRECT'
        }
        newBoard = updateSquare(newBoard, turn, i, undefined, res)
      }

      // Second loop: Grade misplaced letters
      // Logic from: https://stackoverflow.com/a/71326031
      for (let i = 0; i < COLS; i++) {
        const userLetter: string = newBoard[turn][i].value as string
        const existingGrade = newBoard[turn][i].result

        if (existingGrade !== 'CORRECT' && remainingAnswerLetters.includes(userLetter)) {
          // remove letter from further consideration as 'MISPLACED'.
          remainingAnswerLetters = remainingAnswerLetters.replace(userLetter, '')
          newBoard = updateSquare(newBoard, turn, i, undefined, 'MISPLACED')
        }
      }
      return newBoard
    },
    [answerArray, turn]
  )

  const handleEndOfRow = useCallback(
    (newBoard: Board) => {
      const userWord = newBoard[turn].map((square) => square.value).join('')
      const checkResult = checkIsWordReal(userWord)
      if (!checkResult) {
        // Invalid word.  Do not grade row.
      } else {
        newBoard = gradeRow(newBoard)
      }

      setBoard(newBoard)

      if (isLost(newBoard, turn)) {
        setGameState('LOST')
        return
      }
      if (isWon(newBoard, turn)) {
        setGameState('WON')
        return
      }

      // Proceed to the next turn if word is valid
      if (checkResult) {
        setTurn((t) => t + 1)
        setActiveSquare(0)
      }
    },
    [setActiveSquare, gradeRow, setBoard, setGameState, setTurn, turn]
  )

  // MAIN GAMEPLAY LOOP
  const handleKeyDown = useCallback(
    (event: KeyboardEvent | string) => {
      //KeyboardEvent is from real keyboard, string is from virtual keyboard
      const pressedKey: string = typeof event === 'string' ? event : event.key

      if (gameState === 'WON' || gameState === 'LOST') {
        // Ignore input if game is over
        return
      }

      const isDelete =
        pressedKey === 'Backspace' || pressedKey === 'Delete' || pressedKey === '{bksp}'
      if (isDelete) {
        handleDelete()
      }

      const isAlphabetic = isAlpha(pressedKey)
      if (!isAlphabetic || pressedKey.length > 1) {
        return // Ignore nonalphabetic input
      }

      // Handle letter input
      const enteredLetter = pressedKey.toUpperCase()
      const newBoard = updateSquare(board, turn, activeSquare, enteredLetter)

      if (activeSquare !== COLS - 1) {
        // Not at end of row
        setBoard(newBoard)
        setActiveSquare((as) => as + 1)
      } else {
        handleEndOfRow(newBoard)
      }
    },
    [activeSquare, board, handleDelete, handleEndOfRow, setActiveSquare, setBoard, turn, gameState]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      // Cleanup function to remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyDown)
    }
  }),
    [COLS, activeSquare, answer, turn, board]

  // const getBorderClass = (isActive: boolean) => {
  //   // Display a border around the active square
  //   return isActive ? 'border-8 border-black' : ''
  // }

  const getSquareLabel = (isSquareActive: boolean, square: Square) => {
    const activeText = isSquareActive ? '- active' : ''
    const resultText = square.result ? `- ${square.result}` : ''
    const valueText = square.value ? square.value : 'Empty'
    return `${valueText} ${resultText} ${activeText}`
  }

  const renderRow = (row: Row, colIndex: number) =>
    row.map((square, rowIndex) => {
      const isSquareActive = colIndex === turn && rowIndex === activeSquare
      const label = getSquareLabel(isSquareActive, square)
      return (
        <span
          key={`${colIndex}-${rowIndex}`}
          data-testid={`square-${colIndex}-${rowIndex}`}
          aria-label={label}
          title={label}
          className={` ${getSquareColorClass(square)} 
            text-white 
            p-1 m-1 
            flex items-center justify-center 
            overflow-hidden
            select-none
            h-16 w-16
          `}
        >
          {square.value || ''}
        </span>
      )
    })

  const renderBoard = () => {
    return board.map((row, colIndex) => {
      return (
        <div key={colIndex} className={`grid grid-cols-5 gap-1 font-mono uppercase`}>
          {renderRow(row, colIndex)}
        </div>
      )
    })
  }

  return (
    <>
      <h1>Popular Word Game</h1>
      <div className="text-5xl p-5 m-5 min-w-full min-h-full flex flex-col items-center justify-center">
        <div className="">{renderBoard()}</div>

        {gameState === 'WON' && <div className="m-5 p-5">You Won!</div>}
        {gameState === 'LOST' && <div className="m-5 p-5">You Lost! The answer was {answer}.</div>}
        {(gameState === 'WON' || gameState === 'LOST') && (
          <p className="m-5 p-5"> Click New Game to play again</p>
        )}
        <button className="select-none" aria-label="New Game" onClick={() => startNewGame()}>
          New Game
        </button>
        <VirtualKeyboard onKeyPress={handleKeyDown} board={board} />
      </div>
    </>
  )
}
