
const { MongoConnect } = require("../../config/mongodb.config")

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
}

module.exports = BasicMongoController