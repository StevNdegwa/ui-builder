import { Box, Button, FlexBox, Typography } from "@ui/components";
import { Wrapper } from "./styles";

export const Settings = () => {
  return (
    <Wrapper element="section">
      <FlexBox direction="column">
        <Typography heading="h2">Element settings</Typography>

        <Box>
          <FlexBox justify="end">
            <Button size="sm">Save</Button>
          </FlexBox>
        </Box>
      </FlexBox>
    </Wrapper>
  );
};
