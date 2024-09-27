import {ReactNode} from "react";
import { Container } from "./style";

type TProps = {
  children: ReactNode;
  title?: string;
}

export const Badge = (props: TProps) => {
  const { children, title } = props;
  return (
    <Container title={title}>
      {children}
    </Container>
  );
};
