document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Reset all error states
      clearErrors();

      // Get all form fields
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const experience = document.getElementById('experience');
      const termsCheckbox = document.getElementById('terms');

      // Validate each field
      let isValid = true;

      // 1. Name validation (non-empty, at least 3 characters)
      if (!fullName.value.trim() || fullName.value.trim().length < 3) {
        showError(
          fullName,
          'Please enter your full name (at least 3 characters)'
        );
        isValid = false;
      }

      // 2. Email validation (must be valid email format)
      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      // 3. Password validation (at least 8 characters with at least one number and one uppercase)
      if (!validatePassword(password.value)) {
        showError(
          password,
          'Password must be at least 8 characters with at least one number and one uppercase letter'
        );
        isValid = false;
      }

      // 4. Confirm password validation (must match password)
      if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
      }

      // 5. Experience level validation (must select an option)
      if (experience.value === '') {
        showError(experience, 'Please select your experience level');
        isValid = false;
      }

      // 6. Terms checkbox validation (must be checked)
      if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
      }

      // If all validations pass, show success message
      if (isValid) {
        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = `
          <div class="success-message">
            <h2><i class="fas fa-check-circle"></i> Registration Successful!</h2>
            <p>Thank you for registering with cryPIto. Your journey into cryptocurrency begins now!</p>
            <p>We've sent a confirmation email to <strong>${email.value}</strong>.</p>
            <a href="index.html" class="btn btn-primary">Return to Homepage</a>
          </div>
        `;
      }
    });
  }
});

// Email validation function
function validateEmail(email) {
  // Custom email validation without regex
  const atPosition = email.indexOf('@');
  const dotPosition = email.lastIndexOf('.');

  // Check if @ exists and is not the first character
  if (atPosition < 1) return false;

  // Check if dot exists and is after @
  if (dotPosition <= atPosition + 1) return false;

  // Check if dot is not the last character
  if (dotPosition + 1 >= email.length) return false;

  return true;
}

// Password validation function
function validatePassword(password) {
  if (password.length < 8) return false;

  // Check for at least one number
  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) {
      hasNumber = true;
      break;
    }
  }

  if (!hasNumber) return false;

  // Check for at least one uppercase letter
  let hasUppercase = false;
  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      hasUppercase = true;
      break;
    }
  }

  return hasUppercase;
}

// Show error message for a form field
function showError(inputElement, message) {
  inputElement.classList.add('error');

  // Find the error message element
  let errorElement;
  if (inputElement.type === 'checkbox') {
    errorElement = inputElement.parentElement.nextElementSibling;
  } else {
    errorElement = inputElement.nextElementSibling;
  }

  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
}

// Clear all error messages
function clearErrors() {
  const errorInputs = document.querySelectorAll(
    '.form-input.error, .form-checkbox input.error'
  );
  errorInputs.forEach((input) => {
    input.classList.remove('error');
  });

  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((message) => {
    message.textContent = '';
    message.classList.remove('visible');
  });
}
