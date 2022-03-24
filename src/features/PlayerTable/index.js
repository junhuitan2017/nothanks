import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ScoreTable from "./ScoreTable";

const TableWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 4px;

    table,
    th,
    td {
        border-collapse: collapse;
        border: 2px solid black;
        padding: 10px;
    }
`;

function PlayerTable() {
    const { turns, players } = useSelector(({ game }) => game);
    return (
        <TableWrapper numTables={players.length}>
            {turns.map((id) => (
                <ScoreTable key={players[id].name} player={players[id]} />
            ))}
        </TableWrapper>
    );
}

export default PlayerTable;
