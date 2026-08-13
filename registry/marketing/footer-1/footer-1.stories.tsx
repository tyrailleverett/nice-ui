import type { Story, StoryDefault } from "@ladle/react"

import { Logo } from "@/components/logo"

import { Footer1 as Footer1Block, GithubIcon, XIcon } from "./footer-1"

export default {
  title: "Footer",
} satisfies StoryDefault

const navLinks = [
  { href: "#", label: "Features" },
  { href: "#", label: "Blog" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Licence" },
  { href: "#", label: "Privacy" },
]

const socialLinks = [
  {
    href: "#",
    label: "X",
    icon: <XIcon />,
  },
  {
    href: "#",
    label: "Github",
    icon: <GithubIcon />,
  },
]

export const Footer1: Story = () => (
  <Footer1Block
    logo={<Logo aria-label="Nice UI" className="h-4.5 w-auto" />}
    navLinks={navLinks}
    socialLinks={socialLinks}
    builtBy={{
      name: "Hot Reload",
      href: "https://github.com/hotreloadstudios",
    }}
  />
)
