"use client";

import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 50);
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Services", href: "services" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
  ];

  useEffect(() => {
    // Detect scroll background
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Observe sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // section must be 60% in view
    );

    navItems.forEach((id) => {
      const el = document.getElementById(id.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      navItems.forEach((id) => {
        const el = document.getElementById(id.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="container max-w-6xl flex items-center justify-between py-4 h-auto mx-auto">
        <div>
          <h4 className="font-bold text-xl">Usman</h4>
        </div>
        <div className="flex gap-6">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={`#${item.href}`}
              className={`text-lg hover:text-yellow-500 transition ${
                active === item.href
                  ? "text-yellow-500 font-semibold"
                  : "hover:text-yellow-500"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
