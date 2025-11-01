
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById('search-icon').addEventListener('click', () => {
    document.querySelector('.logo-hamburger').style.display = 'none';
    document.querySelector('.nav-icons').style.display = 'none';
    document.querySelector('.search').style.display = 'flex';
    document.querySelector('.search').style.width = '100%';

  })

  // Simple search filter (filters posts by title)
  document.querySelector('.search-input').addEventListener('input', function() {
      const query = this.value.toLowerCase();
      if (query.length > 0) {
        document.querySelector('.search .i-cross').style.display = 'block';
      } else {
        document.querySelector('.search .i-cross').style.display = 'none';

      }
      document.querySelectorAll('.post').forEach(post => {
          const titleElement = post.querySelector('h2') || post.querySelector('h3');
          const title = titleElement ? titleElement.textContent.toLowerCase() : '';
          post.style.display = title.includes(query) ? 'block' : 'none';
      });
  });

  document.querySelector('.search .i-cross').addEventListener('click', () => {
    document.querySelector('.search-input').value = "";
    document.querySelector('.search .i-cross').style.display = 'none';
    // Show all posts
    document.querySelectorAll('.post').forEach(post => {
      post.style.display = 'block';
    });

    document.querySelector('.logo-hamburger').style.display = 'flex';
    document.querySelector('.nav-icons').style.display = 'flex';
    // document.querySelector('.search').style.width = '40%';

    // Toggle based on viewport width
    const searchEl = document.querySelector('.search');
    const searchIcon = document.getElementById('search-icon');
    const isSmallScreen = window.matchMedia('(max-width: 480px)').matches;

    if (isSmallScreen) {
      if (searchEl) searchEl.style.display = 'none';
      if (searchIcon) searchIcon.style.display = 'block';
    } else {
      if (searchEl) {
        searchEl.style.display = 'flex';
        searchEl.style.width = '40%';
      }
      if (searchIcon) searchIcon.style.display = 'none';
    }

  })

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
  const toggles = document.querySelectorAll(".darkModeSwitch");
  const body = document.body;

  // Load mode from localStorage
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) {
    body.classList.add("dark");
  }
  toggles.forEach(toggle => {
    toggle.checked = isDark;
  });

  toggles.forEach(toggle => {
    toggle.addEventListener("change", () => {
      const checked = toggle.checked;
      body.classList.toggle("dark", checked);
      localStorage.setItem("theme", checked ? "dark" : "light");
      // Sync all toggles
      toggles.forEach(t => t.checked = checked);
    });
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

  /* ---------- Likes ---------- */
  document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const post = btn.closest('.post');
            const countSpan = post.querySelector('.likes-count');
            let count = parseInt(countSpan.textContent) || 0;
            count++;
            // countSpan.textContent = `${count} like${count > 1 ? 's' : ''}`;
            countSpan.textContent = `${count}`;
            // btn.textContent = 'Liked';
            btn.style.color = 'blue';
            btn.disabled = true;               // optional: prevent double-like
        });
    });

    /* ---------- Comments ---------- */
  document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input');
            const text  = input.value.trim();
            if (!text) return;

            const post = form.closest('.post');   
            const commentsDiv = post.querySelector('.comments');

            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.textContent = text;
            commentsDiv.appendChild(comment);

            input.value = '';
        });
    });

  const commentBtn = document.querySelectorAll('.comment-btn')

  commentBtn.forEach((cmtBtn) => {
    cmtBtn.addEventListener('click', () => {
      const post = cmtBtn.closest('.post');   
      const form = post.querySelector('.comment-form');
      form.style.display = 'flex';
    });
  });
 

/* -------------------------------------------------------------
   1. Open / close dropdown
   ------------------------------------------------------------- */
document.addEventListener('click', function (e) {
    const shareBtn = e.target.closest('.share-btn');
    if (shareBtn) {
        e.stopPropagation();
        const wrapper = shareBtn.closest('.share-wrapper');
        if (wrapper) {
            const dropdown = wrapper.querySelector('.share-dropdown');
            // close all others
            document.querySelectorAll('.share-dropdown.show').forEach(d => d.classList.remove('show'));
            dropdown.classList.toggle('show');
        }
    } else {
        // close all if clicking outside
        document.querySelectorAll('.share-dropdown.show').forEach(d => d.classList.remove('show'));
    }
});

/* -------------------------------------------------------------
   2. Click on a social icon → share
   ------------------------------------------------------------- */
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.share-item');
    if (!btn) return;

    const platform = btn.dataset.platform;
    const post = btn.closest('.post');
    const title = post.querySelector('.content-title')?.textContent.trim() || document.title;
    const url   = encodeURIComponent(window.location.href);
    const text  = encodeURIComponent(title);

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                prompt('Copy this link:', window.location.href);
            });
            return; // no new tab
    }

    // Open share window (most platforms open a popup)
    window.open(shareUrl, '_blank', 'width=600,height=400');
});

// Chat Box Functionality
const chatIcon = document.getElementById('chatIcon');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.querySelector('.chat-messages');

