import type { Story, StoryDefault } from "@ladle/react";

import { LogoCloud2 as LogoCloud2Block } from "./logo-cloud-2";

export default {
  title: "Logo Cloud",
} satisfies StoryDefault;

export const LogoCloud2: Story = () => <LogoCloud2Block />;
