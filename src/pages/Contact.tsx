import { V2CaptchaChallenge } from '../components/V2CaptchaChallenge'
import { useState } from 'react'

export const Contact = () => {
  const [hasClicked, setHasClicked] = useState(false)

  return (
    <div>
      <button onClick={() => setHasClicked(true)}>Show Contact Info</button>
      {hasClicked && <V2CaptchaChallenge />}
    </div>
  )
}
