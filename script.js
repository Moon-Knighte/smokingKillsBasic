document.addEventListener("DOMContentLoaded", function () {
  const cigarette = document.getElementById("cigarette");
  const smoke = document.querySelector(".smoke");
  const toggleButton = document.getElementById("toggleButton");
  const healthFill = document.getElementById("healthFill");
  const healthText = document.getElementById("healthText");
  let isSmoking = false;
  let health = 100;
  let animateID;

  toggleButton.addEventListener("click", function () {
    if (!isSmoking) {
      startSmoking();
    } else {
      stopSmoking();
    }
  });

  function startSmoking() {
    isSmoking = true;
    toggleButton.textContent = "Stop Smoking";
    smoke.style.display = "block";
    animateCigarette();
  }

  function stopSmoking() {
    isSmoking = false;
    toggleButton.textContent = "Start Smoking";
    smoke.style.display = "none";
    cancelAnimationFrame(animateID);
  }

  function animateCigarette() {
    let startPos = -100;
    function animate() {
      if (health <= 0) {
        stopSmoking();
        return;
      }
      startPos += 1;
      if (startPos >= 500) {
        startPos = -100;
        updateHealth(-10); // Reduce health when cigarette reaches end
      }
      cigarette.style.transform = `translateY(${startPos}px)`;
      animateID = requestAnimationFrame(animate);
    }
    animate();
  }

  function updateHealth(value) {
    health += value;
    if (health < 0) health = 0;
    healthFill.style.width = health + "%";
    updateHealthText();
    updateHealthBarColor();
    if (health === 0) {
      isSmoking = false;
      toggleButton.textContent = "Start Smoking";
    }
  }

  function updateHealthText() {
    if (health >= 75) {
      healthText.textContent = "Good Health";
      healthText.style.color = "green";
    } else if (health >= 50) {
      healthText.textContent = "Moderate Health";
      healthText.style.color = "orange";
    } else {
      healthText.textContent = "Life Damage";
      healthText.style.color = "red";
    }
  }

  function updateHealthBarColor() {
    if (health >= 75) {
      healthFill.style.backgroundColor = "green";
    } else if (health >= 50) {
      healthFill.style.backgroundColor = "orange";
    } else {
      healthFill.style.backgroundColor = "red";
    }
  }
});
