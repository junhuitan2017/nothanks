import styled from "styled-components";
import { UNICORN_RAINBOW } from "../../../constant/colors";
import { GameButton } from "../../../constant/GameButton";

const WaitButton = styled(GameButton)`
    width: 90%;
`;

function WaitAction(props) {
    const { isHost, onStartGame } = props;

    return isHost ? (
            <WaitButton onClick={onStartGame} color={UNICORN_RAINBOW[2]}>
                Start Game
            </WaitButton>
    ) : (
        <h1>Waiting for host to start</h1>
    );
}

export default WaitAction;
