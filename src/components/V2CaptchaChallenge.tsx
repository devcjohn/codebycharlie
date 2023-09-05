import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

/* Note: Captcha V3 could have been used, which runs without prompting the user, but I wanted to try V2. */

const captchaKey = import.meta.env.VITE_CAPTCHA_KEY

const obfuscatedInfo = 'ZGV2Y2pvaG5AZ21haWwuY29tLGxpbmtlZGluLmNvbS9pbi9kZXZjam9obi8=' // after btoa([email, linkedin])]

const unobfuscateinfo = (obfuscated: string) => {
  return atob(obfuscated).split(',')
}

export const V2CaptchaChallenge = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
  const [linkedIn, setLinkedIn] = useState<string>('')

  const captchaRef = useRef(null)

  const onChange = (t: string | null) => {
    if (!t) {
      return
    }

    setCaptchaToken(t)
    const realInfo = unobfuscateinfo(obfuscatedInfo)
    setEmail(realInfo[0])
    setLinkedIn(realInfo[1])
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ReCAPTCHA
        sitekey={captchaKey}
        ref={captchaRef}
        onChange={onChange}
        badge="bottomright"
        size="compact"
        className="p-5 m-5"
      />
      <div className="p-5 m-5">Email: {captchaToken ? email : 'Complete Captcha to see email'}</div>
      <div className="p-5 m-5">
        LinkedIn: {captchaToken ? linkedIn : 'Complete Captcha to see Linkedin'}
      </div>
    </div>
  )
}
