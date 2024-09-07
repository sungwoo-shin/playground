import type { Meta, StoryObj } from "@storybook/react";

import { TabMenu } from ".";

const meta = {
  component: TabMenu,
} satisfies Meta<typeof TabMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
