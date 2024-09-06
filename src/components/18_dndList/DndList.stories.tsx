import type { Meta, StoryObj } from "@storybook/react";

import DndList from "./index";

const meta = {
  component: DndList,
  tags: ["autodocs"],
} satisfies Meta<typeof DndList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
