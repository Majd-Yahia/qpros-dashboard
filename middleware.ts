import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface CustomNextRequest extends NextRequest {
  user?: any;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: CustomNextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Specify the routes you want the middleware to be applied to
  const protectedRoutes = ['/dashboard', '/authentication/login', '/authentication/register'];

  if (pathname.endsWith('/')) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get('authToken')?.value;
    const res = await fetch(`${origin}/api/verifyToken/${token}`);

    if (res.status == 401 && pathname !== '/authentication/login' && pathname !== '/authentication/register') {
      return NextResponse.redirect(`${origin}/authentication/login`);
    }

    // Redirect to dashboard if authenticated but on login or register page
    if (res.status == 200 && (pathname === '/authentication/login' || pathname === '/authentication/register')) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(`${origin}/authentication/login`);
  }
}
