import { render, cleanup, screen } from '@testing-library/react'
import { Wordle } from '../src/wordle'
import React from 'react'
import { describe, expect, afterEach, test, vi } from 'vitest'
import * as wordChecker from '../src/dictionary/wordChecker'

const spyCheckWord = vi.spyOn(wordChecker, 'checkWord')
const spyLoad = vi.spyOn(wordChecker, 'loadChecker')
spyLoad.mockImplementation(() => true)
spyCheckWord.mockImplementation(() => true)

afterEach(() => {
  cleanup()
})

describe('Wordle', () => {
  test('renders correctly', () => {
    render(<Wordle />)

    expect(screen.getByText(/Word Length/i)).toBeTruthy()
  })
})
