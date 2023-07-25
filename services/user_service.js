const UserRepository = require('../repositories/user_repository');

const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

const bcrypt = require('bcrypt');

class UserService {
  userRepository = new UserRepository();

  //유저 정보 조회
  findUser = async (userId) => {
    try {
      const query = `select user_id, account, nickname, point from users where user_id = ${userId}`;

      const user = await this.userRepository.findUser(query);

      return user;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '유저 정보 조회에 실패하였습니다.' }
        : error;
    }
  };

  findUserForOrder = async (user_id) => {
    try {
      const query = `SELECT point, address, address_id, c.store_id FROM users a INNER JOIN addresses b ON a.user_id = b.user_id INNER JOIN carts c ON a.user_id = c.user_id WHERE a.user_id = ${user_id} AND b.isCurrent = 1`;

      const user = await this.userRepository.findUser(query);

      return user;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '유저 정보 조회에 실패하였습니다.' }
        : error;
    }
  };

  //유저 정보 수정
  updateUser = async (userId, nickname) => {
    try {
      const query = `update users set nickname = '${nickname}' where user_id = ${userId}`;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      await this.userRepository.updateUser(query, t);

      return;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '유저 정보 수정에 실패하였습니다.' }
        : error;
    }
  };

  //유저 탈퇴
  deleteUser = async (userId, password) => {
    try {
      const user = await this.userRepository.findUser(
        `select * from users where user_id = ${userId}`
      );

      const comparePwd = await bcrypt.compare(password, user[0].password);

      if (!comparePwd) {
        throw { status: 403, errorMessage: '비밀번호가 일치하지 않습니다.' };
      }

      const query = `delete from users where user_id = ${userId} and password = '${user[0].password}'`;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      await this.userRepository.deleteUser(query, t);

      return;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '유저 탈퇴에 실패하였습니다.' }
        : error;
    }
  };
}

module.exports = UserService;
