import type { Meta, StoryObj } from "@storybook/react";

import { LazyLoad2V } from "./2_v/LazyLoad2V";

const meta = {
  component: LazyLoad2V,
  tags: ["autodocs"],
} satisfies Meta<typeof LazyLoad2V>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
