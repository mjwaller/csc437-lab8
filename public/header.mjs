/* ======  header.mjs (full)  ====== */
const NAV_ITEMS = [
    { text: "Home",    href: "index.html"   },
    { text: "Hobbies", href: "hobbies.html" }
  ];
  
  function html(strings, ...vals) {
    const t = document.createElement("template");
    t.innerHTML = String.raw(strings, ...vals).trim();
    return t.content.firstElementChild;
  }
  
  function buildHeader() {
    const links = NAV_ITEMS
      .map(({ text, href }) => `<a href="${href}">${text}</a>`)
      .join("");
  
    return html/*html*/`
      <header class="site-header">
        <h1 class="brand"><a href="index.html">Megan Waller</a></h1>
  
        <label class="theme-switch">
          <input type="checkbox" id="theme-checkbox" autocomplete="off" />
          Dark mode
        </label>
  
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
  
        <nav class="nav-links">${links}</nav>
      </header>`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById("site-header");
    placeholder.replaceWith(buildHeader());
  
    const header = document.querySelector(".site-header");
    const btn    = header.querySelector(".nav-toggle");
    const nav    = header.querySelector(".nav-links");
    const cb     = header.querySelector("#theme-checkbox");
  
    /* mobile menu */
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    document.body.addEventListener("click", (e) => {
      if (!header.contains(e.target) && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  
    /* dark‑mode persistence */
    const applyTheme = (dark) => {
      document.body.classList.toggle("dark-mode", dark);
      localStorage.setItem("prefers-dark", dark ? "1" : "0");
      cb.checked = dark;
    };
    applyTheme(localStorage.getItem("prefers-dark") === "1");
    cb.addEventListener("change", () => applyTheme(cb.checked));
  });
  