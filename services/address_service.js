const AddressesRepository = require('../repositories/address_repository');
const { Transaction } = require('sequelize');
const { sequelize } = require('../models');

class AddressService {
  addressRepository = new AddressesRepository();

  findCurrentAddress = async (user_id) => {
    const currentAddr = await this.addressRepository.findUserAddressOne(
      user_id
    );
    const addresses = await this.addressRepository.findUserAddress(user_id);
    const data = {
      currentAddr: currentAddr,
      addresses: addresses.map((address) => {
        return address.dataValues;
      }),
    };

    return data;
  };

  findUserAddress = async (user_id) => {
    return await this.addressRepository.findUserAddress(user_id);
  };

  findUserAddressOne = async (user_id) => {
    return await this.addressRepository.findUserAddressOne(user_id);
  };

  createAddress = async (user_id, address) => {
    return await this.addressRepository.createAddress(user_id, address);
  };

  updateIsCurren = async (user_id, address_id) => {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED, // 트랜잭션 격리 수준을 설정합니다.
      });
      await this.addressRepository.updateIsCurrentNull(user_id, t);
      await this.addressRepository.updateIsCurrentTrue(address_id, t);
      await t.commit();
      return true;
    } catch (error) {
      console.log(error);
      await t.rollback();
      return false;
    }
  };

  deleteAddress = async (address_id) => {
    return await this.addressRepository.deleteAddress(address_id);
  };
}

module.exports = AddressService;
