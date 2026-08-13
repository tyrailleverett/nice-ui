import type { Story, StoryDefault } from "@ladle/react";

import { DecorIcon } from "./decor-icon";

export default {
  title: "Decor Icon",
} satisfies StoryDefault;

export const Corners: Story = () => (
  <div className="relative mx-auto h-32 w-full max-w-sm border">
    <DecorIcon className="size-4" position="top-left" />
    <DecorIcon className="size-4" position="top-right" />
    <DecorIcon className="size-4" position="bottom-left" />
    <DecorIcon className="size-4" position="bottom-right" />
  </div>
);
