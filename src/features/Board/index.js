import React from "react";
import styled from "styled-components";
import Card from "./Card";
import * as Actions from "../../Store/Actions";
import { useSelector } from "react-redux";
import PlayerAction from "./ActionBlock/PlayerAction";
import WaitAction from "./ActionBlock/WaitAction";
import socket from "../../Socket";

const BoardWrapper = styled.div`
    padding: 4px;
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    text-align: center;
`;
const GameWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    text-align: center;
`;

function Board() {
    const { deck, turns, players, host, currentCardIndex, currentPlayerIndex } =
        useSelector(({ game }) => game);

    function startGame() {
        Actions.startGame(Math.floor(Math.random() * deck.length));
    }

    function takeCard() {
        Actions.takeCard(
            turns[currentPlayerIndex],
            currentCardIndex,
            deck[currentCardIndex],
            getNextPlayerIndex(),
            Math.floor(Math.random() * (deck.length - 1)) // One card will be taken
        );
    }
    function getNextPlayerIndex() {
        if (currentPlayerIndex === null) {
            return currentPlayerIndex;
        }
        if (currentPlayerIndex >= turns.length - 1) {
            return 0;
        }
        return currentPlayerIndex + 1;
    }

    function passTurn() {
        Actions.passTurn(turns[currentPlayerIndex]);
    }

    return (
        <BoardWrapper>
            {currentPlayerIndex === null ? (
                <WaitAction
                    isHost={socket.id === host}
                    onStartGame={startGame}
                />
            ) : (
                <>
                    <h2>{players[turns[currentPlayerIndex]].name}'s turn</h2>
                    {socket.id === turns[currentPlayerIndex] && (
                        <PlayerAction
                            name={players[turns[currentPlayerIndex]].name}
                            onTakeCard={takeCard}
                            onPassTurn={passTurn}
                        />
                    )}
                </>
            )}
            <GameWrapper>
                <div>
                    <b>Number of cards left</b>
                    <Card number={deck.length} />
                </div>
                <div>
                    <b>Current card</b>
                    <Card number={deck[currentCardIndex]} />
                </div>
            </GameWrapper>
        </BoardWrapper>
    );
}

export default Board;
