import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './virtualKeyboardStyle.css'
//import Keyboard from 'simple-keyboard'
//import 'simple-keyboard/build/css/index.css'

interface VirtualKeyboardProps {
  onKeyPress: (button: any) => void
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  return (
    <Keyboard
      onKeyPress={onKeyPress}
      theme="hg-theme-default hg-layout-default"
      layout={{
        default: ['{bksp}', 'Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M'],
      }}
      buttonTheme={[
        {
          class: 'gray',
          buttons: 'Q',
        },
        {
          class: 'green',
          buttons: 'W',
        },
        {
          class: 'yellow',
          buttons: 'E',
        },
      ]}
    />
  )
}
