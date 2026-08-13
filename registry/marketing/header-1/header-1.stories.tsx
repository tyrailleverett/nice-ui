import type { Story, StoryDefault } from "@ladle/react";

import { Logo } from "@/components/logo";

import { Header1 as Header1Block } from "./header-1";

export default {
  title: "Header",
} satisfies StoryDefault;

const navLinks = [
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
];

export const Header1: Story = () => (
  <div className="min-h-[150vh]">
    <Header1Block
      getStarted={{ href: "#", label: "Get Started" }}
      logo={<Logo aria-label="Nice UI" className="h-4 w-auto" />}
      navLinks={navLinks}
      signIn={{ href: "#", label: "Sign In" }}
    />
    <p className="mx-auto max-w-4xl px-4 py-16 text-muted-foreground text-sm">
      Scroll to see the header tighten and pick up a border.
    </p>
  </div>
);
