import { authAxios } from '@/lib/axios';
import withSession from '@/lib/session';

export default withSession(async function loginRoute(req, res) {
  try {
    const { data } = await authAxios.post('/login/', {
      username: req.body.username,
      password: req.body.password,
    });

    // @ts-ignore
    req.session.auth = data;
    await req.session.save();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
});
