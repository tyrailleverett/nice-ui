import type { Meta, StoryFn } from "@storybook/react-vite";
import { TermsOfService2 } from "./terms-of-service-2";
export default { title: "Marketing/Terms of Service" } satisfies Meta;
export const ReadableTerms: StoryFn = () => <TermsOfService2 />;
