import styled from "styled-components";

export const Body = styled.aside`
    background-color: #363740; ;
    width: 255px;
    & > div:first-child {
        align-items: center ;
        display: flex ;
        padding: 32px;
        gap: 8px;
    }
`

export const SubTitulo = styled.h2 `
    color: #A4A6B3;
    font-size: 19px;
    font-weight: 700;
    opacity: 0.7 ;
`

export const Itens = styled.ul `
    margin-top: 80px;
    & a {
        align-items: center ;
        display: flex;
        padding-left: 32px;
    }
    & li {
        color: white;
        height:56px ;
        padding: 18px 24px;
        width: 255px;
    }
    & svg {
        color: white;
        cursor: pointer;
    }
    & a:last-child {
        border-bottom: 1px solid #DFE0EB;
    }
`

export const LogOut = styled.small `
    color: white;
    font-size: 12px;
`

export const LogOutDiv = styled.div `
    cursor: pointer ;
    display: flex;
    gap: 8px;
    margin:24px 0 0 32px ;
    width:fit-content ;
`

