// import passport from 'passport';
// import nextConnect from 'next-connect';
// import { localStrategy } from '@/lib/auth/password-local';
// import { setLoginSession } from '@/lib/auth/auth';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { IAuth } from '@/interfaces/AuthInterface';
//
// const authenticate = (
//   method: string,
//   req: NextApiRequest,
//   res: NextApiResponse
// ) =>
//   new Promise((resolve, reject) => {
//     passport.authenticate(
//       method,
//       { session: false },
//       (error: any, token: IAuth) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(token);
//         }
//       }
//     )(req, res);
//   });
//
// passport.use(localStrategy);
//
// export default nextConnect()
//   .use(passport.initialize())
//   .post(async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       const session = (await authenticate('local', req, res)) as IAuth;
//       // session is the payload to save in the token, it may contain basic info about the user
//       await setLoginSession(res, session);
//
//       res.status(200).send({ done: true });
//     } catch (error: any) {
//       console.error(error);
//       res.status(401).send(error.message);
//     }
//   });

// pages/api/login.ts

import { authAxios } from '@/lib/axios';
import withSession from '@/lib/session';
import { IAuth } from '@/interfaces/AuthInterface';

export default withSession(async function loginRoute(req, res) {
  const { data } = await authAxios.post('/login/', {
    username: req.body.username,
    password: req.body.password,
  });

  // @ts-ignore
  req.session.auth = data;
  // @ts-ignore
  req.session.flash = {
    type: 'success',
    message: 'You have successfully logged in.',
  };

  await req.session.save();
  res.status(200).json(data);
});