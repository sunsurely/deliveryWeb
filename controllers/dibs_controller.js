const DibsService = require('../services/dibs_service');

class DibsController {
  dibsService = new DibsService();

  //찜 상태 변경
  createDibs = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;

      const store_id = parseInt(req.query.store_id);

      await this.dibsService.updateDibs(user_id, store_id);

      res.status(201).json({ message: '수정완료' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error });
    }
  };

  //내가 찜한 가게 조회
  findMyDibs = async (req, res) => {
    const userId = res.locals.user_id;

    await this.dibsService
      .findMyDibs(userId)
      .then((myDibs) => {
        // return res.status(200).json({ myDibs });
        return res.render('myDibs', { myDibs });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };
}

module.exports = DibsController;
