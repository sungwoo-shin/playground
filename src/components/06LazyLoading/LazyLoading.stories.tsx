import type { Meta, StoryObj } from "@storybook/react";

import { LazyLoading1R } from "./1_r/LazyLoading1R";
import { LazyLoad2V } from "./2_v/LazyLoad2V";

const meta: Meta = {
  decorators: [
    (Story) => (
      <>
        <h2>지연로딩</h2>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const R1: Story = {
  render: function Render() {
    return <LazyLoading1R />;
  },
};

export const V2: Story = {
  render: function Render() {
    return <LazyLoad2V />;
  },
};
