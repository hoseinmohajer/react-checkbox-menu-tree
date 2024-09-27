import styled from 'styled-components';
import {TTheme} from "../../types/common.ts";

type TProps = {
    theme?: TTheme
}

export const ShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 2.5s infinite;
  //overflow: hidden;
  z-index: 1;
  @keyframes loading {
    0% {
      transform: translate(-150%);
    }
    50% {
      transform: translate(-60%);
    }
    100% {
      transform: translate(150%);
    }
  }
`;
export const ShimmerStyled = styled.div<TProps>`
  width: 50%;
  height: 100%;
  background-color: ${({ theme }: {theme: TTheme}) => theme?.colors?.white_200};
  opacity: .7;
  transform: skewX(-20deg);
    /* box-shadow: 0px 0px 6px ${({ theme }: {theme: TTheme}) => theme?.colors?.shadow_100}; */
`;
