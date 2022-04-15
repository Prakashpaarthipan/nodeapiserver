var express = require('express');
var router = express.Router();
var path = require('path');
const data = {};

data.products = require(path.join(__dirname, '../../data/Product/ProductJson.json'));
/* GET home page. */
/**
 * Chain route concepts
 */
router.route('/')
    .get((req, res) => {
        const rawData = data.products["Source Data"];
        const productList = rawData.map((item, index) => ({ index, ...item }));
        //console.log(productList);
        res.json(productList);
    })
    .post((req, res) => {
        res.json({
            Product: req.body.Product,
            Customer: req.body.Customer,
            "Qtr 2": req.body.Qtr
        });
    })
    .put((req, res) => {
        res.json({
            Product: req.body.Product,
            Customer: req.body.Customer,
            "Qtr 2": req.body.Qtr
        });
    }).delete((req, res) => {
        res.json({
            Product: req.body.Product,
        });
    });
router.route('/:id')
    .get((req, res) => {
        res.json({ Product: req.params.id });
    });
module.exports = router;