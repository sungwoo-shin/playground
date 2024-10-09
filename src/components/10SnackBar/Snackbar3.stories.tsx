import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar3V } from "./3_v";

const meta = {
  component: Snackbar3V,
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar3V>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
