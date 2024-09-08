import type { Meta, StoryObj } from "@storybook/react";

import { LineClamp } from ".";

const meta = {
  component: LineClamp,
} satisfies Meta<typeof LineClamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
