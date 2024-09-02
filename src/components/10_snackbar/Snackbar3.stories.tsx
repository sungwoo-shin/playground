import type { Meta, StoryObj } from "@storybook/react";

import Snackbar from "./3_v";

const meta = {
  component: Snackbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
