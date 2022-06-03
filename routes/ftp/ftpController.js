var path = require('path');
var fs = require('fs');
const resource = path.join(__dirname, '../../resources');
const { parse } = require('querystring');
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
const getListFiles = (req, res) => {
    try {
        var files = fs.readdirSync(resource);
    } catch (e) {
        console.log(e, "**");
    }


    // res.render('ftplogin', { title: 'Express' });
    res.render('ftpview/ftpDocs', { title: 'FTP Resource', file: files });
}
const getDownload = (req, res) => {
    console.log(req.params.file);
    const file = `${resource}/sample.txt`;
    console.log(file);
    res.download(file); // Set disposition and send it.
}

module.exports = {
    ftpHomePage, ftpAuthPage, getListFiles, getDownload
}