document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");

  // Highlight required fields on focus/blur
  const requiredFields = form.querySelectorAll("input[required], textarea[required]");
  requiredFields.forEach(field => {
    field.addEventListener("focus", function() {
      field.classList.add("highlight");
    });
    field.addEventListener("blur", function() {
      field.classList.remove("highlight");
    });
  });

  // Real-time email validation with error message
  const emailInput = form.querySelector("input[type='email']");
  const emailError = document.getElementById("email-error");
  if (emailInput) {
    emailInput.addEventListener("input", function() {
      if (validateEmail(emailInput.value)) {
        emailInput.classList.remove("invalid");
        emailInput.classList.add("valid");
        if (emailError) emailError.style.display = "none";
      } else {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        if (emailError) emailError.style.display = "inline";
      }
    });
  }

  // Confirmation dialog before redirect and email validation
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default reload
    if (!validateEmail(emailInput.value)) {
      if (emailError) emailError.style.display = "inline";
      emailInput.focus();
      return;
    }
    if (confirm("Are you sure you want to submit the survey?")) {
      window.location.href = "thankyou.html"; // Redirect to thankyou page
    }
  });
});

// Create a function to validate an email address
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

    