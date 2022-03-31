import styled from "styled-components";
import { UNICORN_RAINBOW } from "../../../constant/colors";
import { GameButton } from "../../../constant/GameButton";

const ActionWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    button {
        width: 90%;
        margin: 0 8px;
    }
`;

function PlayerAction(props) {
    const { onTakeCard, onPassTurn } = props;

    return (
        <ActionWrapper>
            <GameButton onClick={onTakeCard} color={UNICORN_RAINBOW[3]}>Take</GameButton>
            <GameButton onClick={onPassTurn} color={UNICORN_RAINBOW[0]}>Pass (-1 Token)</GameButton>
        </ActionWrapper>
    );
}

export default PlayerAction;
