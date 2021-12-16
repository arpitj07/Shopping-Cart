import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;
    margin: 15px;

    div{
        max-width: 400px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        flex: 1;
        
    }
    .information, .buttons{
        width: 200px;
        flex-direction: row;
        
    }

    img{
        max-width: 80px;
        object-fit: contain;
        margin: 20px;
        
    }
`;