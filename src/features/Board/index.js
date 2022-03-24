import React, { useState } from "react";
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
    align-items: center;
    text-align: center;
`;
const TokenPoolWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
`;

function Board() {
    const {
        deck,
        tokenPool,
        turns,
        players,
        host,
        currentCardIndex,
        currentPlayerIndex,
    } = useSelector(({ game }) => game);

    const [cannotPass, setCannotPass] = useState(false);

    function startGame() {
        const newDeck = Actions.removeCardsFromDeck(
            [...Array(36).keys()].slice(3)
        );
        const shuffledTurns = Actions.shuffle(turns);
        const startingCardIndex = Math.floor(Math.random() * deck.length);
        const numPlayers = Object.keys(players).length;
        const startingToken =
            numPlayers <= 5 ? 11 : numPlayers <= 6 ? 9 : 7;
        Actions.startGame(
            newDeck,
            shuffledTurns,
            startingCardIndex,
            startingToken
        );
    }

    function takeCard() {
        const currPlayerCards = [
            ...players[turns[currentPlayerIndex]].cards,
            deck[currentCardIndex],
        ];
        currPlayerCards.sort((a, b) => a - b);

        Actions.takeCard(
            turns[currentPlayerIndex],
            currentCardIndex,
            currPlayerCards,
            Actions.getNextPlayerIndex(
                deck.length - 1,
                turns.length,
                currentPlayerIndex
            ), // One card will be taken
            Math.floor(Math.random() * (deck.length - 1)), // One card will be taken
            Actions.calculateScore(currPlayerCards)
        );
    }

    function passTurn() {
        if (players[turns[currentPlayerIndex]].token <= 0) {
            setCannotPass(true);
            return;
        }
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
                    {cannotPass && <p style={{color: "red"}}>Cannot pass as you have no tokens</p>}
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
                <TokenPoolWrapper>
                    <b>Token Pool</b>
                    <Card mini number={tokenPool} />
                </TokenPoolWrapper>
                <div>
                    <b>Current card</b>
                    <Card number={deck[currentCardIndex]} />
                </div>
            </GameWrapper>
        </BoardWrapper>
    );
}

export default Board;
