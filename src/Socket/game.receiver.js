import socket, { DISCONNECT_EVENT, GAME_EVENT, SPECIAL_EVENT } from ".";
import * as Actions from "../Store/Actions";

export default function registerGame(gameRef) {
    return (dispatch) => {
        socket.on(GAME_EVENT, (action) => {
            // console.log(gameRef.current);
            switch (action.type) {
                case Actions.SETUP_ID:
                    console.log(gameRef.current.host, socket.id);
                    if (gameRef.current.host === socket.id) {
                        socket.emit(SPECIAL_EVENT, {
                            type: Actions.SYNC_STATE,
                            playerid: action.id,
                            game: gameRef,
                        });
                    }
                    dispatch(action);
                    break;
                default:
                    // console.log(`Game Event: ${action.type}`);
                    dispatch(action);
                    break;
            }
        });

        socket.on("connect", () => {
            socket.emit(GAME_EVENT, {
                type: Actions.SETUP_ID,
                id: socket.id,
            });
        });

        socket.on(SPECIAL_EVENT, (action) => {
            switch (action.type) {
                case Actions.SYNC_STATE:
                    dispatch({
                        type: action.type,
                        game: action.game.current,
                    });
                    break;
                default:
                    break;
            }
        });

        socket.on(DISCONNECT_EVENT, (id) => {
            // Delete game or pass host
            dispatch({
                type: Actions.PLAYER_LEFT,
                id,
            });
        });
    };
}
