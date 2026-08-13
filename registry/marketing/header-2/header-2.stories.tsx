import type { Story, StoryDefault } from "@ladle/react"
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
} from "lucide-react"

import { Logo } from "@/components/logo"

import { Header2 as Header2Block, type Header2LinkItem } from "./header-2"

export default {
  title: "Header",
} satisfies StoryDefault

const productLinks: Header2LinkItem[] = [
  {
    label: "Website Builder",
    href: "#",
    description: "Create responsive websites with ease",
    icon: <GlobeIcon />,
  },
  {
    label: "Cloud Platform",
    href: "#",
    description: "Deploy and scale apps in the cloud",
    icon: <LayersIcon />,
  },
  {
    label: "Team Collaboration",
    href: "#",
    description: "Tools to help your teams work better together",
    icon: <UserPlusIcon />,
  },
  {
    label: "Analytics",
    href: "#",
    description: "Track and analyze your website traffic",
    icon: <BarChart3Icon />,
  },
  {
    label: "Integrations",
    href: "#",
    description: "Connect your apps and services",
    icon: <PlugIcon />,
  },
  {
    label: "API",
    href: "#",
    description: "Build custom integrations with our API",
    icon: <CodeIcon />,
  },
]

const companyLinks: Header2LinkItem[] = [
  {
    label: "About Us",
    href: "#",
    description: "Learn more about our story and team",
    icon: <UsersIcon />,
  },
  {
    label: "Customer Stories",
    href: "#",
    description: "See how we've helped our clients succeed",
    icon: <StarIcon />,
  },
  {
    label: "Partnerships",
    href: "#",
    description: "Collaborate with us for mutual growth",
    icon: <HandshakeIcon />,
  },
]

const companyLinks2: Header2LinkItem[] = [
  {
    label: "Terms of Service",
    href: "#",
    icon: <FileTextIcon />,
  },
  {
    label: "Privacy Policy",
    href: "#",
    icon: <ShieldIcon />,
  },
  {
    label: "Refund Policy",
    href: "#",
    icon: <RotateCcwIcon />,
  },
  {
    label: "Blog",
    href: "#",
    icon: <LeafIcon />,
  },
  {
    label: "Help Center",
    href: "#",
    icon: <HelpCircleIcon />,
  },
]

export const Header2: Story = () => (
  <div className="min-h-[150vh]">
    <Header2Block
      logo={<Logo aria-label="Nice UI" className="h-4 w-auto" />}
      productLinks={productLinks}
      companyLinks={companyLinks}
      companyLinks2={companyLinks2}
      pricing={{ label: "Pricing", href: "#" }}
      demo={{ label: "Schedule a demo", href: "#" }}
      signIn={{ label: "Sign In", href: "#" }}
      getStarted={{ label: "Get Started", href: "#" }}
    />
    <p className="mx-auto max-w-5xl px-4 py-16 text-muted-foreground text-sm">
      Scroll to see the header pick up a backdrop, or open Product and Company
      on desktop.
    </p>
  </div>
)
