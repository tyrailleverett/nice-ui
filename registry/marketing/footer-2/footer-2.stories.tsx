import type { Meta, StoryFn } from "@storybook/react-vite";

import { Logo } from "@/components/logo";

import { Footer2 as Footer2Block, GithubIcon, XIcon } from "./footer-2";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

const companyLinks = [
  { href: "#", title: "About Us" },
  { href: "#", title: "Careers" },
  { href: "#", title: "Brand assets" },
  { href: "#", title: "Privacy Policy" },
  { href: "#", title: "Terms of Service" },
];

const resourceLinks = [
  { href: "#", title: "Blog" },
  { href: "#", title: "Help Center" },
  { href: "#", title: "Contact Support" },
  { href: "#", title: "Community" },
  { href: "#", title: "Security" },
];

const socialLinks = [
  {
    href: "#",
    icon: <GithubIcon />,
    label: "Github",
  },
  {
    href: "#",
    icon: <XIcon />,
    label: "X",
  },
];

export const BrandTwoColumns: StoryFn = () => (
  <Footer2Block
    companyLinks={companyLinks}
    logo={<Logo aria-label="Nice UI" className="h-5 w-auto" />}
    resourceLinks={resourceLinks}
    socialLinks={socialLinks}
  />
);
