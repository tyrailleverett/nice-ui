import type { Meta, StoryFn } from "@storybook/react-vite";
import { Changelog3 } from "./changelog-3";
export default { title: "Marketing/Changelog" } satisfies Meta;
export const ReleaseNotes: StoryFn = () => <Changelog3 />;
