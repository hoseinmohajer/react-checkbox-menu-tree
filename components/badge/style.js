import styled from 'styled-components';
import defaultTheme from "../constants/themes/defaultTheme";

export const Container = styled.div`
	min-width: 33px;
	min-height: 16px;
	width: fit-content;
	height: fit-content;
	background: ${defaultTheme.colors.white};
	box-shadow: 0px 0px 4px ${defaultTheme.colors.shadow_200};
	border-radius: 4px;
	font-size: 8px;
	font-weight: 400;
	line-height: 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2px 4px;
	margin-left: 4px;
	margin-bottom: 4px;
	color: ${defaultTheme.colors.black_200};
`;
