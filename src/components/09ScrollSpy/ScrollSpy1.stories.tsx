import type { Meta, StoryObj } from "@storybook/react";

import { ScrollSpy1 as ScrollSpy } from "./1_r";

const meta = {
  component: ScrollSpy,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollSpy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
