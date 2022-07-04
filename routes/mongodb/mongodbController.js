const { MongoClient, ServerApiVersion } = require('mongodb');
var path = require('path');
var fs = require('fs');
var fsPromise = require('fs').promises;
var formidable = require('formidable');

let client;
const uri = process.env.MONGO_DB_URI;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function main() {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        //await listDatabases(client);

    } catch (e) {
        console.error(e);
    }
    //finally {
    //     await client.close();
    // }
}
if (!isConnected()) {
    //  main();
}

function isConnected() {
    return !!client && !!client.topology && client.topology.isConnected()
}
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    //console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const getCollection = async (req, res) => {

    // const DB = await client.db().admin().listDatabases();
    //console.log(req.param)
    let configData;
    //console.log(isConnected());
    try {

        if (fs.existsSync(path.join(__dirname, 'config.json'))) {
            await main();
            configData = require(path.join(__dirname, 'config.json'));
            console.log(configData);
            res.render('mongodb/home', { title: 'Mongodb', status: isConnected(), config_url: configData.mongodb_url, config_dbname: configData.db_name, expiretime: configData.expriredAt });
        } else {
            res.render('mongodb/home', { title: 'Mongodb', status: isConnected(), config_url: 'NOT FOUND', config_dbname: 'NOT FOUND', expiretime: 0 });
        }
    } catch (e) {
        return res.status(400).json({ Status: "Fail to read", Error: e });
    }

}

const Logindb = async (req, res) => {
    //console.log(client)
    const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ Status: "Fail", Error: err });
        }
        if (fields.Save == 'signin') {
            try {
                if (!fs.existsSync(path.join(__dirname, 'config.json'))) {
                    fields.expriredAt = Date.now() + (60000 * 30);
                    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(fields));
                }
            } catch (e) {
                return res.status(400).json({ Status: "Fail to sign in", Error: e });
            }
            res.status(301).redirect("/mongo");
        }
        if (fields.Save == 'logout') {
            try {
                if (fs.existsSync(path.join(__dirname, 'config.json'))) {

                    fs.unlinkSync(path.join(__dirname, 'config.json'));
                    await client.close();
                }
            } catch (e) {
                return res.status(400).json({ Status: "Fail to logout", Error: e });
            }
            res.status(301).redirect("/mongo");
        }
        //const DB = await client.db().admin().listDatabases();

    })
}
module.exports = {
    getCollection,
    Logindb
}