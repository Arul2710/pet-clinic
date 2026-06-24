'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  {
    label: 'Home',
    dropdown: [
      { label: 'Home 1', href: '/index' },
      { label: 'Home 2', href: '/home2' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Vaccination', href: '/vaccination' },
  { label: 'Microchipping', href: '/microchipping' },
  { label: 'Pet Care', href: '/petcare' },
  { label: 'Contact', href: '/contact' },
];

const AUTH_LINKS_LOGGED_IN = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Pets', href: '/dashboard#pets' },
  { label: 'Appointments', href: '/dashboard#appointments' },
  { label: 'Vaccinations', href: '/dashboard#vaccinations' },
  { label: 'Profile', href: '/dashboard#profile' },
  { label: 'Logout', href: '#', id: 'logoutBtn', danger: true },
];

const AUTH_LINKS_LOGGED_OUT = [
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [dir, setDir] = useState('ltr');
  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const [scrolled, setScrolled] = useState(false);

  const mobileRef = useRef(null);
  const menuBtnRef = useRef(null);
  const navRef = useRef(null);

  const isActive = useCallback(
    (href) => {
      if (!href || href === '#') return false;
      const page = href.split('#')[0];
      return pathname === page || pathname === `${page}.html`;
    },
    [pathname]
  );

  const isAnyDropdownActive = useCallback(
    (items) => items?.some((item) => isActive(item.href)),
    [isActive]
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedDir = localStorage.getItem('dir') || 'ltr';
    setIsDark(savedDark);
    setDir(savedDir);
    document.documentElement.classList.toggle('dark', savedDark);
    document.documentElement.setAttribute('dir', savedDir);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target) &&
        !menuBtnRef.current?.contains(e.target)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdowns(new Set());
  }, [pathname]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', next);
  };

  const toggleDir = () => {
    const next = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(next);
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('dir', next);
  };

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  const toggleMobileDropdown = (label) => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const authLinks = isLoggedIn ? AUTH_LINKS_LOGGED_IN : AUTH_LINKS_LOGGED_OUT;

  const linkBase = (href, active, extra = '') =>
    `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
    } ${extra}`;

  const activeAria = (href) => (isActive(href) ? 'page' : undefined);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm border-b border-gray-200/60 dark:border-gray-700/60'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="flex items-center gap-2 rtl:gap-reverse group shrink-0"
              aria-label="PetClinic - Home"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
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
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                PetClinic
              </span>
            </Link>

            <div
              className="hidden lg:flex items-center gap-1 rtl:gap-reverse"
              role="menubar"
            >
              {NAV_LINKS.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label} className="relative group" role="none">
                      <button
                        className={linkBase(
                          link.href,
                          isAnyDropdownActive(link.dropdown)
                        )}
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={openDropdowns.has(link.label)}
                      >
                        {link.label}
                        <svg
                          className="inline-block w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0 transition-transform duration-200 group-hover:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-left scale-95 group-hover:scale-100"
                        role="menu"
                        aria-label={`${link.label} submenu`}
                      >
                        <div className="py-2">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 ${
                                isActive(sub.href)
                                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                              role="menuitem"
                              aria-current={activeAria(sub.href)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkBase(link.href, isActive(link.href))}
                    role="menuitem"
                    aria-current={activeAria(link.href)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isLoggedIn && (
                <>
                  <span
                    className="mx-2 w-px h-5 bg-gray-300 dark:bg-gray-600"
                    role="separator"
                    aria-hidden="true"
                  />
                  {authLinks.map((link) =>
                    link.id === 'logoutBtn' ? (
                      <button
                        key={link.id}
                        onClick={handleLogout}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30`}
                        role="menuitem"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={linkBase(link.href, isActive(link.href))}
                        role="menuitem"
                        aria-current={activeAria(link.href)}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-1 rtl:gap-reverse">
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title="Toggle dark mode"
              >
                <svg
                  className="w-5 h-5 block dark:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <svg
                  className="w-5 h-5 hidden dark:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>

              <button
                onClick={toggleDir}
                className="relative w-[68px] h-7 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-500"
                aria-label={`Switch to ${dir === 'ltr' ? 'RTL' : 'LTR'} direction`}
                title="Toggle direction"
              >
                <span className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                <span className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-opacity duration-300 ${dir === 'rtl' ? 'opacity-100' : 'opacity-0'}`}></span>
                <span className="relative flex items-center justify-between px-2.5 h-full text-[10px] font-bold uppercase leading-none tracking-wide">
                  <span className={`transition-colors duration-300 ${dir === 'rtl' ? 'text-gray-400 dark:text-gray-500' : 'text-white'}`}>LTR</span>
                  <span className={`transition-colors duration-300 ${dir === 'rtl' ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>RTL</span>
                </span>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transition-transform duration-300 ${dir === 'rtl' ? 'translate-x-[40px]' : 'translate-x-0'}`}></span>
              </button>

              {!isLoggedIn && (
                <>
                  <span
                    className="hidden sm:block mx-1 w-px h-5 bg-gray-300 dark:bg-gray-600"
                    role="separator"
                    aria-hidden="true"
                  />
                  {AUTH_LINKS_LOGGED_OUT.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`hidden sm:inline-flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        link.label === 'Signup'
                          ? 'bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md hover:shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              <button
                ref={menuBtnRef}
                onClick={toggleMobile}
                className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                {isMobileOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        <div
          ref={mobileRef}
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            isMobileOpen
              ? 'max-h-[calc(100vh-4rem)] opacity-100'
              : 'max-h-0 opacity-0'
          } bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}
        >
          <div className="px-4 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                const isOpen = openDropdowns.has(link.label);
                return (
                  <div key={link.label} className="space-y-1">
                    <button
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500"
                      aria-expanded={isOpen}
                      role="menuitem"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 space-y-1 pb-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                              isActive(sub.href)
                                ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            role="menuitem"
                            aria-current={activeAria(sub.href)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  role="menuitem"
                  aria-current={activeAria(link.href)}
                >
                  {link.label}
                </Link>
              );
            })}

            <hr
              className="border-gray-200 dark:border-gray-700 my-3"
              role="separator"
              aria-hidden="true"
            />

            {authLinks.map((link) =>
              link.id === 'logoutBtn' ? (
                <button
                  key={link.id}
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  role="menuitem"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  role="menuitem"
                  aria-current={activeAria(link.href)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </header>
    </>
  );
}
