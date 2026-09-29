async function loadQueue() {
  const box = $("queue");
  let rows = [];
  try {
    const res = await fetch("/api/submissions");
    if (res.ok) rows = await res.json();
  } catch (_) {}
  if (!rows.length) {
    try { rows = JSON.parse(localStorage.getItem("wsi_submissions") || "[]"); } catch (_) {}
  }
  if (!rows.length) {
    box.innerHTML = "<p class='hint'>No requests yet. Open the customer page and submit one. If the local server is running, rows also land in data/WSI_Customer_Submissions.xlsx.</p>";
    return;
  }
  box.innerHTML = rows.map((r, idx) => {
    const i = r.inputs || {};
    return `<div class="list-item" data-idx="${idx}">
      <strong>${i.project || i.client || i.contact || r.id || "Request"}</strong>
      <div class="hint">${i.email || ""} · ${i.stream || ""} · ${i.adf || ""} MGD<br>${(r.submitted_at || "").replace("T"," ").slice(0,16)}</div>
    </div>`;
  }).join("");
  box.querySelectorAll(".list-item").forEach(el => {
    el.addEventListener("click", () => {
      box.querySelectorAll(".list-item").forEach(x => x.classList.remove("active"));
      el.classList.add("active");
      const rec = rows[Number(el.dataset.idx)];
      const design = rec.design || designFromInputs(rec.inputs);
      renderDesign(design, $("mount"));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadQueue();
  $("btn-print").addEventListener("click", () => window.print());
});
