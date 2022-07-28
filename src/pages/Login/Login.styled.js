import styled from "styled-components";

export const LoginDiv = styled.div`
    align-items: center;
    background-color: #363740;
    display: flex;
    justify-content: center;
    height: 100vh;
`

export const Card = styled.div`
    align-items: center;
    background-color: white;
    border: 1px solid #DFE0EB;
    border-radius: 8px; 
    display: flex;
    flex-direction: column ;
    height : 582px;
    justify-content: center ;
    padding: 24px 8px;
    width: 380px;
`

export const Titulo = styled.h1`
    color: #252733;
    font-weight: 700;
    font-size: 24px;
    margin-bottom:  12px;
`

export const SubTitulo = styled.h2 `
    color: #A4A6B3;
    font-size: 19px;
    font-weight: 700;
    margin: 12px 0 32px;
    opacity: 0.7 ;
`

export const TextoPequeno = styled.small `
    color: #9FA2B4;
    cursor: ${props => props.small ? 'pointer' :  ''};
    font-size: ${props => props.small ? '10px' :  '14px'};
    font-weight: 400;
    &:nth-child(4){ 
        margin-bottom: 48px;
    }
`

export const Label = styled.label `
    color: #9FA2B4;
    font-size: 12px;
    font-weight: 700;
`

export const Input = styled.input `
    background: #FCFDFE;
    border: 1px solid #F0F1F7;
    border-radius: 8px;
    height:42px ;
    padding-left: 16px;
    margin-top: 8px;
    width: 316px ;
    &::placeholder {
        color: #4B506D;
        opacity: 0.4;
    }
` 

export const Campo = styled.div `
    margin-bottom: 24px ;
`

export const Password = styled.div `
    display: flex;
    justify-content: space-between ;
`

export const Button = styled.button `
    background: #3751FF;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    border: 2px solid #3751FF;
    border-radius: 8px;
    color: white ;
    cursor: pointer;
    font-weight: bold ;
    height: 48px;
    margin-bottom: 32px;
    width: 316px;
    &:hover{
        background-color: white ;
        color: #3751FF;
    }
`

export const Azul = styled.span `
    color: #3751FF;
`