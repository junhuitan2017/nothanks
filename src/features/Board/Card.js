import styled from "styled-components";
import { UNICORN_RAINBOW } from "../../constant/colors";

const StyledCard = styled.div`
    height: 200px;
    width: 160px;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 72px;
    background-color: ${({color}) => color};

    div {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    ${({mini}) => mini && `
    height: 50px;
    width: 45px;
    font-size: 20px;
    `}
`;

function Card(props) {
    const { number, mini } = props;

    const color = UNICORN_RAINBOW[Math.ceil(number / 5) - 1];

    return (
        <StyledCard mini={mini} color={color}>
            <div>{number >= 0 ? number : "-"}</div>
        </StyledCard>
    );
}

export default Card;
