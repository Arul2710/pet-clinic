(function() {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const togglePassword = document.getElementById('togglePassword');
  const loginBtn = document.getElementById('loginBtn');

  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.querySelector('svg').innerHTML = type === 'password'
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>';
    });
  }

  // Validation
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePassword(value) {
    return value.length >= 6;
  }

  function showError(element, errorEl) {
    element.classList.add('border-red-500', 'dark:border-red-400');
    errorEl.classList.remove('hidden');
  }

  function clearError(element, errorEl) {
    element.classList.remove('border-red-500', 'dark:border-red-400');
    errorEl.classList.add('hidden');
  }

  if (email) {
    email.addEventListener('input', function() {
      if (this.value && validateEmail(this.value)) {
        clearError(this, emailError);
      }
    });
    email.addEventListener('blur', function() {
      if (this.value && !validateEmail(this.value)) {
        showError(this, emailError);
      } else {
        clearError(this, emailError);
      }
    });
  }

  if (password) {
    password.addEventListener('input', function() {
      if (this.value && validatePassword(this.value)) {
        clearError(this, passwordError);
      }
    });
    password.addEventListener('blur', function() {
      if (this.value && !validatePassword(this.value)) {
        showError(this, passwordError);
      } else {
        clearError(this, passwordError);
      }
    });
  }

  // Form submit
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // Validate email
      if (!email.value || !validateEmail(email.value)) {
        showError(email, emailError);
        isValid = false;
      } else {
        clearError(email, emailError);
      }

      // Validate password
      if (!password.value || !validatePassword(password.value)) {
        showError(password, passwordError);
        isValid = false;
      } else {
        clearError(password, passwordError);
      }

      if (isValid) {
        // Simulate login
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<div class="spinner"></div> Logging in...';

        setTimeout(function() {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify({
            email: email.value,
            name: email.value.split('@')[0]
          }));
          window.location.href = 'dashboard.html';
        }, 1500);
      }
    });
  }
})();
