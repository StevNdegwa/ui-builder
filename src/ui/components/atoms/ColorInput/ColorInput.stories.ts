import type { Meta, StoryObj } from "@storybook/react";

import { ColorInput } from "./ColorInput";

const meta: Meta<typeof ColorInput> = {
  component: ColorInput,
  title: "Components/Atoms/ColorInput",
};

type Story = StoryObj<typeof ColorInput>;

export const Default: Story = {};

export default meta;
