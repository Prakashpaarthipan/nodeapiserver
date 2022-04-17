const domainLists = ['https://www.youtube.com', 'http://127.0.0.1:3000', 'http://172.16.54.155:3000'];

const credential = (req, res, next) => {
    const origin = req.headers.origin;
    if (domainLists.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)

    }
    next()
}

module.exports = credential;