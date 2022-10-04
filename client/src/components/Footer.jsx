import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        bg: "#000000",
        paddingY: "1.2rem",
        flexShrink: 0,
      }}
    >
      <Text textColor="white" fontSize=".8rem" color="#717D6A">
        &copy; 2022 Musichubs.com All Rights Reserved
      </Text>
    </Box>
  );
};

export default Footer;
