const { MongoConnect, Connection } = require("../../config/mongodb.config")

const dbBasicInfo = async () => {
    const con = await Connection.open();
    const availbleCol = await (await con.db(process.env.MONGODB).listCollections().toArray()).map(c => c.name);
    return availbleCol;

}

module.exports = {
    dbBasicInfo
}