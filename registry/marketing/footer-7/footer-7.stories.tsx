import type { Story, StoryDefault } from "@ladle/react"

import { Footer7 as Footer7Block, GithubIcon, LinkedinIcon, XIcon } from "./footer-7"

export default {
  title: "Footer",
} satisfies StoryDefault

const groups = [
  {
    title: "Nice UI",
    links: [
      { href: "#", label: "Home" },
      { href: "#", label: "Templates" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Changelog" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { href: "#", label: "Introduction" },
      { href: "#", label: "Installation" },
      { href: "#", label: "Components" },
      { href: "#", label: "Hosting" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "FAQ" },
      { href: "#", label: "Roadmap" },
      { href: "#", label: "Forum" },
      { href: "#", label: "Affiliates" },
      { href: "#", label: "Use Cases" },
    ],
  },
]

const socialLinks = [
  { href: "#", label: "Github", icon: <GithubIcon /> },
  { href: "#", label: "X", icon: <XIcon /> },
  { href: "#", label: "LinkedIn", icon: <LinkedinIcon /> },
]

export const Footer7: Story = () => (
  <Footer7Block groups={groups} socialLinks={socialLinks} />
)
