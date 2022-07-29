import styled from "styled-components";

export const Pessoas = styled.ul `
    background-color: #FFFFFF;
    border: 1px solid #DFE0EB;
    border-radius: 8px;
    margin-top: 128px;
    width: 100%;
`

export const Lista = styled.li `
    border: 1px solid #DFE0EB;
    display: grid ;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    padding: 26px;
    text-align: center;

    &:first-child{
        border-top: none
    }
    &  svg{
        cursor: pointer;
    }
`

export const Texto = styled.h1`
    font-size: 14px;
    font-weight: bold;
`

export const Legenda = styled.span`
    color: #9FA2B4;
    font-size:14px ;
    font-weight:bold ;
`

export const Buttons = styled.div`
    align-items:center ;
    justify-content: center;
    display: flex;
    gap: 8px;
`