import styled from "styled-components";
import { UNICORN_RAINBOW } from "../../../constant/colors";
import { GameButton } from "../../../constant/GameButton";

const WaitWrapper = styled.div`
    display: grid;
    grid-template-columns: 20% 40% 20%;
    grid-column-gap: 10%;
    padding-bottom: 30px;
`;

function WaitAction(props) {
    const { isHost, onStartGame } = props;

    // return (
    //     <WaitWrapper>
    //         <div></div>
    //         {isHost ? (
    //             <GameButton onClick={onStartGame} color={UNICORN_RAINBOW[2]}>Start Game</GameButton>
    //         ) : (
    //             <h1>Waiting for host to start</h1>
    //         )}
    //         <div></div>
    //     </WaitWrapper>
    // );
    return isHost ? (
        <WaitWrapper>
            <div></div>
            <GameButton onClick={onStartGame} color={UNICORN_RAINBOW[2]}>
                Start Game
            </GameButton>
            <div></div>
        </WaitWrapper>
    ) : (
        <h1>Waiting for host to start</h1>
    );
}

export default WaitAction;
