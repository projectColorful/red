const express = require("express");
const path = require('path');
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const jkh_f = require('./lib/jkh_function');
 require('./lib/express_group');


const app = express();

app.use(compression())
app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(passport.initialize());//passport 실행
app.get('/',(req, res) => {
    return res.send("{Hello world");
})
app.use(morgan('combined', { stream: jkh_f.logstream }))//로그파일로 관리 함 1일단위

app.use('/api/v1/user', users); //사용자
// app.use('/api/v1/admin', admin); //관리자
app.listen(3000, () => {
    console.log('http://localhost:3000');
});

