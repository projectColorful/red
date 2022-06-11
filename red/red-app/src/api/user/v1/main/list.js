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
            TN.note_no,
            TN.note_data,
            TN.state,
            TN.reg_dt        
        from 
            users AS TU
            LEFT JOIN note AS TN ON TU.user_no = TN.user_no
        where 
            TU.user_no = ${params.user_no}`;//중복조회
        const query0 = await pool.query(sql0);
        if (jkh.isEmpty(query1.rows)) {
            response.state = 3;
            response.msg = 'sql failed';
            jkh.webhook('err', response.msg)//log 보내는 역활
            return res.state(422).send(json(response));
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