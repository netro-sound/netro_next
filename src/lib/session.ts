import { IronSessionOptions } from 'iron-session';

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const COOKIE_NAME = process.env.COOKIE_NAME as string;

export const sessionOptions: IronSessionOptions = {
  cookieName: COOKIE_NAME,
  password: TOKEN_SECRET,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
