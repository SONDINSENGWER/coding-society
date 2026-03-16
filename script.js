/* =============================================
   Coding Society — script.js
   Unobtrusive JS: hamburger menu, event tabs,
   and join-form validation.
   ============================================= */

/* -----------------------------------------------
   1. HAMBURGER MENU TOGGLE
   ----------------------------------------------- */
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    // Update ARIA state so screen readers know the menu state
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is activated (mobile UX)
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* -----------------------------------------------
   2. EVENT TABS (events.html)
   ----------------------------------------------- */
(function initTabs() {
  const tabList = document.querySelector('[role="tablist"]');
  if (!tabList) return;

  const tabs   = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute('aria-controls'));
  });

  /**
   * Activate a tab by index, deactivate all others.
   * @param {number} index - Index of the tab to activate.
   */
  function activateTab(index) {
    tabs.forEach(function (tab, i) {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      panels[i].classList.toggle('active', active);
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      activateTab(index);
    });

    // Keyboard navigation: arrow keys move between tabs
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        activateTab((index + 1) % tabs.length);
        tabs[(index + 1) % tabs.length].focus();
      } else if (e.key === 'ArrowLeft') {
        activateTab((index - 1 + tabs.length) % tabs.length);
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
      }
    });
  });
})();


/* -----------------------------------------------
   3. JOIN FORM VALIDATION (contact.html)
   ----------------------------------------------- */
(function initForm() {
  const form = document.getElementById('joinForm');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Show an error message for a field.
   * @param {HTMLElement} field - The input/select/textarea element.
   * @param {string} message   - Error text to display.
   */
  function showError(field, message) {
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  /**
   * Clear the error state for a field.
   * @param {HTMLElement} field - The input/select/textarea element.
   */
  function clearError(field) {
    field.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  /**
   * Validate a single text/email field.
   * Returns true if valid.
   * @param {HTMLInputElement} field
   * @returns {boolean}
   */
  function validateField(field) {
    const value = field.value.trim();

    if (field.required && value === '') {
      showError(field, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && value !== '' && !EMAIL_RE.test(value)) {
      showError(field, 'Please enter a valid email address (e.g. you@example.com).');
      return false;
    }

    clearError(field);
    return true;
  }

  /**
   * Validate the interest checkboxes — at least one must be checked.
   * Returns true if valid.
   * @returns {boolean}
   */
  function validateInterests() {
    const checkboxes = form.querySelectorAll('input[name="interest"]');
    const checked    = Array.from(checkboxes).some(function (cb) { return cb.checked; });
    const errorEl    = document.getElementById('interests-error');

    if (!checked) {
      if (errorEl) {
        errorEl.textContent = 'Please select at least one interest area.';
        errorEl.classList.add('visible');
      }
      return false;
    }

    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
    return true;
  }

  // Validate individual fields on blur for real-time feedback
  ['fullName', 'email', 'course'].forEach(function (id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        // Clear error as soon as the user starts correcting
        if (field.classList.contains('invalid')) clearError(field);
      });
    }
  });

  // Form submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameField   = document.getElementById('fullName');
    const emailField  = document.getElementById('email');
    const courseField = document.getElementById('course');
    const successMsg  = document.getElementById('formSuccess');

    const valid =
      validateField(nameField) &
      validateField(emailField) &
      validateField(courseField) &
      validateInterests();

    if (valid) {
      // Show success message and reset form
      successMsg.classList.add('visible');
      form.reset();
      // Scroll success message into view
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      // Focus the first invalid field for accessibility
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();
