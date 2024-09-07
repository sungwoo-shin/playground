import type { Meta, StoryObj } from "@storybook/react";

import Popover from "./3_r";

const meta = {
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
