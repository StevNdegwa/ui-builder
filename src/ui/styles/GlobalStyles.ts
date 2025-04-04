import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.colorSchemes.bg};
        margin: 0;
        padding: 0;
        font-family: "Dosis", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }
`;
