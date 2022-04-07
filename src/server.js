require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");

const path = require("path");

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const gameport = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../build")));

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://mini-projects-345114.as.r.appspot.com"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const GAME_EVENT = "GAME EVENT";
const SPECIAL_EVENT = "SPECIAL EVENT";
const DISCONNECT_EVENT = "DISCONNECT EVENT";

const specialEvents = {
    SYNC_STATE: "Sync state",
    SETUP_ID: "Setup socket id",
};

// When client connects
io.on("connection", (socket) => {
    console.log(`Client id ${socket.id} connected`);

    socket.on(GAME_EVENT, (action) => {
        switch (action.type) {
            default:
                console.log(
                    `[${GAME_EVENT}] ${action.type} | From: ${socket.id}`
                );
                io.to([...socket.rooms].pop()).emit(GAME_EVENT, action);
                break;
        }
    });

    socket.on(SPECIAL_EVENT, (action) => {
        switch (action.type) {
            case specialEvents.SYNC_STATE:
                console.log(
                    `[${SPECIAL_EVENT}] ${action.type} | ${socket.id} ping ${action.playerid}`
                );
                io.to(action.playerid).emit(SPECIAL_EVENT, {
                    ...action,
                });
                break;
            case "join_room":
                // Notify room of new connection
                socket.join(action.roomId);
                io.to(action.roomId).emit(GAME_EVENT, {
                    type: specialEvents.SETUP_ID,
                    id: socket.id,
                    roomId: action.roomId,
                });
                break;
            default:
                break;
        }
    });

    socket.on("disconnecting", () => {
        console.log(`Client id ${socket.id} disconnecting`);
        io.emit(DISCONNECT_EVENT, socket.id);
    });
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});
server.listen(gameport, () => {
    console.log(`App listening on port ${gameport}`);
});

// To connect Discord Bot
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const gameUrl =
    process.env.NODE_ENV === "production"
        ? "https://mini-projects-345114.as.r.appspot.com"
        : "http://localhost:3000";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    switch (msg.content) {
        case "ping":
            msg.reply("Hi, I am alive. Thanks for asking. :)");
            break;
        case "!newroom":
            const validChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const roomId =
                [...Array(5).keys()].reduce(
                    (prev) =>
                        prev +
                        validChar[Math.floor(Math.random() * validChar.length)],
                    ""
                ) + msg.author.discriminator;
            const newRoomEmbed = new MessageEmbed()
                .setTitle("No Thanks! Card Game")
                .setDescription("Use this link to join the room!")
                .setURL(`${gameUrl}/${roomId}`)
                .setImage(`${gameUrl}/image/cover.png`)
                .setTimestamp();
            msg.channel.send({
                content: `${msg.author.username} has created a room!`,
                embeds: [newRoomEmbed],
            });
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_BOT_ID);
