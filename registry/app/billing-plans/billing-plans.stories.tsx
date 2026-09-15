import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { BillingPlan1 } from "./plan-1/plan-1";
import { BillingPlan2 } from "./plan-2/plan-2";
import { BillingPlan3 } from "./plan-3/plan-3";
import { BillingPlan4 } from "./plan-4/plan-4";
import { BillingSettings1 } from "./settings-1/settings-1";
import { BillingSettings2 } from "./settings-2/settings-2";
import { BillingSettings3 } from "./settings-3/settings-3";
import { BillingSettings4 } from "./settings-4/settings-4";

const monthlyButtonName = /monthly/i;
const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/Billing Plans",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const PlanPicker: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: monthlyButtonName }));
    await expect(canvas.getByText("$24")).toBeVisible();
  },
  render: () => <BillingPlan1 />,
};

export const PlanPickerMuted: Story = { render: () => <BillingPlan2 /> };
export const PlanPickerTinted: Story = { render: () => <BillingPlan3 /> };
export const PlanPickerRows: Story = { render: () => <BillingPlan4 /> };
export const BillingSettings: Story = { render: () => <BillingSettings1 /> };
export const BillingSettingsPlain: Story = {
  render: () => <BillingSettings2 />,
};
export const BillingSettingsTinted: Story = {
  render: () => <BillingSettings3 />,
};
export const BillingSettingsRenewal: Story = {
  render: () => <BillingSettings4 />,
};
