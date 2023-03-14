import withSession from '@/lib/session';

export default withSession(function logoutRoute(req, res) {
  req.session.destroy();

  res.status(200).json({ message: 'Logged out' });
});
