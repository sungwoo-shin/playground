import type { Meta, StoryObj } from "@storybook/react";

import ImageSlide from "./3_r";

const meta = {
  component: ImageSlide,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
