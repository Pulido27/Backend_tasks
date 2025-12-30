const express = require("express");

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get('/healt',(req, res) => {
    res.json({
        status: "ok"
    });
});

app.get('/ping', (req, res) => {
    res.json({message: "pong"})
})
module.exports = app;