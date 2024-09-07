import type { Meta, StoryObj } from "@storybook/react";

import { Accordions as Accordion } from ".";

const meta = {
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
