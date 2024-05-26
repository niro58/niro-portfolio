const header_components: {
  title: string;
  href: string;
  subPages?: { title: string; href: string }[];
}[] = [
  { title: "Home", href: "/#" },
  { title: "About", href: "/#about" },
  {
    title: "Stack",
    href: "/#stack"
  },
  { title: "Projects", href: "/#projects" },
  {
    title: "Portfolio",
    href: "/#portfolio"
  },
  { title: "Contact", href: "/#contact" }
];
export default header_components;
