// require("dotenv").config();
const express = require("express");
const loki = require('lokijs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new loki('log.json');
let logs = db.addCollection('logs');

const routes = express.Router();

routes.post("/log", async (req, res) => {
    const log = await logs.insert(req.body);
    db.saveDatabase();
    return res.json(log);
    // return res.send("Teste salvo");
});

app.use(routes);

app.listen(process.env.PORT || 3333);
