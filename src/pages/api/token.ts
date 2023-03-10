// pages/api/user.ts

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const COOKIE_NAME = process.env.COOKIE_NAME as string;

export default withIronSessionApiRoute(function tokenRoute(req, res) {
  res.send(req.session);
}, sessionOptions);
