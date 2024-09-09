import type { Meta, StoryObj } from "@storybook/react";

import { InfiniteScroll1V as InfiniteScroll } from "./vanilla/InfiniteScroll1V";

const meta = {
  component: InfiniteScroll,
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
