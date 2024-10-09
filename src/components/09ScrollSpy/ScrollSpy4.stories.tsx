import type { Meta, StoryObj } from "@storybook/react";

import { ScrollSpy4R } from "./4_r";

const meta = {
  component: ScrollSpy4R,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollSpy4R>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
