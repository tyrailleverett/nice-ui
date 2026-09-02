import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Logo } from "@/components/logo";

import { Header4 as Header4Block } from "./header-4";

export default {
  title: "Marketing/Header",
} satisfies Meta;

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export const SystemsBar: StoryObj = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Get started" })
    ).toBeVisible();
  },
  render: () => (
    <div className="min-h-[150vh]">
      <Header4Block
        getStarted={{ href: "#", label: "Get started" }}
        logo={<Logo aria-label="Nice UI" className="h-4 w-auto" />}
        navLinks={navLinks}
        signIn={{ href: "#", label: "Log in" }}
      />
      <p className="mx-auto max-w-4xl px-6 pt-20 text-muted-foreground text-sm">
        A static two-tier header keeps the brand signal visible while the page
        scrolls.
      </p>
    </div>
  ),
};
