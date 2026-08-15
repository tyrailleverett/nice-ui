import type { ComponentProps } from "react";

function TileMark() {
  return (
    <>
      <rect fill="currentColor" height="11" rx="3" width="11" x="4" y="4" />
      <rect fill="currentColor" height="11" rx="3" width="11" x="17" y="4" />
      <rect fill="currentColor" height="11" rx="3" width="11" x="4" y="17" />
      <rect
        fill="none"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="3"
        width="10"
        x="17.5"
        y="17.5"
      />
    </>
  );
}

function Wordmark() {
  return (
    <g fill="currentColor">
      <path d="M43 9h4l9 10.5V9h4v14h-4l-9-10.5V23h-4V9Z" />
      <path d="M66 9h4v14h-4V9Z" />
      <path d="M88 8.5c3 0 5.5 1.2 7 3.5l-3 2.2c-1-1.4-2.2-2.1-4-2.1-2.8 0-4.7 1.8-4.7 4.4s1.9 4.4 4.7 4.4c1.8 0 3-.7 4-2.1l3 2.2c-1.5 2.3-4 3.5-7 3.5-5.2 0-8.8-3.2-8.8-8s3.6-8 8.8-8Z" />
      <path d="M100 9h12v3.5h-8v2h7v3.3h-7v2.7h8.3V23H100V9Z" />
      <path d="M121 9h4v9.7c0 1.3.7 2 2.1 2s2.1-.7 2.1-2V9h4v9.8c0 3-2.2 4.7-6.1 4.7s-6.1-1.7-6.1-4.7V9Z" />
      <path d="M137 9h4v14h-4V9Z" />
    </g>
  );
}

export function LogoIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Nice UI</title>
      <TileMark />
    </svg>
  );
}

export function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 145 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Nice UI</title>
      <TileMark />
      <Wordmark />
    </svg>
  );
}
