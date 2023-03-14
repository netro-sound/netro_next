import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';
import { sessionOptions } from '@/lib/session.config';

export default function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
