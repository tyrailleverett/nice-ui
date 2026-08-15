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

export type Header2Cta = HeaderCta;
export type Header2NavLink = HeaderNavLink;
export type Header2Props = HeaderBlockProps;

export function Header2({
  className,
  getStarted = { label: "Get started" },
  logo,
  logoHref = "#",
  navLinks,
  signIn = { label: "Login" },
}: Header2Props) {
  const { menuOpen, toggleMenu } = useHeaderMenu();

  return (
    <HeaderFrame className={className} menuOpen={menuOpen}>
      <div className="flex w-full justify-between lg:w-auto">
        <HeaderLogo logo={logo} logoHref={logoHref} />
        <HeaderMenuToggle menuOpen={menuOpen} onToggle={toggleMenu} />
      </div>
      <div className="absolute inset-0 m-auto hidden size-fit lg:block">
        <HeaderNavLinks navLinks={navLinks} />
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
