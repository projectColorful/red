const passport = require(`../passport`);

/**
 * @description /join -> 회원가입
 * @description /login -> 로그인
 * @description /pwChage -> 비밀번호 변경
 */
 const test = async (req, res) => {
    var ress = [];
    for (let i = 0; i < 100; i++) {
        ress.push({
            context_id: i + 1,
            data: "데이터값" + (i + 1) + "번",
            title: "제목" + (i + 1) + "번째",
            user: "사용자명",
            count: 30,
            date: jkh.date_ymd(),
            date2: jkh.date_time(),
        });
    }
    return res.status(200).json(ress);
}/// 테스트 함수
module.exports = (app) => {
    app.post('/login', [passport.authenticate('user.local', { session: false })], require('./login'));
    app.get('/join ', require('./join') );
    app.post('/pwchage', require('./pwChage'));
    app.get('/test',test);
    app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
        router.get('/getname', require('./getName'));
    });
};
