'use client';

import Link from 'next/link';

const QUICK_LINKS = [
  { label: 'Home', href: '/index' },
  { label: 'About Us', href: '/about' },
  { label: 'Vaccination', href: '/vaccination' },
  { label: 'Microchipping', href: '/microchipping' },
  { label: 'Pet Care', href: '/petcare' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_LINKS = [
  { label: 'Pet Vaccination', href: '/vaccination' },
  { label: 'Microchipping', href: '/microchipping' },
  { label: 'Health Checkups', href: '/petcare' },
  { label: 'Dental Care', href: '/petcare#dental' },
  { label: 'Nutrition Advice', href: '/petcare#nutrition' },
  { label: 'Emergency Care', href: '/petcare#emergency' },
];

const CONTACT_INFO = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
    ),
    icon2: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    content: '123 Pet Care Street, Veterinary City, VC 10001',
    isAddress: true,
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    content: '+1 (555) 123-4567',
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    content: 'info@petclinic.com',
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: 'Mon-Sat: 8:00 AM - 8:00 PM',
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    hoverColor: 'hover:bg-blue-600',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    href: '#',
    hoverColor: 'hover:bg-blue-600',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'Twitter',
    href: '#',
    hoverColor: 'hover:bg-blue-500',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    hoverColor: 'hover:bg-blue-700',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

function ContactItem({ item }) {
  const IconPaths = () => (
    <>
      {item.icon}
      {item.icon2}
    </>
  );

  return (
    <li
      className={`flex gap-3 ${item.isAddress ? 'items-start' : 'items-center'}`}
    >
      <svg
        className={`w-5 h-5 text-blue-400 shrink-0 ${item.isAddress ? 'mt-0.5' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <IconPaths />
      </svg>
      <span className="text-sm text-gray-300">{item.content}</span>
    </li>
  );
}

function SocialLink({ link }) {
  return (
    <a
      href={link.href}
      className={`w-10 h-10 bg-gray-800 ${link.hoverColor} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-blue-400`}
      aria-label={link.label}
      title={link.label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={link.path} />
      </svg>
    </a>
  );
}

function FooterLink({ href, label, hoverColor = 'hover:text-blue-400' }) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm text-gray-400 ${hoverColor} transition-colors duration-200 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-blue-400`}
      >
        <span
          className="w-1 h-1 bg-blue-400 rounded-full shrink-0"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-16 pb-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 rtl:gap-reverse group"
              aria-label="PetClinic - Home"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="17" r="5" />
                  <circle cx="6" cy="10" r="2.2" />
                  <circle cx="18" cy="10" r="2.2" />
                  <circle cx="9" cy="4.5" r="2" />
                  <circle cx="15" cy="4.5" r="2" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">PetClinic</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Pet Vaccination &amp; Microchipping Clinic provides premium
              veterinary healthcare services with love and compassion. Protecting
              your pets with advanced medical care since 2015.
            </p>
            <div
              className="flex items-center gap-3 rtl:gap-reverse pt-2"
              role="list"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map((link) => (
                <div key={link.label} role="listitem">
                  <SocialLink link={link} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list" aria-label="Quick links">
              {QUICK_LINKS.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  hoverColor="hover:text-blue-400"
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5" role="list" aria-label="Our services">
              {SERVICE_LINKS.map((link) => (
                <FooterLink
                  key={link.href + link.label}
                  href={link.href}
                  label={link.label}
                  hoverColor="hover:text-blue-400"
                />
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3" role="list" aria-label="Contact information">
              {CONTACT_INFO.map((item, index) => (
                <ContactItem key={index} item={item} />
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Pet Vaccination &amp; Microchipping Clinic.
              All rights reserved.
            </p>
            <nav
              className="flex items-center gap-4 text-sm text-gray-400"
              aria-label="Legal links"
            >
              <Link
                href="#"
                className="hover:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Privacy Policy
              </Link>
              <span
                className="w-px h-3 bg-gray-700"
                role="separator"
                aria-hidden="true"
              />
              <Link
                href="#"
                className="hover:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Terms of Service
              </Link>
              <span
                className="w-px h-3 bg-gray-700"
                role="separator"
                aria-hidden="true"
              />
              <Link
                href="#"
                className="hover:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
