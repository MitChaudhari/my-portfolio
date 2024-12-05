import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const homeHeight = document.getElementById('home')?.offsetHeight || 0;
      const currentScrollY = window.scrollY;

      setIsVisible(currentScrollY >= homeHeight);

      // Determine active section
      const sections = ['home', 'about', 'projects', 'contact'];
      let currentSection = activeNav; // Default to the current activeNav

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSection = id;
            break;
          }
        }
      }

      setActiveNav(currentSection);
    };

    handleScroll(); // Set initial navbar visibility and activeNav
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeNav]);

  const handleMouseEnter = (nav: string) => {
    setHoveredNav(nav);
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
  };

  const getNavClass = (nav: string) => {
    const isHovered = hoveredNav === nav;
    const isActive = !hoveredNav && activeNav === nav;

    if (isHovered) {
      return 'scale-110 text-[#FFA500] opacity-100 font-bold';
    } else if (isActive) {
      return 'text-[#FFA500] opacity-100 font-bold';
    } else {
      return 'opacity-50 font-bold';
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAboutClick = () => {
    closeMenu();
    window.dispatchEvent(new Event('aboutButtonClick'));
  };

  // Hide navbar unless we are in the 'contact' section
  if (activeNav !== 'contact') {
    return null; // No navbar visible unless on the contact section
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-20 bg-black flex justify-end items-center pr-[3%] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between w-full px-4 md:px-10 lg:px-20">
        <div className="flex items-center">
          <Link href="#home" scroll={false}>
            <Image
              src="/images/logo/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-auto h-auto cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
          </div>
        </div>

        {/* Navigation Links (only on contact) */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-20 right-0 w-full md:w-auto md:static md:flex space-y-4 md:space-y-0 md:space-x-8 bg-[rgba(14,13,13,0.9)] md:bg-transparent md:items-center md:justify-end md:flex-row`}
        >
          {['home', 'about', 'projects', 'contact'].map((id) => (
            <Link href={`#${id}`} scroll={false} key={id}>
              <div
                className={`px-6 py-3 transition-all duration-300 cursor-pointer ${getNavClass(id)}`}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
                onClick={id === 'about' ? handleAboutClick : closeMenu}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
