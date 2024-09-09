import type { Meta, StoryObj } from "@storybook/react";

import { InfiniteScroll1R } from "./react/InfiniteScroll1R";
import { InfiniteScroll1V } from "./vanilla/InfiniteScroll1V";

const meta: Meta = {};

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
  render: function Render() {
    return <InfiniteScroll1R />;
  },
};

export const Vanilla: Story = {
  render: function Render() {
    return <InfiniteScroll1V />;
  },
};
