import type { Meta, StoryObj } from "@storybook/react";

import { InfiniteScroll1R } from "./react/InfiniteScrollR";

const meta: Meta = {};

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
  render: function Render() {
    return <InfiniteScroll1R />;
  },
};
