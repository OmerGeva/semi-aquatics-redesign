import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useGeoAndConsent } from '../../lib/consent/useConsent'

const ThirdPartyScripts = () => {
  const { consent } = useGeoAndConsent()
  const [allowAnalytics, setAllowAnalytics] = useState(false)
  const [allowMarketing, setAllowMarketing] = useState(false)

  useEffect(() => {
    setAllowAnalytics(!!consent?.analytics)
    setAllowMarketing(!!consent?.marketing)
  }, [consent])

  return (
    <>
      {allowAnalytics && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=UA-154479709-1" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'UA-154479709-1');
            `}
          </Script>
        </>
      )}

      {allowMarketing && (
        <Script src="https://cdn.attn.tv/semiaquatics/dtag.js" strategy="afterInteractive" />
      )}
    </>
  )
}

export default ThirdPartyScripts