import styled from "styled-components";
import { GAME_BG_COLOR, UNICORN_RAINBOW } from "../../constant/colors";

const InfoWrapper = styled.div`
    height: 200px;
    width: 160px;
    border: 3px solid black;
    border-radius: 8px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    background-color: ${GAME_BG_COLOR};
`

const StyledCard = styled.div`
    height: 50px;
    width: 45px;
    border: 1px solid black;
    border-radius: 8px;
    background-color: ${UNICORN_RAINBOW[0]};
    display: flex;
    align-items: center;
`;

const DetailWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    align-items: center;
    margin: 0 30px;
`;

function BoardInfo(props) {
    const {numCards, numTokens} = props;

    return (
        <InfoWrapper>
            <DetailWrapper>
                <StyledCard>Cards Left</StyledCard>
                <h2>{numCards >= 0 ? numCards : "-"}</h2>
            </DetailWrapper>
            <DetailWrapper>
                <img
                    src={"image/token.png"}
                    alt={"Tokens"}
                    width={40}
                    height={40}
                />
                <h2>{numTokens}</h2>
            </DetailWrapper>
        </InfoWrapper>
    )
}

export default BoardInfo;