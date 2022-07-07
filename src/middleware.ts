import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_Secret })

  const { pathname } = req.nextUrl

  // Allow auth routes to pass through
  if (pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // Allow logged in users to pass through
  if (token) {
    return NextResponse.next()
  }

  // Redirect to login page if no token is found and path is home
  if (pathname == '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Allow everything else to pass through
  // Beucase this middleware also treats static files
  return NextResponse.next()
}