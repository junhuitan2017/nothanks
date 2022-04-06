import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayerTable from "./features/PlayerTable";
import Board from "./features/Board";
import { GameButton } from "./constant/GameButton";
import * as Actions from "./Store/Actions";
import socket from "./Socket";
import { LOGIN_BG_COLOR, UNICORN_RAINBOW } from "./constant/colors";

const AppBody = styled.div`
    min-height: 90vh;
    padding: 4px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-family: "Gill Sans", Helvetica, sans-serif;
`;

const GameWrapper = styled.div`
    display: grid;
    height: 90vh;
    width: 100%;
    grid-template-columns: 60% 40%;
`;

const StyledForm = styled.form`
    background-color: ${LOGIN_BG_COLOR};
    width: 50%;
    height: 50vh;
    display: flex;
    flex-flow: column;
    justify-content: end;
    align-items: center;
    align-self: center;
    border-radius: 8px;
    // background-image: url("image/loginbg.gif");
    // background-position: top;
    // background-repeat: no-repeat;
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
    const { currentPlayerIndex } = useSelector(({ game }) => game);
    const [showDialog, setShowDialog] = useState(true);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function submitName(e) {
        e.preventDefault();
        if (!name) {
            setError("Name cannot be empty");
            return;
        }
        if (currentPlayerIndex !== null) {
            setError("Game has already started");
        }
        Actions.sendName(socket.id, name);
        setShowDialog(false);
    }

    return (
        <AppBody>
            {showDialog ? (
                <StyledForm onSubmit={submitName}>
                    <span
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                            color: "lightcoral",
                        }}
                    >
                        NO
                    </span>
                    <img src={"image/loginbg.gif"} alt={"NO THANKS"} />
                    <StyledInput
                        maxLength={10}
                        placeholder={"Enter your name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <StyledButton color={UNICORN_RAINBOW[4]}>
                        Enter Game
                    </StyledButton>
                    <p style={{ color: "red" }}>{error}</p>
                </StyledForm>
            ) : (
                <GameWrapper>
                    <PlayerTable />
                    <Board />
                </GameWrapper>
            )}
        </AppBody>
    );
}

export default App;
