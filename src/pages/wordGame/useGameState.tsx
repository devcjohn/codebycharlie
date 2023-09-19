import { getRandomAnswer } from '../../dictionary/wordLib'
import { useState } from 'react'
import { Board, GameState, getEmptyBoard } from './utils'

export const useGameState = () => {
  /* Set this to a word to debug the game with a known answer, eg 'DUMMY' */
  const DEBUG_MANUAL_ANSWER: null | string = null

  const [turn, setTurn] = useState<number>(0) /* The row the game is on */
  const [activeSquare, setActiveSquare] = useState<number>(0) /* The column the game is on */
  const [board, setBoard] = useState<Board>(getEmptyBoard())
  const [answer, setAnswer] = useState<string>(() => DEBUG_MANUAL_ANSWER || getRandomAnswer())
  const [gameState, setGameState] = useState<GameState>('IN_PROGRESS')

  const startNewGame = () => {
    setTurn(0)
    setActiveSquare(0)
    setBoard(getEmptyBoard())
    setAnswer(DEBUG_MANUAL_ANSWER || getRandomAnswer())
    setGameState('IN_PROGRESS')
  }

  return {
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
  }
}
