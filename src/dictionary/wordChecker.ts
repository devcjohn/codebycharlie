import NSpell from 'nspell'
import nspell from 'nspell'

let spell: NSpell

async function load() {
  const aff = await fetch('/src/dictionary/index.aff').then((response) => {
    return response.text()
  })
  const dic = await fetch('/src/dictionary/index.dic').then((response) => {
    return response.text()
  })
  spell = nspell(aff, dic)
}

export function loadChecker() {
  load()
}

export function checkWord(word: string) {
  console.log({ word, spell })
  return spell.correct(word)
}
