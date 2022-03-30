import React, { useState } from "react";
import styled from "styled-components";
import PlayerTable from "./features/PlayerTable";
import Board from "./features/Board";
import { GameButton } from "./constant/GameButton";
import * as Actions from "./Store/Actions";
import socket from "./Socket";
import { UNICORN_RAINBOW } from "./constant/colors";

const AppBody = styled.div`
    min-height: 90vh;
    padding: 4px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    text-align: center;
`;

const StyledForm = styled.form`
    background-color: ${UNICORN_RAINBOW[0]};
    width: 50%;
    height: 50vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 8px;
`;

const StyledInput = styled.input`
    width: 30%;
    padding: 12px 0;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 8px;
`;

const StyledButton = styled(GameButton)`
    width: 30%;
    margin: 8px;
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
                <StyledForm onSubmit={submitName}>
                    <h1>Enter your name:</h1>
                    <StyledInput
                        maxLength={10}
                        placeholder={"Enter your name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <StyledButton color={UNICORN_RAINBOW[4]}>Enter Game</StyledButton>
                    <p style={{ color: "red" }}>{error}</p>
                </StyledForm>
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
