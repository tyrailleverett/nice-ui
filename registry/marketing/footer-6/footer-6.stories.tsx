import type { Story, StoryDefault } from "@ladle/react"

import {
  DiscordIcon,
  Footer6 as Footer6Block,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./footer-6"

export default {
  title: "Footer",
} satisfies StoryDefault

const groups = [
  {
    title: "Products",
    links: [
      { href: "#", label: "Blocks" },
      { href: "#", label: "Templates" },
      { href: "#", label: "Reporting" },
      { href: "#", label: "AI" },
      { href: "#", label: "Agents" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "#", label: "Finance" },
      { href: "#", label: "RevOps" },
      { href: "#", label: "Engineering" },
      { href: "#", label: "Partners" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Customers" },
      { href: "#", label: "Resource Center" },
      { href: "#", label: "Webinars" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Videos" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Newsroom" },
      { href: "#", label: "Security" },
    ],
  },
]

const socialLinks = [
  { href: "#", label: "LinkedIn", icon: <LinkedinIcon /> },
  { href: "#", label: "X", icon: <XIcon /> },
  { href: "#", label: "Discord", icon: <DiscordIcon /> },
  { href: "#", label: "YouTube", icon: <YoutubeIcon /> },
]

export const Footer6: Story = () => (
  <Footer6Block groups={groups} socialLinks={socialLinks} />
)
