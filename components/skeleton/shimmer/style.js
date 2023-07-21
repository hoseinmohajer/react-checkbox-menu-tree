import styled from 'styled-components';
import defaultTheme from "../../constants/themes/defaultTheme";

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
export const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${defaultTheme.colors.white_200};
  opacity: .7;
  transform: skewX(-20deg);
    /* box-shadow: 0px 0px 6px ${defaultTheme.colors.shadow_100}; */
`;
