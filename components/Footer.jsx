import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="footer footer-center bg-gray-50 border-t-2 border-gray-100 text-base-content p-4">
        <aside>
            <p>Visos teisės saugomos © {new Date().getFullYear()} - manomokykla</p>
        </aside>
    </footer>
  );
};

export default Footer;