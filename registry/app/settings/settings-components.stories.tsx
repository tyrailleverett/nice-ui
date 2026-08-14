import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  AppearanceSettings,
  DisplayComfort,
  ThemeStagePicker,
} from "../settings-appearance/settings-appearance";
import {
  BillingCycleStrip,
  BillingSettings,
  InvoiceHistory,
  PaymentMethods,
  SpendAlerts,
  SubscriptionPlan,
  UsageMeters,
} from "../settings-billing/settings-billing";
import { AppConnections } from "../settings-connections/settings-connections";
import { DangerZone } from "../settings-danger-zone/settings-danger-zone";
import { WorkspaceFeatures } from "../settings-features/settings-features";
import { GeneralSettings } from "../settings-general/settings-general";
import { Integrations } from "../settings-integrations/settings-integrations";
import { MemberSecurity } from "../settings-member-security/settings-member-security";
import { NotificationSettings } from "../settings-notifications/settings-notifications";
import { RolePermissions } from "../settings-permissions/settings-permissions";
import { WorkspacePreferences } from "../settings-preferences/settings-preferences";
import { SecuritySettings } from "../settings-security/settings-security";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Settings Components",
} satisfies Meta;

export const General: StoryFn = () => <GeneralSettings />;
export const Connections: StoryFn = () => <AppConnections />;
export const Permissions: StoryFn = () => <RolePermissions />;
export const IntegrationsPage: StoryFn = () => <Integrations />;
export const Preferences: StoryFn = () => <WorkspacePreferences />;
export const Security: StoryFn = () => <SecuritySettings />;
export const Notifications: StoryFn = () => <NotificationSettings />;
export const Features: StoryFn = () => <WorkspaceFeatures />;

const darkThemeName = /Dark/;
const coastPlanName = /Coast/;

export const Appearance: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("radio", { name: darkThemeName }));
    await expect(
      canvas.getByRole("radio", { name: darkThemeName })
    ).toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "Compact" }));
    await expect(
      canvas.getByRole("button", { name: "Compact" })
    ).toHaveAttribute("data-state", "on");
  },
  render: () => <AppearanceSettings />,
};

export const ThemeStages: StoryFn = () => (
  <div className="mx-auto max-w-5xl p-8">
    <ThemeStagePicker />
  </div>
);

export const Display: StoryFn = () => (
  <div className="mx-auto max-w-5xl p-8">
    <DisplayComfort />
  </div>
);

const onResendInvite = fn();

export const MemberSecurityDetails: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Resend invite" })
    );
    await expect(onResendInvite).toHaveBeenCalled();
  },
  render: () => <MemberSecurity onResendInvite={onResendInvite} />,
};

const onRemove = fn();

export const MemberDangerZone: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Remove" }));
    await expect(onRemove).toHaveBeenCalled();
  },
  render: () => <DangerZone onRemove={onRemove} />,
};

const onChangePlan = fn();
const onCancelPlan = fn();
const onDownloadInvoice = fn();
const onCapChange = fn();
const onSetDefaultPayment = fn();

export const Billing: StoryObj = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Change plan" }));
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(page.getByRole("radio", { name: coastPlanName }));
    await userEvent.click(page.getByRole("button", { name: "Use this plan" }));
    await expect(onChangePlan).toHaveBeenCalledWith("coast");
  },
  render: () => (
    <BillingSettings
      onCancelPlan={onCancelPlan}
      onChangePlan={onChangePlan}
      onDownloadInvoice={onDownloadInvoice}
    />
  ),
};

export const BillingCycle: StoryFn = () => (
  <div className="mx-auto max-w-5xl p-8">
    <BillingCycleStrip />
  </div>
);

export const BillingPlan: StoryObj = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Cancel plan" }));
    const dialog = within(canvasElement.ownerDocument.body).getByRole("dialog");
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Cancel plan" })
    );
    await expect(onCancelPlan).toHaveBeenCalled();
  },
  render: () => (
    <div className="mx-auto max-w-5xl p-8">
      <SubscriptionPlan onCancel={onCancelPlan} />
    </div>
  ),
};

export const BillingUsage: StoryFn = () => (
  <div className="mx-auto max-w-5xl p-8">
    <UsageMeters />
  </div>
);

export const BillingPayment: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Set as default" })
    );
    await expect(onSetDefaultPayment).toHaveBeenCalledWith("ach-9912");
  },
  render: () => (
    <div className="mx-auto max-w-5xl p-8">
      <PaymentMethods onSetDefault={onSetDefaultPayment} />
    </div>
  ),
};

export const BillingInvoices: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Actions for INV-2408" })
    );
    await userEvent.click(canvas.getByRole("menuitem", { name: "Download" }));
    await expect(onDownloadInvoice).toHaveBeenCalledWith("INV-2408");
  },
  render: () => (
    <div className="mx-auto max-w-5xl p-8">
      <InvoiceHistory onDownload={onDownloadInvoice} />
    </div>
  ),
};

export const BillingInvoicesEmpty: StoryFn = () => (
  <div className="mx-auto max-w-5xl p-8">
    <InvoiceHistory invoices={[]} />
  </div>
);

export const BillingAlerts: StoryObj = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("switch", {
        name: "Pause overages at the included cap",
      })
    );
    await expect(onCapChange).toHaveBeenCalledWith(true);
  },
  render: () => (
    <div className="mx-auto max-w-5xl p-8">
      <SpendAlerts onCapChange={onCapChange} />
    </div>
  ),
};
