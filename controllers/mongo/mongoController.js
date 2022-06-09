
const { MongoConnect, Connection } = require("../../config/mongodb.config")

const utilites = require("./basic");
class BasicMongoController {


    static async apiPostData(req, res, next) {
        try {
            res.json({ success: "connected" });
        } catch (e) {
            res.status(500).json({ e })
        }
    }
    static async apiGetData(req, res, next) {
        try {
            res.json({ success: "connected" });
        } catch (e) {
            res.status(500).json({ e })
        }
    }
    static async apiListCollection(req, res, next) {

        try {
            res.json({ success: "connected", collections: availbleCol });
        } catch (e) {
            res.status(500).json({ e })
        }
    }
    static async apifindOne(req, res, next) {

        //const result = await (await con.db(process.env.MONGODB).listCollections().toArray()).map(c => c.name);
        let cursor;
        try {

            const getcompanies = await utilites.dbBasicInfo();
            const con = await Connection.open();
            cursor = await con.db(process.env.MONGODB).collection(getcompanies[0]).find({}).limit(5).toArray();
            res.json({ success: "connected", results: getcompanies, queryResult: cursor });
        } catch (e) {
            res.status(500).json({ e })
        }
    }
}

module.exports = BasicMongoController