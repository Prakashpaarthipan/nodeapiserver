// routes/users.js

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var router = express.Router();

/* GET users listing. */
router.get('/movies', function (req, res, next) {
  // res.send('respond with a resource');
  var jsonBuffer = fs.readFileSync(path.join(__dirname, '../data/movies.json'));
  var jsonArray = JSON.parse(jsonBuffer);
  const limitedArray = Object.values(jsonArray)
    .slice(0, 20);
  //  .map(([string, count]) => ({ count, obj: JSON.parse(string) }));
  //console.log(limitedArray);

  //WorkingObject
  var Movies = Object.assign({}, limitedArray);  // Alternate Way Using Spread Operator e.g. var newObj = {...oldObj}
  //var results = Movies.filter(function (entry) { return entry["IMDB Rating"] > 5; });
  /**
   * Method : 1
   */
  //var results = _.filter(Movies, { "IMDB Rating": 7.5 });

  /**
   * Method :2
   */
  //var results = _.map(Movies, function (o) {
  //  if (o["IMDB Rating"] > 5) return o;
  //});
  // Remove undefines from the array
  //results = _.without(results, undefined);
  /**
   * method:3
   */
  var keys_to_keep = ['Title', 'IMDB Rating'];

  const results = _.map(Movies, (e) => {
    const obj = {};
    keys_to_keep.forEach(k => obj[k] = e[k])
    return obj;
  });

  res.json((results));
});

router.get('/:userid', function (req, res, next) {
  // res.send('respond with a resource');
  var jsonBuffer = fs.readFileSync(path.join(__dirname, '../public/ftp/movies.json'));
  var jsonArray = JSON.parse(jsonBuffer);
  const limitedArray = Object.values(jsonArray)
    .slice(0, 20);
  //  .map(([string, count]) => ({ count, obj: JSON.parse(string) }));
  //console.log(limitedArray);

  //WorkingObject
  var Movies = Object.assign({}, limitedArray);  // Alternate Way Using Spread Operator e.g. var newObj = {...oldObj}

  res.json((Movies));
});
module.exports = router;
