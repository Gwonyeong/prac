const express = require('express');
 
 
/* 1. 앱을 만든다. */
const app = express();
 
 
/* 2. 앱에 관련 설정 속성들을 만든다. */
app.set('port', process.env.PORT || 3000);
 
 
/* 3. 공통 미들웨어를 만든다. */
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    // next라는 세 번째 매개변수는 다음 미들웨어로 넘어가는 함수이다.
    // next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
    next(); 
})
app.use(express.json()); 
// 클라이언트에서 application/json 데이터를 보냈을때 파싱해서 
//body 객체에 넣어줌
app.use(express.urlencoded({ extended: true })); 
// 클라이언트에서 application/x-www-form-urlencoded 
//데이터를 보냈을때 파싱해서 body 객체에 넣어줌
 
/* 4. 라우터들을 만든다. */
 
// /error 요청 올때 동작
app.get('/error', (req, res, next) => {
    next(); // next()에 인수가 없다면, 바로 다음 미들웨어 함수로 넘어가게 된다. 
    
}, (req, res) => { // 미들웨어를 여러개 넣어줘도 된다. 위에서 next()되면 실행 된다.
	try {
    	// .. 에러 발생 코드
    } catch(err) {
    	error(err); // next()에 인수가 있다면, 에러 처리 미들웨어로 점프하게 된다. 
    }  
});
 
// /about 요청 올때 동작
app.get('/about', (req, res) => {
   res.send('Hello, about');
});
 
// 주소 부분에는 정규표현식, : (콜론)을 사용한 와일드 카드도 
//적용이 가능하다 :변수명 정도로 생각하면 된다.
// 와일드 카드를 사용할때는 다른 라우터 보다 뒤에 적어주는 것이 좋다
app.get('/category/:name', (req, res) => {
   res.send(`Hello, ${req.params.name}`);
});
 
// 모든 종류의 get요청이 올때 동작
app.get('*', (req, res) => {
   res.send('Hello, get !!');
});
 
// post 요청 올때 동작
app.post('/', (req, res) => {
   res.status(200).send('Hello, Post');
});
 
 
/* 5. 에러 처리 미들웨어를 만든다. */
app.use((err, req, res, next) => { // 에러 미들웨어는 인자는 반드시 4개 선언
    console.error(err);
    res
    	.status(500)
        .send(err.message); 
})
 
 
/* 6. 포트를 연결하여 서버를 실행한다. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중.');
});

/**
 * 많이 쓰는 미들웨어
 * body-parser  HTTP요청 body를 파싱
 * cookie-parser 쿠키 헤더를 파싱하고 req.cookies에 할당
 * cookie-session 쿠키 기반의 세션을 만듦.
 * morgan HTTP요청 로그를 남기기
 * session 서버 기반의 세션을 만들기
 * serve-static 정적 파일 제공
 * 
 */