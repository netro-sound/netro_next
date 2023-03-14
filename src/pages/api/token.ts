// pages/api/user.ts

import withSession from '@/lib/session';

export default withSession(function tokenRoute(req, res) {
  res.send(req.session);
});
