document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey-form");

  // Dependent dropdown for region based on island group
  const islandGroupSelect = document.getElementById("island-group");
  const regionSelect = document.getElementById("region");
  const regionOptions = {
    Luzon: [
      { value: "NCR", text: "NCR - National Capital Region" },
      { value: "CAR", text: "CAR - Cordillera Administrative Region" },
      { value: "Region 1", text: "Region 1 - Ilocos Region" },
      { value: "Region 2", text: "Region 2 - Cagayan Valley" },
      { value: "Region 3", text: "Region 3 - Central Luzon" },
      { value: "Region 4-A", text: "Region 4-A - CALABARZON" },
      { value: "Region 4-B", text: "Region 4-B - MIMAROPA" },
      { value: "Region V", text: "Region V - Bicol Region" }
    ],
    Visayas: [
      { value: "Region 6", text: "Region 6 - Western Visayas" },
      { value: "Region 7", text: "Region 7 - Central Visayas" },
      { value: "Region 8", text: "Region 8 - Eastern Visayas" }
    ],
    Mindanao: [
      { value: "Region 9", text: "Region 9 - Zamboanga Peninsula" },
      { value: "Region 10", text: "Region 10 - Northern Mindanao" },
      { value: "Region 11", text: "Region 11 - Davao Region" },
      { value: "Region 12", text: "Region 12 - SOCCSKSARGEN" },
      { value: "Region 13", text: "Region 13 - Caraga" },
      { value: "BARMM", text: "BARMM - Bangsamoro Autonomous Region" }
    ]
  };

  function updateRegionOptions() {
    const selectedIsland = islandGroupSelect.value;
    regionSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select Region';
    regionSelect.appendChild(defaultOption);
    if (regionOptions[selectedIsland]) {
      regionOptions[selectedIsland].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        regionSelect.appendChild(option);
      });
      regionSelect.disabled = false;
    } else {
      regionSelect.disabled = true;
    }
  }

  // Initialize on page load
  updateRegionOptions();
  islandGroupSelect.addEventListener('change', updateRegionOptions);

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


  // Real-time email validation with error message (support both type='email' and type='text')
  const emailInput = document.getElementById("email");
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
    // Always redirect to thankyou.html after confirmation
    if (confirm("Are you sure you want to submit the survey?")) {
      window.location.href = "thankyou.html";
    }
  });
});

// Create a function to validate an email address
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

    