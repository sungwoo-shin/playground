import type { Meta, StoryObj } from "@storybook/react";

import { ScrollBoxR } from "./react";

const meta = {
  component: ScrollBoxR,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollBoxR>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
