import type { Meta, StoryObj } from "@storybook/react";

import ImageSlide from "./index";

const meta = {
  component: ImageSlide,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
