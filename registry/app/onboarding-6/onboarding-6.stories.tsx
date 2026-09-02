import type { Meta, StoryFn } from "@storybook/react-vite";

import { Onboarding6 } from "./onboarding-6";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Onboarding",
} satisfies Meta;

export const WorkspaceChecklist: StoryFn = () => <Onboarding6 />;
