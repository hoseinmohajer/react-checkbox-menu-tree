import styled from 'styled-components';
import {TTheme} from "../../types/common.ts";

type TSearchBox = {
    $showSearchBox: boolean
    theme?: TTheme
}

type TProps = {
    theme?: TTheme
}

export const HeaderContainer = styled.div<TProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.tertiary};
	width: 100%;
	height: 50px;
	padding: 10px;
	box-sizing: border-box;
`;

export const Title = styled.div<TProps>`
	height: 40px;
	width: fit-content;
	min-height: 24px;
	font-style: normal;
	font-weight: ${({ theme }: {theme: TTheme}) => theme?.fontWeight?.bold};
	font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h5};
	line-height: 24px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	text-align: right;
	color: ${({ theme }: {theme: TTheme}) => theme?.colors?.tertiary};
`;

export const ButtonContainer = styled.div`
	width: 70%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 8px;
`;

export const InputWrapper = styled.div<TSearchBox>`
	width: ${props => (props.$showSearchBox ? 'calc(100% - 60px)' : '60px')};
	height: 40px;
	border: 1px solid;
	border-color: ${props => (props.$showSearchBox ? `${({ theme }: {theme: TTheme}) => theme?.colors?.tertiary}` : 'transparent')};
	box-sizing: border-box;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 8px;
	transition: width 1s, border-color 1s;
`;

export const Input = styled.input<TSearchBox>`
	height: 38px;
	border-radius: 4px;
	font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h6};
	color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_300};
	background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_200};
	border: unset !important;
	outline: 0 !important;
	width: ${props => (props.$showSearchBox ? '100%' : '0')};
	min-width: 0;
	padding: ${props => (props.$showSearchBox ? '0 8px' : '0')};
	text-align: right;
	direction: rtl;
`;

export const IconWrapper = styled.div<TProps>`
	width: 40px;
	height: 38px;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_200};
	cursor: pointer;
	&:hover {
		background: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_200};
	}
`;

export const SearchResultContainer = styled.div<TProps>`
	width: 100%;
	border-bottom: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.tertiary};
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

export const ResultMessageLabel = styled.span<TProps>`
	width: fit-content;
	min-height: 20px;
	font-style: normal;
	font-weight: ${({ theme }: {theme: TTheme}) => theme?.fontWeight?.normal};
	font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h6};
	line-height: 20px;
	text-align: right;
	color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_300};
	margin-left: 8px;
`;

export const ResultMessageText = styled.span<TProps>`
	width: fit-content;
	min-height: 20px;
	font-style: normal;
	font-weight: ${({ theme }: {theme: TTheme}) => theme?.fontWeight?.high};
	font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h6};
	line-height: 20px;
	text-align: right;
	color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_400};
`;

export const ButtonsContainer = styled.div`
	width: fit-content;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 52px;
`;
