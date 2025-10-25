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
      {/* {allowAnalytics && (
          )} */}
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-375808781" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-375808781');
            `}
          </Script>
        </>

      {allowMarketing && (
        <>
          <Script src="https://cdn.attn.tv/semiaquatics/dtag.js" strategy="afterInteractive" />
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '269716947689981');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img height="1" width="1" style={{display: 'none'}}
              src="https://www.facebook.com/tr?id=269716947689981&ev=PageView&noscript=1" />
          </noscript>
        </>
      )}
    </>
  )
}

export default ThirdPartyScripts