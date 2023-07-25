const AddressService = require('../services/address_service');

class AddressController {
  addressService = new AddressService();

  findCurrentAddress = async (req, res) => {
    try {
      const user_id = res.locals.user_id;

      if (!user_id) {
        return res.render('main', { currentAddr: null });
      }

      const data = await this.addressService.findCurrentAddress(user_id);

      if (!data.currentAddr) {
        if (data.addresses) {
          const currentAddr = '주소 설정';
          return res.render('main', { currentAddr, addresses: data.addresses });
        }
        const currentAddr = '주소 설정';
        const addresses = null;
        return res.render('main', { currentAddr, addresses });
      }

      return res.render('main', {
        currentAddr: data.currentAddr.dataValues.address,
        addresses: data.addresses,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  };

  findUserAddress = async (req, res, nextr_id) => {
    try {
      const user_id = res.locals.user_id;
      const address = await this.addressService.findUserAddress(user_id);
      return res.status(200).json({ data: address });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주소 조회에 실패하였습니다.',
      });
    }
  };

  findUserAddressOne = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const address = await this.addressService.findUserAddressOne(user_id);

      return res.status(200).json({ data: address });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주소 조회에 실패하였습니다.',
      });
    }
  };

  createAddress = async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }
      const user_id = res.locals.user_id;
      const { address } = req.body;
      const addressRow = await this.addressService.createAddress(
        user_id,
        address
      );
      return res.status(200).json({ data: addressRow });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };

  //마지막으로 선택
  updateIsCurren = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }

      const address_id = parseInt(req.params.address_id);

      const user_id = res.locals.user_id;
      await this.addressService.updateIsCurren(user_id, address_id);
      return res
        .status(200)
        .json({ message: '현재 주소 등록에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };

  deleteAddress = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }
      const { address_id } = req.params;
      await this.addressService.deleteAddress(address_id);
      return res.status(201).json({ message: '주소 삭제에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = AddressController;
