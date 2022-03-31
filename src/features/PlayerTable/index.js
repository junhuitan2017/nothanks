import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { LIGHT_RAINBOW } from "../../constant/colors";
import ScoreTable from "./ScoreTable";

const TableWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    text-align: center;
    padding: 4px;
`;

function PlayerTable() {
    const { turns, players } = useSelector(({ game }) => game);
    return (
        <TableWrapper numTables={players.length}>
            {turns.map((id, idx) => (
                <ScoreTable key={players[id].name} player={players[id]} color={LIGHT_RAINBOW[idx]}/>
            ))}
        </TableWrapper>
    );
}

export default PlayerTable;
