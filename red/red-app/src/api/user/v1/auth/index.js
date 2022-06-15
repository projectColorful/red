const passport = require(`../passport`);

/**
 * @description /join -> 회원가입
 * @description /login -> 로그인
 * @description /pwChage -> 비밀번호 변경
 */
module.exports = (app) => {
    app.post('/login', [passport.authenticate('user.local', { session: false })], require('./login'));
    app.get('/join ', require('./join') );
    app.post('/pwchage', require('./pwChage'));

    app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
        router.get('/getname', require('./getName'));
    });
};
