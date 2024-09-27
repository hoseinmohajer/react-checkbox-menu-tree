import styled from 'styled-components';
import {TTheme} from "../types/common.ts";

type TProps = {
	theme?: TTheme
}

export const Container = styled.div<TProps>`
	background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white};
	font-family: 'Number', sans-serif;
	width: calc(100%);
	height: auto;
	max-height: 680px;
	position: relative;
	direction: ltr;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	.highlight {
		background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.secondary_100};
		border-radius: 4px;
		padding: 0 1px;
	}
	.currentNodeHighlight {
		background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.warning};
		border-radius: 4px;
		padding: 0 1px;
	}
`;
export const MenuTreeMainContainer = styled.div<TProps>`
	box-sizing: border-box;
	height: 100%;
	max-height: 530px;
	padding: 10px;
	overflow-y: auto;
	--spacing: 1.2rem;
	--radius: 10px;
	.title-tag {
		background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_500};
		border-radius: 2px;
		color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_300};
		padding: 0 1px;
	}
`;
export const UL = styled.ul`
	direction: rtl;
	width: calc(100% - (calc(2 * var(--spacing) - var(--radius) - 2px)));
	margin-right: calc((var(--radius) - var(--spacing)) + 8px);
	padding-right: 0;
`;
export const TreeTitle = styled.div<TProps>`
	font-style: normal;
	font-weight: ${({ theme }: {theme: TTheme}) => theme?.fontWeight?.normal};
	font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h5};
	line-height: 20px;
	min-height: 20px;
	text-align: right;
	color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_300};
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
export const ArrowIcon = styled.span<{$show: boolean; theme: TTheme}>`
	position: absolute;
	right: -20px;
	top: 5px;
	width: 18px;
	height: 18px !important;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:before {
		font-size: 10px;
		color: ${({ theme }: {theme: TTheme}) => theme?.colors?.primary};
	};
	transform: ${props => (props.$show ? 'rotate(0deg)' : 'rotate(90deg)')}}
	//transition: ${props => (props.$show ? 'transform 0.2s linear' : 'transform 0.2s linear')}};
`;
export const Icon = styled.i`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 2px 0 5px !important;
`;
export const RightSide = styled.div<{$hasCheckBox: boolean}>`
	height: fit-content;
	display: flex;
	justify-content: flex-start !important;
	align-items: flex-start !important;
	flex-direction: column;
	min-width: 150px;
	width: fit-content;
	cursor: ${props => (!props.$hasCheckBox ? 'pointer' : '')};
	overflow: hidden;
`;
export const LeftSide = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-wrap: wrap;
	height: fit-content;
	width: fit-content;
	min-width: fit-content;
	margin-right: 8px;
`;
export const NodeContainer = styled.div<{$selectedNode: boolean}>`
	min-height: 20px;
	height: fit-content;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	border-radius: 4px;
	padding: 4px;
	background: ${props =>
		props.$selectedNode ? 'linear-gradient(90deg,rgba(234, 234, 238, 0.4) 0%,rgba(234, 234, 238, 0.4) 100%)' : 'unset'};
	&:hover {
		background: linear-gradient(90deg, rgba(234, 234, 238, 0.4) 0%, rgba(234, 234, 238, 0.4) 100%);
	}
`;
export const LI = styled.li.attrs(({ref}) => ({ ref: ref }))<TProps>`
	list-style: none;
	margin: 0;
	min-height: 36px;
	height: fit-content;
	box-sizing: content-box;
	display: block;
	position: relative;
	padding-right: calc(2 * var(--spacing) - var(--radius) - 2px);
	border-right: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.primary};
	&:last-child {
		border-color: transparent;
	}
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: calc(var(--spacing) / -1.3);
		right: -1px;
		width: calc(var(--spacing) + 7px);
		height: calc(var(--spacing) + 9px);
		border: solid ${({ theme }: {theme: TTheme}) => theme?.colors?.primary};
		border-width: 0 1px 1px 0;
	}
`;
export const Description = styled.div<{ $hasCheckBox: boolean; theme: TTheme }>`
  min-height: 14px;
  width: fit-content;
  color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_300};
  font-size: ${({ theme }: {theme: TTheme}) => theme?.fontSize?.h8};
  padding-right: ${(props) => (props.$hasCheckBox ? "22px" : "0")};
  padding-top: 4px;
`;
export const TagsContainer = styled.div<{$hasCheckBox: boolean}>`
	min-height: 22px;
	width: fit-content;
	padding-right: ${props => (props.$hasCheckBox ? '22px' : '0')};
	padding-top: 4px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
`;
export const SPAN = styled.span`
	word-wrap: break-word;
	max-width: 100%;
	display: block;
`;
