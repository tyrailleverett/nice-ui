import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { KanbanBoard } from "./kanban-board";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App / Kanban Board",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PipelineBoard: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { name: "Pipeline board" })
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Add task" })
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "In progress" })
    ).toBeVisible();
  },
  render: () => <KanbanBoard />,
};
