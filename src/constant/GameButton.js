import styled from "styled-components";

export const GameButton = styled.button`
    font-weight: bold;
    font-size: 18px;
    border: 3px solid black;
    border-radius: 8px;
    background-color: ${({color}) => color};
    padding: 8px 0;
`;