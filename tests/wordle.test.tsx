import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Wordle } from '../src/wordle'
import React from 'react'
import { describe, expect, afterEach, it, vi } from 'vitest'
import * as wordLib from '../src/dictionary/wordLib'

const spyGenerateWord = vi.spyOn(wordLib, 'getRandomWord')

// setup function.  Allows us to use user.keyboard to simlate keystrokes, which is really nice
function setup(jsx) {
  return {
    user: userEvent.setup(),
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  }
}

afterEach(() => {
  cleanup()
})

describe('Wordle', () => {
  it('renders the empty board', () => {
    render(<Wordle />)

    expect(screen.getByText(/Popular Word Game/i)).toBeTruthy()

    // All squares are empty ('_')
    const emptySquares = screen.getAllByText(/_/i)
    expect(emptySquares.length).toBe(30)
  })

  it('allows user to enter a letter', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'A'
    await user.keyboard('a')

    // Now there are 29 empty squares
    const emptySquares = screen.getAllByText(/_/i)
    expect(emptySquares.length).toBe(29)

    // Now the first square is 'A'
    const filledSquare = await screen.findByTestId('square-0-0')
    expect(filledSquare.textContent).toBe('A')
  })

  it('ignores input that is nonalphabetic (other than delete)', async () => {
    const { user } = setup(<Wordle />)

    // None of these inputs do anything

    await user.keyboard('{control}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('{insert}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('{Alt}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('{Tab}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('{Meta}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('{Enter}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    await user.keyboard('0')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')
  })

  it('allows user to enter 4 letters', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'abcd'
    await user.keyboard('a')
    await user.keyboard('b')
    await user.keyboard('c')
    await user.keyboard('d')

    // Now there are 26 empty squares
    const emptySquares = screen.getAllByText(/_/i)
    expect(emptySquares.length).toBe(26)

    // Squares are filled with the user's input
    const filledSquare = await screen.findByTestId('square-0-0')
    expect(filledSquare.textContent).toBe('A')

    const filledSquare2 = await screen.findByTestId('square-0-1')
    expect(filledSquare2.textContent).toBe('B')

    const filledSquare3 = await screen.findByTestId('square-0-2')
    expect(filledSquare3.textContent).toBe('C')

    const filledSquare4 = await screen.findByTestId('square-0-3')
    expect(filledSquare4.textContent).toBe('D')
  })

  it('allows user to delete a character at the beginning of the row', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'A'
    await user.keyboard('a')

    const emptySquares = screen.getAllByText(/_/i)
    expect(emptySquares.length).toBe(29)

    // Now the first square is 'A'
    const filledSquare = await screen.findByTestId('square-0-0')
    expect(filledSquare.textContent).toBe('A')

    // User hit delete
    await user.keyboard('{backspace}')

    // Now there are 30 empty squares again
    expect(screen.getAllByText(/_/i).length).toBe(30)
    // The first square is empty again
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')
  })

  it('allows user to delete characters in the middle of the row', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'abcd'
    await user.keyboard('a')
    await user.keyboard('b')
    await user.keyboard('c')
    await user.keyboard('d')

    expect((await screen.findByTestId('square-0-3')).textContent).toBe('D')

    // User hits backspace 4 times
    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-3')).textContent).toBe('_')

    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-2')).textContent).toBe('_')

    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-1')).textContent).toBe('_')

    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')
  })

  it('allows user to delete characters at the end of a row ', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'abcde', an invalid word
    await user.keyboard('a')
    await user.keyboard('b')
    await user.keyboard('c')
    await user.keyboard('d')
    await user.keyboard('e')

    // The last square is highlighted
    expect(
      (await screen.findByTestId('square-0-4')).classList.contains('border-8')
    ).toBe(true)
    expect((await screen.findByTestId('square-0-4')).textContent).toBe('E')

    await user.keyboard('{backspace}')

    // Now the last square is empty but still highlighted
    expect(
      (await screen.findByTestId('square-0-4')).classList.contains('border-8')
    ).toBe(true)
    expect((await screen.findByTestId('square-0-4')).textContent).toBe('_')

    await user.keyboard('{backspace}')

    // Now the 4th square is empty and highlighted
    expect(
      (await screen.findByTestId('square-0-3')).classList.contains('border-8')
    ).toBe(true)
    expect((await screen.findByTestId('square-0-3')).textContent).toBe('_')

    // Simulate user deleting remaining squares
    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-2')).textContent).toBe('_')

    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-1')).textContent).toBe('_')

    await user.keyboard('{backspace}')
    expect((await screen.findByTestId('square-0-0')).textContent).toBe('_')

    // Now the first square is empty and highlighted
    expect(
      (await screen.findByTestId('square-0-0')).classList.contains('border-8')
    ).toBe(true)
  })

  it('resets the board when reset button is clicked', async () => {
    const { user } = setup(<Wordle />)

    // User enters 'abcd'
    await user.keyboard('a')
    await user.keyboard('b')
    await user.keyboard('c')
    await user.keyboard('d')

    const resetButton = screen.getByText(/reset/i)
    await userEvent.click(resetButton)

    const emptySquares = screen.getAllByText(/_/i)
    expect(emptySquares.length).toBe(30)
  })

  it('shows loss message when game is lost', async () => {
    // Mock out the correct answer to be 'RIGHT'
    spyGenerateWord.mockImplementation(() => 'RIGHT')

    const { user } = setup(<Wordle />)

    // User fills up each row with 'wrong' (a real word, but not the answer)
    for (let i = 0; i < 6; i++) {
      await user.keyboard('w')
      await user.keyboard('r')
      await user.keyboard('o')
      await user.keyboard('n')
      await user.keyboard('g')
    }

    // User has run out of guesses
    expect(await screen.findByText(/You Lost!/i)).toBeTruthy()
  })

  it('shows win message when game is won', async () => {
    // Mock out the correct answer to be 'RIGHT'
    spyGenerateWord.mockImplementation(() => 'RIGHT')

    const { user } = setup(<Wordle />)

    await user.keyboard('RIGHT')

    expect(screen.getByText(/You Won!/i)).toBeTruthy()
  })

  describe('Grading', () => {
    it('Colors squares based on correctness', async () => {
      // Mock out the correct answer to be 'RIGHT'
      spyGenerateWord.mockImplementation(() => 'RIGHT')

      const { user } = setup(<Wordle />)

      await user.keyboard('raggy')

      // The first and third squares are green because they matche the answer.
      // The 4th square is yellow because it is in the answer but in the wrong place.
      // The other squares are gray because they are not in the answer.
      expect(
        (await screen.findByTestId('square-0-0')).classList.contains(
          'bg-green-500'
        )
      ).toBe(true)
      expect(
        (await screen.findByTestId('square-0-1')).classList.contains(
          'bg-gray-500'
        )
      ).toBe(true)
      expect(
        (await screen.findByTestId('square-0-2')).classList.contains(
          'bg-green-500'
        )
      ).toBe(true)
      expect(
        (await screen.findByTestId('square-0-3')).classList.contains(
          'bg-yellow-500'
        )
      ).toBe(true)
      expect(
        (await screen.findByTestId('square-0-4')).classList.contains(
          'bg-gray-500'
        )
      ).toBe(true)
    })
  })
})
