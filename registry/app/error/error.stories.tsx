import type { Meta, StoryFn } from "@storybook/react-vite";

import { Error1 as MissingRecordBlock } from "./error-1/error-1";
import { Error2 as RestrictedRecordBlock } from "./error-2/error-2";
import { Error3 as InterruptedPageBlock } from "./error-3/error-3";
import { Error4 as ScheduledFreezeBlock } from "./error-4/error-4";
import { Error5 as DisconnectedWorkspaceBlock } from "./error-5/error-5";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Error",
} satisfies Meta;

export const MissingRecord: StoryFn = () => <MissingRecordBlock />;
export const RestrictedRecord: StoryFn = () => <RestrictedRecordBlock />;
export const InterruptedPage: StoryFn = () => <InterruptedPageBlock />;
export const ScheduledFreeze: StoryFn = () => <ScheduledFreezeBlock />;
export const DisconnectedWorkspace: StoryFn = () => (
  <DisconnectedWorkspaceBlock />
);
