import type { Meta, StoryObj } from "@storybook/react";

import LazyLoading from "./1_r";

const meta = {
  component: LazyLoading,
  tags: ["autodocs"],
} satisfies Meta<typeof LazyLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
