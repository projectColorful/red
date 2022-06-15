// const app = express.Router();
const jkh = require("../../../../../lib/jkh_function")
const { Q, pool } = require('../../../../../db/pg');


const join = async (req, res,next) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    const params = {
        ...req.query,
        ...req.params,
        ...req.body        
    }
    try {
        let data = {
            id: params.user_id,
            pw: params.user_pw,
            name: params.user_name
        }
        if (jkh.isEmpty(data.id,data.pw,data.name)) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.state(404).json(response);
        }
        const sql0 = Q`
        SELECT uses_id FROM users WHERE email = ${data.id};`;
        const query0 = await pool.query(sql0);
        if (jkh.isEmpty(query0.rows)) {
            response.state = 0;
            response.msg = 'Duplicate values';
            return res.status(500).json(response);
        }//리턴하면 else가 필용없다.

        const sql1 =
            Q`INSERT INTO users(user_id,user_pw,user_name) values (${data.id},${jkh.cipher(data.pw)},${data.name});`;//등록
        const query1 = await pool.query(sql1);//값 저장

        if (jkh.isEmpty(query1.rows)) {
            response.state = 3;
            response.msg = 'login failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
            return res.state(404).send(json(response));
        }
        else {
            response.state = 1;
            response.msg = 'Member registration successful';
            return res.state(200).join(response);//데이터 전송 !!
        }

    }
    catch (err) {
        console.log(err);
        response.state = 0;
        response.msg = err + ' ';
        //return res.status(500).json(response); //클라이언트에게 완료 메시지 보내줌
    }
    return res.state(200).join(response).next();//데이터 전송 !!

}// 회원가입

module.exports = join;
  