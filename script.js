document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default reload
    window.location.href = "thankyou.html"; // Redirect to thankyou page
  });
});
    