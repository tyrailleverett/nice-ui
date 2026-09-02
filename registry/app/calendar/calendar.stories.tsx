import type { Meta, StoryFn } from "@storybook/react-vite";

import { Calendar1 } from "../calendar-1/calendar-1";
import { Calendar2 } from "../calendar-2/calendar-2";
import { Calendar3 } from "../calendar-3/calendar-3";
import { Calendar4 } from "../calendar-4/calendar-4";
import { Calendar5 } from "../calendar-5/calendar-5";
import { Calendar6 } from "../calendar-6/calendar-6";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/Calendar",
} satisfies Meta;

export const ScheduleMeeting: StoryFn = () => <Calendar1 />;
export const AgendaMonth: StoryFn = () => <Calendar2 />;
export const DurationPicker: StoryFn = () => <Calendar3 />;
export const DayAgenda: StoryFn = () => <Calendar4 />;
export const Booking: StoryFn = () => <Calendar5 />;
export const AgendaAvailability: StoryFn = () => <Calendar6 />;
