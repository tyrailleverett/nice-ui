import type { Story, StoryDefault } from "@ladle/react"

import {
  FacebookIcon,
  Footer4 as Footer4Block,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./footer-4"

export default {
  title: "Footer",
} satisfies StoryDefault

const groups = [
  {
    title: "Company",
    links: [
      { href: "#", label: "Engineering Blog" },
      { href: "#", label: "Marketplace" },
      { href: "#", label: "What’s New" },
      { href: "#", label: "About" },
      { href: "#", label: "Press" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Social Good" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "#", label: "Linktree for Enterprise" },
      { href: "#", label: "2023 Creator Report" },
      { href: "#", label: "2022 Creator Report" },
      { href: "#", label: "Charities" },
      { href: "#", label: "What’s Trending" },
      { href: "#", label: "Creator Profile Directory" },
      { href: "#", label: "Explore Templates" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Help Topics" },
      { href: "#", label: "Getting Started" },
      { href: "#", label: "Linoree Pro" },
      { href: "#", label: "Features & How-tos" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Report a Violation" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Terms & Conditions" },
      { href: "#", label: "Privacy Notice" },
      { href: "#", label: "Cookie Notice" },
      { href: "#", label: "Trust Center" },
      { href: "#", label: "Cookie Preferences" },
      { href: "#", label: "Transparency Report" },
      { href: "#", label: "Law Enforcement Access Policy" },
    ],
  },
]

const socialLinks = [
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
  { icon: <XIcon />, href: "#", label: "X" },
]

export const Footer4: Story = () => (
  <Footer4Block groups={groups} socialLinks={socialLinks} />
)
