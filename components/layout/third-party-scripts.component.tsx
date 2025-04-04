import Script from 'next/script'

const ThirdPartyScripts = () => (
  <>
    <Script src="https://cdn.attn.tv/semiaquatics/dtag.js" />
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=UA-154479709-1"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-154479709-1');
      `}
    </Script>
  </>
);
  
export default ThirdPartyScripts;