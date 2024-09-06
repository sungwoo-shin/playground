import type { Meta, StoryObj } from "@storybook/react";

import Autocomplete from "./index";

const meta = {
  component: Autocomplete,
  tags: ["autodocs"],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
