import styled from "styled-components";
import { TTheme } from "../../types/common.ts";

type TProps = {
  size?: string;
  checked?: string;
  disabled?: boolean;
  theme?: TTheme;
};

export const CheckboxWrapper = styled.div<TProps>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-right: ${(props) => (props.size === "md" ? "21px" : "20px")};
  position: relative;
  min-height: ${(props) => (props.size === "md" ? "20px" : "12px")};
  cursor: pointer;
  line-height: 1.5;
  z-index: 1;
  width: 100%;

  &:hover {
    &:before {
      border-color: ${({ theme }: { theme: TTheme }) => theme?.colors?.primary};
    }
  }

  &:before {
    content: " ";
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 3px;
    width: ${(props) => (props.size === "md" ? "19px" : "12px")};
    height: ${(props) => (props.size === "md" ? "19px" : "12px")};
    box-sizing: border-box;
    border-radius: ${(props) => (props.size === "md" ? "7px" : "2px")};
    border: 1px solid;
    ${(props) => {
      if (props.checked === "FULL") {
        return `
          border-color: ${props?.theme?.colors?.primary};
          background-color: ${props?.theme?.colors?.primary};
      `;
      } else if (props.checked === "HALF") {
        return `
          border-color: ${props?.theme?.colors?.primary};
          background-color: ${props?.theme?.colors?.primary};
      `;
      } else {
        return `
          border-color: ${props?.theme?.colors?.primary};
          background-color: ${props?.theme?.colors?.white};
      `;
      }
    }}
  }

  ${(props) => {
    if (props.checked === "FULL") {
      return `
        &:after {
          content: ' ';
          position: absolute;
          right: ${props.size === "md" ? "7px" : "3px"};
          top: ${props.size === "md" ? "4px" : "3px"};
          width: ${props.size === "md" ? "7px" : "5px"};
          height: ${props.size === "md" ? "15px" : "9px"};
          border-right: 2px solid ${props?.theme?.colors?.white};
          border-bottom: 2px solid ${props?.theme?.colors?.white};
          box-sizing: border-box;
          background-color: transparent;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
    `;
    }
    if (props.checked === "HALF") {
      return `
        &:after {
          content: ' ';
          position: absolute;
          right: ${props.size === "md" ? "8px" : "2px"};
          top: ${props.size === "md" ? "13px" : "8px"};
          box-sizing: border-box;
          width: 8px;
          height: 2px;
          background-color: ${props?.theme?.colors?.white};
        }
    `;
    }
  }}
  ${(props) => {
    if (props.disabled) {
      return `
      &:before {
        opacity: 0.5;
        cursor: default;
      }
      `;
    }
  }}
`;

export const Label = styled.div<TProps>`
  color: ${({ theme }: { theme: TTheme }) => theme?.colors?.black_300};
  font-size: ${({ theme }: { theme: TTheme }) => theme?.fontSize?.h5};
  min-height: 20px;
  width: 100%;
  word-wrap: break-word;
`;
