const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const bcrypt = require('bcrypt');

require('dotenv').config();

const { User } = require('../models');

const localConfig = { usernameField: 'account', passwordField: 'password' };

const KakaoConfig = {
  clientID: process.env.KAKAO_CLIENT_ID,
  callbackURL: 'auth/kakao/callback',
};

const localVerify = async (account, password, done) => {
  try {
    if (!account) {
      done(null, false, { message: '이메일을 입력해주세요' });
      return;
    }
    const user = await User.findOne({ where: { account } });
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }
    if (!password) {
      done(null, false, { message: '비밀번호를 입력해주세요.' });
      return;
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      done(null, user);
      return;
    }
    done(null, false, { message: '올바르지 않은 비밀번호입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const KakaoVerify = async (accessToken, refreshToken, profile, done) => {
  console.log('kakao profile', profile);
  try {
    const exUser = await User.findOne({
      where: { snsId: profile.id, provider: 'kakao' },
    });
    if (exUser) {
      done(null, exUser);
    } else {
      const newUser = await User.create({
        account: profile._json?.kakao_account?.account,
        nickname: profile.displayName,
        snsId: profile.id,
        provider: 'kakao',
      });
      done(null, newUser);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(localConfig, localVerify));
  passport.use('kakao', new KakaoStrategy(KakaoConfig, KakaoVerify));
};
