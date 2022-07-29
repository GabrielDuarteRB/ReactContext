import styled from "styled-components";

export const Button = styled.button(({backgroundColor, width, height}) => ({
    backgroundColor,
    border: backgroundColor,
    borderRadius: 40,
    color: 'black',
    cursor: 'pointer',
    fontWeight: 'bold',
    height: height ? height : 25,
    width: width ? width : 150,
}));