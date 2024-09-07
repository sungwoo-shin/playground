import type { Meta, StoryObj } from "@storybook/react";

import InfiniteScroll from "./react";

const meta = {
  component: InfiniteScroll,
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
