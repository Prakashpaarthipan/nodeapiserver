// routes/api/movies.js

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Retrieve a list of movies from json object. Can be used to populate a list of fake movies when prototyping or testing an API.
*/
var express = require('express');
var router = express.Router();
var path = require('path');
const data = {};
var Movies = require('../../controllers/movieController');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {

        Movies.getMoviesById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Movies.getAllMovies(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.post('/', function (req, res, next) {

    Movies.addMovies(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', function (req, res, next) {

    Movies.deleteMovies(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function (req, res, next) {

    Movies.updateMovies(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;