import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { WorkspaceHub } from "./workspace-hub";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App / Workspace Library",
} satisfies Meta<typeof WorkspaceHub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Library: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Your workspaces" })
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "New workspace" })
    ).toBeVisible();
    await expect(canvas.getByText("Growth experiments")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "List" }));
    await expect(
      canvas.getByRole("button", { name: "Open Growth experiments" })
    ).toBeVisible();
  },
  render: () => <WorkspaceHub />,
};

export const SearchEmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Search workspaces" }),
      "unknown"
    );
    await expect(canvas.getByText("No workspaces found")).toBeVisible();
  },
  render: () => <WorkspaceHub />,
};
