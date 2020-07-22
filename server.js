const express = require("express");
const next = require("next");
require('dotenv').config()
const port = process.env.PORT;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json());
        server.use(express.urlencoded({ extended: false }));
        server.use(express.static("static"));
        //server.use('/api', router)

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`>> Ready on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(`There was an error starting the server.`);
    });
