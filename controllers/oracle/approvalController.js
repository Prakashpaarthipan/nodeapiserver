var oracledb = require('oracledb');
var { select_query } = require('./basicController');

const Approval = {
    checkLastRowError: async () => {
        const data = await select_query("select * from trandata.APPROVAL_request@tcscentr rq where rq.appstat in ('A') and rq.appfrwd in ('F', 'P', 'Q', 'S', 'I') and rq.deleted = 'N' and rq.ARQSRNO = (select max(ARQSRNO) from trandata.APPROVAL_request@tcscentr where aprnumb = rq.aprnumb and deleted = 'N') AND RQ.ARQYEAR in ('2021-22', '2022-23') order by rq.adddate, rq.aprnumb, rq.arqsrno", 'oraclelive');
        return data;
    }
}
module.exports = Approval