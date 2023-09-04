import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './virtualKeyboardStyle.css'
import { Board, GuessResult, Square } from './utils'

interface VirtualKeyboardProps {
  onKeyPress: (button: any) => void
  board: Board
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, board }) => {
  const getLetterStates = (): { [key: string]: GuessResult | null } => {
    // {
    //   'A': 'CORRECT',
    //   'B': 'INCORRECT',
    //   'C': 'MISPLACED',
    //   'D': null,
    //    etc...
    // }
    const letterStates: { [key: string]: GuessResult | null } = {}

    board.forEach((row: Square[]) => {
      row.forEach((square: Square) => {
        if (square.value) {
          // If the letter already exists, prioritize the state
          if (letterStates[square.value]) {
            if (letterStates[square.value] === 'MISPLACED' && square.result === 'CORRECT') {
              letterStates[square.value] = square.result
            } else if (
              letterStates[square.value] === 'INCORRECT' &&
              (square.result === 'CORRECT' || square.result === 'MISPLACED')
            ) {
              letterStates[square.value] = square.result
            }
          } else {
            letterStates[square.value] = square.result
          }
        }
      })
    })

    return letterStates
  }

  // Extract letter states
  const letterStates = getLetterStates()

  // Generate buttonTheme based on letter states
  const generateButtonThemes = (): {
    class: string
    buttons: string
  }[] => {
    const themes = []
    for (const letter in letterStates) {
      let className = ''
      switch (letterStates[letter]) {
        case 'CORRECT':
          className = 'green'
          break
        case 'MISPLACED':
          className = 'yellow'
          break
        case 'INCORRECT':
          className = 'gray'
          break
        default:
          break
      }
      themes.push({
        class: className,
        buttons: letter,
      })
    }
    return themes
  }

  return (
    <Keyboard
      onKeyPress={onKeyPress}
      theme="hg-theme-default hg-layout-default"
      layout={{
        default: ['{bksp}', 'Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M'],
      }}
      buttonTheme={generateButtonThemes()}
    />
  )
}
