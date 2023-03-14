import { IronSessionOptions } from 'iron-session';

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME as string;

export const sessionOptions: IronSessionOptions = {
  cookieName: COOKIE_NAME,
  password: TOKEN_SECRET,
  ttl: 60 * 60 * 24, // 24 hours
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
