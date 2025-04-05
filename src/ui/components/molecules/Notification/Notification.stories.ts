import type { Meta, StoryObj } from "@storybook/react";

import { Notification } from "./Notification";

const meta: Meta<typeof Notification> = {
  component: Notification,
  title: "Components/Atoms/Notification",
};

type Story = StoryObj<typeof Notification>;

export const Default: Story = {};

export default meta;
