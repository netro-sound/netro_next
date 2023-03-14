import withSession from '@/lib/session';
import { isEmpty } from 'lodash';
import { ISession } from '@/interfaces/SessionInterface';

export default withSession(async (req, res) => {
  const session = req.session as unknown as ISession;

  if (!isEmpty(session)) {
    const { flash, auth } = session;

    // @ts-ignore
    session.flash = null;
    // @ts-ignore
    await session.save();

    res.status(200).json({ flash, auth });
  }

  res.status(401).json({ error: 'Unauthorized' });
});
