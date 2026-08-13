import type { Story, StoryDefault } from "@ladle/react";

import {
  DiscordIcon,
  Footer6 as Footer6Block,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./footer-6";

export default {
  title: "Footer",
} satisfies StoryDefault;

const groups = [
  {
    links: [
      { href: "#", label: "Blocks" },
      { href: "#", label: "Templates" },
      { href: "#", label: "Reporting" },
      { href: "#", label: "AI" },
      { href: "#", label: "Agents" },
    ],
    title: "Products",
  },
  {
    links: [
      { href: "#", label: "Finance" },
      { href: "#", label: "RevOps" },
      { href: "#", label: "Engineering" },
      { href: "#", label: "Partners" },
    ],
    title: "Solutions",
  },
  {
    links: [
      { href: "#", label: "Customers" },
      { href: "#", label: "Resource Center" },
      { href: "#", label: "Webinars" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Videos" },
    ],
    title: "Resources",
  },
  {
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Newsroom" },
      { href: "#", label: "Security" },
    ],
    title: "Company",
  },
];

const socialLinks = [
  { href: "#", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "#", icon: <XIcon />, label: "X" },
  { href: "#", icon: <DiscordIcon />, label: "Discord" },
  { href: "#", icon: <YoutubeIcon />, label: "YouTube" },
];

export const Footer6: Story = () => (
  <Footer6Block groups={groups} socialLinks={socialLinks} />
);
