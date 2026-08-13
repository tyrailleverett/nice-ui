import type { Story, StoryDefault } from "@ladle/react";

import { Logo } from "@/components/logo";

import { Footer1 as Footer1Block, GithubIcon, XIcon } from "./footer-1";

export default {
  title: "Footer",
} satisfies StoryDefault;

const navLinks = [
  { href: "#", label: "Features" },
  { href: "#", label: "Blog" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Licence" },
  { href: "#", label: "Privacy" },
];

const socialLinks = [
  {
    href: "#",
    icon: <XIcon />,
    label: "X",
  },
  {
    href: "#",
    icon: <GithubIcon />,
    label: "Github",
  },
];

export const Footer1: Story = () => (
  <Footer1Block
    builtBy={{
      href: "https://github.com/hotreloadstudios",
      name: "Hot Reload",
    }}
    logo={<Logo aria-label="Nice UI" className="h-4.5 w-auto" />}
    navLinks={navLinks}
    socialLinks={socialLinks}
  />
);
