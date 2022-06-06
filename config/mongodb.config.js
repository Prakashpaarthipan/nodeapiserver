const MongoClient = require('mongodb').MongoClient

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        return this.db
    }

}

Connection.db = null
Connection.url = 'mongodb://127.0.0.1:27017/test_db'
Connection.options = {
    bufferMaxEntries:   0,
    reconnectTries:     5000,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }