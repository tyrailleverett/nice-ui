import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ApiKeys } from "./api-keys";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/API Keys",
} satisfies Meta<typeof ApiKeys>;

const backendRevokeHeading = /Revoke “Backend production”/;

export default meta;
type Story = StoryObj<typeof meta>;

export const Management: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Copy Frontend production" })
    );
    await expect(
      canvas.getByRole("button", { name: "Copy Frontend production" })
    ).toHaveTextContent("Copied");

    await userEvent.click(
      canvas.getByRole("button", { name: "Actions for Backend production" })
    );
    await userEvent.click(canvas.getByRole("menuitem", { name: "Revoke key" }));
    await expect(canvas.getByRole("dialog")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: backendRevokeHeading })
    ).toBeVisible();
    await userEvent.click(
      within(canvas.getByRole("dialog")).getByRole("button", {
        name: "Revoke key",
      })
    );
    await expect(
      canvas.queryByText("Backend production")
    ).not.toBeInTheDocument();
  },
  render: () => <ApiKeys />,
};

export const EmptyTestKeys: Story = {
  render: () => <ApiKeys />,
};
