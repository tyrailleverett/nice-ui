import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, userEvent } from "storybook/test";

import { Dashboard1 } from "../dashboard-1/dashboard-1";
import { Dashboard2 } from "../dashboard-2/dashboard-2";
import { Dashboard3 } from "../dashboard-3/dashboard-3";
import { Dashboard4 } from "../dashboard-4/dashboard-4";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Dashboards",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fulfillment: Story = {
  play: async ({ canvas }) => {
    const search = canvas.getByRole("textbox", { name: "Search orders" });
    fireEvent.change(search, { target: { value: "Northline" } });
    await expect(canvas.getByText("Northline Studio")).toBeVisible();
    await expect(canvas.queryByText("Avery Outdoor")).not.toBeInTheDocument();
  },
  render: () => <Dashboard1 />,
};

export const DeliveryWorklogs: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Worklog" }));
    await expect(canvas.getByRole("tab", { name: "Worklog" })).toHaveAttribute(
      "data-state",
      "active"
    );
  },
  render: () => <Dashboard2 />,
};

export const CallAnalytics: Story = {
  render: () => <Dashboard3 />,
};

export const SecurityTelemetry: Story = {
  render: () => <Dashboard4 />,
};
