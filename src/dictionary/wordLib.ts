import { allowedWordList } from './allowedWordList'
import { answersWordList } from './answersWordList'

// Returns true if the word is in the list of words
export function checkIsWordReal(word: string) {
  return allowedWordList.includes(word.toLowerCase())
}

export const getRandomAnswer = (): string => {
  const randomIndex = Math.floor(Math.random() * answersWordList.length)
  const randomWord = answersWordList[randomIndex]

  return randomWord.toUpperCase()
}
