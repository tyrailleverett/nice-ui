import {
  HeaderActions,
  type HeaderBlockProps,
  type HeaderCta,
  HeaderFrame,
  HeaderLogo,
  HeaderMenuToggle,
  type HeaderNavLink,
  HeaderNavLinks,
  useHeaderMenu,
} from "@/components/header-shared";

export type Header1Cta = HeaderCta;
export type Header1NavLink = HeaderNavLink;
export type Header1Props = HeaderBlockProps;

export function Header1({
  className,
  getStarted = { label: "Get started" },
  logo,
  logoHref = "#",
  navLinks,
  signIn = { label: "Login" },
}: Header1Props) {
  const { menuOpen, toggleMenu } = useHeaderMenu();

  return (
    <HeaderFrame className={className} menuOpen={menuOpen}>
      <div className="flex w-full justify-between lg:w-auto">
        <div className="flex items-center gap-8">
          <HeaderLogo logo={logo} logoHref={logoHref} />
          <HeaderNavLinks className="hidden lg:flex" navLinks={navLinks} />
        </div>
        <HeaderMenuToggle menuOpen={menuOpen} onToggle={toggleMenu} />
      </div>
      <HeaderActions
        getStarted={getStarted}
        menuOpen={menuOpen}
        navLinks={navLinks}
        signIn={signIn}
      />
    </HeaderFrame>
  );
}
