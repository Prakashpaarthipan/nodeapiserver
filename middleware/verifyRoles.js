const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) returnres.status(401).json({ error: 'Unauthorized' });
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401).json({ error: 'unauthorized' });
        next();
    }
}

module.exports = verifyRoles