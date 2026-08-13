import type { Meta, StoryFn } from "@storybook/react-vite";

import { Logo } from "@/components/logo";

import {
  FacebookIcon,
  Footer5 as Footer5Block,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./footer-5";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

const columns = [
  {
    groups: [
      {
        links: [
          { href: "#", label: "Find suppliers" },
          { href: "#", label: "Planning tools" },
          { href: "#", label: "Visibility & control" },
          { href: "#", label: "Savings & payments" },
          { href: "#", label: "Pricing" },
          { href: "#", label: "Book a demo" },
          { href: "#", label: "What's new" },
        ],
        title: "Product",
      },
    ],
  },
  {
    groups: [
      {
        links: [
          { href: "#", label: "Conferences" },
          { href: "#", label: "Social Events" },
          { href: "#", label: "Event Planner" },
          { href: "#", label: "Manager" },
        ],
        title: "Solutions",
      },
      {
        links: [{ href: "#", label: "Browse the marketplace" }],
        title: "Marketplace",
      },
    ],
  },
  {
    groups: [
      {
        links: [
          { href: "#", label: "Blog" },
          { href: "#", label: "Customer stories" },
          { href: "#", label: "Event templates" },
        ],
        title: "Resources",
      },
      {
        links: [
          { href: "#", label: "About" },
          { href: "#", label: "Contact" },
          { href: "#", label: "Careers" },
          { href: "#", label: "Press" },
        ],
        title: "Company",
      },
    ],
  },
];

const socialLinks = [
  { href: "#", icon: <FacebookIcon />, label: "Facebook" },
  { href: "#", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "#", icon: <XIcon />, label: "X" },
  { href: "#", icon: <InstagramIcon />, label: "Instagram" },
];

export const NewsletterStatus: StoryFn = () => (
  <Footer5Block
    columns={columns}
    logo={<Logo aria-label="Nice UI" className="h-6 w-auto" />}
    socialLinks={socialLinks}
  />
);
