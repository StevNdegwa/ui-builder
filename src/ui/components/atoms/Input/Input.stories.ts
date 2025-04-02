import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Atoms/Input",
};

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export default meta;
