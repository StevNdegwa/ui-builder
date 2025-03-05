import { Box, Typography } from "@ui/components";
import { useEffect } from "react";

export const Settings = () => {
  useEffect(() => {
    console.log("Settings mounted");
  }, []);

  return (
    <Box element="section">
      <Typography>Settings</Typography>
    </Box>
  );
};
