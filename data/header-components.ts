const header_components: {
  title: string;
  href: string;
  subPages?: { title: string; href: string }[];
}[] = [
  { title: "Home", href: "/#" },
  { title: "About me", href: "/#about" },
  {
    title: "Stack",
    href: "/#stack",
    subPages: [
      { title: "Current", href: "/#stack" },
      { title: "History", href: "/history-stack" }
    ]
  },
  { title: "Projects", href: "/#projects" },
  { title: "Contact", href: "/#contact" }
];
export default header_components;
