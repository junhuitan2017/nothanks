import styled from "styled-components";
import { UNICORN_RAINBOW } from "../../constant/colors";
import Card from "../Board/Card";

const ScoreWrapper = styled.div`
    min-width: 180px;
    height: fit-content;
    border: 3px solid ${({isPlayerTurn}) => isPlayerTurn ? UNICORN_RAINBOW[3] : "black"};
    border-radius: 8px;
    background-color: ${({ color }) => color};
    display: flex;
    flex-flow: column;
`;

const NameHeader = styled.div`
    font-weight: bold;
    font-size: 32px;
`

const DetailWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    align-items: center;
    margin: 0 30px 4px;
    height: 40px;
`;

const CardWrapper = styled.div`
    display: grid;
    padding: 8px;
    grid-template-columns: auto auto auto;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

function ScoreTable(props) {
    const { player, color, isPlayerTurn } = props;
    const { name, score, token, cards } = player;

    return (
        <ScoreWrapper color={color} isPlayerTurn={isPlayerTurn}>
            <NameHeader>{name}</NameHeader>
            <DetailWrapper>
                <img
                    src={"image/star.png"}
                    alt={"Points"}
                    width={25}
                    height={25}
                />
                <h3>{Math.max(score, 0)}</h3>
            </DetailWrapper>
            <DetailWrapper>
                <img
                    src={"image/token.png"}
                    alt={"Tokens"}
                    width={25}
                    height={25}
                />
                <h3>{token}</h3>
            </DetailWrapper>
            <CardWrapper>
                {cards.map((cardNo) => (
                    <Card key={cardNo} number={cardNo} mini={true} />
                ))}
            </CardWrapper>
        </ScoreWrapper>
    );
}

export default ScoreTable;
