import type { Meta, StoryFn } from "@storybook/react-vite";

import {
  FacebookIcon,
  Footer3 as Footer3Block,
  GithubIcon,
  XIcon,
} from "./footer-3";

export default {
  title: "Marketing/Footer",
} satisfies Meta;

const columns = [
  {
    links: [
      { href: "#", title: "Pricing" },
      { href: "#", title: "Testimonials" },
      { href: "#", title: "FAQs" },
      { href: "#", title: "Contact Us" },
      { href: "#", title: "Blog" },
    ],
    social: { href: "#", icon: <FacebookIcon />, title: "Facebook" },
    title: "About Us",
  },
  {
    links: [
      { href: "#", title: "Help Center" },
      { href: "#", title: "Terms" },
      { href: "#", title: "Privacy" },
      { href: "#", title: "Security" },
      { href: "#", title: "Cookie Policy" },
    ],
    social: { href: "#", icon: <GithubIcon />, title: "Github" },
    title: "Support",
  },
  {
    links: [
      { href: "#", title: "Forum" },
      { href: "#", title: "Events" },
      { href: "#", title: "Partners" },
      { href: "#", title: "Affiliates" },
      { href: "#", title: "Career" },
    ],
    social: { href: "#", icon: <XIcon />, title: "Twitter" },
    title: "Community",
  },
  {
    links: [
      { href: "#", title: "Investors" },
      { href: "#", title: "Terms of Use" },
      { href: "#", title: "Privacy Policy" },
      { href: "#", title: "Cookie Policy" },
      { href: "#", title: "Legal" },
    ],
    title: "Press",
  },
];

export const SocialCards: StoryFn = () => <Footer3Block columns={columns} />;
