import { wordList } from './wordList'

// Returns true if the word is in the list of words
export function checkIsWordReal(word: string) {
  return wordList.includes(word.toLowerCase())
}

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * wordList.length)
  const randomWord = wordList[randomIndex]

  return randomWord.toUpperCase()
}
