import { Box, Container, PageWithHeader } from "bumbag";
import React from "react";
import Navigation from "./Navigation";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <PageWithHeader sticky header={<Navigation />}>
      <Container>
        <Box padding="major-2">{children}</Box>
      </Container>
    </PageWithHeader>
  );
};

export default Wrapper;
