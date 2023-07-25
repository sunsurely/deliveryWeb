const jwt = require('jsonwebtoken');

exports.authorizated = async (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (authType !== 'Bearer' || !authToken) {
    return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
  }

  try {
    const { user } = jwt.verify(authToken, process.env.COOKIE_SECRET);

    res.locals.user_id = user.user_id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  const [authType, authToken] = (authorization ?? '').split(' ');

  const { user } = jwt.verify(authToken, process.env.COOKIE_SECRET);
  if (!authorization || authType !== 'Bearer' || !authToken) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  res.locals.isLoggedIn = true;
  console.log(user);
  res.locals.user_id = user.user_id;
  res.locals.status = user.status;
  next();
};
