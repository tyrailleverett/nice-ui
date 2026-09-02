import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { AppShell10 } from "./app-shell-10";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/App Shell",
} satisfies Meta<typeof AppShell10>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommandBarWorkspace: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Runs" }));
    await expect(canvas.getByRole("button", { name: "Runs" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  },
  render: () => <AppShell10 />,
};
