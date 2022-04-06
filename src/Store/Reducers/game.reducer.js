import * as Actions from "../Actions";
import { PASS_TURN, PLAYER_LEFT } from "../Actions";

const initialState = {
    host: null,
    deck: [],
    tokenPool: 0,
    turns: [],
    players: {},
    currentCardIndex: null,
    currentPlayerIndex: null,
};

const game = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SYNC_STATE:
            return { ...action.game };
        case Actions.SETUP_ID:
            return {
                ...state,
                host: state.host || action.id,
            };
        case Actions.SETUP_NAME:
            return {
                ...state,
                turns: [...state.turns, action.id],
                players: {
                    ...state.players,
                    [action.id]: {
                        name: action.name,
                        score: 0,
                        token: "-",
                        cards: [],
                    },
                },
            };
        case Actions.START_GAME:
            const resetPlayers = {};
            Object.keys(state.players).forEach((id) => {
                resetPlayers[id] = {
                    name: state.players[id].name,
                    score: 0,
                    token: action.startingToken,
                    cards: [],
                };
            });
            return {
                ...state,
                deck: [...action.deck],
                tokenPool: 0,
                turns: [...action.turns],
                players: resetPlayers,
                currentCardIndex: action.cIndex,
                currentPlayerIndex: action.pIndex,
            };
        case Actions.TAKE_CARD:
            const playerTokens =
                state.players[action.id].token + state.tokenPool;
            return {
                ...state,
                deck: [
                    ...state.deck.slice(0, action.cIndex),
                    ...state.deck.slice(action.cIndex + 1),
                ],
                tokenPool: 0,
                players: {
                    ...state.players,
                    [action.id]: {
                        ...state.players[action.id],
                        score: action.score - playerTokens,
                        token: playerTokens,
                        cards: [...action.cards],
                    },
                },
                currentCardIndex: action.nextCIndex,
                currentPlayerIndex: action.nextPIndex,
            };
        case PASS_TURN:
            return {
                ...state,
                tokenPool: state.tokenPool + 1,
                // turns: [...state.turns.slice(1), state.turns[0]],
                players: {
                    ...state.players,
                    [action.id]: {
                        ...state.players[action.id],
                        score:
                            action.score - (state.players[action.id].token - 1),
                        token: state.players[action.id].token - 1,
                    },
                },
                currentPlayerIndex: action.nextPIndex,
            };
        case PLAYER_LEFT:
            const { [action.id]: removedPlayer, ...otherPlayers } =
                state.players;
            const newTurns = state.turns.filter((value) => value !== action.id);
            return {
                ...state,
                host: state.host === action.id ? newTurns[0] : state.host,
                turns: [...newTurns],
                players: { ...otherPlayers },
            };
        default:
            return state;
    }
};

export default game;
