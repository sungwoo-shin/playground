import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./index";

const meta = {
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
