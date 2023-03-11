// /middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  console.log('session', session);

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // demo:
  // if (user?.admin !== 'true') {
  //   // unauthorized to see pages inside admin/
  //   return NextResponse.redirect(new URL('/unauthorized', req.url)); // redirect to /unauthorized page
  // }

  return res;
}
