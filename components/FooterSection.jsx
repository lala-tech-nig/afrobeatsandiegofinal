'use client';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    href: 'https://facebook.com',
    icon: Facebook,
    label: 'Facebook',
  },
  {
    href: 'https://instagram.com',
    icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'https://twitter.com',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'https://youtube.com',
    icon: Youtube,
    label: 'YouTube',
  },
];

const FooterSection = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 items-start border-t border-purple-800 pt-10">
        
        {/* Logo and description */}
        <div className="space-y-4">
          <Image
            src="/logo.png"
            alt="Afrobeat San Diego"
            width={70}
            height={35}
            className="object-contain"
          />
          <p className="text-sm text-gray-400 max-w-xs">
            Afrobeat San Diego is the rhythm of culture, community, and celebration. Join us for electrifying events, good vibes, and unforgettable moments.
          </p>
        </div>

        {/* Navigation links */}
        <div className="space-y-2">
          <h3 className="text-purple-400 font-bold text-lg">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#events" className="hover:text-purple-400">Events</a></li>
            <li><a href="#tickets" className="hover:text-purple-400">Tickets</a></li>
            <li><a href="#gallery" className="hover:text-purple-400">Gallery</a></li>
            <li><a href="#about" className="hover:text-purple-400">About Us</a></li>
            <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
          </ul>
        </div>

        {/* Social media icons with animation */}
        <div className="space-y-2">
          <h3 className="text-purple-400 font-bold text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-white hover:text-purple-400"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-purple-900 pt-6">
        &copy; {new Date().getFullYear()} Afrobeat San Diego. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
