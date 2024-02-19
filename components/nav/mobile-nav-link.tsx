import Link from "next/link";

interface MobileNavLinkProps {
  title: string;
  href: string;
  setClosedNav: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  title,
  href,
  setClosedNav
}) => {
  return (
    <Link
      href={href}
      onClick={setClosedNav}
      className="hover:text-primary/90 active:text-primary/70"
    >
      {title}
    </Link>
  );
};

export default MobileNavLink;
