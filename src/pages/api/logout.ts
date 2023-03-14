import withSession from '@/lib/session';

export default withSession(function logoutRoute(req, res) {
  req.session.destroy();

  // @ts-ignore
  req.session['flash'] = {
    type: 'success',
    message: 'You have successfully logged out.',
  };

  // Redirect to login page
  res.redirect('/auth/login');
});
