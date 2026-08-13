import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  BarChart3Icon,
  CodeIcon,
  FileTextIcon,
  GlobeIcon,
  HandshakeIcon,
  HelpCircleIcon,
  LayersIcon,
  LeafIcon,
  PlugIcon,
  RotateCcwIcon,
  ShieldIcon,
  StarIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";

import { Header2 as Header2Block, type Header2LinkItem } from "./header-2";

export default {
  title: "Marketing/Header",
} satisfies Meta;

const productLinks: Header2LinkItem[] = [
  {
    description: "Create responsive websites with ease",
    href: "#",
    icon: <GlobeIcon />,
    label: "Website Builder",
  },
  {
    description: "Deploy and scale apps in the cloud",
    href: "#",
    icon: <LayersIcon />,
    label: "Cloud Platform",
  },
  {
    description: "Tools to help your teams work better together",
    href: "#",
    icon: <UserPlusIcon />,
    label: "Team Collaboration",
  },
  {
    description: "Track and analyze your website traffic",
    href: "#",
    icon: <BarChart3Icon />,
    label: "Analytics",
  },
  {
    description: "Connect your apps and services",
    href: "#",
    icon: <PlugIcon />,
    label: "Integrations",
  },
  {
    description: "Build custom integrations with our API",
    href: "#",
    icon: <CodeIcon />,
    label: "API",
  },
];

const companyLinks: Header2LinkItem[] = [
  {
    description: "Learn more about our story and team",
    href: "#",
    icon: <UsersIcon />,
    label: "About Us",
  },
  {
    description: "See how we've helped our clients succeed",
    href: "#",
    icon: <StarIcon />,
    label: "Customer Stories",
  },
  {
    description: "Collaborate with us for mutual growth",
    href: "#",
    icon: <HandshakeIcon />,
    label: "Partnerships",
  },
];

const companyLinks2: Header2LinkItem[] = [
  {
    href: "#",
    icon: <FileTextIcon />,
    label: "Terms of Service",
  },
  {
    href: "#",
    icon: <ShieldIcon />,
    label: "Privacy Policy",
  },
  {
    href: "#",
    icon: <RotateCcwIcon />,
    label: "Refund Policy",
  },
  {
    href: "#",
    icon: <LeafIcon />,
    label: "Blog",
  },
  {
    href: "#",
    icon: <HelpCircleIcon />,
    label: "Help Center",
  },
];

export const MegaMenu: StoryFn = () => (
  <div className="min-h-[150vh]">
    <Header2Block
      companyLinks={companyLinks}
      companyLinks2={companyLinks2}
      demo={{ href: "#", label: "Schedule a demo" }}
      getStarted={{ href: "#", label: "Get Started" }}
      logo={<Logo aria-label="Nice UI" className="h-4 w-auto" />}
      pricing={{ href: "#", label: "Pricing" }}
      productLinks={productLinks}
      signIn={{ href: "#", label: "Sign In" }}
    />
    <p className="mx-auto max-w-5xl px-4 py-16 text-muted-foreground text-sm">
      Scroll to see the header pick up a backdrop, or open Product and Company
      on desktop.
    </p>
  </div>
);
