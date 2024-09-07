import type { Meta, StoryObj } from "@storybook/react";

import ScrollBox from "./vanilla";

const meta = {
  component: ScrollBox,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
