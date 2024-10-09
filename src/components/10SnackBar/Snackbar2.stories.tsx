import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar2R } from "./2_r";

const meta = {
  component: Snackbar2R,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar2R>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
