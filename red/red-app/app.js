const express = require("express");
// const path = require('path');
// const morgan = require("morgan");
// const passport = require('passport');
// const cookieParser = require('cookie-parser'); //쿠키제공
// const cors = require('cors');
// const jkh_s = require('./api/v1/function/jkh_security');
// require('./api/v1/function/jkh_group.js');
// const jkh_f = require('./api/v1/function/jkh_function');
// const jkh = require('./api/v1/function/jkh_config');
// const users = require('./api/v1/user');
// const admin = require('./api/v1/admin');

const app = express();


//app.use(mongodb.init())//몽고 여기서 안씀
// app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
// app.use(cors({
// 	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
// })); // CORS 해제
// app.options('*', cors()); // CORS Pre-Flight 활성화
// app.use(express.json());
// app.use(express.urlencoded({ extends: true }));
// app.use(cookieParser());
// app.use(passport.initialize());//passport 실행
app.get('/',(req, res) => {
    return res.send("{Hello world");
})
// app.use(morgan('combined', { stream: jkh_f.logstream }))//로그파일로 관리 함 1일단위

// app.use('/api/v1/user', users); //사용자
// app.use('/api/v1/admin', admin); //관리자
app.listen(3000, () => {
    console.log('http://localhost:3000');
});

