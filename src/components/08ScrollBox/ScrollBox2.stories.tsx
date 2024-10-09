import type { Meta, StoryObj } from "@storybook/react";

import { ScrollBoxV } from "./vanilla";

const meta = {
  component: ScrollBoxV,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollBoxV>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
