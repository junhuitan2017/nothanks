/**
 * Attach to receive events from socket.io server
 */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import registerGame from "./game.receiver";

export default function SocketReceiver() {
    const dispatch = useDispatch();

    const game = useSelector((state) => state.game);
    const gameRef = useRef(game);

    useEffect(() => {
        dispatch(registerGame(gameRef));
    }, [dispatch]);

    useEffect(() => {
        gameRef.current = game;
    }, [game]);
    
    return null; // Not rendering anything
}
