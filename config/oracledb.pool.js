var oracledb = require('oracledb');

module.exports = {
    OracleTestCon: async () => {
        return await oracledb.createPool({
            user: process.env.NODE_ORACLEDB_USER,
            password: process.env.NODE_ORACLEDB_PASSWORD,
            connectString: process.env.NODE_ORACLEDB_CONNECTION_URI,
            poolAlias: 'oracletest'
        });
    },
    OracleReqCon: async () => {
        return await oracledb.createPool({
            user: process.env.NODE_ORACLEDB_REQUSER,
            password: process.env.NODE_ORACLEDB_REQPASSWORD,
            connectString: process.env.NODE_ORACLEDB_REQCONNECTION_URI,
            poolAlias: 'oraclereq'
        });
    },
    OracleConn: async (ConnectMode) => {
        if (ConnectMode == "TRANDATA") {
            return await oracledb.createPool({
                user: process.env.NODE_ORACLEDB_USER,
                password: process.env.NODE_ORACLEDB_PASSWORD,
                connectString: process.env.NODE_ORACLEDB_CONNECTION_URI,
                poolAlias: 'TRANDATA'
            });
        }
        if (ConnectMode == "TRANVIEW") {
            //console.log(ConnectMode);
            return await oracledb.createPool({
                user: process.env.NODE_ORACLEDB_LIVEUSER,
                password: process.env.NODE_ORACLEDB_LIVEPASSWORD,
                connectString: process.env.NODE_ORACLEDB_LIVECONNECTION_URI,
                poolAlias: 'TRANVIEW'
            });
        } if (ConnectMode == "KSREQ") {
            return await oracledb.createPool({
                user: process.env.NODE_ORACLEDB_REQUSER,
                password: process.env.NODE_ORACLEDB_REQPASSWORD,
                connectString: process.env.NODE_ORACLEDB_REQCONNECTION_URI,
                poolAlias: 'KSREQ'
            });
        }
    }
}