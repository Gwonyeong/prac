const express = require('express');
const path = require('path');
const morgan = require('morgan'); // 미들웨어 연결
 
const app = express();
app.set('port', process.env.PORT || 3000);
 
// 로그 기록
if (process.env.NODE_ENV === 'production') { 
   app.use(morgan('combined')); // 배포환경이면
} else {
   app.use(morgan('dev')); // 개발환경이면
}
/**
 * combined 배포 환경에서 사용, 불특정 다수가 접속하기
 *  때문에 IP를 로그에 남겨줌
 * dev 개발용을 위해 response에 따라 색상이 입혀진 축약된 로그를 출력
 * => status가 빨간색이면 서버 에러코드, 노란색으면 
 * 클라이언트 에러, 청록색은 리다이렉션 코드
 * 
 * short 기본 설정보다 짧은 로그를 출력하고 응답시간 포함.
 * tiny 최소화된 로그를 출력
 *  */ 


app.get('/', (req, res) => { 
   res.send('Hello, index');
});
 
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});