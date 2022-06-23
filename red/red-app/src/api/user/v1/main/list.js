// const app = express.Router();
const jkh = require('../../../../../lib/jkh_function');
const { Q, pool } = require('../../../../../db/pg');


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
        console.log(params.user_no);
        if (jkh.isEmpty()) {
            response.state = 2;
            response.msg = 'params is empty !!';
            return res.status(404).json(response);
        }
        const sql0 = Q`
        select 
            note_no,
            note_data,
            state,
            reg_dt        
        from 
            note            
        where 
            user_no = ${params.user_no} AND state = 1`;//중복조회
        const query0 = await pool.query(sql0);
        if (jkh.isEmpty(query0.rows)) {
            response.state = 3;
            response.msg = 'sql failed';
            return res.status(422).send(json(response));
        }
        else {
            response.state = 1;
            response.query = query0.rows;
            response.msg = 'Member registration successful';
            return res.status(200).json(response);//데이터 전송 !!
        }

    }
    catch (err) {
        console.log(err);
        response.state = 0;
        response.msg = err + ' ';     
    }
    return res.status(200).json(response);//데이터 전송 !!

}// 회원가입

module.exports = list;