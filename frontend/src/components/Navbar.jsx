import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-300"
            >
              <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
                🧮 TaxCalc
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" emoji="🏠" text="Home" />
            <NavLink to="/history" emoji="📜" text="History" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden origin-top ${isMenuOpen ? 'animate-slideDown' : 'animate-slideUp'}`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-40' : 'max-h-0'}`}>
            <MobileNavLink 
              to="/" 
              emoji="🏠" 
              text="Home" 
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/history"
              emoji="📜"
              text="History"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, emoji, text }) => (
  <Link
    to={to}
    className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center group"
  >
    <span className="mr-2">{emoji}</span>
    {text}
    <div className="ml-1 h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" />
  </Link>
);

const MobileNavLink = ({ to, emoji, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
  >
    <span className="mr-2">{emoji}</span>
    {text}
  </Link>
)


export default Navbar;