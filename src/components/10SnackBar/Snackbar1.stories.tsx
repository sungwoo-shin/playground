import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar1R } from "./1_r";

const meta = {
  component: Snackbar1R,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar1R>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
