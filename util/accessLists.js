const domainLists = ['https://www.youtube.com', 'http://127.0.0.1:3000', 'http://172.16.54.155:3000', 'https://unsplash.com'];
const whiteLists = {
    origin: function (origin, callback) {
        if (domainLists.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Cors Blocked'));
        }
    },
    optionsSuccessStatus: 200
};
module.exports = whiteLists;