import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from ".";

const meta = {
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
