import "./chunk-TRTQSARU.js";

// src/scripts/modules/toc.ts
function setupToC() {
  const container = document.getElementById("right-pane");
  const toc = document.getElementById("toc");
  if (!toc || !container) return;
  const sections = document.getElementById("content").querySelectorAll("h2, h3, h4, h5, h6");
  const links = toc.querySelectorAll("a");
  for (const link of links) {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      target.scrollIntoView({ behavior: "smooth" });
    });
  }
  function changeLinkState() {
    let index = sections.length;
    while (--index && container.scrollTop + 50 < sections[index].offsetTop) {
    }
    links.forEach((link) => link.classList.remove("active"));
    links[index].classList.add("active");
  }
  changeLinkState();
  container.addEventListener("scroll", changeLinkState);
}

// src/scripts/modules/expanders.ts
function setupExpanders() {
  const expanders = document.querySelectorAll("#menu .submenu-item .collapse-button");
  for (const expander of expanders) {
    const li = expander.closest("li");
    if (!li) {
      continue;
    }
    expander.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ul = li.querySelector("ul");
      if (!ul) {
        return;
      }
      const isExpanded = li.classList.contains("expanded");
      if (isExpanded) {
        ul.style.height = `${ul.scrollHeight}px`;
        ul.offsetHeight;
        li.classList.remove("expanded");
        ul.style.height = "0";
      } else {
        ul.style.height = "0";
        ul.offsetHeight;
        li.classList.add("expanded");
        ul.style.height = `${ul.scrollHeight}px`;
      }
      setTimeout(() => {
        ul.style.height = "";
      }, 200);
    });
  }
}

// src/scripts/modules/mobile.ts
function setupMobileMenu() {
  function closeMobileMenus() {
    document.body.classList.remove("menu-open");
    document.body.classList.remove("toc-open");
  }
  window.addEventListener("click", (e) => {
    const isMenuOpen = document.body.classList.contains("menu-open");
    const isTocOpen = document.body.classList.contains("toc-open");
    if (!isMenuOpen && !isTocOpen) return;
    const target = e.target;
    if (target.closest("#left-pane")) return;
    if (target.closest("#toc-pane")) return;
    if (target.closest(".header-button")) return;
    return closeMobileMenus();
  });
}

