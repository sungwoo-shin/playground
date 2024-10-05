import type { Meta, StoryObj } from "@storybook/react";

import { Modal4R } from "./4_r";

const meta = {
  component: Modal4R,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal4R>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
