const router = require('express').Router();
const mongodbCon = require('../../../controllers/mongo/mongoController');
router.route("/")
    .get(mongodbCon.apiPostData)
    .post(mongodbCon.apiGetData);

module.exports = router