// Gemini API Configuration (Add your API key here)
// Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyDP-5s8ygKb8hEpGyfuQaN0IpkeumPJmFA';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

// Toggle chat box
chatIcon.addEventListener('click', () => {
  chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
});

// Close chat box
closeChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
});



/**
 * @param {string} userQuestion   – What the user typed
 * @param {string} myInfo         – The ONLY information the model may use
 * @returns {Promise<string>}     – Model reply (or error message)
 */

// Function to call Gemini API
async function getGeminiResponse(userMessage, myInfo) {
  if (!GEMINI_API_KEY) {
    return 'Gemini API key not configured.';
  }

  const payload = {
    contents: [
      // --- 1. SYSTEM PROMPT (friendly but strict) ---
      {
        role: 'model',
        parts: [{
          text: `
You are a **helpful, friendly assistant** that answers **only** using the knowledge provided below.
- If the answer can be found in the knowledge, reply in a **natural, engaging tone** (add a little flair, humor, or warmth when it fits).
- If the answer **cannot** be derived from the knowledge, reply **exactly**: "I don't have that information."
- Never make up facts, dates, or details not present in the knowledge.
          `.trim()
        }]
      },

      // --- 2. KNOWLEDGE (your data) ---
      {
        role: 'model',
        parts: [{ text: myInfo || 'No information provided.' }]
      },

      // --- 3. USER QUESTION ---
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ],

    // --- CREATIVE SETTINGS ---
    generationConfig: {
      temperature: 0.9,      // more creative, varied wording
      maxOutputTokens: 300,  // enough room for expressive answers
      topP: 0.95,
      topK: 40
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API Error: ${response.status} – ${err}`);
    }

    const data = await response.json();
    console.log('Gemini raw response:', data);

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text?.trim() || "I don't have that information.";

  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'Sorry, something went wrong. Please try again later.';
  }
}


// Send message function
async function sendMsg() {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  // ---- 1. Show user message ----
  appendMessage(userMsg, 'sent');
  chatInput.value = '';

  // ---- 2. YOUR INFORMATION (replace with whatever you want) ----
const MY_DATA = `
Name: Tika Ram Khojwar
TikaBook: TikaBook is a social-media-style portfolio. Chat with AI to discover everything about Tika Ram Khojwar.

Job Title: Professor at KIST
Current Location: Kathmandu, Nepal
Years of Experience: 2 years
Total Projects: 3
   • E-Commerce Website
   • Leetlab
   • mystry_message_app_nextjs
   • Blogging Website

Skills Overview: 5 categories
   • Frontend
   • Backend
   • Databases
   • Tools
   • Soft Skills

Education:
   • Master of Computer Information Systems (MCIS) – Nepal College of Information Technology, Pokhara University (2020-2024, CGPA 3.76/4.0)
   • Bachelor of Computer Application (BCA) – Crimson College of Technology, Pokhara University (2015-2019)

Frontend Skills: HTML5, CSS3, JavaScript, React, Next.js, Redux, TailwindCSS, Responsive Design
Backend Skills: Node.js, Express.js, RESTful APIs, Authentication, JWT, NextAuth
Databases: MongoDB, Mongoose, PostgreSQL, Prisma
Tools: Git, GitHub, VS Code, Postman, Vercel, NPM/Yarn, Linux
Soft Skills: Problem Solving, Team Collaboration, Clean Code, Agile

Contact:
   • Email: khojwartikaram@gmail.com
   • LinkedIn: https://www.linkedin.com/in/tika-ram-khojwar-2116a9179/
   • GitHub: https://github.com/khojwar
   • Phone: +977 9867173083

Availability: Open to freelance, teaching, and collaboration projects
Languages: Nepali (native), English (fluent)
Hobbies: Coding challenges, open-source contributions, hiking, photography
Favorite Quote: "Code is like humor. When you have to explain it, it’s bad." – Cory House
Fun Fact: Built an AI-powered chat inside my own portfolio!
Teaching Subjects: Web Technology I & II, AI, IT Ethics & Cybersecurity, Programming with Python, Database Systems
Freelance Rate: $30–50/hour (negotiable)
Portfolio URL: https://tikaram.dev
YouTube: https://youtube.com/@tikaram
Preferred Stack: React + Next.js + Express + Mongodb + Mongoose + Prisma + PostgreSQL + Tailwind + laravel
Time Zone: NPT (UTC+5:45)
Response Time: Usually within 2 hours
`.trim();

// Certifications: Google Cloud Associate, AWS Developer (2024)
// Awards: Best Final-Year Project (NCIT, 2024)
// Blog: https://blog.tikaram.dev
// Open Source Contributions: 12+ repos, 300+ stars

  // ---- 3. Get strict answer ----
  const botReply = await getGeminiResponse(userMsg, MY_DATA);

  // ---- 4. Show bot reply ----
  appendMessage(botReply, 'received');
}

// Helper to append messages (you already have similar code)
function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send on button click
sendMessage.addEventListener('click', sendMsg);

// Send on Enter key
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMsg();
});


});
