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
        name,
    });
}

export function startGame(deck, turns, cIndex, startingToken) {
    SocketSender.broadcastToAll({
        type: START_GAME,
        deck,
        turns,
        pIndex: 0,
        cIndex,
        startingToken,
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

export function passTurn(id, nextPIndex, score) {
    SocketSender.broadcastToAll({
        type: PASS_TURN,
        id,
        nextPIndex,
        score,
    });
}

// Helper Functions
export function removeCardsFromDeck(deck) {
    let newDeck = [...deck];

    // Remove 9 cards as per official manual
    for (let i = 0; i < 9; i++) {
        const splicePos = Math.floor(Math.random() * newDeck.length);
        newDeck.splice(splicePos, 1);
    }
    return newDeck;
}

export function getNextPlayerIndex(deckLength, turnsLength, pIndex) {
    if (pIndex === null || deckLength === 0) {
        return null;
    }
    if (pIndex >= turnsLength - 1) {
        return 0;
    }
    return pIndex + 1;
}

export function calculateScore(cards) {
    if (!cards || cards.length === 0) return 0;

    let result = cards[cards.length - 1];
    for (let i = cards.length - 2; i >= 0; i--) {
        if (cards[i + 1] - cards[i] !== 1) {
            result += cards[i];
        }
    }
    return result;
}

export function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
