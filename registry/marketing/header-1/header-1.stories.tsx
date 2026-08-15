import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Logo } from "@/components/logo";

import { Header1 as Header1Block } from "./header-1";

export default {
  title: "Marketing/Header",
} satisfies Meta;

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export const NavLeft: StoryObj = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Get started" })
    ).toBeVisible();
  },
  render: () => (
    <div className="min-h-[150vh]">
      <Header1Block
        getStarted={{ href: "#", label: "Get started" }}
        logo={<Logo aria-label="Nice UI" className="h-4 w-auto" />}
        navLinks={navLinks}
        signIn={{ href: "#", label: "Login" }}
      />
      <p className="mx-auto max-w-4xl px-6 pt-28 text-muted-foreground text-sm">
        Scroll to see the header tighten into a floating island. Nav links sit
        to the left of the actions.
      </p>
    </div>
  ),
};
