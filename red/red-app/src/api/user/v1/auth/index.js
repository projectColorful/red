const passport = require(`../passport`);

/**
 * @description /join -> 회원가입
 * @description /login -> 로그인
 * @description /pwChage -> 비밀번호 변경
 */
module.exports = (app) => {
    app.post('/login', require('./login'));
    app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
        router.post('/join ', require('./join'));
        router.post('/pwChage', require('./pwChage'));
        router.get('/getname', require('./getName'));
    });
};
