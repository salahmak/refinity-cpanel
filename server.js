const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get("/login", (req, res) => {
        return app.render(req, res, "/login", req.query);
    });

    server.get("/register", (req, res) => {
        return app.render(req, res, "/register", req.query);
    });

    server.get("/panel", (req, res) => {
        return app.render(req, res, "/panel", req.query);
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
