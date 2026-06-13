(function() {
  const form = document.getElementById('signupForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('signupEmail');
  const phone = document.getElementById('phone');
  const password = document.getElementById('signupPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const toggleBtn = document.getElementById('toggleSignupPassword');
  const submitBtn = document.getElementById('signupBtn');

  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('signupEmailError');
  const phoneError = document.getElementById('phoneError');
  const passwordError = document.getElementById('signupPasswordError');
  const confirmError = document.getElementById('confirmPasswordError');

  // Toggle password visibility
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.querySelector('svg').innerHTML = type === 'password'
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>';
    });
  }

  // Password strength meter
  if (password && strengthBar && strengthText) {
    password.addEventListener('input', function() {
      const val = this.value;
      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      strengthBar.className = 'strength-bar';
      if (val.length === 0) {
        strengthBar.style.width = '0';
        strengthText.textContent = '';
        return;
      }
      if (strength <= 1) {
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
        strengthText.className = 'text-xs text-red-500 mt-1';
      } else if (strength <= 2) {
        strengthBar.classList.add('strength-fair');
        strengthText.textContent = 'Fair';
        strengthText.className = 'text-xs text-yellow-500 mt-1';
      } else if (strength <= 3) {
        strengthBar.classList.add('strength-good');
        strengthText.textContent = 'Good';
        strengthText.className = 'text-xs text-blue-500 mt-1';
      } else {
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
        strengthText.className = 'text-xs text-green-500 mt-1';
      }
    });
  }

  // Validation helpers
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function validatePhone(value) {
    return /^[\d\s\-\+\(\)]{7,20}$/.test(value);
  }

  function showError(el, errEl) {
    if (el) { el.classList.add('border-red-500', 'dark:border-red-400'); }
    if (errEl) { errEl.classList.remove('hidden'); }
  }
  function clearError(el, errEl) {
    if (el) { el.classList.remove('border-red-500', 'dark:border-red-400'); }
    if (errEl) { errEl.classList.add('hidden'); }
  }

  // Real-time validation
  if (fullName) {
    fullName.addEventListener('blur', function() {
      this.value.trim() ? clearError(this, fullNameError) : showError(this, fullNameError);
    });
  }
  if (email) {
    email.addEventListener('blur', function() {
      this.value && validateEmail(this.value) ? clearError(this, emailError) : showError(this, emailError);
    });
  }
  if (phone) {
    phone.addEventListener('blur', function() {
      this.value && validatePhone(this.value) ? clearError(this, phoneError) : showError(this, phoneError);
    });
  }
  if (confirmPassword) {
    confirmPassword.addEventListener('input', function() {
      if (this.value && this.value !== password.value) {
        showError(this, confirmError);
      } else {
        clearError(this, confirmError);
      }
    });
  }

  // Form submit
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      if (!fullName.value.trim()) { showError(fullName, fullNameError); isValid = false; }
      else { clearError(fullName, fullNameError); }

      if (!email.value || !validateEmail(email.value)) { showError(email, emailError); isValid = false; }
      else { clearError(email, emailError); }

      if (!phone.value || !validatePhone(phone.value)) { showError(phone, phoneError); isValid = false; }
      else { clearError(phone, phoneError); }

      if (!password.value || password.value.length < 6) { showError(password, passwordError); isValid = false; }
      else { clearError(password, passwordError); }

      if (!confirmPassword.value || confirmPassword.value !== password.value) { showError(confirmPassword, confirmError); isValid = false; }
      else { clearError(confirmPassword, confirmError); }

      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> Creating account...';

        setTimeout(function() {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify({
            name: fullName.value.trim(),
            email: email.value,
            phone: phone.value,
            petName: document.getElementById('petName')?.value || '',
            petType: document.getElementById('petType')?.value || ''
          }));
          window.location.href = 'dashboard.html';
        }, 1500);
      }
    });
  }
})();
