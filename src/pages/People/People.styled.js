import styled from "styled-components";

export const Tela = styled.section `
    background-color: #E5E5E5;
    display:grid ;
    grid-template-columns: 255px auto;
    height: 100vh ; 
    padding-right: 32px;
    width: 100vw ;
    & > aside{
        height: 100vh ;
        position: fixed;
    }
    & > div:first-of-type {
        background-color: #E5E5E5;
        height: auto;
        left: 255px;
        padding: 0 30px ;
        position: absolute;
        width: calc(100% - 255px) ;
        & > button {
            margin-top: 20px
        }
    }
`

export const ButtonDiv = styled.div `
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid #DFE0EB;
    border-radius: 8px;
    display: flex;
    gap:32px;
    margin-top: 80px;
    padding: 16px;
    width: 100%;
`

