import styled from "styled-components";

export const Tela = styled.section `
    background-color: #E5E5E5;;
    display:grid ;
    gap: 30px;
    grid-template-columns: 255px auto ;
    height: 100% ; 
    padding-right: 32px;
    width: 100vw ;
    & > aside{
        height: 100vh ;
        position: fixed;
    }
    & > div:first-of-type {
        position: absolute;
        padding: 0 30px ;
        left: 255px;
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

