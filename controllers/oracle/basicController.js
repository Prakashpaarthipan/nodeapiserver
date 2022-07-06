var oracledb = require('oracledb');
var { OracleTestCon, OracleConn } = require('../../config/oracledb.pool');
global.connectPool = '';
(async function () {
    if (!connectPool) global.connectPool = await OracleConn(process.env.CONNECTMODE);
})();

async function select_query(sqlstring, connect, opts) {
    let connection;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection(connect);
        const sql = sqlstring;
        const binds = [];
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT, ...opts };
        const result = await connection.execute(sql, binds, options);
        return result;
        // oracledb.getPool().logStatistics(); // show pool statistics.  pool.enableStatistics must be true
    } catch (err) {
        return err
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                return err;
            }
        }
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        // Get the pool from the pool cache and close it when no
        // connections are in use, or force it closed after 10 seconds.
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        // This setting should not be needed if both Oracle Client and Oracle
        // Database are 19c (or later).
        await connectPool.close(10);
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}


module.exports = { select_query, closePoolAndExit }