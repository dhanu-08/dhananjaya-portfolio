import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Navbar visibility
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Light / Dark mode
  useEffect(() => {
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Contact", label: "Contact" },
  ];

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background effect
      setScrolled(currentScrollY > 20);

      // Navbar hide/show
      if (currentScrollY <= 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsNavbarVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);

          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 550,
              height: section.offsetHeight,
            };
          }

          return null;
        })
        .filter(Boolean);

      const active = sections.find(
        (section) =>
          currentScrollY >= section.offset &&
          currentScrollY < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Smooth scroll
  const scrollToSection = (e, href) => {
    e.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      const top = section.offsetTop - 100;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <nav
      className={`
        fixed
        w-full
        top-0
        left-0
        z-50
        transition-all
        duration-500
        ease-in-out
        ${
          isNavbarVisible
            ? "translate-y-0"
            : "-translate-y-full"
        }
        ${
          isOpen
            ? "bg-[#030014]"
            : scrolled
            ? "bg-[#030014]/50 backdrop-blur-xl"
            : "bg-transparent"
        }
      `}
    >
      {/* Main Navbar */}
      <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="
                text-xl
                sm:text-2xl
                font-bold
                bg-gradient-to-r
                from-[#a855f7]
                to-[#6366f1]
                bg-clip-text
                text-transparent
              "
            >
              DM
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) =>
                    scrollToSection(e, item.href)
                  }
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span
                    className={`
                      relative z-10
                      transition-colors
                      duration-300
                      ${
                        activeSection ===
                        item.href.substring(1)
                          ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                          : "text-[#e2d3fd] group-hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      w-full
                      h-0.5
                      bg-gradient-to-r
                      from-[#6366f1]
                      to-[#a855f7]
                      transform
                      origin-left
                      transition-transform
                      duration-300
                      ${
                        activeSection ===
                        item.href.substring(1)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">

            {/* Theme Switch */}
            <button
              onClick={() =>
                setIsDarkMode(!isDarkMode)
              }
              aria-label="Toggle dark and light mode"
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                rounded-full
                border
                border-purple-400/30
                bg-purple-950/60
                backdrop-blur-md
                text-[#e2d3fd]
                hover:text-white
                hover:bg-purple-900/70
                transition-all
                duration-300
              "
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() =>
                  setIsOpen(!isOpen)
                }
                aria-label="Toggle navigation menu"
                className={`
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  p-1
                  text-[#e2d3fd]
                  hover:text-white
                  transition-transform
                  duration-300
                  ease-in-out
                  ${
                    isOpen
                      ? "rotate-90 scale-110"
                      : "rotate-0 scale-100"
                  }
                `}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          transition-all
          duration-300
          ease-in-out
          ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }
        `}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) =>
                scrollToSection(e, item.href)
              }
              className={`
                block
                px-4
                py-3
                text-lg
                font-medium
                transition-all
                duration-300
                ease
                ${
                  activeSection ===
                  item.href.substring(1)
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                    : "text-[#e2d3fd] hover:text-white"
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: isOpen
                  ? "translateX(0)"
                  : "translateX(50px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;