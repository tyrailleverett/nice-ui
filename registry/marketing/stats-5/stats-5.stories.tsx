import type { Meta, StoryFn } from "@storybook/react-vite";
import { Stats5 } from "./stats-5";
export default { title: "Marketing/Stats" } satisfies Meta;
export const SystemSnapshot: StoryFn = () => <Stats5 />;
