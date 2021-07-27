import { Box, Container, PageWithHeader } from "bumbag";
import React from "react";
import Navigation from "./Navigation";

interface WrapperProps {
  selectedId?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ selectedId, children }) => {
  return (
    <PageWithHeader sticky header={<Navigation selectedId={selectedId} />}>
      <Container>
        <Box padding="major-2">{children}</Box>
      </Container>
    </PageWithHeader>
  );
};

export default Wrapper;
