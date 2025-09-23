import { useCallback, useEffect, useMemo, useState } from 'react'
import { needsPriorConsent } from './regions'

export type Consent = {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: 1;
  regionModel: 'PRIOR' | 'NOTICE';
  country?: string;
}

const STORAGE_KEY = 'consent:v1'

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : undefined
}

function getStoredConsent(): Consent | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as Consent
    if (parsed && parsed.version === 1) return parsed
  } catch {}
  return undefined
}

export function useGeoAndConsent() {
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [consent, setConsent] = useState<Consent | undefined>(undefined)

  useEffect(() => {
    const cc = readCookie('country') || undefined
    setCountry(cc)
    const stored = getStoredConsent()
    if (stored) {
      setConsent(stored)
      // Ensure Consent Mode mirrors storage on load
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const analytics_storage = stored.analytics ? 'granted' : 'denied'
        const adValue = stored.marketing ? 'granted' : 'denied'
        ;(window as any).gtag('consent', 'update', {
          analytics_storage,
          ad_storage: adValue,
          ad_user_data: adValue,
          ad_personalization: adValue,
        })
      }
    }
  }, [])

  const regionModel = useMemo<'PRIOR' | 'NOTICE'>(() => {
    return needsPriorConsent(country) ? 'PRIOR' : 'NOTICE'
  }, [country])

  const saveConsent = useCallback((next: Pick<Consent, 'analytics' | 'marketing'>) => {
    const record: Consent = {
      analytics: !!next.analytics,
      marketing: !!next.marketing,
      timestamp: Date.now(),
      version: 1,
      regionModel,
      country,
    }
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
      }
    } catch {}
    setConsent(record)

    // Google Consent Mode v2 update
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const analytics_storage = record.analytics ? 'granted' : 'denied'
        const adValue = record.marketing ? 'granted' : 'denied'
        ;(window as any).gtag('consent', 'update', {
          analytics_storage,
          ad_storage: adValue,
          ad_user_data: adValue,
          ad_personalization: adValue,
        })
      }
    } catch {}

    // Broadcast update
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('consent:updated', { detail: record }))
      }
    } catch {}
  }, [country, regionModel])

  return { country, consent, saveConsent, regionModel }
}


