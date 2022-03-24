import styled from "styled-components";
import Card from "../Board/Card";

const ScoreWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
`;

const StyledTable = styled.table`
    width: 8em;
    td {
        width: 50%;
        padding: 20px;
    }
    th {
        padding: 10px 0px;
    }
`;

const CardWrapper = styled.div`
    display: grid;
    padding: 8px;
    grid-template-columns: auto auto auto;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

function ScoreTable(props) {
    const { player } = props;
    const { name, score, token, cards } = player;

    return (
        <ScoreWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <th colSpan={2}>{name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>P</th>
                        <th>T</th>
                    </tr>
                    <tr>
                        <td>{Math.max(score, 0)}</td>
                        <td>{token}</td>
                    </tr>
                </tbody>
            </StyledTable>
            <CardWrapper>
                {cards.map((cardNo) => (
                    <Card key={cardNo} number={cardNo} mini={true} />
                ))}
            </CardWrapper>
        </ScoreWrapper>
    );
}

export default ScoreTable;
