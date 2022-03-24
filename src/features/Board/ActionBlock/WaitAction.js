import styled from "styled-components";

const WaitWrapper = styled.div`
display: grid;
grid-template-columns: 20% 40% 20%;
grid-column-gap: 10%;
padding-bottom: 30px;
`;

function WaitAction(props) {
    const { isHost, onStartGame } = props;

    return (
        <WaitWrapper>
            <div></div>
            {isHost ? (
                <button onClick={onStartGame}>Start Game</button>
            ) : (
                <h1>Waiting for host to start</h1>
            )}
            <div></div>
        </WaitWrapper>
    );
}

export default WaitAction;
