import type { Meta, StoryFn } from "@storybook/react-vite";

import CommandPalette1 from "../command-palette-1/command-palette-1";
import CommandPalette2 from "../command-palette-2/command-palette-2";
import CommandPalette3 from "../command-palette-3/command-palette-3";
import CommandPalette4 from "../command-palette-4/command-palette-4";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Command Palettes",
} satisfies Meta;
export const QuickActions: StoryFn = () => <CommandPalette1 />;
export const SearchCommands: StoryFn = () => <CommandPalette2 />;
export const RecentAndResults: StoryFn = () => <CommandPalette3 />;
export const SplitPreview: StoryFn = () => <CommandPalette4 />;
