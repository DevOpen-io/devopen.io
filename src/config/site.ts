import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "DevOpen",
  description:
    "Transforming tech through transparency. Open source solutions for a brighter future.",
  url: "https://devopen.io",
  links: {
    twitter: "https://x.com/devopen_io",
    github: "https://github.com/DevOpen-io",
  },
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Contact",
    items: [
      { title: "Contact Us", href: "mailto:info@devopen.io" },
    ],
  },
];