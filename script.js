/* ====== EDIT THESE ====== */
const CONFIG = {
  name: "Crystal",     // the celebrant's name
  song: "./Happy%20birthday%20-%20%40amircarlosagassi%20%40sarinaagassi%20official%20music%20video.mp3",
  songTitle: "Happy birthday - @amircarlosagassi @sarinaagassi official music video"
};
/* ======================== */

document.querySelectorAll("[data-name]").forEach(el => el.textContent = CONFIG.name);

/* candles */
const wrap = document.getElementById("candles"), countEl = document.getElementById("count");
let lit = 0, celebrated = false;
for (let i = 1; i <= 18; i++) {
  const b = document.createElement("button");
  b.className = "candle"; b.type = "button";
  b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", "Candle " + i);
  b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on);
    lit += on ? 1 : -1;
    countEl.textContent = lit === 18
      ? "All 18 candles are lit. Make a wish!"
      : "Tap each candle to light it. " + lit + " of 18 lit.";
    if (lit === 18 && !celebrated) { celebrated = true; petals(); }
    if (lit < 18) celebrated = false;
  });
  wrap.appendChild(b);
}

function petals() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 3 + Math.random() * 3 + "s";
    p.style.animationDelay = Math.random() * 1.2 + "s";
    p.style.opacity = .6 + Math.random() * .4;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 8000);
  }
}

/* music */
const audio = document.getElementById("audio"), playBtn = document.getElementById("play"),
      fileIn = document.getElementById("file"), nameEl = document.getElementById("trackName"),
      hintEl = document.getElementById("trackHint");
let objectUrl = null;

function setSong(src, title) {
  audio.src = src;
  nameEl.textContent = title || "Your song";
  hintEl.textContent = "Tap play to start";
  playBtn.disabled = false; playBtn.textContent = "▶";
}
document.getElementById("attach").addEventListener("click", () => fileIn.click());
fileIn.addEventListener("change", () => {
  const f = fileIn.files && fileIn.files[0];
  if (!f) return;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(f);
  setSong(objectUrl, f.name.replace(/\.[^.]+$/, ""));
});
playBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => { hintEl.textContent = "Couldn’t play this file. Try an MP3."; });
  else audio.pause();
});
audio.addEventListener("play", () => { playBtn.textContent = "❚❚"; playBtn.setAttribute("aria-label", "Pause song"); hintEl.textContent = "Now playing"; });
audio.addEventListener("pause", () => { playBtn.textContent = "▶"; playBtn.setAttribute("aria-label", "Play song"); hintEl.textContent = "Paused"; });
audio.addEventListener("error", () => { if (audio.src) hintEl.textContent = "Couldn’t load this song. Try an MP3."; });

if (CONFIG.song) {
  setSong(CONFIG.song, CONFIG.songTitle);
  audio.autoplay = true;
  audio.play().catch(() => {
    hintEl.textContent = "Autoplay was blocked by your browser. Tap play to start.";
  });
}
