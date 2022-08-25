const express = require("express");
const passport = require("passport")
const morgan = require("morgan");
const passportConfig = require("./passport")
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const indexRouter = require("./routes")
const path = require("path")
const app = express()
passportConfig();
//서명된 쿠키를 사용.
/**
 * 쿠키는 위조하기 쉽기때문에 제공한 비밀 키를 통해 해당 쿠키가 내가 만든
 * 쿠키임을 검증하는 것.
 */
app.use(cookieParser(process.env.COOKIE_SECRET));
/**
 * app.use() 는 Express 앱에서 항상 실행하는 
 * 미들웨어 역할app.get(), app.post()등과 달리 요청 URL을
 *  지정하지 않아도 app.use()를 사용할 수 있으며 해당 경우에는
 *  URL에 상관없이 매번 실행된다.app.use() 및 app.
 * Method() 함수를 이용해 응용프로그램 수준의 미들웨어를
 *  app객체의 인스턴스에 바인딩Method = get or post
 */
app.use(
   session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   }),
);
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
//! express-session에 의존하므로 뒤에 위치해야 함
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use("/api" , indexRouter)
//* 라우터

app.listen(3000,()=> {
    console.log("서버 가동")
})
