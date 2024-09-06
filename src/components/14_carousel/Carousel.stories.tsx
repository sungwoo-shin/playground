import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./index";

const meta = {
  component: Carousel,
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
