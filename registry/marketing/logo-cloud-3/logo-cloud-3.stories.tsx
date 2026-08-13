import type { Story, StoryDefault } from "@ladle/react";

import { LogoCloud3 as LogoCloud3Block } from "./logo-cloud-3";

export default {
  title: "Logo Cloud",
} satisfies StoryDefault;

export const LogoCloud3: Story = () => <LogoCloud3Block />;
