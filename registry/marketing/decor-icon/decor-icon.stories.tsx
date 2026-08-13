import type { Meta, StoryFn } from "@storybook/react-vite";

import { DecorIcon } from "./decor-icon";

export default {
  title: "Marketing/Decor Icon",
} satisfies Meta;

export const Corners: StoryFn = () => (
  <div className="relative mx-auto h-32 w-full max-w-sm border">
    <DecorIcon className="size-4" position="top-left" />
    <DecorIcon className="size-4" position="top-right" />
    <DecorIcon className="size-4" position="bottom-left" />
    <DecorIcon className="size-4" position="bottom-right" />
  </div>
);
