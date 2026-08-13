import type { Meta, StoryFn } from "@storybook/react-vite";

import {
  Footer7 as Footer7Block,
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "./footer-7";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

const groups = [
  {
    links: [
      { href: "#", label: "Home" },
      { href: "#", label: "Templates" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Changelog" },
    ],
    title: "Nice UI",
  },
  {
    links: [
      { href: "#", label: "Introduction" },
      { href: "#", label: "Installation" },
      { href: "#", label: "Components" },
      { href: "#", label: "Hosting" },
    ],
    title: "Documentation",
  },
  {
    links: [
      { href: "#", label: "FAQ" },
      { href: "#", label: "Roadmap" },
      { href: "#", label: "Forum" },
      { href: "#", label: "Affiliates" },
      { href: "#", label: "Use Cases" },
    ],
    title: "Resources",
  },
];

const socialLinks = [
  { href: "#", icon: <GithubIcon />, label: "Github" },
  { href: "#", icon: <XIcon />, label: "X" },
  { href: "#", icon: <LinkedinIcon />, label: "LinkedIn" },
];

export const ThemeSwitcherGrid: StoryFn = () => (
  <Footer7Block groups={groups} socialLinks={socialLinks} />
);
