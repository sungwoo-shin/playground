import type { Meta, StoryObj } from "@storybook/react";

import Snackbar from "./1_r";

const meta = {
  component: Snackbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
