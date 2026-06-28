/* ========================= Helpers ========================= */
function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function findRingtone(id) {
  return RINGTONES.find((r) => r.id === id);
}
function coverHTML(gradient, size = 64) {
  return `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
}
function playIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
}
function downloadIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></svg>`;
}
function heartIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.2C0.3 8.1 2 4.5 5.6 4.1c2-.2 3.7.8 4.4 2.3.7-1.5 2.4-2.5 4.4-2.3 3.6.4 5.3 4 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>`;
}

/* ========================= Mobile nav ========================= */
function wireNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

/* ========================= Card markup ========================= */
function cardMarkup(r) {
  return `
    <article class="card" data-tags="${r.tags.join("|").toLowerCase()}" data-title="${r.title.toLowerCase()}">
      <a href="ringtone.html?id=${r.id}" class="card-top" style="text-decoration:none;color:inherit;">
        <div class="cover" style="background:${coverHTML(r.gradient)}">${playIconSVG()}</div>
        <div>
          <h3 class="card-title">${r.title}</h3>
          <div class="card-meta">
            <span>${r.duration}</span>
            <span class="dl">${heartIconSVG()} ${r.plays}</span>
          </div>
        </div>
      </a>
      <div class="tag-row">
        ${r.tags.slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a class="dl-btn" href="download.html?id=${r.id}&platform=android">${downloadIconSVG()} Download</a>
    </article>`;
}

/* ========================= Home page ========================= */
function renderHome() {
  const grid = document.getElementById("ringtone-grid");
  if (!grid) return;

  grid.innerHTML = RINGTONES.map(cardMarkup).join("");

  // tag filters
  const allTags = ["All", ...new Set(RINGTONES.flatMap((r) => r.tags))];
  const tagRow = document.getElementById("filter-tags");
  if (tagRow) {
    tagRow.innerHTML = allTags
      .map((t, i) => `<button class="tag${i === 0 ? " active" : ""}" data-tag="${t.toLowerCase()}">${t}</button>`)
      .join("");
    tagRow.addEventListener("click", (e) => {
      const btn = e.target.closest(".tag");
      if (!btn) return;
      tagRow.querySelectorAll(".tag").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tag = btn.dataset.tag;
      grid.querySelectorAll(".card").forEach((card) => {
        const show = tag === "all" || card.dataset.tags.includes(tag);
        card.style.display = show ? "" : "none";
      });
    });
  }

  // search
  const search = document.getElementById("search-input");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      grid.querySelectorAll(".card").forEach((card) => {
        card.style.display = card.dataset.title.includes(q) ? "" : "none";
      });
    });
  }
}

/* ========================= Detail page ========================= */
function renderDetail() {
  const root = document.getElementById("detail-root");
  if (!root) return;

  const id = qs("id");
  const r = findRingtone(id) || RINGTONES[0];

  document.title = `${r.title} Ringtone — MLovers Beat`;
  root.querySelector(".detail-title").textContent = `${r.title} Ringtone`;
  root.querySelector(".detail-author").textContent = `@${r.artist.replace(/\s+/g, "")} · ${r.duration}`;
  root.querySelector(".player-disc").style.background = coverHTML(r.gradient);
  root.querySelector(".tag-row").innerHTML = r.tags.map((t) => `<span class="tag">${t}</span>`).join("");

  const androidBtn = root.querySelector(".dl-android");
  const iphoneBtn = root.querySelector(".dl-iphone");
  androidBtn.href = `download.html?id=${r.id}&platform=android`;
  iphoneBtn.href = `download.html?id=${r.id}&platform=iphone`;

  // simple preview player
  const audio = new Audio(r.mp3);
  const disc = root.querySelector(".player-disc");
  disc.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      disc.classList.add("playing");
    } else {
      audio.pause();
      disc.classList.remove("playing");
    }
  });
  audio.addEventListener("ended", () => disc.classList.remove("playing"));

  // related
  const related = document.getElementById("related-grid");
  if (related) {
    related.innerHTML = RINGTONES.filter((x) => x.id !== r.id)
      .slice(0, 3)
      .map(cardMarkup)
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  wireNav();
  renderHome();
  renderDetail();
});
