const path = require("path");

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const gameport = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../build")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mini-projects-345114.as.r.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const GAME_EVENT = "GAME EVENT";
const SPECIAL_EVENT = "SPECIAL EVENT";
const DISCONNECT_EVENT = "DISCONNECT EVENT";

const specialEvents = {
    SYNC_STATE: "Sync state"
}

// When client connects
io.on("connection", socket => {
    console.log(`Client id ${socket.id} connected`);

    socket.on(GAME_EVENT, action => {
        switch (action.type) {
            default:
                console.log(`[${GAME_EVENT}] ${action.type} | From: ${socket.id}`);
                io.emit(GAME_EVENT, action);
                break;
        }
    });

    socket.on(SPECIAL_EVENT, action => {
        switch (action.type) {
            case specialEvents.SYNC_STATE:
                console.log(`[${SPECIAL_EVENT}] ${action.type} | ${socket.id} ping ${action.playerid}`);
                io.to(action.playerid).emit(SPECIAL_EVENT, {
                    ...action
                });
                break;
            default:
                break;
        }
    })
    
    socket.on("disconnecting", () => {
        console.log(`Client id ${socket.id} disconnecting`)
        io.emit(DISCONNECT_EVENT, socket.id);
    });
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})
server.listen(gameport, () => {
    console.log(`App listening on port ${gameport}`);
});