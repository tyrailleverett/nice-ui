import type { Story, StoryDefault } from "@ladle/react"

import { Logo } from "@/components/logo"

import {
  FacebookIcon,
  Footer5 as Footer5Block,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./footer-5"

export default {
  title: "Footer",
} satisfies StoryDefault

const columns = [
  {
    groups: [
      {
        title: "Product",
        links: [
          { href: "#", label: "Find suppliers" },
          { href: "#", label: "Planning tools" },
          { href: "#", label: "Visibility & control" },
          { href: "#", label: "Savings & payments" },
          { href: "#", label: "Pricing" },
          { href: "#", label: "Book a demo" },
          { href: "#", label: "What's new" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Solutions",
        links: [
          { href: "#", label: "Conferences" },
          { href: "#", label: "Social Events" },
          { href: "#", label: "Event Planner" },
          { href: "#", label: "Manager" },
        ],
      },
      {
        title: "Marketplace",
        links: [{ href: "#", label: "Browse the marketplace" }],
      },
    ],
  },
  {
    groups: [
      {
        title: "Resources",
        links: [
          { href: "#", label: "Blog" },
          { href: "#", label: "Customer stories" },
          { href: "#", label: "Event templates" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#", label: "About" },
          { href: "#", label: "Contact" },
          { href: "#", label: "Careers" },
          { href: "#", label: "Press" },
        ],
      },
    ],
  },
]

const socialLinks = [
  { href: "#", label: "Facebook", icon: <FacebookIcon /> },
  { href: "#", label: "LinkedIn", icon: <LinkedinIcon /> },
  { href: "#", label: "X", icon: <XIcon /> },
  { href: "#", label: "Instagram", icon: <InstagramIcon /> },
]

export const Footer5: Story = () => (
  <Footer5Block
    columns={columns}
    logo={<Logo aria-label="Nice UI" className="h-6 w-auto" />}
    socialLinks={socialLinks}
  />
)
