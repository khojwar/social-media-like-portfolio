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

});
