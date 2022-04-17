const path = require('path');
const fsPromises = require('fs').promises;
require('dotenv').config();
const usersDb = {
    users: require('../models/users.json'),
    setusers: function (data) { this.users = data }
}

const handleLogout = async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.jwt) {
        return res.status(203).json({ error: "no contented" })
    }
    const refreshToken = cookie.jwt;
    // check duplicate
    const findUser = usersDb.users.find(person => person.refreshToken === refreshToken);
    if (!findUser) {
        //remove cookie
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204) //forbidden
    }


    //remove refresh token from db    
    const otherUsers = usersDb.users.filter(person => person.refreshToken !== findUser.refreshToken)
    const currentUser = { ...findUser, refreshToken: '' }
    usersDb.setusers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models/users.json'),
        JSON.stringify(usersDb.users)
    );
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204) //forbidden
}

module.exports = {
    handleLogout
}