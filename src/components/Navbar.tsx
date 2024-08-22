import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeHeight = document.getElementById('home')?.offsetHeight || 0;
      const currentScrollY = window.scrollY;

      if (currentScrollY >= homeHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const sections = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-20 bg-[rgba(14,13,13,0.7)] flex justify-end items-center pr-[3%] transition-opacity duration-300 ${
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

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-20 right-0 w-full md:w-auto md:static md:flex space-y-4 md:space-y-0 md:space-x-8 bg-[rgba(14,13,13,0.9)] md:bg-transparent md:items-center md:justify-end md:flex-row`}
        >
          <Link href="#home" scroll={false}>
            <div
              className={`px-4 py-2 transition-all duration-300 cursor-pointer ${getNavClass('Home')}`}
              onMouseEnter={() => handleMouseEnter('Home')}
              onMouseLeave={handleMouseLeave}
              onClick={closeMenu} 
            >
              Home
            </div>
          </Link>
          <Link href="#about" scroll={false}>
            <div
              className={`px-6 py-3 transition-all duration-300 cursor-pointer ${getNavClass('About')}`}
              onMouseEnter={() => handleMouseEnter('About')}
              onMouseLeave={handleMouseLeave}
              onClick={closeMenu} 
            >
              About
            </div>
          </Link>
          <Link href="#projects" scroll={false}>
            <div
              className={`px-6 py-3 transition-all duration-300 cursor-pointer ${getNavClass('Projects')}`}
              onMouseEnter={() => handleMouseEnter('Projects')}
              onMouseLeave={handleMouseLeave}
              onClick={closeMenu} 
            >
              Projects
            </div>
          </Link>
          <Link href="#contact" scroll={false}>
            <div
              className={`px-6 py-3 transition-all duration-300 cursor-pointer ${getNavClass('Contact')}`}
              onMouseEnter={() => handleMouseEnter('Contact')}
              onMouseLeave={handleMouseLeave}
              onClick={closeMenu} 
            >
              Contact
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;