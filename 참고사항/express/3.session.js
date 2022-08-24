/**출처: https://inpa.tistory.com/entry/EXPRESS-📚-express-session-미들웨어?category=898807 [👨‍💻 Dev Scroll:티스토리]

 * 로그인 등의 이유로 세션을 구현하거나, 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.
세션은 사용자별로 req.session 객체 안에 유지된다.
 * 1.클라이언트 요청 (사용자가 웹사이트 접근) 
   2.서버는 접근클라이언트의 Request-Header필드인 cookie를 확인하여, 클라이언트가 해당 세션ID를 보냈는지 확인
   3.세션ID가 존재하지 않는다면, 서버는 세션ID를 생성해 클라이언트에게 전송.
   4.서버에서 클라이언트로 준 세션ID를 쿠키를 사용해 서버에 저장한다.
   5.클라이언트는 재접속시, 이 쿠키를 이용하여 세션ID값을 서버에 전달한다.
 */
const express = require("express");
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    session({
        secure: ture, // https 환경에서만 session 정보를 주고받도록처리
        secret: process.env.COOKIE_SECRET, // 암호화하는 데 쓰일 키
        resave: false, // 세션을 언제나 저장할지 설정함
        // => 요청이 왔을 때 세션에 수정사항이 생기지 않아도 다시 저장할지
        saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
        cookie: {
            //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
            httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
            Secure: true,
        },
        name: "session-cookie", // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
    })
);

app.get("/", (req, res, next) => {
    // 세션에 데이터를 설정하면, 모든 세션이 설정되는게아니라, 요청 받은 고유의 세션 사용자의 값만 설정 된다.
    // 즉, 개인의 저장 공간이 생긴 것과 같다.
    req.session.id = "hello";
});

//===================================================================
app.get("/", (req, res, next) => {
    if (req.session.num === undefined)
        // 세션이 없다면
        req.session.num = 1; // 세션 등록
    else req.session.num += 1;

    res.send(`${req.session.num}번 접속`);
});
/**
 * 사용자가 이 페이지에 몇 번이나 들어왔는지 계산하는 앱
 */

/**
 * 세션은 서버 메모리(MemoryStore)에 저장된다.
말인즉슨 서버가 한 번 내려가면 모두 초기화돼서 없어진다는 뜻이다.

default값은 Memory Store이다. 위에서 말했듯이, 
메모리는 서버나 클라이언트를 껐다 키면 사라지는 휘발성이다. 
그래서 세션을 저장할 고유 저장소를 따로 지정할 수 가 있는데,
 실제 서비스 배포 시에는 데이터베이스를 연결해서 세션을 유지하면 좋다. 
 보통 Redis를 사용한다고 한다. (Redis는 캐시저장 데이터베이스)
출처: https://inpa.tistory.com/entry/EXPRESS-📚-express-session-미들웨어?category=898807 [👨‍💻 Dev Scroll:티스토리]
 */

req.session.destroy((err) => {
    if (err) throw err;
    res.redirect(302, "/"); // 웹페이지 강제 이동
});
/**
 * 로그아웃을 해서 세션을 유지할 필요가 없다면 destroy를 하면 됨.
 * => 세션 객체를 없애는 방법
 */