import type { Meta, StoryObj } from "@storybook/react";

import Gallery from "./2_r";

const meta = {
  component: Gallery,
  tags: ["autodocs"],
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
