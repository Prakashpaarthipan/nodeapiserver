const MongoClient = require('mongodb').MongoClient
let database;
let result;

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        return this.db
    }

}

Connection.db = null
Connection.url = process.env.MONGO_DB_URI;
Connection.options = {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

class MongoConnect {
    static async conquery(conn, table) {
        if (result) {
            return
        }
        try {
            database = await conn.db(process.env.MONGODB)
            collection = await conn.db(process.env.MONGODB).collection(table)
            this.result = collection;
            return this.result;
        } catch (e) {
            console.error(
                `Unable to establish a connection to collection: ${e}`,
            )
        }
    }
}
module.exports = { Connection, MongoConnect }