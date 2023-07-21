import styled from 'styled-components';
import variables from '../constants/styleVariables';
import defaultTheme from "../constants/themes/defaultTheme";

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${defaultTheme.colors.tertiary};
	width: 100%;
	height: 50px;
	padding: 10px;
	box-sizing: border-box;
`;
export const Title = styled.div`
	height: 40px;
	width: fit-content;
	min-height: 24px;
	font-style: normal;
	font-weight: ${variables.fontWeight.bold};
	font-size: ${variables.fontSize.h5};
	line-height: 24px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	text-align: right;
	color: ${defaultTheme.colors.tertiary};
`;
export const ButtonContainer = styled.div`
	width: 70%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 8px;
`;
export const InputWrapper = styled.div`
	width: ${props => (props.showSearchBox ? 'calc(100% - 60px)' : '60px')};
	height: 40px;
	border: 1px solid;
	border-color: ${props => (props.showSearchBox ? `${defaultTheme.colors.tertiary}` : 'transparent')};
	box-sizing: border-box;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 8px;
	transition: width 1s, border-color 1s;
`;
export const Input = styled.input`
	height: 38px;
	border-radius: 4px;
	font-size: ${variables.fontSize.h6};
	color: ${defaultTheme.colors.black_300};
	background-color: ${defaultTheme.colors.white_200};
	border: unset !important;
	outline: 0 !important;
	width: ${props => (props.showSearchBox ? '100%' : '0')};
	min-width: 0;
	padding: ${props => (props.showSearchBox ? '0 8px' : '0')};
	text-align: right;
	direction: rtl;
`;
export const IconWrapper = styled.div`
	width: 40px;
	height: 38px;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${defaultTheme.colors.white_200};
	cursor: pointer;
	&:hover {
		background: ${defaultTheme.colors.white_200};
	}
`;

export const SearchResultContainer = styled.div`
	width: 100%;
	border-bottom: 1px solid ${defaultTheme.colors.tertiary};
	min-height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	box-sizing: border-box;
	margin-bottom: 12px;
`;
export const ResultMessage = styled.div`
	width: fit-content;
`;
export const ResultMessageLabel = styled.span`
	width: fit-content;
	min-height: 20px;
	font-style: normal;
	font-weight: ${variables.fontWeight.normal};
	font-size: ${variables.fontSize.h6};
	line-height: 20px;
	text-align: right;
	color: ${defaultTheme.colors.black_300};
	margin-left: 8px;
`;
export const ResultMessageText = styled.span`
	width: fit-content;
	min-height: 20px;
	font-style: normal;
	font-weight: ${variables.fontWeight.high};
	font-size: ${variables.fontSize.h6};
	line-height: 20px;
	text-align: right;
	color: ${defaultTheme.colors.black_400};
`;
export const ButtonsContainer = styled.div`
	width: fit-content;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 52px;
`;
