import type { Meta, StoryObj } from "@storybook/react";

import { Modal2R } from "./2_r";

const meta = {
  component: Modal2R,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal2R>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
