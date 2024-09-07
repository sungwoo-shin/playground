import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./3_v";

const meta = {
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
