import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

/* This component takes an encoded string and a decoder function.
 * When the user completes the captcha, the decoded string is displayed.
 * This is of course not secure in any sense, as all secrets are exposed in the client code.
 * It's just a way to demonstrate a V2 Captcha that is slightly more interesting than a regular unencoded string.
 * If a backend is ever added to this website, secrets could actually be hidden behind the captcha click.
 * Note: Captcha V3 could have been used, which runs without prompting the user, but I wanted to try V2.
 */

type Props = {
  encodedStr: string
  decoder: (str: string) => string
}
export const V2CaptchaChallenge: React.FC<Props> = ({ encodedStr, decoder }) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [decodedStr, setDecodedStr] = useState<string>('')

  const captchaRef = useRef(null)

  const onChange = (token: string | null) => {
    if (!token) {
      return
    }

    setCaptchaToken(token)
    setDecodedStr(decoder(encodedStr))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_CAPTCHA_KEY}
        ref={captchaRef}
        onChange={onChange}
        badge="bottomright"
        size="compact"
        className="p-5 m-5"
      />
      <div className="p-5 m-5">{captchaToken ? decodedStr : null}</div>
    </div>
  )
}
