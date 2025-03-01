import type { Meta, StoryObj } from "@storybook/react";

import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Primary: Story = {
  args: {
    children: "Hello, World!",
    templateColumns: "auto auto auto auto",
  },
};
