import type { Meta, StoryFn } from "@storybook/react-vite";

import {
  FacebookIcon,
  Footer4 as Footer4Block,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./footer-4";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

const groups = [
  {
    links: [
      { href: "#", label: "Engineering Blog" },
      { href: "#", label: "Marketplace" },
      { href: "#", label: "What’s New" },
      { href: "#", label: "About" },
      { href: "#", label: "Press" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Social Good" },
    ],
    title: "Company",
  },
  {
    links: [
      { href: "#", label: "Linktree for Enterprise" },
      { href: "#", label: "2023 Creator Report" },
      { href: "#", label: "2022 Creator Report" },
      { href: "#", label: "Charities" },
      { href: "#", label: "What’s Trending" },
      { href: "#", label: "Creator Profile Directory" },
      { href: "#", label: "Explore Templates" },
    ],
    title: "Community",
  },
  {
    links: [
      { href: "#", label: "Help Topics" },
      { href: "#", label: "Getting Started" },
      { href: "#", label: "Linoree Pro" },
      { href: "#", label: "Features & How-tos" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Report a Violation" },
    ],
    title: "Support",
  },
  {
    links: [
      { href: "#", label: "Terms & Conditions" },
      { href: "#", label: "Privacy Notice" },
      { href: "#", label: "Cookie Notice" },
      { href: "#", label: "Trust Center" },
      { href: "#", label: "Cookie Preferences" },
      { href: "#", label: "Transparency Report" },
      { href: "#", label: "Law Enforcement Access Policy" },
    ],
    title: "Legal",
  },
];

const socialLinks = [
  { href: "#", icon: <FacebookIcon />, label: "Facebook" },
  { href: "#", icon: <InstagramIcon />, label: "Instagram" },
  { href: "#", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "#", icon: <XIcon />, label: "X" },
];

export const StoreBadges: StoryFn = () => (
  <Footer4Block groups={groups} socialLinks={socialLinks} />
);
