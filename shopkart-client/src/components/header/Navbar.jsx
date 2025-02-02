import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="w-full container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Shopkart.com</a>
        </div>
        {/* Search Bar */}
        <div className="w-1/2 hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/2 px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-800 focus:ring focus:ring-yellow-500 focus:outline-none"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm">
            Search
          </button>
        </div>
        {/* Links */}
        <div className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm">
          <a href="/seller-profile" className="hover:text-yellow-500">
            Dashboard
          </a>
        </div>

        {/* Hamburger Menu */}
        <button
          className="block md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

function SellerNavbar({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(user);

  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="w-full container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Shopkart.com</a>
        </div>

        {/* Search Bar */}
        <div className="w-1/2 hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/2 px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-800 focus:ring focus:ring-yellow-500 focus:outline-none"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm">
            Search
          </button>
        </div>

        {/* Links */}

        <p>{user?.name}</p>
        <div className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm">
          <a href="/seller-profile" className="hover:text-yellow-500">
            Dashboard
          </a>
        </div>

        {/* Hamburger Menu */}
        <button
          className="block md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <a href="/" className="block px-4 py-2 hover:bg-gray-600">
            Home
          </a>
          <a href="/shop" className="block px-4 py-2 hover:bg-gray-600">
            Products
          </a>
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-600">
            Profile
          </a>
          <div className="flex items-center px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-800 focus:ring focus:ring-yellow-500 focus:outline-none"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm ml-2">
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
export { SellerNavbar };
