import type { Meta, StoryObj } from "@storybook/react-vite";

import { UpgradePaywall } from "./upgrade-paywall";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Upgrade & Paywall",
} satisfies Meta<typeof UpgradePaywall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <UpgradePaywall />,
};
