document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const platform = new URLSearchParams(window.location.search).get("platform") || "android";
  const r = (typeof RINGTONES !== "undefined" && RINGTONES.find((x) => x.id === id)) || RINGTONES[0];

  const isIphone = platform === "iphone";
  const filePath = isIphone ? r.m4r : r.mp3;
  const fileExt = isIphone ? "m4r" : "mp3";
  const fileName = `${r.id}.${fileExt}`;

  // file preview row
  document.querySelector(".gate-file .cover").style.background =
    `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})`;
  document.querySelector(".gate-file .name").textContent = `${r.title}.${fileExt}`;
  document.querySelector(".gate-file .sub").textContent = `${fileExt.toUpperCase()} · ${isIphone ? "For iPhone" : "For Android"} Ringtone`;
  document.title = `Downloading ${r.title} — MLovers Beat`;

  // countdown ring
  const RADIUS = 74;
  const CIRC = 2 * Math.PI * RADIUS;
  const ringProgress = document.querySelector(".ring-progress");
  ringProgress.style.strokeDasharray = `${CIRC}`;
  ringProgress.style.strokeDashoffset = `${CIRC}`;

  const ringNum = document.querySelector(".ring-num");
  const statusText = document.querySelector(".gate-status");
  const cta = document.querySelector(".gate-cta");

  let remaining = 5;
  ringNum.textContent = remaining;

  const tick = () => {
    remaining -= 1;
    const fraction = 1 - remaining / 5;
    ringProgress.style.strokeDashoffset = `${CIRC * (1 - fraction)}`;
    if (remaining > 0) {
      ringNum.textContent = remaining;
    } else {
      clearInterval(timer);
      ringNum.textContent = "✓";
      statusText.innerHTML = `Aapka file taiyaar hai!`;
      cta.classList.add("show");
    }
  };
  const timer = setInterval(tick, 1000);

  cta.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    cta.style.display = "none";
    document.querySelector(".gate-success").classList.add("show");
  });
});
