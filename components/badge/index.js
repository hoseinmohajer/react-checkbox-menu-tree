import React from "react";
import { Container } from "./style";

const Badge = ({ children, type, textTransform = "none", title }) => {
  return (
    <Container type={type} textTransform={textTransform} title={title}>
      {children}
    </Container>
  );
};

export default Badge;
