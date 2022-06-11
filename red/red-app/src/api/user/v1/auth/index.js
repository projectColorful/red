const passport = require(`../passport`);

/**
 * @description /join -> 통계 목록 출력
 * @description /login -> 통계 종합정보 출력
 * @description /pwChage -> 통계 세부정보 출력
 */
module.exports = (app) => {
    	app.put('/login', require('./login'));
	app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
		router.get('/join ', require('./join'));
		router.get('/pwChage', require('./pwChage'));
	});
};
