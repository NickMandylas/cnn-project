import { Box, Button, Columns, Heading, Paragraph } from "bumbag";
import React from "react";

interface OptionBoxProps {
  title: string;
  buttonTitle: string;
  description: string;
  onClick: React.MouseEventHandler<any>;
}

const OptionBox: React.FC<OptionBoxProps> = ({
  title,
  buttonTitle,
  description,
  onClick,
}) => {
  return (
    <Columns.Column spread={6}>
      <Box
        border="3px solid"
        borderColor="primary"
        borderRadius="2"
        padding="20px"
      >
        <Heading use="h4" marginBottom="20px" textAlign="center">
          {title}
        </Heading>
        <Paragraph
          textAlign="center"
          paddingLeft="10px"
          paddingRight="10px"
          fontSize="100"
          marginBottom="25px"
        >
          {description}
        </Paragraph>
        <Button width="100%" palette="primary" onClick={onClick}>
          {buttonTitle}
        </Button>
      </Box>
    </Columns.Column>
  );
};

export default OptionBox;
