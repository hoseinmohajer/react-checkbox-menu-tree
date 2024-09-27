import styled from 'styled-components';

export const Container = styled.div`
	min-width: 33px;
	min-height: 16px;
	width: fit-content;
	height: fit-content;
	background: ${({ theme }) => theme?.colors?.white};
	box-shadow: 0 0 4px ${({ theme }) => theme?.colors?.shadow_200};
	border-radius: 4px;
	font-size: ${({ theme }) => theme?.fontSize?.h8};
	font-weight: ${({ theme }) => theme?.fontWeight?.normal};
	line-height: 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2px 4px;
	margin-left: 4px;
	margin-bottom: 4px;
	color: ${({ theme }) => theme?.colors?.black_200};
`;
