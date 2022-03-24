import styled from "styled-components";

const StyledCard = styled.div`
    height: 200px;
    width: 160px;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 72px;

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

    return (
        <StyledCard mini={mini}>
            <div>{number || "-"}</div>
        </StyledCard>
    );
}

export default Card;
