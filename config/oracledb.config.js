var oracledb = require('oracledb');
module.exports = {
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTION_URI,
    poolAlias: 'oracletest'
}

exports.OracleReq = async () => {
    await oracledb.createPool({
        user: process.env.NODE_ORACLEDB_REQUSER,
        password: process.env.NODE_ORACLEDB_REQPASSWORD,
        connectString: process.env.NODE_ORACLEDB_REQCONNECTION_URI,
        poolAlias: 'oraclereq'
    });
}
