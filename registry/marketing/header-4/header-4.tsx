import {
  type HeaderBlockProps,
  HeaderCtaButton,
  HeaderLogo,
  HeaderMenuToggle,
  HeaderNavLinks,
  useHeaderMenu,
} from "@/components/header-shared";
import { cn } from "@/lib/utils";

export type Header4Cta = HeaderBlockProps["getStarted"];
export type Header4NavLink = HeaderBlockProps["navLinks"][number];
export type Header4Props = HeaderBlockProps;

export function Header4({
  className,
  getStarted = { label: "Get started" },
  logo,
  logoHref = "#",
  navLinks,
  signIn = { label: "Log in" },
}: Header4Props) {
  const { menuOpen, toggleMenu } = useHeaderMenu();

  return (
    <header className={cn("border-b bg-background", className)}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between border-b py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
          <span>Nice UI / systems for making</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            All systems nominal
          </span>
        </div>
        <nav
          aria-label="Primary navigation"
          className="relative flex min-h-20 items-center justify-between gap-6"
        >
          <HeaderLogo logo={logo} logoHref={logoHref} />
          <div className="hidden lg:block">
            <HeaderNavLinks navLinks={navLinks} underline="center" />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <HeaderCtaButton cta={signIn} variant="outline" />
            <HeaderCtaButton cta={getStarted} />
          </div>
          <HeaderMenuToggle menuOpen={menuOpen} onToggle={toggleMenu} />
          <div
            className={cn(
              "absolute top-full right-0 left-0 z-10 hidden border-b bg-background p-6 shadow-lg",
              menuOpen && "flex flex-col gap-6",
              "lg:hidden"
            )}
            id="mobile-menu"
          >
            <HeaderNavLinks className="flex-col gap-5" navLinks={navLinks} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <HeaderCtaButton cta={signIn} variant="outline" />
              <HeaderCtaButton cta={getStarted} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
