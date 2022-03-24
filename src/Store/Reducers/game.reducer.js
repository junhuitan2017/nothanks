import * as Actions from "../Actions";
import { PASS_TURN, PLAYER_LEFT } from "../Actions";

const initialState = {
    host: null,
    deck: [...Array(6).keys()].slice(1),
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
                        token: 10,
                        cards: [],
                    },
                },
            };
        case Actions.START_GAME:
            return {
                ...state,
                currentCardIndex: action.cIndex,
                currentPlayerIndex: action.pIndex,
            };
        case Actions.TAKE_CARD:
            return {
                ...state,
                deck: [
                    ...state.deck.slice(0, action.cIndex),
                    ...state.deck.slice(action.cIndex + 1),
                ],
                players: {
                    ...state.players,
                    [action.id]: {
                        ...state.players[action.id],
                        score: state.players[action.id].score + 1,
                        token: state.players[action.id].token,
                        cards: [...state.players[action.id].cards, action.card],
                    },
                },
                currentCardIndex: action.nextCIndex,
                currentPlayerIndex: action.nextPIndex,
            };
        case PASS_TURN:
            return {
                ...state,
                turns: [...state.turns.slice(1), state.turns[0]],
                players: {
                    ...state.players,
                    [action.id]: {
                        ...state.players[action.id],
                        score: state.players[action.id].score,
                        token: state.players[action.id].token - 1,
                    },
                },
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
