const listEl = document.getElementById("list");

init();

async function init() {
  let mixtapes = [];
  try {
    const res = await fetch("data/mixtapes.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mixtapes = await res.json();
  } catch (err) {
    listEl.innerHTML = `<p class="empty">Couldn't load <code>data/mixtapes.json</code>.<br />
      Run a local server: <code>python3 -m http.server</code> then open <code>localhost:8000</code>.<br />(${err.message})</p>`;
    return;
  }

  mixtapes.sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
  listEl.innerHTML = mixtapes.map(cardHtml).join("");
}

function cardHtml(mt) {
  const tracks = (mt.tracks || [])
    .map(
      (t) => `<li>
        <span class="num">${t.track ?? ""}</span>
        <span class="song">${escapeHtml(t.title)}</span>
        <span class="artist">${escapeHtml(t.artist)}</span>
      </li>`
    )
    .join("");

  return `<section class="tape">
    <div class="tape-head">
      <span class="vol">Vol. ${mt.volume ?? "?"}</span>
      <h2>${escapeHtml(mt.title)}</h2>
    </div>
    <ol class="tracks">${tracks}</ol>
  </section>`;
}

function formatDate(d) {
  if (!d) return "";
  const parsed = new Date(d + "T00:00:00");
  if (isNaN(parsed)) return escapeHtml(d);
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
