import { V2CaptchaChallenge } from '../components/V2CaptchaChallenge'
import { useState } from 'react'

export const Contact = () => {
  const [hasClicked, setHasClicked] = useState(false)

  return (
    <div className="mt-10 text-center">
      <button onClick={() => setHasClicked(true)}>Show Secret (No Robots Allowed)</button>
      {hasClicked && (
        <V2CaptchaChallenge
          encodedStr="U28gaGVyZSdzIGhvdyB3ZSdkIGZpZ2h0IGJhY2sgaW4gdGhlIGV2ZW50IG9mIGFuIEFJIHRha2VvdmVyLi4u" /* From running btoa on the 'secret' message */
          decoder={(s) => atob(s)}
        />
      )}
    </div>
  )
}
