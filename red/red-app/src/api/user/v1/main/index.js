const passport = require(`../passport`);

/**
 * @description /list -> 목록 출력
 * @description /modify -> 통계 종합정보 출력
 * @description /detail -> 통계 세부정보 출력
 */
module.exports = (app) => {
	app.group([passport.authenticate('user.jwt', { session: false })], (router) => {
		router.get('/modify', require('./modify'));
		router.put('/insert', require('./insert'));
		router.get('/list', require('./list'));
	});
};
