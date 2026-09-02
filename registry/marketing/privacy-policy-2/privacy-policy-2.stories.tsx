import type { Meta, StoryFn } from "@storybook/react-vite";
import { PrivacyPolicy2 } from "./privacy-policy-2";
export default { title: "Marketing/Privacy Policy" } satisfies Meta;
export const ReadablePolicy: StoryFn = () => <PrivacyPolicy2 />;
