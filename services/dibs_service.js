const DibsRepository = require('../repositories/dibs_repository');
const { User } = require('../models/user');
const { Store } = require('../models/store');
class DibsService {
  dibsRepository = new DibsRepository();

  updateDibs = async (user_id, store_id) => {
    const dibs = await this.dibsRepository.readDibs(user_id, store_id);

    if (dibs) {
      return await this.dibsRepository.deleteDibs(user_id, store_id);
    }
    if (dibs === null) {
      await this.dibsRepository.createDibs(user_id, store_id);
    }
  };

  //내가 찜한 가게 조회
  findMyDibs = async (userId) => {
    try {
      const query = `select s.store_id, s.name, s.img_url, s.rating from users u
                  inner join dibs d on u.user_id = d.user_id
                  inner join stores s on d.store_id = s.store_id
                  where u.user_id = ${userId};`;

      const myDibs = await this.dibsRepository.findMyDibs(query);

      return myDibs;
    } catch (error) {
      console.error(error);

      throw !error.status
        ? { status: 400, errorMessage: '가게 조회에 실파해였습니다.' }
        : error;
    }
  };
}
module.exports = DibsService;
