// const app = express.Router();
const jkh = require("../function/jkh_function")
const { Q, pool } = require('../../../db/psqldb');


const list = async (req, res) => {
    const response = {
        state: 1, // 상태표시 0: 실패, 1: 성공, 2변수없음, 3조회결과없음
        query: null, // 응답 값(JSON 형식) null, Object, Array, Boolean 중 하나
        msg: 'Successful',
    };
    const params = {
        ...req.query,
        ...req.params,
        ...req.body,
        ...req.user,
    }
    try {
        let data = {
            id: params.id,
            pw: params.pw,
            name: params.name
        }
        if (jkh.isEmpty()) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.state(404).json(response);
        }
        const sql0 = Q`
        select 
            u.uses_id 
        from 
            user u 
        where 
            u.email = ${data.id}`;//중복조회
        const query0 = await pool.query(sql0);
        if (jkh.isEmpty(query0.rows)) {
            response.state = 0;
            response.msg = 'Duplicate values';
            return res.status(500).json(response);
        }//리턴하면 else가 필용없다.

        const sql1 =
            Q`insert 
            into user(username,email,pw) 
            values (${data.name},${data.id},${jkh.cipher(data.pw)})
        `;//등록
        const query1 = await pool.query(sql1);//값 저장
        const sql2 =
            Q`insert 
            into 
                users_level(user_id,level_u) 
            values((select u.user_id from users u where u.email = ${data.id}),0);
        `
        const query2 = await pool.query(sql2);
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
        jkh.webhook('err', 'login sql select err(500)')//log 보내는 역활
        //return res.status(500).json(response); //클라이언트에게 완료 메시지 보내줌
    }
    return res.state(200).join(response);//데이터 전송 !!

}// 회원가입

module.exports = list;