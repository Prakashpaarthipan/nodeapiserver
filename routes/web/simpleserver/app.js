const express = require("express");
const app = express();
const PORT = 4040;

const startServer = async () => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/api", (req, res) => {
        res.json({
            message: "Hello world",
        });
    });
    app.get("/", (req, res) => {
        res.json({
            message: "Hello world",
        });
    });

    app.listen(PORT, (err) => {
        console.log(`Server listening on ${PORT}`);
    });
}

const stopServer = async () => {
    app.close((err) => {
        console.log('server closed')
        process.exit(err ? 1 : 0)

    })
}
module.exports = {
    startServer, stopServer
};