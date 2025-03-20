import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Atoms/Button",
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "gray"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    loading: false,
    children: "Hello, World!",
    variant: "solid",
    size: "md",
    disabled: false,
    color: "primary",
  },
  parameters: {
    controls: { exclude: /^variant|children*/ },
  },
};

type Story = StoryObj<typeof Button>;

export const SolidBtn: Story = {
  args: {
    variant: "solid",
  },
};

export const OutlinedBtn: Story = {
  args: {
    variant: "outlined",
  },
};

export const TextBtn: Story = {
  args: {
    variant: "text",
  },
};

export default meta;
