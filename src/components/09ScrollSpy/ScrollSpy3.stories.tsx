import type { Meta, StoryObj } from "@storybook/react";

import { ScrollSpy3V as ScrollSpy } from "./3_v";

const meta = {
  component: ScrollSpy,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollSpy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
