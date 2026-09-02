import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { SupportInbox } from "./support-inbox";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App / Support Inbox",
} satisfies Meta<typeof SupportInbox>;

export default meta;
type Story = StoryObj<typeof meta>;
const jonBellConversation = /Jon Bell/;

export const Workspace: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: jonBellConversation })
    );
    await expect(
      canvas.getByRole("heading", { name: "Question about SSO setup" })
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Private note" }));
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Private note" }),
      "Check SAML provisioning docs."
    );
    await userEvent.click(canvas.getByRole("button", { name: "Add note" }));
    await expect(
      canvas.getByText("Check SAML provisioning docs.")
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Resolve conversation" })
    );
    await expect(canvas.getByText("Resolved")).toBeVisible();
  },
  render: () => <SupportInbox />,
};
