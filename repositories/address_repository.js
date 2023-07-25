const { Address } = require('../models');

class AddressRepository {
  //전체 게시글 조회
  findUserAddress = async (user_id) => {
    return await Address.findAll({
      attributes: ['address_id', 'address'],
      where: { user_id },
      order: [['address_id', 'DESC']],
    });
  };

  //마지막으로 사용한 주소
  findUserAddressOne = async (user_id) => {
    return await Address.findOne({
      attributes: ['createdAt', 'address'],
      where: { isCurrent: 1, user_id },
    });
  };

  createAddress = async (user_id, address) => {
    return await Address.create({
      user_id,
      address,
    });
  };

  updateIsCurrentNull = async (user_id, t) => {
    return await Address.update(
      { isCurrent: false },
      { where: { user_id }, transaction: t }
    );
  };

  updateIsCurrentTrue = async (address_id, t) => {
    return await Address.update(
      { isCurrent: true },
      { where: { address_id }, transaction: t }
    );
  };

  deleteAddress = async (address_id) => {
    return await Address.destroy({ where: { address_id } });
  };
}

module.exports = AddressRepository;
