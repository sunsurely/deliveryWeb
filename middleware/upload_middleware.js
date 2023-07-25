const multer = require('multer');
const path = require('path');

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const fileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8'
      );
      done(null, path.basename(fileName, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// module.exports = upload;
