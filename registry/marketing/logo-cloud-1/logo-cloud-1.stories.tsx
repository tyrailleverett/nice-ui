import type { Story, StoryDefault } from "@ladle/react";

import { LogoCloud1 as LogoCloud1Block } from "./logo-cloud-1";

export default {
  title: "Logo Cloud",
} satisfies StoryDefault;

export const LogoCloud1: Story = () => <LogoCloud1Block />;
