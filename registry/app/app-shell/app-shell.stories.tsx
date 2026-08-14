import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { AppShell1 } from "../app-shell-1/app-shell-1";
import { AppShell2 } from "../app-shell-2/app-shell-2";
import { AppShell3 } from "../app-shell-3/app-shell-3";
import { AppShell4 } from "../app-shell-4/app-shell-4";
import { AppShell5 } from "../app-shell-5/app-shell-5";
import { AppShell6 } from "../app-shell-6/app-shell-6";
import { AppShell7 } from "../app-shell-7/app-shell-7";
import { AppShell8 } from "../app-shell-8/app-shell-8";
import { AppShell9 } from "../app-shell-9/app-shell-9";

const meta = {
  parameters: { layout: "fullscreen" },
  title: "App/App Shell",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductSidebar: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Deployments" }));
    await expect(
      canvas.getByRole("button", { name: "Deployments" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell1 />,
};

export const ProductSidebarWorkspaceMenu: Story = {
  render: () => <AppShell1 defaultWorkspaceMenuOpen />,
};

export const ProductSidebarUserMenu: Story = {
  render: () => <AppShell1 defaultUserMenuOpen />,
};

export const OrganizationSidebar: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Accounts" }));
    await expect(
      canvas.getByRole("button", { name: "Accounts" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell2 />,
};

export const OrganizationSidebarCollapsed: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Expand sidebar" })
    );
    await expect(
      canvas.getByRole("button", { name: "Collapse sidebar" })
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Collapse sidebar" })
    );
    await expect(
      canvas.getByRole("button", { name: "Expand sidebar" })
    ).toBeVisible();
  },
  render: () => <AppShell2 defaultCollapsed />,
};

export const OrganizationSidebarMenu: Story = {
  render: () => <AppShell2 defaultOrganizationMenuOpen />,
};

export const ProjectDashboardShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Projects" }));
    await expect(
      canvas.getByRole("button", { name: "Projects" })
    ).toHaveAttribute("data-active", "true");
  },
  render: () => <AppShell3 />,
};

export const OperationsConsoleShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Roles" }));
    await expect(canvas.getByRole("button", { name: "Roles" })).toHaveAttribute(
      "data-active",
      "true"
    );
  },
  render: () => <AppShell4 />,
};

export const ReportingDashboardShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Billing" }));
    await expect(
      canvas.getByRole("button", { name: "Billing" })
    ).toHaveAttribute("data-active", "true");
  },
  render: () => <AppShell5 />,
};

export const DualTierWorkspaceShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Projects" }));
    await expect(
      canvas.getByRole("button", { name: "Projects" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell6 />,
};

export const DualTierWorkspaceUserMenu: Story = {
  render: () => <AppShell6 defaultUserMenuOpen />,
};

export const InvertedDispatchShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
    await expect(
      canvas.getByRole("button", { name: "Settings" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell7 />,
};

export const ServiceConsoleShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Services" }));
    await expect(
      canvas.getByRole("button", { name: "Services" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell8 />,
};

export const MarketDashboardShell: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Orders" }));
    await expect(
      canvas.getByRole("button", { name: "Orders" })
    ).toHaveAttribute("aria-current", "page");
  },
  render: () => <AppShell9 />,
};
