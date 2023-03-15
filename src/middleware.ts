// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/session.config';
import { IAuth } from '@/interfaces/AuthInterface';
import { parseISO } from 'date-fns';

export const middleware = async (req: NextRequest) => {
  const currentPath = req.nextUrl.pathname;
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  // console.log('req.session', req.cookies);
  // console.log('session', session);
  // console.log('currentPath', currentPath);

  if (Object.keys(session).length === 0) {
    if (currentPath === '/auth/login') {
      return res;
    } else {
      // @ts-ignore
      session['flash'] = {
        type: 'error',
        message: 'You are not logged in. Please login first.',
      };
      await session.save();
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  const { expiry } = session as unknown as IAuth;

  const expiryDate = parseISO(expiry);

  if (expiryDate && new Date() > expiryDate) {
    await session.destroy();
    // @ts-ignore
    session['flash'] = {
      type: 'error',
      message: 'Your session has expired. Please login again.',
    };
    await session.save();
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // demo:
  // if (user?.admin !== 'true') {
  //   // unauthorized to see pages inside admin/
  //   return NextResponse.redirect(new URL('/unauthorized', req.url)); // redirect to /unauthorized page
  // }

  return NextResponse.redirect(new URL('/', req.url));
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|v1|_next/static|_next/image|favicon.ico).*)',
  ],
};
