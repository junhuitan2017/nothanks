import styled from "styled-components";

const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: 20% 15% 15% 20%;
    grid-column-gap: 10%;
    padding-bottom: 30px;
`;

function PlayerAction(props) {
    const { onTakeCard, onPassTurn } = props;

    return (
        <ActionWrapper>
            <div></div>
            <button onClick={onTakeCard}>Take</button>
            <button onClick={onPassTurn}>Pass (-1 Token)</button>
            <div></div>
        </ActionWrapper>
    );
}

export default PlayerAction;
