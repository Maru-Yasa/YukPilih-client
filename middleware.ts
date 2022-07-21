import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { API_URL } from './config/config'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')
  const url = req.nextUrl.clone()

  if (req.nextUrl.pathname.startsWith('/profile')) {    
    url.pathname = '/login'
    if(!req.cookies.has('authToken')) return NextResponse.redirect(url)
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith('/login')) {
    url.pathname = '/'
    if(req.cookies.has('authToken')) return NextResponse.redirect(url)
    return NextResponse.next()
  }
  NextResponse.next()
}