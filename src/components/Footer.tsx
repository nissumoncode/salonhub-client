import Link from "next/link";

import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4A382E] text-white">
      {/* Outer Container */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Four Sections Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {/* 1. About */}
          <div>
            <h2 className="text-2xl font-bold">
              Salon<span className="text-[#B8955A]">Hub</span>
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-300 sm:mt-4">
              Your beauty, our passion. Enjoy professional salon services and
              take care of yourself with SalonHub.
            </p>
          </div>

          {/* 2. Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <Link href="/" className="hover:text-primary-hover">
                Home
              </Link>
              <Link href="/services" className="hover:text-primary-hover">
                Browse Services
              </Link>
              <Link href="/sign-in" className="hover:text-primary-hover">
                Sign In
              </Link>
              <Link href="/sign-up" className="hover:text-primary-hover">
                Sign Up
              </Link>
            </div>
          </div>

          {/* 3. Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <Phone size={16} /> +880 1XXXXXXXXX
              </p>
              <p className="flex items-start gap-2">
                <Mail size={16} /> salonhub@example.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} /> Bangladesh
              </p>
              <p className="flex items-start gap-2">
                <Clock size={16} /> Sat - Thu: 10 AM - 8 PM
              </p>
            </div>
          </div>

          {/* 4. Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>

            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:scale-110 hover:bg-white/20"
              >
                <SiFacebook color="#1877F2" size={20} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:scale-110 hover:bg-white/20"
              >
                <SiInstagram color="#E4405F" size={20} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:scale-110 hover:bg-white/20"
              >
                <SiYoutube color="#FF0000" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 px-4 py-4 text-center text-xs text-gray-300 sm:px-6 sm:py-5 sm:text-sm">
        © {new Date().getFullYear()} SalonHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

