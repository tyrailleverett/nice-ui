import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { AuditLog } from "./audit-log";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Audit Log",
} satisfies Meta<typeof AuditLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Inspect Checkout flow event" })
    );
    await expect(canvas.getByText("Version 2.4 · production")).toBeVisible();
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Search events" }),
      "Stripe"
    );
    await expect(canvas.getByText("Stripe connection")).toBeVisible();
    await expect(canvas.queryByText("Checkout flow")).not.toBeInTheDocument();
  },
  render: () => <AuditLog />,
};

export const Loading: Story = {
  render: () => <AuditLog isLoading />,
};

export const Empty: Story = {
  render: () => <AuditLog events={[]} />,
};
