import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
            <p>Visos teisės saugomos © {new Date().getFullYear()} - manomokykla</p>
        </aside>
    </footer>
  );
};

export default Footer;