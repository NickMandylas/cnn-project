import { Box, Spinner } from "bumbag";
import React from "react";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Box height="100vh" width="100%" alignY="center" alignX="center">
      <Spinner hasTrack size="large" />
    </Box>
  );
};

export default Loading;
