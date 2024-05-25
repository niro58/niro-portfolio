const header_components: {
  title: string;
  href: string;
  subPages?: { title: string; href: string }[];
}[] = [
  { title: "Home", href: "/#" },
  { title: "About", href: "/#about" },
  { title: "Projects", href: "/#projects" },
  {
    title: "Stack",
    href: "/#stack"
  },
  { title: "Contact", href: "/#contact" }
];
export default header_components;
