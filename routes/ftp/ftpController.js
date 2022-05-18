var path = require('path');
var fs = require('fs');
const resource = path.join(__dirname, '../../resources');

const ftpHomePage = (req, res) => {

    res.render('ftplogin', { title: 'Express' });
}
const ftpAuthPage = (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ error: "username and password are required" })
    }
    return res.redirect('/files');
}
const getListFiles = (req, res) => {
    try {
        var files = fs.readdirSync(resource);
    } catch (e) {
        console.log(e, "**");
    }


    // res.render('ftplogin', { title: 'Express' });
    res.render('ftpDocs', { title: 'FTP Resource', file: files });
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