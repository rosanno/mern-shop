import { Box, Progress } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 10,
        inset: 0,
      }}
    >
      <Progress size="xs" isIndeterminate colorScheme="red" />
    </Box>
  );
};

export default Loader;
