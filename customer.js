const API = "";

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  if ($("date")) $("date").value = today.toISOString().slice(0,10);
  $("stream").addEventListener("change", applyPresetToForm);
  $("goal").addEventListener("change", applyGoalHintsToForm);
  $("load_preset").addEventListener("change", applyPresetToForm);
  $("btn-reset").addEventListener("click", () => {
    $("project").value = ""; $("client").value = ""; $("designer").value = "";
    $("email").value = ""; $("phone").value = ""; $("note").value = "";
    $("stream").value = "Municipal sewage"; $("goal").value = "Surface water NPDES";
    $("adf").value = "1"; $("load_preset").checked = true;
    $("tank_type").value = "ISO containerized plant";
    $("aerator").value = "COG (Water Services default)";
    $("min_depth").value = "4"; $("max_depth").value = "8";
    applyGoalHintsToForm(); applyPresetToForm();
  });
  $("btn-submit").addEventListener("click", submitRequest);
  applyGoalHintsToForm();
  applyPresetToForm();
});

async function submitRequest() {
  const err = $("form-error");
  err.style.display = "none";
  const email = val("email").trim();
  const name = val("designer").trim();
  if (!name || !email || !email.includes("@")) {
    err.style.display = "block";
    err.textContent = "Please enter your name and a valid email so Water Services Inc can get back to you.";
    return;
  }
  const inputs = collectInputs();
  const design = designFromInputs(inputs);
  const payload = {
    submitted_at: new Date().toISOString(),
    inputs,
    summary: {
      train: design.train.join(" > "),
      cog: design.cog.duty.map(m => `${m.qty} x ${m.id}`).join(", "),
      cog_o2_lb_d: design.cog.total_o2,
      containers: design.pack.total,
      container_list: Object.entries(design.pack.summary).map(([k,v]) => `${v} x ${k}`).join(", "),
      family: design.d.family,
      aor_lb: design.s.aor_lb
    },
    design
  };
  $("btn-submit").disabled = true;
  $("btn-submit").textContent = "Sending…";
  try {
    const res = await fetch((API || "") + "/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("server " + res.status);
    const data = await res.json();
    window.location.href = "thanks.html?id=" + encodeURIComponent(data.id || "") + "&email=" + encodeURIComponent(email);
  } catch (e) {
    try {
      const key = "wsi_submissions";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      payload.id = "L" + Date.now();
      existing.unshift(payload);
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 200)));
    } catch (_) {}
    window.location.href = "thanks.html?offline=1&email=" + encodeURIComponent(email);
  }
}
