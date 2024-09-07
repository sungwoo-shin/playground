import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from ".";

const meta = {
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
