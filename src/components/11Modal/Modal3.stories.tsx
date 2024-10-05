import type { Meta, StoryObj } from "@storybook/react";

import { Modal3V } from "./3_v";

const meta = {
  component: Modal3V,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal3V>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
