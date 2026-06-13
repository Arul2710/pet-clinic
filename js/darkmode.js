(function() {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.documentElement.classList.add('dark');
  }

  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
      darkToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
      });
    }

    const applyLtrState = (isRtl) => {
      const ids = ['ltrToggle', 'ltrToggle-mob'];
      ids.forEach((id) => {
        const track = document.getElementById(id + 'Track');
        const ltrLabel = document.getElementById(id + 'Ltr');
        const rtlLabel = document.getElementById(id + 'Rtl');
        const knob = document.getElementById(id + 'Knob');
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
      });
    };

    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
      applyLtrState(savedDir === 'rtl');
    }

    const ltrToggle = document.getElementById('ltrToggle');
    if (ltrToggle) {
      ltrToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const currentDir = html.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        html.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        applyLtrState(newDir === 'rtl');
      });
    }
  });
})();
