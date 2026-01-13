// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/dashboard')) {
    // TEMPORARILY DISABLED - allow anyone to access dashboard for trial/demo
    // const isLoggedIn = request.cookies.has('sb-access-token')
    // if (!isLoggedIn) {
    //   return NextResponse.redirect(new URL('/signin', request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}