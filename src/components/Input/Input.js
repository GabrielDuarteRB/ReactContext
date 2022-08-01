import styled from "styled-components";
import MaskedInput from "react-text-mask";

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

export const InputMask = styled(MaskedInput) `
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