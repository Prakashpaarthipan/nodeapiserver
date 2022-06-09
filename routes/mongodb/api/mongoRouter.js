const router = require('express').Router();
const mongodbCon = require('../../../controllers/mongo/mongoController');
router.route("/")
    .get(mongodbCon.apiGetData)
    .post(mongodbCon.apiPostData);
router.route("/admin")
    .get(mongodbCon.apiListCollection);
router.route("/find")
    .get(mongodbCon.apifindOne);
module.exports = router