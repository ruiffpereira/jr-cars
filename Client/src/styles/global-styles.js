import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*{
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	list-style: none;
	line-height: 1;
	box-sizing: border-box;
	outline: 0;
	text-decoration: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: linear-gradient(120deg, #2980b9, #8e44ad);
		font-family: 'Poppins';
}

`;

export default GlobalStyle;
