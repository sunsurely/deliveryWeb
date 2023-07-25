const { sequelize } = require('../models');

class UserRepository {
  //유저 정보 조회
  findUser = async (query) => {
    try {
      const user = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  //유저 정보 수정
  updateUser = async (query, t) => {
    try {
      await sequelize.query(query, {
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
      });

      await t.commit();

      return;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  };

  //유저 탈퇴
  deleteUser = async (query, t) => {
    try {
      await sequelize.query(query, {
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });

      await t.commit();

      return;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  };
}

module.exports = UserRepository;