// src/scripts/common/debounce.ts
function debounce(executor, delay) {
  let timeout;
  return function(...args) {
    const callback = () => {
      timeout = null;
      Reflect.apply(executor, null, args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

// src/scripts/common/parents.ts
function parents(el, selector) {
  const result = [];
  for (let p = el && el.parentElement; p; p = p.parentElement) {
    if (p.matches(selector)) result.push(p);
  }
  return result;
}

// src/scripts/common/parsehtml.ts
function parseHTML(html, fragment = false) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const node = template.content.cloneNode(true);
  if (fragment) return node;
  return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
}

// src/scripts/modules/search.ts
var fuseInstance = null;
function buildResultItem(result) {
  return `<a class="search-result-item" href="./${result.id}">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-note">${result.path || "Home"}</div>
            </a>`;
}
function setupSearch() {
  const searchInput = document.querySelector(".search-input");
  if (!searchInput) {
    return;
  }
  searchInput.addEventListener("keyup", debounce(async () => {
    const query = searchInput.value;
    if (query.length < 3) return;
    const resp = await fetchResults(query);
    const results = resp.results.slice(0, 5);
    const lines = [`<div class="search-results">`];
    for (const result of results) {
      lines.push(buildResultItem(result));
    }
    lines.push("</div>");
    const container = parseHTML(lines.join(""));
    const rect = searchInput.getBoundingClientRect();
    container.style.top = `${rect.bottom}px`;
    container.style.left = `${rect.left}px`;
    container.style.minWidth = `${rect.width}px`;
    const existing = document.querySelector(".search-results");
    if (existing) existing.replaceWith(container);
    else document.body.append(container);
  }, 500));
  window.addEventListener("click", (e) => {
    const existing = document.querySelector(".search-results");
    if (!existing) return;
    if (parents(e.target, ".search-results,.search-item").length) return;
    if (existing) existing.remove();
  });
}
async function fetchResults(query) {
  const linkHref = document.head.querySelector("link[rel=stylesheet]")?.getAttribute("href");
  const rootUrl = linkHref?.split("/").slice(0, -2).join("/") || ".";
  if (window.glob.isStatic) {
    if (!fuseInstance) {
      const searchIndex = await (await fetch(`${rootUrl}/search-index.json`)).json();
      const Fuse = (await import("./fuse-MYPY7PA2.js")).default;
      fuseInstance = new Fuse(searchIndex, {
        keys: [
          "title",
          "content"
        ],
        includeScore: true,
        threshold: 0.65,
        ignoreDiacritics: true,
        ignoreLocation: true,
        ignoreFieldNorm: true,
        useExtendedSearch: true
      });
    }
    const results = fuseInstance.search(query, { limit: 5 });
    console.debug("Search results:", results);
    const processedResults = results.map(({ item, score }) => ({
      ...item,
      id: rootUrl + "/" + item.id,
      score
    }));
    return { results: processedResults };
  } else {
    const ancestor = document.body.dataset.ancestorNoteId;
    const resp = await fetch(`api/notes?search=${query}&ancestorNoteId=${ancestor}`);
    return await resp.json();
  }
}

// src/scripts/modules/theme.ts
var themeRootEl = document.documentElement;
function setupThemeSelector() {
  const themeSwitch = document.querySelector(".theme-selection input");
  themeSwitch?.addEventListener("change", () => {
    const theme = themeSwitch.checked ? "dark" : "light";
    setTheme(theme);
    localStorage.setItem("theme", theme);
  });
}
function setTheme(theme) {
  if (theme === "dark") {
    themeRootEl.classList.add("theme-dark");
    themeRootEl.classList.remove("theme-light");
  } else {
    themeRootEl.classList.remove("theme-dark");
    themeRootEl.classList.add("theme-light");
  }
}

// src/scripts/modules/mermaid.ts
async function setupMermaid() {
  const mermaidEls = document.querySelectorAll("#content pre code.language-mermaid");
  if (mermaidEls.length === 0) {
    return;
  }
  const mermaid = (await import("./mermaid.core-77IT7KKV.js")).default;
  for (const codeBlock of mermaidEls) {
    const parentPre = codeBlock.parentElement;
    if (!parentPre) {
      continue;
    }
    const mermaidDiv = document.createElement("div");
    mermaidDiv.classList.add("mermaid");
    mermaidDiv.innerHTML = codeBlock.innerHTML;
    parentPre.replaceWith(mermaidDiv);
  }
  mermaid.init();
}

// ../commons/src/lib/katex_macros.ts
var KATEX_MACROS = {
  // ISO 80000-2 upright operators (mathlive MACROS table)
  "\\differentialD": "\\mathrm{d}",
  "\\capitalDifferentialD": "\\mathrm{D}",
  "\\exponentialE": "\\mathrm{e}",
  "\\imaginaryI": "\\mathrm{i}",
  "\\imaginaryJ": "\\mathrm{j}",
  // Relational shortcuts (mathlive inline shortcuts: `?=` and `::`)
  "\\questeq": "\\stackrel{?}{=}",
  // U+225F questioned-equal: "?" over "="
  "\\Colon": "\\dblcolon"
  // U+2237 proportion / double colon
};

// src/scripts/modules/math.ts
async function setupMath() {
  const anyMathBlock = document.querySelector("#content .math-tex");
  if (!anyMathBlock) {
    return;
  }
  const renderMathInElement = (await import("./auto-render-U6V2CJBY.js")).default;
  await import("./mhchem-ZWQJEZFF.js");
  const contentEl = document.getElementById("content");
  if (!contentEl) return;
  renderMathInElement(contentEl, { throwOnError: false, macros: { ...KATEX_MACROS } });
  document.body.classList.add("math-loaded");
}

// src/scripts/modules/sidebar.ts
var MOBILE_BREAKPOINT = 768;
function setupToggle(buttonId, className, mobileClass, otherMobileClass) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener("click", () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      document.body.classList.toggle(mobileClass);
      document.body.classList.remove(otherMobileClass);
    } else {
      const isCollapsed = document.documentElement.classList.toggle(className);
      localStorage.setItem(className, String(isCollapsed));
    }
  });
}
function setupSidebars() {
  setupToggle("left-pane-toggle-button", "left-pane-collapsed", "menu-open", "toc-open");
  setupToggle("toc-pane-toggle-button", "toc-pane-collapsed", "toc-open", "menu-open");
}

// src/scripts/modules/video_facade.ts
function setupVideoFacades() {
  const facades = document.querySelectorAll(".link-embed-video-facade[data-video-id]");
  for (const facade of facades) {
    facade.addEventListener("click", () => {
      const videoId = facade.dataset.videoId;
      const container = facade.parentElement;
      if (!videoId || !container) {
        return;
      }
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&autoplay=1`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      container.replaceChildren(iframe);
    });
  }
}

// src/scripts/modules/api.ts
async function fetchNote(noteId = null) {
  if (!noteId) {
    noteId = document.body.getAttribute("data-note-id");
  }
  const resp = await fetch(`api/notes/${noteId}`);
  return await resp.json();
}
var api_default = {
  fetchNote
};

// src/scripts/index.ts
function $try(func, ...args) {
  try {
    func.apply(func, args);
  } catch (e) {
    console.error(e);
  }
}
Object.assign(window, api_default);
$try(setupThemeSelector);
$try(setupToC);
$try(setupExpanders);
$try(setupMobileMenu);
$try(setupSearch);
$try(setupSidebars);
function setupTextNote() {
  $try(setupMermaid);
  $try(setupMath);
  $try(setupVideoFacades);
}
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const noteType = determineNoteType();
    if (noteType === "text" || document.querySelector("#content.ck-content")) {
      setupTextNote();
    }
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const layout = document.getElementById("layout");
    if (toggleMenuButton && layout) {
      toggleMenuButton.addEventListener("click", () => layout.classList.toggle("showMenu"));
    }
    for (const el of document.querySelectorAll("time[datetime]")) {
      const date = new Date(el.dateTime);
      if (!isNaN(date.getTime())) {
        el.textContent = date.toLocaleDateString();
      }
    }
  },
  false
);
function determineNoteType() {
  const bodyClass = document.body.className;
  const match = bodyClass.match(/type-([^\s]+)/);
  return match ? match[1] : null;
}
