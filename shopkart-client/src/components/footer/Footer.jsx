import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-yellow-500">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-yellow-500">
                  Cart
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-yellow-500">
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Email: support@shopkart.in</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Address: Shopkart M.G Road, Krishnagar, Nadia, India</p>
          </div>

          {/* Section 3: Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-yellow-500"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="#"
                className="hover:text-yellow-500"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="#"
                className="hover:text-yellow-500"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © 2024 Shopkart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
