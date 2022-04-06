import socket, { GAME_EVENT, SPECIAL_EVENT } from ".";

export function broadcastToAll(action) {
    socket.emit(GAME_EVENT, action);
}

export function sendToHost(action) {
    socket.emit(SPECIAL_EVENT, action);
}

export function joinRoom(roomId) {
    socket.emit(SPECIAL_EVENT, {
        type: "join_room",
        roomId
    });
}