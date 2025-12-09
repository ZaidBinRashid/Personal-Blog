import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import PillNav from "../UI/PillNavBar";
import logo from "../assets/logo.jpg";

export default function Navbar() {
//   return (
//     <>
//       <PillNav
//         logo={logo}
//         logoAlt="Company Logo"
//         items={[
//           { label: "Home", href: "/" },
//           { label: "About", href: "/about" },
//           { label: "Services", href: "/services" },
//           { label: "Contact", href: "/contact" },
//         ]}
//         activeHref="/"
//         className="custom-nav"
//         ease="power2.easeOut"
//         baseColor="#000000"
//         pillColor="#ffffff"
//         hoveredPillTextColor="#ffffff"
//         pillTextColor="#000000"
//       />
//     </>
//   );
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
      { name: 'Home', to: '/' },
      { name: 'Articles', to: '/articles' },
    ];

    return (
      <nav className="bg-white border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Blog
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
}
