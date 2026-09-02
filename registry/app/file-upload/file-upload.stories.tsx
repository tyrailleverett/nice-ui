import type { Meta, StoryFn } from "@storybook/react-vite";
import { FileUpload1 } from "../file-upload-1/file-upload-1";
import { FileUpload2 } from "../file-upload-2/file-upload-2";
import { FileUpload3 } from "../file-upload-3/file-upload-3";
import { FileUpload4 } from "../file-upload-4/file-upload-4";
import { FileUpload5 } from "../file-upload-5/file-upload-5";
import { FileUpload6 } from "../file-upload-6/file-upload-6";

export default {
  parameters: { layout: "fullscreen" },
  title: "App/File Upload",
} satisfies Meta;
export const AssetDropzone: StoryFn = () => <FileUpload1 />;
export const AvatarButton: StoryFn = () => <FileUpload2 />;
export const AvatarDropzone: StoryFn = () => <FileUpload3 />;
export const Compact: StoryFn = () => <FileUpload4 />;
export const Progress: StoryFn = () => <FileUpload5 />;
export const ImportWizard: StoryFn = () => <FileUpload6 />;
