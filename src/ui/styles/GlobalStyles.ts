import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    background-color: ${props => props.theme.colorSchemes.light.bg};
    margin: 0;
    padding: 0;
}
`;