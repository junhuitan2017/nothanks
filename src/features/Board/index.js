import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import * as Actions from "../../Store/Actions";
import { useSelector } from "react-redux";
import PlayerAction from "./ActionBlock/PlayerAction";
import WaitAction from "./ActionBlock/WaitAction";
import socket from "../../Socket";
import BoardInfo from "./BoardInfo";
import { GAME_BG_COLOR } from "../../constant/colors";

const BoardWrapper = styled.div`
    padding: 4px;
    display: flex;
    justify-content: space-evenly;
    flex-flow: column wrap;
    text-align: center;
    border: 3px solid black;
    border-radius: 8px;
    background-color: ${GAME_BG_COLOR};
    background-image: url("image/gamebg.png");
    background-position: bottom;
    background-repeat: no-repeat;
`;
const ActionWrapper = styled.div`
    min-height: 100px;
    width: 90%;
    border-radius: 8px;
    align-self: center;
    margin: 8px;
    padding-bottom: 30px;
`;
const GameWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
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
        const startingCardIndex = Math.floor(Math.random() * newDeck.length);
        const numPlayers = Object.keys(players).length;
        const startingToken = numPlayers <= 5 ? 11 : numPlayers <= 6 ? 9 : 7;
        Actions.startGame(
            newDeck,
            shuffledTurns,
            startingCardIndex,
            startingToken
        );
    }

    function takeCard() {
        console.log(deck[currentCardIndex]);
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
            ),
            Math.floor(Math.random() * (deck.length - 1)), // One card will be taken
            Actions.calculateScore(currPlayerCards)
        );
    }

    function passTurn() {
        if (players[turns[currentPlayerIndex]].token <= 0) {
            setCannotPass(true);
            return;
        }
        Actions.passTurn(
            turns[currentPlayerIndex],
            Actions.getNextPlayerIndex(
                deck.length,
                turns.length,
                currentPlayerIndex
            ),
            Actions.calculateScore(players[turns[currentPlayerIndex]].cards)
        );
    }

    return (
        <BoardWrapper>
            <ActionWrapper>
                {currentPlayerIndex === null ? (
                    <WaitAction
                        isHost={socket.id === host}
                        onStartGame={startGame}
                    />
                ) : (
                    <>
                        <h2>
                            {players[turns[currentPlayerIndex]].name}'s turn
                        </h2>
                        {cannotPass && (
                            <p style={{ color: "red" }}>
                                Cannot pass as you have no tokens
                            </p>
                        )}
                        {socket.id === turns[currentPlayerIndex] && (
                            <PlayerAction
                                name={players[turns[currentPlayerIndex]].name}
                                onTakeCard={takeCard}
                                onPassTurn={passTurn}
                            />
                        )}
                    </>
                )}
            </ActionWrapper>
            <GameWrapper>
                <div>
                    <b>Pool</b>
                    <BoardInfo
                        numCards={deck.length - 1}
                        numTokens={tokenPool}
                    />
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
