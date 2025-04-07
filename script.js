let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 6000); // Change slide every 3 seconds
}

function currentSlide(n) {
  slideIndex = n;
  showSlides();
}

showSlides(); // Start slideshow

document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0;
  const cartBadge = document.querySelector(".cart-badge");

  // Add smooth animation to products when they appear
  const products = document.querySelectorAll(".product");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
        }
      });
    },
    { threshold: 0.3 }
  );

  products.forEach((product) => observer.observe(product));

  // Toggle product details on click
  products.forEach((product) => {
    product.addEventListener("click", function () {
      this.classList.toggle("expanded"); // Add/remove class for animation
    });
  });

  // Handle Add to Cart button click
  document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent toggling when clicking the button
      cartCount++;
      cartBadge.textContent = cartCount;
      cartBadge.style.display = "flex"; // Show badge when there's at least 1 item
    });
  });
});

const categories = document.querySelectorAll(".category");

categories.forEach((category) => {
  category.addEventListener("mouseenter", () => {
    category.classList.add("hovered");
  });

  category.addEventListener("mouseleave", () => {
    category.classList.remove("hovered");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const container = document.body;

  function createRandomSnack(type, count, isFooter = false) {
    const usedPositions = []; // Array to store used positions
    const parent = isFooter ? document.querySelector(".footer") : container;

    for (let i = 0; i < count; i++) {
      let snack = document.createElement("div");
      snack.classList.add(type, "falling-item");

      // If it's for the footer, apply the footer class
      if (isFooter) {
        snack.classList.add("footer-snack");
      }

      // Random position with spacing
      let leftPosition = Math.random() * 80 + 10 + "%"; // Keeps them away from edges (10% to 90%)

      // For the footer, set topPosition to place snacks near the top
      let topPosition;
      if (isFooter) {
        topPosition = Math.random() * 40 + "%"; // Ensure snacks are placed at the top of the footer (10% to 40%)
      } else {
        topPosition = Math.random() * 80 + "vh"; // Random vertical position (10% to 90% of viewport height)
      }

      // Check if the position overlaps with previous ones (minimum distance between snacks)
      let overlap = false;
      for (let pos of usedPositions) {
        const distanceX = Math.abs(
          parseFloat(leftPosition) - parseFloat(pos.left)
        );
        const distanceY = Math.abs(
          parseFloat(topPosition) - parseFloat(pos.top)
        );
        if (distanceX < 15 && distanceY < 15) {
          // Ensure there's at least 15% space between snacks
          overlap = true;
          break;
        }
      }

      // If overlap is detected, retry the current snack
      if (overlap) {
        i--; // Retry the current snack (retry same snack)
        continue;
      }

      // Store used positions to prevent overlap
      usedPositions.push({ left: leftPosition, top: topPosition });

      // Apply the position to the snack element
      snack.style.position = "absolute"; // Absolute positioning so they don't affect each other
      snack.style.left = leftPosition;
      snack.style.top = topPosition;

      // Add the snack to the container (body or footer)
      parent.appendChild(snack);
    }
  }

  // Generate snacks randomly across the page (body)
  createRandomSnack("fries", 6); // Example: 6 fries in the body
  createRandomSnack("chip", 5); // Example: 5 chips in the body
  createRandomSnack("pizza", 4); // Example: 4 pizzas in the body
  createRandomSnack("coke", 3); // Example: 3 cokes in the body
  createRandomSnack("doughnut", 5); // Example: 5 doughnuts in the body

  // Create footer snacks (snacks appearing at the top of the footer)
  createRandomSnack("fries", 3, true); // Example: 3 fries at the top of the footer
  createRandomSnack("chip", 2, true); // Example: 2 chips at the top of the footer
  createRandomSnack("pizza", 2, true); // Example: 2 pizzas at the top of the footer
});

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle mobile navigation menu
  menuIcon.addEventListener("click", function () {
    navMenu.classList.toggle("active"); // Adds/removes the active class to show/hide the menu
  });
});

const snackCards = document.querySelectorAll(".snack-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.setProperty("--delay", `${index * 0.1}s`);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

snackCards.forEach((card) => observer.observe(card));
