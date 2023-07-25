const passport = require('passport');
const jwt = require('jsonwebtoken');
const StoreRepository = require('../repositories/store_repository');

exports.loginController = async (req, res, next) => {
  try {
    if (res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '이미 로그인 중입니다.' });
    }
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
        return res.status(400).json({ reason: info });
      }
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          return res.status(400).json({ errorMessage: loginError });
        }
        const token = jwt.sign({ user: user }, process.env.COOKIE_SECRET);

        res.cookie('authorization', `Bearer ${token}`);
        return res.status(200).json({ message: '로그인 되었습니다.' });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logoutController = (req, res) => {
  try {
    if (!res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '로그인 상태가 아닙니다' });
    }

    res.clearCookie('authorization');
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

exports.kakaoAuth = () => {
  passport.authenticate('kakao');
};

exports.kakaoCallback = (req, res) => {
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  });

  res.redirect('/');
};

exports.isLogin = async (req, res) => {
  const isLoggedIn = res.locals.isLoggedIn;
  const status = res.locals.status;
  const storerepository = new StoreRepository();
  if (!res.locals.user_id) { return res.status(200).json({ isLoggedIn, status }); }
  const user_id = res.locals.user_id;
  const storeId = await storerepository.findOneStatus(user_id);
  return res.status(200).json({ isLoggedIn, status, storeId});
};
