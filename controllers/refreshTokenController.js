
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersDb = {
    users: require('../models/users.json'),
    setusers: function (data) { this.users = data }
}

const handleRefreshToken = (req, res) => {
    const cookie = req.cookies
    if (!cookie?.jwt) {
        return res.status(401).json({ error: "Authentication is required" })
    }
    const refreshToken = cookie.jwt;
    // check duplicate
    const findUser = usersDb.users.find(person => person.refreshToken === refreshToken);
    if (!findUser) return res.sendStatus(403) //forbidden

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err || findUser.username !== decoded.username) return res.sendStatus(403)
        const accessToken = jwt.sign({ "username": decoded.username }, process.env.ACCESS_TOKEN, { expiresIn: '60s' })
        res.json({ accessToken })
    })

}

module.exports = {
    handleRefreshToken
}