import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set country cookie for 30 days
const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60

export function middleware(req: NextRequest) {
  const { nextUrl, geo, headers } = req

  // Skip static assets and Next.js internals
  const pathname = nextUrl.pathname
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|mp4|mov|mp3|woff2?|ttf|otf)$/)
  ) {
    return NextResponse.next()
  }

  let country = geo?.country || headers.get('x-vercel-ip-country') || 'US'
  // Normalize to two-letter uppercase
  if (country) country = country.toUpperCase().slice(0, 2)

  const res = NextResponse.next()

  // Set cookie if missing or different
  const existing = req.cookies.get('country')?.value
  if (existing !== country) {
    res.cookies.set('country', country, {
      path: '/',
      maxAge: THIRTY_DAYS_SECONDS,
      httpOnly: false,
      sameSite: 'lax',
      secure: true,
    })
  }

  return res
}

export const config = {
  matcher: ['/((?!_next|.*\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|mp4|mov|mp3|woff|woff2|ttf|otf)$).*)'],
}


