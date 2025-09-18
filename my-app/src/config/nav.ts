export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/member", label: "Members" },
  { href: "/addmember", label: "Add Member" },
  { href: "/portfolio/new", label: "Add Portfolio" },
  { href: "/admin/portfolio", label: "Admin" },
];
