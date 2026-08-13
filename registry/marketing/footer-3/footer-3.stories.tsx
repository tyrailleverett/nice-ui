import type { Story, StoryDefault } from "@ladle/react"

import { FacebookIcon, Footer3 as Footer3Block, GithubIcon, XIcon } from "./footer-3"

export default {
  title: "Footer",
} satisfies StoryDefault

const columns = [
  {
    social: { title: "Facebook", href: "#", icon: <FacebookIcon /> },
    title: "About Us",
    links: [
      { title: "Pricing", href: "#" },
      { title: "Testimonials", href: "#" },
      { title: "FAQs", href: "#" },
      { title: "Contact Us", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
  {
    social: { title: "Github", href: "#", icon: <GithubIcon /> },
    title: "Support",
    links: [
      { title: "Help Center", href: "#" },
      { title: "Terms", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Security", href: "#" },
      { title: "Cookie Policy", href: "#" },
    ],
  },
  {
    social: { title: "Twitter", href: "#", icon: <XIcon /> },
    title: "Community",
    links: [
      { title: "Forum", href: "#" },
      { title: "Events", href: "#" },
      { title: "Partners", href: "#" },
      { title: "Affiliates", href: "#" },
      { title: "Career", href: "#" },
    ],
  },
  {
    title: "Press",
    links: [
      { title: "Investors", href: "#" },
      { title: "Terms of Use", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Cookie Policy", href: "#" },
      { title: "Legal", href: "#" },
    ],
  },
]

export const Footer3: Story = () => <Footer3Block columns={columns} />
