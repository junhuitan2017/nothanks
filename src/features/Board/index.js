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
    align-items: center;
    text-align: center;
`;
const TokenPoolWrapper = styled.div`
    display:flex;
    flex-flow: column wrap;
    align-items: center;
`

function Board() {
    const { deck, tokenPool, turns, players, host, currentCardIndex, currentPlayerIndex } =
        useSelector(({ game }) => game);

    function startGame() {
        Actions.startGame(Math.floor(Math.random() * deck.length));
    }

    function takeCard() {
        const currPlayerCards = [...players[turns[currentPlayerIndex]].cards, deck[currentCardIndex]];
        currPlayerCards.sort((a, b) => a - b);
        
        Actions.takeCard(
            turns[currentPlayerIndex],
            currentCardIndex,
            currPlayerCards,
            getNextPlayerIndex(),
            Math.floor(Math.random() * (deck.length - 1)), // One card will be taken
            calculateScore(currPlayerCards)
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
    function calculateScore(cards) {
        if (!cards) return 0;

        let result = cards[cards.length-1];
        for (let i = cards.length-2; i >= 0; i--) {
            if (cards[i + 1] - cards[i] !== 1) {
                result += cards[i];
            }
        }
        return result;
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
                <TokenPoolWrapper>
                    <b>Token Pool</b>
                    <Card mini number={tokenPool}/>
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
