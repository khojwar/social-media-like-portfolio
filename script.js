document.addEventListener("DOMContentLoaded", () => {
  // Greeting Message
  const hour = new Date().getHours();

  const dateElement = document.querySelector(".current-date");
  if (dateElement) {
    const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString(undefined, options);
    dateElement.textContent = formattedDate;
  }

  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" : "Good Evening";

  const post = document.querySelector("#home h2");
  if (post) post.textContent = `${greeting}, I'm Tika Ram Khojwar`;

  // 🌙 Dark Mode Toggle
  const toggle = document.getElementById("darkModeSwitch");
  const body = document.body;

  // Load mode from localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  // Navigation Active Link
  const navLinks = document.querySelectorAll(".sidebar-left a");
  const sections = document.querySelectorAll(".post");

  // Set default active link to Home
  const homeLink = document.querySelector(".sidebar-left a[href='#home']");
  if (homeLink) homeLink.classList.add("active");

  // Function to update active link
  const updateActiveLink = () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  // Update on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Update on click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  // Experience Section Toggle
  const experienceTitles = document.querySelectorAll(".experience-title");

  experienceTitles.forEach(title => {
    title.addEventListener("click", () => {
      const details = title.nextElementSibling;
      if (details && details.classList.contains("experience-details")) {
        if (details.style.display === "none" || details.style.display === "") {
          details.style.display = "block";
        } else {
          details.style.display = "none";
        }
      }
    });
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });

  // Tag Truncation and Expansion Logic
  const tagContainers = document.querySelectorAll('.tags');

  tagContainers.forEach(container => {
    const tags = container.querySelectorAll('.tag');
    if (tags.length > 2) {
      // Hide tags beyond the first 2
      for (let i = 2; i < tags.length; i++) {
        tags[i].style.display = 'none';
      }

      // Create the "+" tag
      const remainingCount = tags.length - 2;
      const plusTag = document.createElement('span');
      plusTag.className = 'tag plus-tag';
      plusTag.textContent = `+${remainingCount}`;
      plusTag.style.cursor = 'pointer';

      // Insert the "+" tag after the second tag
      container.insertBefore(plusTag, tags[2]);

      // Add click event to expand tags
      plusTag.addEventListener('click', () => {
        // Show all hidden tags
        for (let i = 2; i < tags.length; i++) {
          tags[i].style.display = 'flex';
        }
        // Remove the "+" tag
        plusTag.remove();
      });
    }
  });

});
