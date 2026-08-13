import type { Meta, StoryFn } from "@storybook/react-vite";

import { Logo } from "@/components/logo";

import { Footer1 as Footer1Block, GithubIcon, XIcon } from "./footer-1";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

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

export const InlineNav: StoryFn = () => (
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
