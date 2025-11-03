"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Links {
  id: number;
  title: string;
  href: string;
}

const links: Links[] = [
  {
    id: 1,
    title: "Experience",
    href: "/admin/dashboard/",
  },
  {
    id: 2,
    title: "Education",
    href: "/admin/dashboard//education",
  },
  {
    id: 3,
    title: "Skills",
    href: "/admin/dashboard//skills",
  },
  {
    id: 4,
    title: "Services",
    href: "/admin/dashboard//services",
  },
  {
    id: 5,
    title: "Projects",
    href: "/admin/dashboard/projects",
  },
];
const AdminSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-50 col-span-2 flex flex-col gap-6 pl-6 pt-10 ">
      {links.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className={`text-lg font-medium hover:pl-4 ${pathname === link.href ? "text-amber-500 font-bold" : "text-gray-700"} transition-all duration-200`}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSideBar;
