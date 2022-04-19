const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWTToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startWith('Bearer')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    //console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        //console.log(err);
        if (err) return res.sendStatus(403)//invalid token
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    })
}

module.exports = verifyJWTToken 