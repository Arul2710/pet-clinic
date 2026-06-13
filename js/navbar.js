class Navbar {
  constructor(options = {}) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.currentPage = options.currentPage || '';
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
    this.updateLtrToggleIcons();
  }

  getNavLinks() {
    const commonLinks = [
      {
        label: 'Home',
        dropdown: [
          { label: 'Home 1', href: 'index.html' },
          { label: 'Home 2', href: 'home2.html' },
        ],
      },
      { label: 'About', href: 'about.html' },
      { label: 'Vaccination', href: 'vaccination.html' },
      { label: 'Microchipping', href: 'microchipping.html' },
      { label: 'Pet Care', href: 'petcare.html' },
      { label: 'Contact', href: 'contact.html' },
    ];

    const authLinks = this.isLoggedIn
      ? [
          { label: 'Dashboard', href: 'dashboard.html' },
          { label: 'My Pets', href: 'dashboard.html#pets' },
          { label: 'Appointments', href: 'dashboard.html#appointments' },
          { label: 'Vaccinations', href: 'dashboard.html#vaccinations' },
          { label: 'Profile', href: 'dashboard.html#profile' },
          {
            label: 'Logout',
            href: '#',
            id: 'logoutBtn',
            class: 'text-red-500 hover:text-red-400',
          },
        ]
      : [
          { label: 'Login', href: 'login.html' },
          { label: 'Signup', href: 'signup.html' },
        ];

    return { commonLinks, authLinks };
  }

  render() {
    const { commonLinks, authLinks } = this.getNavLinks();
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const isActive = (href) => {
      if (!href || href === '#') return '';
      const page = href.split('#')[0];
      return currentPath === page
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';
    };

    const isActiveDropdown = (items) => {
      return items?.some((item) => {
        const page = item.href?.split('#')[0];
        return currentPath === page;
      })
        ? 'text-blue-600 dark:text-blue-400 font-semibold'
        : '';
    };

    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    navbar.innerHTML = `
      <nav class="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300" id="mainNav" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 md:h-20">
            <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse group shrink-0" aria-label="PetClinic - Home">
              <div class="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="17" r="5" />
                  <circle cx="6" cy="10" r="2.2" />
                  <circle cx="18" cy="10" r="2.2" />
                  <circle cx="9" cy="4.5" r="2" />
                  <circle cx="15" cy="4.5" r="2" />
                </svg>
              </div>
              <span class="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">PetClinic</span>
            </a>

            <div class="hidden lg:flex items-center space-x-1 rtl:space-x-reverse" id="desktopNav" role="menubar">
              ${commonLinks
                .map((link) => {
                  if (link.dropdown) {
                    return `
                      <div class="relative group" role="none">
                        <button class="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActiveDropdown(link.dropdown)} flex items-center gap-1" role="menuitem" aria-haspopup="true">
                          ${link.label}
                          <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </button>
                        <div class="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100" role="menu">
                          <div class="py-2">
                            ${link.dropdown
                              .map(
                                (sub) => `
                              <a href="${sub.href}" class="block px-4 py-2.5 text-sm ${isActive(sub.href)} transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-700" role="menuitem">
                                ${sub.label}
                              </a>
                            `
                              )
                              .join('')}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                  return `
                    <a href="${link.href}" class="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive(link.href)} ${link.class || ''}" ${link.id ? `id="${link.id}"` : ''} role="menuitem">
                      ${link.label}
                    </a>
                  `;
                })
                .join('')}
            </div>


              <div class="flex items-center gap-1">
                <div class="hidden lg:flex items-center gap-1">
                  <button id="darkModeToggle" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500" aria-label="Toggle dark mode" title="Toggle Dark Mode">
                    <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                    <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </button>

                  <button id="ltrToggle" class="relative w-[68px] h-7 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-500" aria-label="Switch to RTL" title="Switch to RTL">
                    <span class="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                    <span id="ltrToggleTrack" class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 transition-opacity duration-300"></span>
                    <span class="relative flex items-center justify-between px-2.5 h-full text-[10px] font-bold uppercase leading-none tracking-wide">
                      <span id="ltrToggleLtr" class="transition-colors duration-300">LTR</span>
                      <span id="ltrToggleRtl" class="transition-colors duration-300">RTL</span>
                    </span>
                    <span id="ltrToggleKnob" class="absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transition-transform duration-300"></span>
                  </button>

                  <span class="w-px h-5 bg-gray-300 dark:bg-gray-600" role="separator" aria-hidden="true"></span>

                  ${authLinks
                    .map(
                      (link) => `
                    <a href="${link.href}" class="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${link.href === 'signup.html' ? 'btn-primary text-white shadow-md hover:shadow-lg' : `${isActive(link.href)} ${link.class || ''}`}" ${link.id ? `id="${link.id}"` : ''} role="menuitem">
                      ${link.label}
                    </a>
                  `
                    )
                    .join('')}
                </div>

                <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>
          </div>
        </div>

        <div id="mobileMenu" class="lg:hidden max-h-0 opacity-0 overflow-hidden transition-all duration-400 ease-in-out bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" role="menu" aria-label="Mobile navigation">
          <div class="px-4 py-3 space-y-1">
            ${commonLinks
              .map((link) => {
                if (link.dropdown) {
                  return `
                    <div class="space-y-1">
                      <button class="mobile-dropdown-btn flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200" aria-expanded="false">
                        ${link.label}
                        <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div class="mobile-dropdown-menu max-h-0 opacity-0 overflow-hidden transition-all duration-300">
                        <div class="pl-4 space-y-1 pb-1">
                          ${link.dropdown
                            .map(
                              (sub) => `
                            <a href="${sub.href}" class="block px-3 py-2 text-sm ${isActive(sub.href)} rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                              ${sub.label}
                            </a>
                          `
                            )
                            .join('')}
                        </div>
                      </div>
                    </div>
                  `;
                }
                return `
                  <a href="${link.href}" class="block px-3 py-2.5 text-sm font-medium ${isActive(link.href)} rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${link.class || ''}" ${link.id ? `id="${link.id}-mob"` : ''} role="menuitem">
                    ${link.label}
                  </a>
                `;
              })
              .join('')}
            <hr class="border-gray-200 dark:border-gray-700 my-3" role="separator" aria-hidden="true">
            ${authLinks
              .map(
                (link) => `
              <a href="${link.href}" class="block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${link.href === 'signup.html' ? 'btn-primary text-white shadow-md hover:shadow-lg text-center' : `${isActive(link.href)} hover:bg-gray-100 dark:hover:bg-gray-800 ${link.class || ''}`}" ${link.id ? `id="${link.id}-mob"` : ''} role="menuitem">
                ${link.label}
              </a>
            `
              )
              .join('')}
            <hr class="border-gray-200 dark:border-gray-700 my-3" role="separator" aria-hidden="true">
            <div class="flex items-center justify-center gap-3 pt-2 pb-1">
              <button id="darkModeToggle-mob" class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200" aria-label="Toggle dark mode">
                <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
                <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span>Dark Mode</span>
              </button>
              <button id="ltrToggle-mob" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200" aria-label="Toggle direction">
                <span>Direction</span>
                <span class="relative w-[68px] h-7 rounded-full pointer-events-none">
                  <span class="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                  <span id="ltrToggleTrack-mob" class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 transition-opacity duration-300"></span>
                  <span class="relative flex items-center justify-between px-2.5 h-full text-[10px] font-bold uppercase leading-none tracking-wide">
                    <span id="ltrToggleLtr-mob" class="transition-colors duration-300">LTR</span>
                    <span id="ltrToggleRtl-mob" class="transition-colors duration-300">RTL</span>
                  </span>
                  <span id="ltrToggleKnob-mob" class="absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transition-transform duration-300"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  attachEvents() {
    const darkToggles = document.querySelectorAll('#darkModeToggle, #darkModeToggle-mob');
    darkToggles.forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.toggle('dark');
          localStorage.setItem('darkMode', isDark);
        });
      }
    });

    const ltrToggles = document.querySelectorAll('#ltrToggle, #ltrToggle-mob');
    ltrToggles.forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          const html = document.documentElement;
          const currentDir = html.getAttribute('dir') || 'ltr';
          const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
          html.setAttribute('dir', newDir);
          localStorage.setItem('dir', newDir);
          this.updateLtrToggleIcons();
        });
      }
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMobileMenu(mobileBtn, mobileMenu);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('max-h-0')) {
        this.closeMobileMenu(mobileBtn, mobileMenu);
      }
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu &&
        !mobileMenu.classList.contains('max-h-0') &&
        !mobileMenu.contains(e.target) &&
        mobileBtn &&
        !mobileBtn.contains(e.target)
      ) {
        this.closeMobileMenu(mobileBtn, mobileMenu);
      }
    });

    document.querySelectorAll('.mobile-dropdown-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wrapper = btn.closest('.space-y-1');
        const menu = wrapper?.querySelector('.mobile-dropdown-menu');
        const icon = btn.querySelector('svg');
        if (menu) {
          const isOpen = !menu.classList.contains('max-h-0');
          menu.classList.toggle('max-h-0', isOpen);
          menu.classList.toggle('opacity-0', isOpen);
          menu.classList.toggle('opacity-100', !isOpen);
          menu.classList.toggle('pb-1', !isOpen);
          btn.setAttribute('aria-expanded', !isOpen);
          if (icon) icon.classList.toggle('rotate-180');
        }
      });
    });

    const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtn-mob');
    logoutBtns.forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          window.location.href = 'index.html';
        });
      }
    });
  }

  updateLtrToggleIcons() {
    const dir = document.documentElement.getAttribute('dir') || 'ltr';
    const isRtl = dir === 'rtl';

    const applyToggleState = (prefix) => {
      const track = document.getElementById(`${prefix}Track`);
      const ltrLabel = document.getElementById(`${prefix}Ltr`);
      const rtlLabel = document.getElementById(`${prefix}Rtl`);
      const knob = document.getElementById(`${prefix}Knob`);

      if (!track) return;

      if (isRtl) {
        track.classList.remove('opacity-0');
        track.classList.add('opacity-100');
        ltrLabel?.classList.add('text-gray-400', 'dark:text-gray-500');
        ltrLabel?.classList.remove('text-white');
        rtlLabel?.classList.remove('text-gray-400', 'dark:text-gray-500');
        rtlLabel?.classList.add('text-white');
        knob?.classList.add('translate-x-[40px]');
        knob?.classList.remove('translate-x-0');
      } else {
        track.classList.add('opacity-0');
        track.classList.remove('opacity-100');
        ltrLabel?.classList.remove('text-gray-400', 'dark:text-gray-500');
        ltrLabel?.classList.add('text-white');
        rtlLabel?.classList.add('text-gray-400', 'dark:text-gray-500');
        rtlLabel?.classList.remove('text-white');
        knob?.classList.remove('translate-x-[40px]');
        knob?.classList.add('translate-x-0');
      }
    };

    const desktopToggle = document.getElementById('ltrToggle');
    if (desktopToggle) {
      applyToggleState('ltrToggle');
      desktopToggle.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      desktopToggle.setAttribute('aria-label', isRtl ? 'Switch to LTR' : 'Switch to RTL');
    }

    const mobileToggle = document.getElementById('ltrToggle-mob');
    if (mobileToggle) {
      applyToggleState('ltrToggle-mob');
      mobileToggle.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
    }
  }

  toggleMobileMenu(btn, menu) {
    const isOpen = !menu.classList.contains('max-h-0');
    if (isOpen) {
      this.closeMobileMenu(btn, menu);
    } else {
      this.openMobileMenu(btn, menu);
    }
  }

  openMobileMenu(btn, menu) {
    menu.classList.remove('max-h-0', 'opacity-0');
    menu.classList.add('max-h-screen', 'opacity-100');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    btn.querySelector('svg').innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
  }

  closeMobileMenu(btn, menu) {
    menu.classList.remove('max-h-screen', 'opacity-100');
    menu.classList.add('max-h-0', 'opacity-0');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    btn.querySelector('svg').innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
  }
}
