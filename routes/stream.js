var express = require('express');
var router = express.Router();
var videorouter = express.Router({ mergeParams: true });
var path = require('path');
var fs = require('fs')
/* GET home page. */
router.get('/:id?', function (req, res, next) {
    global.videoid = req.params.id;
    res.render('stream/index.ejs', { title: req.params.id });
});

router.get('/video/:id?', function (req, res, next) {
    //console.log(req.params, req.query)
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Invalid range');
    }

    const videoPath = path.join(__dirname, `../video/${req.params.id}.mp4`);
    //console.log(videoPath)
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6 // 10L bytes to 1Mb
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    //console.log(start, end, videoSize);
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    //console.log('called');
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);

});
module.exports = router;