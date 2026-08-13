import type { Story, StoryDefault } from "@ladle/react"

import { Logo } from "@/components/logo"

import { Footer2 as Footer2Block, GithubIcon, XIcon } from "./footer-2"

export default {
  title: "Footer",
} satisfies StoryDefault

const companyLinks = [
  { title: "About Us", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Brand assets", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Terms of Service", href: "#" },
]

const resourceLinks = [
  { title: "Blog", href: "#" },
  { title: "Help Center", href: "#" },
  { title: "Contact Support", href: "#" },
  { title: "Community", href: "#" },
  { title: "Security", href: "#" },
]

const socialLinks = [
  {
    icon: <GithubIcon />,
    href: "#",
    label: "Github",
  },
  {
    icon: <XIcon />,
    href: "#",
    label: "X",
  },
]

export const Footer2: Story = () => (
  <Footer2Block
    logo={<Logo aria-label="Nice UI" className="h-5 w-auto" />}
    companyLinks={companyLinks}
    resourceLinks={resourceLinks}
    socialLinks={socialLinks}
  />
)
