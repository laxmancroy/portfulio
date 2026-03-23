import { BsCart, BsMenuApp } from "react-icons/bs";
import { useState } from 'react'
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const handleMobileMenu = () => {
      document.querySelector('.mobile-menu').style.display = 'flex';
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative">
      <nav className="hidden sm:flex justify-center items-center">
        {navLinks.map((link, index) => (
          <a
            href={link.href}
            key={index}
            className="mx-4 border-b-2 border-white hover:border-amber-700 focus:border-amber-700"
          >
            {link.label}
          </a>
        ))}
        <div className="mx-4">
          <BsCart />
        </div>
        <button className="ml-4 bg-red-400 text-white px-3 py-1 rounded-lg">
          <a href="#signin">Sign in</a>
        </button>
      </nav>
      {/* Mobile Menu Bar */}
      <button className="sm:hidden" onClick={ () => setIsMenuOpen(!isMenuOpen) }>
        <BsMenuApp />
      </button>
      { isMenuOpen && <nav className="sm:hidden flex flex-col absolute top-13 right-0 shadow-md px-5 py-4">
        {navLinks.map((link, index) => (
          <a
            href={link.href}
            key={index}
            className="px-4 py-2 border-b-2 border-white hover:border-amber-700 focus:border-amber-700"
          >
            {link.label}
          </a>
        ))}
        <div className="mx-4 py-2">
          <BsCart />
        </div>
        <button className="ml-4 my-2 bg-red-400 text-white px-3 py-1 rounded-lg">
          <a href="#signin">Sign in</a>
        </button>
      </nav>  }
    </div>
  );
};
