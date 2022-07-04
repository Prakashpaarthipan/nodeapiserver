var path = require('path');
var fs = require('fs');
const resource = path.join(__dirname, '../../resources');
const { parse } = require('querystring');
var formidable = require('formidable');

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        const { headers, method, url } = request;
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
const ftpHomePage = (req, res) => {
    //console.log(req);
    res.render('ftpview/ftplogin', { title: 'Express', req: req });
}
const ftpAuthPage = (req, res) => {
    // collectRequestData(req, result => {
    //     console.log(result);
    // });
    if (req.method === 'POST') {
        let Formdata;
        const { headers, method, url } = req;
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            Formdata = JSON.stringify(parse(body));
            // console.log(Formdata);
            const { user, pwd } = parse(body);
            if (!user || !pwd) {
                return res.status(400).json({ error: "username and password are required" })
            }
            else if (user == 'prakash' && pwd == 123) {
                res.redirect('files');
            } else {
                return res.status(400).json({ error: "authentication is required" })
            }

        });


    } else {

    }


}
const getListFiles = async (req, res) => {
    try {
        var files = fs.readdirSync(resource);
        // console.log(JSON.stringify(files));
    } catch (e) {
        console.log(e, "**");
    }


    // res.render('ftplogin', { title: 'Express' });
    res.render('ftpview/ftpDocs', { title: 'FTP Resource', file: files });
}
const ftpupload = async (req, res) => {
    const uploadFolder = path.join(__dirname, "../../", "resources");
    const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });


    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ Status: "Fail", Error: err });
            //next(err);
            //return;
        }
        //console.log(files.formProfile);

        if (files.formProfile.size > 0) {
            var readStream = fs.createReadStream(files.formProfile.filepath);
            var writeStream = fs.createWriteStream(uploadFolder + "/pro_" + Date.now() + ".jpg");
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                fs.unlinkSync(files.formProfile.filepath);
            });
            // await fs.rename(files.formProfile.filepath, uploadFolder + "/" + files.formProfile.originalFilename)
        }


        let fil = [];
        if (files.fileupload.size > 0) {
            for (var key in files.fileupload) {

                var obj = files.fileupload[key];
                fil.push(obj);
                if (obj.size > 0) {
                    var readStream = fs.createReadStream(obj.filepath);
                    var writeStream = fs.createWriteStream(path.join(__dirname, "../../public", "ftp") + "/cv_" + Date.now() + ".jpg");
                    readStream.pipe(writeStream);
                    readStream.on('end', function () {
                        fs.unlinkSync(obj.filepath);
                    });
                    // await fs.rename(files.formProfile.filepath, uploadFolder + "/" + files.formProfile.originalFilename)
                }
            }
        }

        //fs.rename()
        res.json({ fields, files, date: new Date().toString(), list: fil });
    });

}
const getDownload = (req, res) => {
    console.log(req.params.file);
    const file = `${resource}/sample.txt`;
    console.log(file);
    res.download(file); // Set disposition and send it.
}

module.exports = {
    ftpHomePage, ftpAuthPage, getListFiles, getDownload, ftpupload
}