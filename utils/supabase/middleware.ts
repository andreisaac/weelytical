import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.auth.getSession();
  //signup user state redirect
  if(request.nextUrl.pathname.startsWith('/register/signup') && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/register/project'
    return NextResponse.redirect(url)
  } else if(request.nextUrl.pathname.startsWith('/register/signup') && user){
    const url = request.nextUrl.clone()
    url.pathname = '/register/confirm'
    return NextResponse.redirect(url)
  }else if(request.nextUrl.pathname.startsWith('/register/confirm') && user && user?.user_metadata.email_verified) {
    const url = request.nextUrl.clone()
    url.pathname = '/register/project'
    return NextResponse.redirect(url)
  } else if(request.nextUrl.pathname.startsWith('/register/project') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/register/signup'
    return NextResponse.redirect(url)
  }
  
  if (
    !user &&
    (
      request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/settings')
    )
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  } else if(
    user &&
    request.nextUrl.pathname.startsWith('/signin')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}