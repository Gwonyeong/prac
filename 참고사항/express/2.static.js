app.use('요청 경로', express.static('실제 경로'));

app.use('/', express.static(path.join(__dirname, 'public')));

/**
 * 기본 경로인 / 로 왔을 때, express는 public 
 * 폴더 안에 있는 해당 경로의 파일을 찾는다.
즉 https://localhost:3000/css/style.css 와 같은 요청을 하게 되면, 
실제 static에서 반환하는 파일은 ./public/css/style.css가 된다.
 */

/**
 * 만약 public 폴더 안에 다음과 같은 파일이 있다면
 * Express/public/index.html
Express/public/css/style.css
Express/public/js/main.js
Express/public/css/style.css
아래와 같은 경로로 접근하게 되는 것.
http://localhost:3000/index.html
http://localhost:3000/css/style.css
http://localhost:3000/js/main.js
http://localhost:3000/css/style.css

이 경우 실제 서버의 폴더 경로에는 public이 들어 
있더라도 요청 주소에는 public이 들어 있지 않다. 
=> 클라이언트는 폴더경로를 알 수 없다는 말.
서버의 폴더 경로와 요청 경로가 다르므로 외부인이 서버의 
구조를 쉽게 파악할 수 없으며, 이는 보안에 큰 도움이 된다.
하지만 public은 워낙에 유명하니, public-3030 같이 써서 
서버 구조에 대한 보안에 신경을 써준다.
 */

/**
 * // 만일 public폴더안에 index.png라는 사진 파일이 있고, 
 * 사용자가 localhost:3000/index.png 요청을 한다면
 
app.use(morgan('dev')); // get 200 ~ 요청 로그가 찍힌다.
app.use('/', express.static(path.join(__dirname, 'public'))); // static경로로서 png파일을 제공하고 끝난다. 즉, next()를 안해버린다.
app.use(express.json()); // 미들웨어 실행이 안된다.
app.use(express.urlencoded({ extended: false })); // 미들웨어 실행이 안된다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // 미들웨어 실행이 안된다.
 */

/**
 * // 만일 public폴더안에 about이라는 경로가 없고,
 *  사용자가 localhost:3000/about 요청을 한다면
 
app.use(morgan('dev')); // get 200 ~ 요청 로그가 찍힌다.
app.use('/', express.static(path.join(__dirname, 'public'))); // 경로에 about이 없으니 next()를 한다.
app.use(express.json()); // next()를 한다.
app.use(express.urlencoded({ extended: false })); // next()를 한다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // next()를 한다.
 
app.get('/about', (req, res) => {
	// ... 실행 된다.
}
 */

/**
 * 이런 식으로 활용할 수 있음. 로그인 한 클라우드에게는 특정 페이지를 보여주고
 * 아니면 안보여주는 형식
 * app.use('/', (req, res, next) => {
	// 미들웨어 안에다 둔다.
    if (req.session.id) // 세션 아이디가 있다면 (로그인 상태라면)
		express.static(path.join(__dirname, 'public'))(req, res, next); // public에서 에셋을 보여준다
	else // 세션 아이디가 없다면
    	next(); // 다음 미들웨어 실행
}
 */