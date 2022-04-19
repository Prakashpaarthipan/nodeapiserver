const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');

const usersDb = {
    users: require('../models/users.json'),
    setusers: function (data) { this.users = data }
}

const handleRequest = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ error: "username and password are required" })
    }
    // check duplicate
    const findDuplicates = usersDb.users.find(person => person.username === user);
    if (findDuplicates) return res.status(409).json({ "error": 'user already exists' })

    try {
        //hash the password
        const hashedPwd = await bcrypt.hash(pwd, 5);
        //create the users
        const createUsers = {
            "username": user,
            "password": hashedPwd,
            "roles": { "USER": 111 }
        };
        usersDb.setusers([...usersDb.users, createUsers])

        //write to the database

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models/users.json'),
            JSON.stringify(usersDb.users)
        );
        //console.log(usersDb.users);
        res.status(201).json({ "message": `New User ${user} is Added` })
    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

module.exports = { handleRequest }