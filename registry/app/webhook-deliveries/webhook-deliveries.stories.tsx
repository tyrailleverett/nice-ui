import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { WebhookDeliveries } from "./webhook-deliveries";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Webhook Deliveries",
} satisfies Meta<typeof WebhookDeliveries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncidentConsole: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Inspect customer.updated, Success" })
    );
    await expect(
      canvas.getByRole("heading", { name: "customer.updated" })
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Failed" }));
    await expect(canvas.getByText("invoice.payment_failed")).toBeVisible();
    await expect(
      canvas.queryByText("customer.updated")
    ).not.toBeInTheDocument();
  },
  render: () => <WebhookDeliveries />,
};

export const HealthyEndpoint: Story = {
  render: () => <WebhookDeliveries />,
};
