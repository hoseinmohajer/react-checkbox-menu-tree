import styled from 'styled-components';
import {TTheme} from "../../../types/common.ts";

type TProps = {
    theme?: TTheme
}

export const Container = styled.div<TProps>`
  width: 100%;
  min-height: calc(100vh - 400px);
  border-radius: 8px;
  background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white};
  position: relative;
  overflow-x: hidden;
  padding-top: 50px;
`;
export const Header = styled.div<TProps>`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.white_300};
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
`;
export const Title = styled.div<TProps>`
  width: 114px;
  height: 24px;
  background: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_300};
  border-radius: 4px;
`;
export const IconContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Icon = styled.div<TProps>`
  background: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_300};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
export const MenuTreeWrapper = styled.div<TProps>`
  height: 100%;
  .tree-menu-ul {
    border-right: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
    direction: rtl;
    padding: 0 18px 0 0;
    position: relative;
    .vertical-line-of-first-node {
      position: absolute;
      top: 0;
      right: -1px;
      height: 18px;
      width: 1px;
      content: ' ';
      background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white};
    }
    &:after {
      position: absolute;
      bottom: 0;
      right: -1px;
      height: 17px;
      width: 1px;
      content: ' ';
      background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white};
    }
  }
  .tree-menu-li {
    list-style: none;
    position: relative;
    height: 36px;
    .right-side {
      height: 36px;
      display: flex;
      justify-content: flex-start !important;
      align-items: center !important;
      .arrow-icon {
        position: absolute;
        right: -9px;
        top: calc(50% - 9px);
        width: 18px;
        min-height: 18px !important;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:before {
          font-size: 10px;
          color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
        }
      }
      .horizontal-line {
        content: ' ';
        position: absolute;
        right: -18px;
        top: 18px;
        height: 1px;
        width: 7px;
        background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
        &:after {
          content: ' ';
          position: absolute;
          left: -5px;
          top: calc(50% - 2px);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
        }
      }
      .horizontal-line-leaves {
        content: ' ';
        position: absolute;
        right: -18px;
        top: 18px;
        height: 1px;
        width: 20px;
        background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
        &:after {
          content: ' ';
          position: absolute;
          left: -2px;
          top: calc(50% - 3px);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white};
          border: 1px solid ${({ theme }: {theme: TTheme}) => theme?.colors?.black_100};
        }
      }
    }
  }
  .show {
    transform: rotate(-90deg);
    transition: transform 0.2s linear;
  }
`;
export const TreeMenuTitle = styled.div<{width: number, theme: TTheme}>`
  min-width: 30px;
  width: ${props => `${props.width}px`};
  max-width: 150px;
  min-height: 20px;
  margin-right: 10px;
  background: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_300};
  border-radius: 4px;
`;
