import React from "react";
import styled from "styled-components";
import PlayerTable from "./features/PlayerTable";
import Board from "./features/Board";
import { useState } from "react";
import * as Actions from "./Store/Actions";
import socket from "./Socket";

const AppBody = styled.div`
    min-height: 90vh;
    padding: 4px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    text-align: center;
`;

function App() {
    const [showDialog, setShowDialog] = useState(true);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function submitName(e) {
        e.preventDefault();
        if (!name) {
            setError("Name cannot be empty");
            return;
        }
        Actions.sendName(socket.id, name);
        setShowDialog(false);
    }

    return (
        <AppBody>
            {showDialog ? (
                <form onSubmit={submitName}>
                    <h1>Enter your name:</h1>
                    <input
                        maxLength={10}
                        placeholder={"Enter your name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button>Enter Game</button>
                    <p style={{color: "red"}}>{error}</p>
                </form>
            ) : (
                <>
                    <PlayerTable />
                    <Board />
                </>
            )}
        </AppBody>
    );
}

export default App;
