const express = require("express");
const webSocket = require("ws");
const http = require("http");
const PORT = 9876;
const app = express();

const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});

const wss = new webSocket.Server({
    // port: 9876,
    server,
});

wss.on("connection", (ws) => {
    ws.onopen = () => {
        console.log("Connection opened.");
    };
    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === webSocket.OPEN) {
                client.send(data);
            }
        });
    });
    ws.onclose = function() {
        ws = null;
    };
});