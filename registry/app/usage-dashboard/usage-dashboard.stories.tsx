import type { Meta, StoryObj } from "@storybook/react-vite";

import { UsageDashboard } from "./usage-dashboard";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Usage Dashboard",
} satisfies Meta<typeof UsageDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <UsageDashboard />,
};
