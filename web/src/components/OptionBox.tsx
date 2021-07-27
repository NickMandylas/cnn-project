import { Box, Button, Columns, Heading } from "bumbag";
import React from "react";

interface OptionBoxProps {
  title: string;
  buttonTitle: string;
  onClick: React.MouseEventHandler<any>;
}

const OptionBox: React.FC<OptionBoxProps> = ({
  title,
  buttonTitle,
  onClick,
}) => {
  return (
    <Columns.Column spread={4}>
      <Box
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        padding="20px"
      >
        <Heading use="h4" marginBottom="25px" textAlign="center">
          {title}
        </Heading>
        <Button width="100%" onClick={onClick}>
          {buttonTitle}
        </Button>
      </Box>
    </Columns.Column>
  );
};

export default OptionBox;
