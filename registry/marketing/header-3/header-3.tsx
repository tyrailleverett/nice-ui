import {
  HeaderActions,
  type HeaderBlockProps,
  type HeaderCta,
  HeaderFrame,
  HeaderLogo,
  HeaderMenuToggle,
  type HeaderNavLink,
  useHeaderMenu,
} from "@/components/header-shared";

export type Header3Cta = HeaderCta;
export type Header3NavLink = HeaderNavLink;
export type Header3Props = HeaderBlockProps;

export function Header3({
  className,
  getStarted = { label: "Get started" },
  logo,
  logoHref = "#",
  navLinks,
  signIn = { label: "Login" },
}: Header3Props) {
  const { menuOpen, toggleMenu } = useHeaderMenu();

  return (
    <HeaderFrame className={className} menuOpen={menuOpen}>
      <div className="flex w-full justify-between lg:w-auto">
        <HeaderLogo logo={logo} logoHref={logoHref} />
        <HeaderMenuToggle menuOpen={menuOpen} onToggle={toggleMenu} />
      </div>
      <HeaderActions
        desktopNavLinks={navLinks}
        getStarted={getStarted}
        menuOpen={menuOpen}
        navLinks={navLinks}
        signIn={signIn}
      />
    </HeaderFrame>
  );
}
