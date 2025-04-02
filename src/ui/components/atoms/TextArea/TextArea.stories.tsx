import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "Components/Atoms/TextArea",
};

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export default meta;
