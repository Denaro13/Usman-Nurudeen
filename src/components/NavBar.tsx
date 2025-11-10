"use client";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 50);
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  const navItems = React.useMemo(
    () => [
      { label: "Home", href: "home" },
      { label: "About", href: "about" },
      { label: "Services", href: "services" },
      { label: "Projects", href: "projects" },
      { label: "Contact", href: "contact" },
    ],
    []
  );

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
  }, [navItems]);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="container max-w-6xl flex items-center justify-between py-4 px-4 h-auto mx-auto">
        <div>
          <h4 className="font-bold text-xl">Usman</h4>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={28} color="#ecc94b" />
          ) : (
            <Menu size={28} color="#ecc94b" />
          )}
        </button>

        <div className="hidden md:flex gap-6 ">
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
          <a
            href={"https://medium.com/@usmannurudeen13"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg hover:text-yellow-500 transition`}
          >
            Blog
          </a>
          <a
            href={"https://www.youtube.com/@succeedwiththecapguy"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg hover:text-yellow-500 transition`}
          >
            YouTube
          </a>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white text-black px-6 py-4 space-y-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.href}`}
                className={`text-lg hover:text-yellow-500 transition ${
                  active === item.href
                    ? "text-yellow-500 font-semibold"
                    : "hover:text-yellow-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={"https://medium.com/@usmannurudeen13"}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-lg hover:text-yellow-500 transition`}
            >
              Blog
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
