const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersDb = {
    users: require('../models/users.json'),
    setusers: function (data) { this.users = data }
}

const handleUserLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ error: "username and password are required" })
    }
    // check duplicate
    const findUser = usersDb.users.find(person => person.username === user);
    if (!findUser) return res.sendStatus(401) //unauthorized

    const match = await bcrypt.compare(pwd, findUser.password)
    if (match) {
        //roles
        const roles = Object.values(findUser.roles);
        //generate Token
        const accessToken = jwt.sign(
            {
                "UserInfo": { "username": findUser.username, "roles": roles }
            }, process.env.ACCESS_TOKEN, { expiresIn: '60s' })
        const refreshToken = jwt.sign({
            "username": findUser.username
        }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })
        //Saving refresh Token to Db
        const otherUsers = usersDb.users.filter(person => person.username !== findUser.username)
        const currentUser = { ...findUser, refreshToken }
        usersDb.setusers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models/users.json'),
            JSON.stringify(usersDb.users)
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })

    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    handleUserLogin
}