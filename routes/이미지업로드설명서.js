// const Post = require('../models/posts')
// const fs = require('fs');

// 9조 최고 미적감각 소유자의 친절한 설명서//

// app.post(
//   '/upload',
//   upload.fields([{ name: 'image1' }, { name: 'image2' }]),          << 프론트 form  태그안에  파일을 등록하는 input 태그가 여러개일 때
//   (req, res) => {                                                   <<데이터베이스에 url 저장하는 건 따로 구현해 줘야됩니다!  async , await 뺴먹지 말고
//     console.log(req.files, req.body);
//     res.send('업로드 완료');
//   }
// );

// app.post('/upload', upload.single('image'), await(req, res) => {   << 이미지 한 개일 때
//   const {content}= req.body.content;

//   const fileName = req.file.fileName;
//   const url = `/img/${fileName}`
//   const post= await Post.create({
//     content,
//     title,                                         예외 오류처리는 생략했는데 꼭 해주시....
//     img:url,
//     그 외 추가적으로 블라블라..
//   })
//    res.json({url:url}) << 이렇게 업로드 후 사진 url만 따로 보내주거나 아니면  포트스 전체 보내주거나 하시면 됩니다....
// });

// 프론트에서 사용법      <img  src='서버에서 보내준 url 적어 놓으면'  alt=''/>  해당 html파일을 띄우면 자동으로 api 그 주소로 통신을 합니다.

// 그러면 자동으로 아래쪽 라우터로

// router.get('/image/:filename', (req, res) => {   경로를 저렇게 설정하면   html 태그의 src 안의  filename 부분이 params 에 저장되니까
//   const { filename } = req.params;
//   const imagePath = path.join(__dirname, 'uploads', filename);

//   fs.readFile(imagePath, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('서버가 맛이 갔습니다. 컴퓨터를 때려주세요');
//       return;
//     }

//     res.setHeader('Content-Type', 'image/jpeg'); // 이미지 타입에 맞게 설정
//     res.send(data);    어떤 원리냐면  data 객체 안에 url이 들어 있는데  브라우저에  그 url이 적혀있는 태그를 찾아서 그 위치에 이미지를 표시해 준답니다~
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// 솔직히 테스트 안해 봤습니다. 미리 죄송합니다.~~~~~~~
// 혹시 성공하시면 주 기능은 컨트롤러에 모듈로 분리해 주시고 라우터에는 함수명만 들어가도록 부탁드립니다.
