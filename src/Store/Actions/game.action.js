import * as SocketSender from "../../Socket/socket.sender";

export const SYNC_STATE = "Sync state";
export const SETUP_ID = "Setup socket id";
export const SETUP_NAME = "Setup name";
export const START_GAME = "Start game";
export const TAKE_CARD = "Take card";
export const PASS_TURN = "Pass turn";
export const PLAYER_LEFT = "Player left";

export function sendName(id, name) {
    SocketSender.broadcastToAll({
        type: SETUP_NAME,
        id,
        name
    });
}

export function startGame(cIndex) {
    SocketSender.broadcastToAll({
        type: START_GAME,
        pIndex: 0,
        cIndex: cIndex,
    });
}

export function takeCard(id, cIndex, cards, nextPIndex, nextCIndex, score) {
    SocketSender.broadcastToAll({
        type: TAKE_CARD,
        id,
        cIndex,
        cards,
        nextPIndex,
        nextCIndex,
        score,
    });
}

export function passTurn(id) {
    SocketSender.broadcastToAll({
        type: PASS_TURN,
        id,
    });
}
