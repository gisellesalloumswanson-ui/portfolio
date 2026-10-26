/* ============================================================
   Giselle Salloum Swanson — Portfolio
   Theme toggle, mobile nav, project filters + modal, form.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Storage (theme persistence via cookies) ----------
     Cookies survive across visits on GitHub Pages / Vercel and degrade
     gracefully in sandboxed preview iframes. */
  var store = {
    get: function (key) {
      try {
        var match = document.cookie.match(
          new RegExp("(?:^|;\\s*)" + key + "=([^;]*)")
        );
        return match ? decodeURIComponent(match[1]) : null;
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        document.cookie =
          key + "=" + encodeURIComponent(value) +
          ";path=/;max-age=31536000;SameSite=Lax";
      } catch (e) {
        /* sandboxed iframe — keep in-memory only */
      }
    }
  };

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var THEME_KEY = "theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
      );
    }
  }

  // Default to system preference; honor saved choice.
  var savedTheme = store.get(THEME_KEY);
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var themeIsManual = false;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      themeIsManual = true;
      applyTheme(next);
      store.set(THEME_KEY, next);
    });
  }

  // Follow live system changes only until the user chooses manually.
  if (!savedTheme && window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (themeIsManual || store.get(THEME_KEY)) return;
        applyTheme(e.matches ? "dark" : "light");
      });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close drawer when a link is chosen.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        closeNav();
      }
    });

    // Close drawer with Escape.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeNav();
        navToggle.focus();
      }
    });

    // Reset drawer state when the viewport crosses to desktop.
    if (window.matchMedia) {
      window
        .matchMedia("(min-width: 860px)")
        .addEventListener("change", function (e) {
          if (e.matches && nav.classList.contains("open")) {
            closeNav();
          }
        });
    }

    function closeNav() {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function openNav() {
      nav.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Reveal when entering the viewport, or when the element has been
          // scrolled past (e.g. after an anchor-link jump).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Project data (edit here) ---------- */
  var PROJECTS = {
    "supermicro-channel": {
      tag: "Channel & partners",
      title: "Co-selling with CDW & Insight",
      body: [
        {
          type: "p",
          text: "At Supermicro I co-developed opportunities with two national resellers — jointly qualifying accounts with partner account managers and our internal technical teams, and sharing pipeline from first conversation to close."
        },
        {
          type: "ul",
          items: [
            "$15M in joint pipeline developed with CDW and Insight",
            "$3M in closed revenue from shared opportunities",
            "Shared opportunity development with partner account managers and internal technical teams",
            "Co-selling contribution — formal reseller-program ownership was a separate function"
          ]
        }
      ]
    },
    "8x8-portfolio": {
      tag: "Account growth",
      title: "Cloud portfolio at 8x8",
      body: [
        {
          type: "p",
          text: "I managed a book of 60+ enterprise accounts through one of the hardest transitions in communications: on-premise PBX to cloud UCaaS/CCaaS. The work was equal parts technical migration planning and executive reassurance."
        },
        {
          type: "ul",
          items: [
            "$6M+ closed in cloud sales over five years",
            "Portfolio of 60+ enterprise accounts retained and expanded",
            "Business-value and ROI framing tailored to each buyer committee"
          ]
        }
      ]
    },
    "usaf-programs": {
      tag: "Mission delivery",
      title: "U.S. Air Force programs",
      body: [
        {
          type: "p",
          text: "On GSCS Gulf defense contracts my responsibilities included program budgets, delivery milestones, and customer acceptance — where a missed milestone is not a quarter-end problem but a mission problem."
        },
        {
          type: "ul",
          items: [
            "Program budget ownership and milestone tracking",
            "Customer acceptance processes on U.S. Air Force contracts",
            "Early formation of the accountability I bring to enterprise deals"
          ]
        }
      ]
    },
    "dcim-sales": {
      tag: "Channel & partners",
      title: "DCIM software positioning",
      body: [
        {
          type: "p",
          text: "Illustrative work sample. Moving from hardware to data-center infrastructure management (DCIM) software means selling a new category to familiar buyers — translating hardware credibility into a software-sales motion. This is representative of the motion I bring, not a completed engagement."
        },
        {
          type: "ul",
          items: [
            "Positioning conversations with data-center operations leaders",
            "Bridging CapEx hardware relationships into recurring software revenue",
            "Category-creation storytelling for technical operations buyers"
          ]
        }
      ]
    },
    "exec-engagement": {
      tag: "Account growth",
      title: "Executive engagement model",
      body: [
        {
          type: "p",
          text: "A repeatable account motion: hands-on workshops, structured business reviews, and cloud assessments that give executive sponsors a clear view of value — and give me a durable seat at the table."
        },
        {
          type: "ul",
          items: [
            "Customer workshops and technical demonstrations",
            "Executive sponsor relationship management",
            "Quarterly business reviews and cloud readiness assessments"
          ]
        }
      ]
    }
  };

  /* ---------- Project modal ---------- */
  var backdrop = document.getElementById("modal-backdrop");
  var modal = document.getElementById("modal");
  var modalClose = document.getElementById("modal-close");
  var modalTag = document.getElementById("modal-tag");
  var modalTitle = document.getElementById("modal-title");
  var modalBody = document.getElementById("modal-body");
  var lastFocused = null;

  function openModal(projectId) {
    var data = PROJECTS[projectId];
    if (!data) return;
    lastFocused = document.activeElement;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = "";

    data.body.forEach(function (block) {
      if (block.type === "p") {
        var p = document.createElement("p");
        p.textContent = block.text;
        modalBody.appendChild(p);
      } else if (block.type === "ul") {
        var ul = document.createElement("ul");
        block.items.forEach(function (item) {
          var li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        modalBody.appendChild(ul);
      }
    });

    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    // Simple focus trap: keep Tab inside the modal.
    if (e.key === "Tab") {
      var focusables = modal.querySelectorAll(
        "button, [href], input, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (backdrop && modalClose) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeModal();
    });
    modalClose.addEventListener("click", closeModal);
  }

  /* ---------- Project grid interactions ---------- */
  var grid = document.getElementById("project-grid");

  if (grid) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".project-card");
      if (card && card.dataset.project) openModal(card.dataset.project);
    });

    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".project-card");
      if (card && card.dataset.project) {
        e.preventDefault();
        openModal(card.dataset.project);
      }
    });
  }

  /* ---------- Filters ---------- */
  var chips = document.querySelectorAll(".filter-chip");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");

      var filter = chip.dataset.filter;
      document.querySelectorAll(".project-card").forEach(function (card) {
        var show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Contact form ---------- */
  // To enable live delivery, set FORM_ENDPOINT to your form service URL,
  // e.g. "https://formspree.io/f/YOUR_FORM_ID" — see README.md.
  var FORM_ENDPOINT = "";

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var note = document.getElementById("form-note");
  var submitBtn = form ? form.querySelector(".btn-submit") : null;
  var btnLabel = submitBtn ? submitBtn.querySelector(".btn-label") : null;
  var btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;

  function setStatus(kind, message) {
    status.hidden = false;
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function clearErrors() {
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });
    form.querySelectorAll(".field-error").forEach(function (el) {
      el.hidden = true;
    });
  }

  function setError(inputId) {
    var input = document.getElementById(inputId);
    var err = form.querySelector('[data-error-for="' + inputId + '"]');
    if (input) input.classList.add("is-invalid");
    if (err) err.hidden = false;
  }

  function validate() {
    clearErrors();
    var ok = true;
    var name = document.getElementById("cf-name");
    var email = document.getElementById("cf-email");
    var message = document.getElementById("cf-message");

    if (!name.value.trim()) {
      setError("cf-name");
      ok = false;
    }
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value.trim())) {
      setError("cf-email");
      ok = false;
    }
    if (message.value.trim().length < 5) {
      setError("cf-message");
      ok = false;
    }
    return ok;
  }

  function setSending(sending) {
    if (!submitBtn) return;
    submitBtn.disabled = sending;
    if (btnLabel) btnLabel.textContent = sending ? "Sending…" : "Send message";
    if (btnSpinner) btnSpinner.hidden = !sending;
  }

  if (form) {
    // Live re-validation once a field has been marked invalid.
    ["cf-name", "cf-email", "cf-message"].forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", function () {
          if (input.classList.contains("is-invalid") && validate()) {
            clearErrors();
          }
        });
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();
      status.hidden = true;

      if (!validate()) {
        setStatus("error", "Please fix the highlighted fields and try again.");
        return;
      }

      if (!FORM_ENDPOINT) {
        // No endpoint configured — never fake success. Surface a direct email path.
        if (note) note.hidden = false;
        setStatus(
          "error",
          "The form isn't connected to a delivery service yet — please email me directly."
        );
        return;
      }

      setSending(true);
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: document.getElementById("cf-name").value.trim(),
          email: document.getElementById("cf-email").value.trim(),
          message: document.getElementById("cf-message").value.trim()
        })
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("success", "Thanks — your message has been sent. I'll reply soon.");
            if (note) note.hidden = true;
          } else {
            setStatus(
              "error",
              "Something went wrong (HTTP " + res.status + "). Please email me directly."
            );
          }
        })
        .catch(function () {
          setStatus(
            "error",
            "Network error — the message wasn't sent. Please email me directly."
          );
        })
        .then(function () {
          setSending(false);
        });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
