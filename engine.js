/* Water Services Inc. — shared design engine
   COG ratings from WSI VBT/COG spec sheets (101, 200, 300, 601) and brochure VER 01-21-2016.
*/
const WSI = {
  name: "Water Services, Inc.",
  address: "372 South 900 West, Provo, Utah 84601",
  phone: "+1-801-705-4567",
  phoneAlt: "+1-801-225-1180",
  email: "info@water-services.us",
  web: "www.water-services.us"
};

const PRESETS = {
  "Municipal sewage":            { bod:220, cod:500, tss:220, tds:500, og:30, tn:40, nh3:25, tp:8, ph:7.2, fc:1e7, turb:150, met:0.5, temp:18, pf:3.0 },
  "Greywater":                   { bod:160, cod:350, tss:80, tds:400, og:20, tn:10, nh3:4, tp:4, ph:7.1, fc:1e5, turb:80, met:0.2, temp:25, pf:2.0 },
  "Stormwater runoff":           { bod:15, cod:40, tss:150, tds:120, og:5, tn:2, nh3:0.5, tp:0.4, ph:7.0, fc:5000, turb:80, met:0.3, temp:12, pf:8.0 },
  "Food & beverage":             { bod:1500, cod:3000, tss:800, tds:1500, og:250, tn:50, nh3:15, tp:20, ph:5.5, fc:1e6, turb:200, met:0.5, temp:30, pf:2.5 },
  "Oil & gas produced water":    { bod:200, cod:2000, tss:200, tds:35000, og:80, tn:40, nh3:30, tp:2, ph:6.5, fc:1000, turb:40, met:5, temp:40, pf:1.3 },
  "Metal finishing":             { bod:50, cod:200, tss:150, tds:2000, og:15, tn:15, nh3:5, tp:2, ph:3.5, fc:100, turb:30, met:50, temp:25, pf:1.5 },
  "Textile / dye":               { bod:400, cod:1200, tss:250, tds:2500, og:10, tn:20, nh3:8, tp:5, ph:8.5, fc:1000, turb:80, met:2, temp:35, pf:1.8 },
  "Landfill leachate":           { bod:200, cod:3000, tss:200, tds:8000, og:10, tn:200, nh3:150, tp:8, ph:7.5, fc:10000, turb:60, met:8, temp:18, pf:1.4 },
  "Cooling tower blowdown":      { bod:10, cod:40, tss:20, tds:2500, og:5, tn:10, nh3:2, tp:2, ph:8.2, fc:100, turb:5, met:1, temp:35, pf:1.2 },
  "Agricultural / CAFO":         { bod:800, cod:1600, tss:400, tds:1200, og:20, tn:150, nh3:80, tp:25, ph:7.4, fc:1e7, turb:120, met:0.5, temp:18, pf:2.0 },
  "Pharmaceutical":              { bod:600, cod:1500, tss:150, tds:1500, og:10, tn:40, nh3:20, tp:5, ph:6.8, fc:1000, turb:40, met:1, temp:25, pf:1.6 },
  "Pulp & paper":                { bod:250, cod:800, tss:300, tds:800, og:15, tn:15, nh3:5, tp:3, ph:6.5, fc:10000, turb:80, met:1, temp:30, pf:1.8 },
  "Custom / other":              { bod:200, cod:500, tss:200, tds:500, og:20, tn:30, nh3:20, tp:6, ph:7.0, fc:1e6, turb:80, met:1, temp:18, pf:2.5 }
};

const C = {
  m3d_per_mgd: 3785.4118, gpm_per_mgd: 694.44,
  coarse_mm: 25, fine_mm: 6,
  grit_hrt_s: 60, vortex_mgd: 2,
  eq_h_mun: 4, eq_h_ind: 8,
  prim_sor_adf: 1000, prim_sor_pk: 1500, prim_swd: 12, max_dia: 130,
  daf_gpm_sf: 3, daf_r: 0.3, api_min: 30, cpi_gpm_sf: 2,
  lv_as: 0.40, lv_ea: 0.15, lv_bnr: 0.25, lv_mbbr: 0.80, lv_mbr: 0.80,
  sbr_cycle: 6,
  mlss_as: 2500, mlss_bnr: 3500, mlss_mbr: 10000,
  srt_c: 6, srt_n: 12, srt_bnr: 15,
  fax: 0.30, fan: 0.12,
  o2_bod: 1.1, o2_nh3: 4.57, sae: 0.25, air_nm3: 12,
  uasb: 8,
  sec_sor: 800, sec_slr: 30, sec_swd: 14,
  filt_grav: 4, filt_press: 5, cell_sf: 250, standby: 1,
  gac_ebct: 15, gac_gpm_sf: 4, gac_sf: 50,
  cart_um: 5, cart_gpm: 8,
  uf_lmh: 40, uf_y: 0.92, uf_mod: 50,
  ro_lmh: 17, ro_y: 0.75, ro_y_hi: 0.50, ro_el: 37, ro_psi: 150, ro_psi_hi: 800,
  evap_econ: 3,
  al_p: 2.0, alum_mw: 594,
  metals_x: 1.5, lime: 40, acid: 30,
  cl2_min: 30, cl2_dose: 8, uv_sec: 40, uv_reuse: 80, o3: 8,
  og_api: 25, og_daf: 50,
  tss_prim: 180, q_prim: 0.20,
  bod_trig: 20, cod_ana: 2000, bodcod_cut: 0.35,
  tn_gap: 8, nh3_gap: 2, tp_gap: 1.5, tp_chem: 0.5,
  tss_filt: 15, tss_uf: 2, tds_ro: 250, tds_hi: 8000, tds_zld: 40000,
  met_trig: 1.0, sbr_q: 0.25, ditch_q: 2.0
};

const R = {
  screen_tss: 0.08, grit_tss: 0.05,
  api_og: 0.80, api_tss: 0.30,
  daf_og: 0.90, daf_tss: 0.80, daf_bod: 0.30,
  prim_tss: 0.60, prim_bod: 0.32, prim_tp: 0.15, prim_og: 0.55,
  metals: 0.90, ana_cod: 0.80, ana_bod: 0.75,
  aer_bod: 0.92, aer_tss: 0.90, mbr_tss: 0.995,
  tn_as: 0.25, tn_mle: 0.75, tn_bp: 0.90, nh3: 0.95,
  tp_as: 0.20, tp_bio: 0.80, tp_chem: 0.90,
  sand_tss: 0.70, sand_bod: 0.20, gac_cod: 0.70, gac_bod: 0.50,
  uf_tss: 0.99, uf_turb: 0.99, ro_tds: 0.97, ro_cod: 0.90,
  uv_log: 3.5, ix: 0.95
};

const munLike = new Set(["Municipal sewage","Greywater","Stormwater runoff","Agricultural / CAFO"]);

/* Spec-sheet ratings. O2 is manufacturer lb O2/day. kW is estimated running draw. */
const COG_MODELS = [
  { id:"COG-100", aka:"WSI-VBT-101", cfm:0.22, cfd:317, o2_lb_d:5.49, sae:3.4, hp:1/15, kw:0.11, gpd300:1000, fla_1ph:0.8, volt:"115/220 1Ø", sphere_ft:5.5, tube_in:2.4, mount:"tank lid / 12.7 in manhole", use:["septic","small commercial","container 10-ft"] },
  { id:"COG-200", aka:"WSI-COG-200", cfm:1.25, cfd:1800, o2_lb_d:32, sae:5.33, hp:0.25, kw:0.37, gpd300:6500, fla_1ph:1.7, volt:"115/220 1Ø", sphere_ft:7, tube_in:4.5, mount:"tank lid or float", use:["restaurant","RV park","ATU pretreatment"] },
  { id:"COG-300", aka:"WSI-COG-300", cfm:5.0, cfd:7200, o2_lb_d:132, sae:5.5, hp:1, kw:1.4, gpd300:18000, fla_1ph:12.8, volt:"120/220 1Ø or 230/460 3Ø", sphere_ft:12, tube_in:8.5, mount:"tank, float, lagoon", use:["CAFO mid-size","package plant","20-ft container"] },
  { id:"COG-600", aka:"WSI-VBT-601", cfm:22.4, cfd:32300, o2_lb_d:608, sae:8.44, hp:3, kw:2.24, gpd300:80000, fla_1ph:7.43, volt:"220/460 (3Ø typical)", sphere_ft:16, tube_in:12.5, mount:"float / lagoon / 40-ft container", use:["dairy/hog lagoon","large municipal","industrial"] }
];

const ISO_BOXES = [
  { id:"10x8x8.5", L:10, W:8, H:8.5, high:false },
  { id:"10x8x9.5", L:10, W:8, H:9.5, high:true },
  { id:"20x8x8.5", L:20, W:8, H:8.5, high:false },
  { id:"20x8x9.5", L:20, W:8, H:9.5, high:true },
  { id:"40x8x8.5", L:40, W:8, H:8.5, high:false },
  { id:"40x8x9.5", L:40, W:8, H:9.5, high:true }
];

const GOAL_HINTS = {
  "Surface water NPDES": { bod:30,cod:60,tss:30,tds:1000,og:10,tn:10,nh3:2,tp:1,ph:7,fc:200,turb:5,met:0.5, use:{bod:1,cod:1,tss:1,tds:0,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:0,met:0} },
  "EPA secondary 30/30": { bod:30,cod:100,tss:30,tds:1000,og:15,tn:20,nh3:10,tp:5,ph:7,fc:200,turb:10,met:1, use:{bod:1,cod:0,tss:1,tds:0,og:0,tn:0,nh3:0,tp:0,ph:1,fc:1,turb:0,met:0} },
  "Nutrient-limited receiving water": { bod:10,cod:30,tss:10,tds:1000,og:5,tn:3,nh3:1,tp:0.3,ph:7,fc:126,turb:2,met:0.3, use:{bod:1,cod:1,tss:1,tds:0,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:1,met:0} },
  "Unrestricted urban reuse": { bod:10,cod:20,tss:2,tds:500,og:5,tn:10,nh3:2,tp:1,ph:7,fc:2.2,turb:2,met:0.2, use:{bod:1,cod:1,tss:1,tds:1,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:1,met:0} },
  "Restricted irrigation reuse": { bod:20,cod:40,tss:15,tds:1000,og:10,tn:15,nh3:5,tp:2,ph:7,fc:23,turb:5,met:0.5, use:{bod:1,cod:1,tss:1,tds:0,og:1,tn:0,nh3:0,tp:0,ph:1,fc:1,turb:1,met:0} },
  "Industrial reuse / boiler": { bod:5,cod:10,tss:1,tds:200,og:1,tn:5,nh3:1,tp:0.2,ph:7.5,fc:2.2,turb:1,met:0.1, use:{bod:1,cod:1,tss:1,tds:1,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:1,met:1} },
  "Groundwater recharge": { bod:5,cod:10,tss:1,tds:500,og:1,tn:5,nh3:1,tp:0.5,ph:7,fc:2.2,turb:1,met:0.1, use:{bod:1,cod:1,tss:1,tds:1,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:1,met:1} },
  "Deep-well injection": { bod:50,cod:150,tss:30,tds:35000,og:15,tn:40,nh3:20,tp:5,ph:7,fc:200,turb:10,met:1, use:{bod:1,cod:1,tss:1,tds:0,og:1,tn:0,nh3:0,tp:0,ph:1,fc:0,turb:0,met:1} },
  "Sewer discharge / pretreatment": { bod:250,cod:500,tss:250,tds:2000,og:50,tn:40,nh3:25,tp:10,ph:7,fc:1e6,turb:50,met:1, use:{bod:0,cod:1,tss:1,tds:0,og:1,tn:0,nh3:0,tp:0,ph:1,fc:0,turb:0,met:1} },
  "Zero liquid discharge": { bod:5,cod:10,tss:1,tds:50,og:1,tn:2,nh3:1,tp:0.1,ph:7,fc:2.2,turb:1,met:0.05, use:{bod:1,cod:1,tss:1,tds:1,og:1,tn:1,nh3:1,tp:1,ph:1,fc:1,turb:1,met:1} }
};

const $ = (id) => document.getElementById(id);
const num = (id, d=0) => {
  const el = $(id); if (!el) return d;
  const v = parseFloat(el.value);
  return Number.isFinite(v) ? v : d;
};
const on = (id) => { const el = $(id); return !!(el && el.checked); };
const val = (id, d="") => { const el = $(id); return el ? el.value : d; };
const fmt = (n, d=1) => Number.isFinite(n) ? n.toLocaleString(undefined,{maximumFractionDigits:d,minimumFractionDigits:0}) : "—";
const fmtSci = (n) => !Number.isFinite(n) ? "—" : (n >= 10000 ? n.toExponential(2) : fmt(n,1));
const m3ToGal = (m3) => m3 * 264.172;
const m3ToFt3 = (m3) => m3 * 35.3147;

function isoUsable(box) {
  return {
    ...box,
    uL: Math.max(1, box.L - 0.33),
    uW: Math.max(1, box.W - 0.30),
    uH: Math.max(1, box.H - 0.80)
  };
}

function collectInputs() {
  const boxes = ISO_BOXES.filter(b => {
    const el = $("iso_"+b.id.replace(/x/g,"_"));
    return el ? el.checked : true;
  });
  const stream = val("stream","Municipal sewage"), goal = val("goal","Surface water NPDES");
  const adf = Math.max(0, num("adf", 1));
  const pf = Math.max(1, num("pf", 3));
  const i = {
    project: val("project"), client: val("client"), contact: val("designer") || val("contact"),
    email: val("email"), phone: val("phone"), date: val("date"), note: val("note"),
    stream, goal, adf, pf, phf: adf * pf, temp: num("temp", 15),
    bioPref: val("bio_pref","Auto-select"),
    disPref: val("dis_pref","UV"),
    pchem: val("pchem","Alum"),
    redun: val("redun","N+1 duty/standby"),
    foot: val("foot","Balanced"),
    anaPref: val("ana_pref","Auto"),
    forceFilt: val("force_filt","No"),
    aerator: val("aerator","COG (Water Services default)"),
    tankType: val("tank_type","ISO containerized plant"),
    minDepth: num("min_depth", 4),
    maxDepth: num("max_depth", 8),
    isoAllowed: boxes.length ? boxes : ISO_BOXES.slice(),
    bod_in: num("bod_in"), bod_out: num("bod_out"), bod_lim: on("bod_lim"),
    cod_in: num("cod_in"), cod_out: num("cod_out"), cod_lim: on("cod_lim"),
    tss_in: num("tss_in"), tss_out: num("tss_out"), tss_lim: on("tss_lim"),
    tds_in: num("tds_in"), tds_out: num("tds_out"), tds_lim: on("tds_lim"),
    og_in: num("og_in"), og_out: num("og_out"), og_lim: on("og_lim"),
    tn_in: num("tn_in"), tn_out: num("tn_out"), tn_lim: on("tn_lim"),
    nh3_in: num("nh3_in"), nh3_out: num("nh3_out"), nh3_lim: on("nh3_lim"),
    tp_in: num("tp_in"), tp_out: num("tp_out"), tp_lim: on("tp_lim"),
    ph_in: num("ph_in"), ph_out: num("ph_out"), ph_lim: on("ph_lim"),
    fc_in: num("fc_in"), fc_out: num("fc_out"), fc_lim: on("fc_lim"),
    turb_in: num("turb_in"), turb_out: num("turb_out"), turb_lim: on("turb_lim"),
    met_in: num("met_in"), met_out: num("met_out"), met_lim: on("met_lim")
  };
  i.bodcod = i.cod_in > 0 ? i.bod_in / i.cod_in : 0;
  i.q_m3d = i.adf * C.m3d_per_mgd;
  i.q_m3h = i.q_m3d / 24;
  i.q_gpm = i.adf * C.gpm_per_mgd;
  i.qpk_gpm = i.phf * C.gpm_per_mgd;
  if (i.maxDepth < i.minDepth) i.maxDepth = i.minDepth;
  return i;
}

function decide(i) {
  const d = {};
  d.screen = !(i.stream === "Cooling tower blowdown" || (i.tss_in < 20 && i.stream === "Greywater"));
  d.eq = i.pf >= 2.5 || ["Food & beverage","Textile / dye","Pharmaceutical","Metal finishing","Pulp & paper"].includes(i.stream);
  d.grit = ["Municipal sewage","Stormwater runoff","Agricultural / CAFO"].includes(i.stream);
  d.api = i.og_in >= C.og_api && i.og_in < C.og_daf;
  d.daf = i.og_in >= C.og_daf || i.stream === "Food & beverage" || (i.stream === "Oil & gas produced water" && i.og_in >= C.og_api) || (i.og_lim && i.og_in - i.og_out > 40);
  d.metals = i.stream === "Metal finishing" || (i.met_lim && i.met_in >= C.met_trig && i.met_in > i.met_out);
  d.ph = (i.ph_lim && (i.ph_in < 6 || i.ph_in > 9)) || (d.metals && i.ph_in < 8.5) || i.stream === "Metal finishing";
  d.ana = i.anaPref === "Yes" || (i.anaPref === "Auto" && i.cod_in >= C.cod_ana && i.bodcod >= C.bodcod_cut &&
    ["Food & beverage","Agricultural / CAFO","Pulp & paper","Pharmaceutical","Landfill leachate"].includes(i.stream));
  d.aerobic = (i.bod_lim && i.bod_in > i.bod_out + C.bod_trig) ||
    (i.cod_lim && i.cod_in > i.cod_out + 50 && i.bodcod >= C.bodcod_cut) ||
    (i.nh3_lim && i.nh3_in > i.nh3_out + C.nh3_gap) ||
    (i.tn_lim && i.tn_in > i.tn_out + C.tn_gap);
  d.nit = (i.nh3_lim && i.nh3_in > i.nh3_out + C.nh3_gap) || (i.tn_lim && i.tn_in > i.tn_out + C.tn_gap);
  d.denit = i.tn_lim && i.tn_in > i.tn_out + C.tn_gap;
  d.biop = i.tp_lim && i.tp_in > i.tp_out + C.tp_gap && i.tp_out >= C.tp_chem && (i.pchem === "Auto (bio-P first)" || i.pchem === "None");
  d.chemp = i.tp_lim && (i.tp_out < C.tp_chem || (i.tp_in > i.tp_out && (i.pchem === "Alum" || i.pchem === "Ferric chloride")) || (i.tp_in > i.tp_out + C.tp_gap && !d.biop));
  d.mbr = i.bioPref === "MBR" || (i.bioPref === "Auto-select" && d.aerobic && (
    (i.tss_lim && i.tss_out <= C.tss_uf) || (i.turb_lim && i.turb_out <= 1) ||
    i.goal === "Unrestricted urban reuse" || i.goal === "Groundwater recharge" || i.foot === "Minimize footprint"));
  d.primary = ((i.tss_in >= C.tss_prim && i.adf >= C.q_prim && !d.mbr) || (i.tss_in >= 250 && !d.daf && !d.mbr));
  d.cept = d.primary && ((i.tp_lim && i.tp_in - i.tp_out > C.tp_gap) || i.tss_in >= 400);
  d.mbbr = i.bioPref === "MBBR" || (i.bioPref === "Auto-select" && d.aerobic && !d.mbr && i.foot === "Minimize footprint" && i.adf <= 5);
  d.secclar = d.aerobic && !d.mbr;
  d.ro = i.goal === "Zero liquid discharge" || i.goal === "Industrial reuse / boiler" || i.goal === "Groundwater recharge" ||
    (i.tds_lim && i.tds_in - i.tds_out >= C.tds_ro) || (i.tds_lim && i.tds_out <= 500 && i.tds_in > 600);
  d.uf = (!d.mbr && ((i.tss_lim && i.tss_out <= C.tss_uf) || (i.turb_lim && i.turb_out <= 1) ||
    i.goal === "Unrestricted urban reuse" || i.goal === "Groundwater recharge" || i.goal === "Industrial reuse / boiler")) || (d.ro && !d.mbr);
  d.sand = i.forceFilt === "Yes" || (i.tss_lim && i.tss_out <= C.tss_filt && !d.mbr && !d.uf) ||
    (i.turb_lim && i.turb_out <= 5 && !d.mbr && !d.uf) || (d.chemp && !d.mbr && !d.uf);
  d.disc = d.sand && i.foot === "Minimize footprint";
  d.gac = (i.cod_lim && (i.bodcod < C.bodcod_cut || i.cod_out <= 40) && i.cod_in > i.cod_out) ||
    ["Pharmaceutical","Textile / dye","Landfill leachate"].includes(i.stream) ||
    (i.goal === "Unrestricted urban reuse" && i.cod_lim);
  d.ix = d.metals && i.met_lim && i.met_out <= 0.1;
  d.evap = i.goal === "Zero liquid discharge" || (i.tds_in >= C.tds_zld && i.tds_lim);
  d.dis = i.disPref !== "None" || (i.fc_lim && i.fc_out < i.fc_in) ||
    ["Unrestricted urban reuse","Restricted irrigation reuse","Surface water NPDES","EPA secondary 30/30","Nutrient-limited receiving water","Groundwater recharge"].includes(i.goal);
  d.cart = d.uf || d.ro;
  d.fine = d.mbr || d.mbbr || d.sand || d.uf || d.ro || (d.screen && ["Municipal sewage","Food & beverage","Pharmaceutical"].includes(i.stream));
  d.useCog = !String(i.aerator||"").toLowerCase().includes("blower");

  let family = "None — no aerobic biology required";
  if (d.aerobic) {
    if (i.bioPref !== "Auto-select") family = i.bioPref;
    else if (d.mbr) family = "MBR";
    else if (d.mbbr) family = "MBBR";
    else if (d.denit && i.tn_out <= 3) family = "Bardenpho / A2O";
    else if (d.denit) family = "MLE BNR";
    else if (i.adf <= C.sbr_q) family = "SBR";
    else if (d.nit && i.adf <= C.ditch_q) family = "Oxidation ditch";
    else if (d.nit) family = "Extended aeration";
    else family = "Conventional activated sludge";
  }
  d.family = family;
  d.disSel = d.dis ? i.disPref : "None";
  d.pchemSel = d.chemp ? (i.pchem === "Auto (bio-P first)" ? "Alum polish" : i.pchem) : "None";
  return d;
}

function size(i, d) {
  const s = {};
  const nPlus = i.redun !== "N duty only";
  const split = i.redun === "2 x 50% trains";
  s.screen_mm = d.fine ? C.fine_mm : C.coarse_mm;
  s.grit_ft3 = d.grit ? i.qpk_gpm * (C.grit_hrt_s/60) / 7.481 : 0;
  s.grit_n = d.grit ? Math.max(1, Math.ceil(i.phf / C.vortex_mgd)) : 0;
  s.eq_h = munLike.has(i.stream) ? C.eq_h_mun : C.eq_h_ind;
  s.eq_m3 = d.eq ? i.q_m3d * s.eq_h / 24 : 0;
  s.eq_gal = s.eq_m3 * 264.172;
  s.cpi_sf = d.api ? i.qpk_gpm / C.cpi_gpm_sf : 0;
  s.api_gal = d.api ? i.qpk_gpm * C.api_min : 0;
  s.daf_sf = d.daf ? i.qpk_gpm / C.daf_gpm_sf : 0;
  s.daf_n = d.daf ? Math.max(1, Math.ceil(s.daf_sf / 200)) : 0;
  const primA = d.primary ? Math.max(i.adf*1e6/C.prim_sor_adf, i.phf*1e6/C.prim_sor_pk) : 0;
  s.prim_sf = primA;
  s.prim_n = d.primary ? Math.max(2, Math.ceil(primA / (Math.PI * Math.pow(C.max_dia/2,2)))) : 0;
  s.prim_dia = s.prim_n ? Math.sqrt(4*(primA/s.prim_n)/Math.PI) : 0;
  s.prim_m3 = d.primary ? primA * (i.tankType === "Circular / round" ? C.prim_swd : Math.min(i.maxDepth, C.prim_swd)) / 35.3147 : 0;
  s.uasb_m3 = d.ana ? (i.q_m3d * i.cod_in / 1000) / C.uasb : 0;
  let lv = C.lv_as;
  if (d.family === "MBR") lv = C.lv_mbr;
  else if (d.family === "MBBR") lv = C.lv_mbbr;
  else if (d.family === "MLE BNR" || d.family === "Bardenpho / A2O") lv = C.lv_bnr;
  else if (["Extended aeration","Oxidation ditch","SBR"].includes(d.family)) lv = C.lv_ea;
  s.lv = lv;
  const bodLoad = i.q_m3d/1000 * i.bod_in * (d.daf ? 1-R.daf_bod : 1) * (d.primary ? 1-R.prim_bod : 1) * (d.ana ? 1-R.ana_bod : 1);
  s.bod_load = bodLoad;
  s.v_bio = d.aerobic && lv > 0 ? bodLoad / lv : 0;
  s.hrt = s.v_bio && i.q_m3d ? s.v_bio / i.q_m3d * 24 : 0;
  s.srt = !d.aerobic ? 0 : (d.denit || d.biop ? C.srt_bnr : d.nit ? C.srt_n : C.srt_c);
  s.mlss = d.family === "MBR" ? C.mlss_mbr : (d.nit || d.denit ? C.mlss_bnr : C.mlss_as);
  s.fm = s.v_bio && s.mlss ? bodLoad / (s.v_bio * s.mlss / 1000) : 0;
  s.v_ax = d.denit ? s.v_bio * C.fax : 0;
  s.v_an = d.biop ? s.v_bio * C.fan : 0;
  s.v_ox = Math.max(0, s.v_bio - s.v_ax - s.v_an);
  s.aor = (d.aerobic ? bodLoad * C.o2_bod : 0) + (d.nit ? i.q_m3d * i.nh3_in / 1000 * C.o2_nh3 * 0.9 : 0);
  s.aor_lb = s.aor * 2.20462;
  s.air = s.aor * C.air_nm3;
  s.kw_blower = C.sae ? s.aor / C.sae / 24 : 0;
  s.sbr_n = d.family === "SBR" ? Math.max(2, Math.ceil(24 / C.sbr_cycle)) : 0;
  s.trains = d.aerobic ? (split ? 2 : i.adf >= 5 ? 2 : 1) : 0;
  const secA_sor = d.secclar ? i.phf * 1e6 / C.sec_sor : 0;
  const solids = d.secclar ? i.phf * s.mlss * 8.34 : 0;
  const secA_slr = d.secclar ? solids / C.sec_slr : 0;
  s.sec_sf = Math.max(secA_sor, secA_slr);
  s.sec_n = d.secclar ? Math.max(2, Math.ceil(s.sec_sf / (Math.PI * Math.pow(C.max_dia/2,2)))) : 0;
  s.sec_dia = s.sec_n ? Math.sqrt(4*(s.sec_sf/s.sec_n)/Math.PI) : 0;
  s.sec_m3 = d.secclar ? s.sec_sf * Math.min(i.maxDepth, C.sec_swd) / 35.3147 : 0;
  s.alum_mgl = d.chemp ? Math.max(0, i.tp_in - i.tp_out) * C.al_p * (26.98/30.97) * (C.alum_mw/53.96) : 0;
  s.alum_kgd = i.q_m3d * s.alum_mgl / 1000;
  s.pH_dose = d.ph ? (i.ph_in < 6 ? C.lime*(6-i.ph_in) : i.ph_in > 9 ? C.acid*(i.ph_in-9) : d.metals ? C.lime*Math.max(0,9.5-i.ph_in) : 20) : 0;
  s.met_sludge = d.metals ? i.q_m3d * i.met_in / 1000 * 3 * C.metals_x : 0;
  const qf = i.foot === "Minimize footprint" ? C.filt_press : C.filt_grav;
  s.filt_sf = (d.sand || d.disc) ? i.qpk_gpm / qf : 0;
  s.filt_duty = s.filt_sf ? Math.max(2, Math.ceil(s.filt_sf / C.cell_sf)) : 0;
  s.filt_stby = s.filt_duty ? (nPlus ? C.standby : 0) : 0;
  s.filt_each = s.filt_duty ? s.filt_sf / s.filt_duty : 0;
  s.gac_ft3 = d.gac ? i.qpk_gpm * C.gac_ebct / 7.481 : 0;
  s.gac_sf = d.gac ? i.qpk_gpm / C.gac_gpm_sf : 0;
  s.gac_duty = s.gac_sf ? Math.max(2, Math.ceil(s.gac_sf / C.gac_sf)) : 0;
  s.gac_tot = s.gac_duty ? (nPlus ? s.gac_duty + 1 : s.gac_duty) : 0;
  s.gac_dia = s.gac_duty ? Math.sqrt(4*(s.gac_sf/s.gac_duty)/Math.PI) : 0;
  s.cart_el = d.cart ? Math.max(3, Math.ceil(i.qpk_gpm / C.cart_gpm)) : 0;
  s.cart_h = s.cart_el ? Math.max(1, Math.ceil(s.cart_el / 6)) : 0;
  const ufQ = (d.uf || d.family === "MBR") ? i.q_m3h * C.uf_y : 0;
  s.uf_m2 = ufQ ? ufQ * 1000 / C.uf_lmh : 0;
  s.uf_mod = s.uf_m2 ? Math.max(2, Math.ceil(s.uf_m2 / C.uf_mod)) : 0;
  s.uf_trains = s.uf_mod ? (s.uf_mod <= 20 ? 1 : 2) : 0;
  s.ro_y = d.ro ? (i.tds_in >= C.tds_hi ? C.ro_y_hi : C.ro_y) : 0;
  s.ro_feed = d.ro ? ((d.uf || d.family === "MBR") ? ufQ : i.q_m3h) : 0;
  s.ro_perm = s.ro_feed * s.ro_y;
  s.ro_conc = s.ro_feed - s.ro_perm;
  s.ro_m2 = s.ro_perm ? s.ro_perm * 1000 / C.ro_lmh : 0;
  s.ro_el = s.ro_m2 ? Math.max(6, Math.ceil(s.ro_m2 / C.ro_el)) : 0;
  s.ro_psi = d.ro ? (i.tds_in >= C.tds_hi ? C.ro_psi_hi : C.ro_psi) : 0;
  s.ro_pv = s.ro_el ? Math.max(1, Math.ceil(s.ro_el / 6)) : 0;
  s.evap = d.evap ? (s.ro_conc > 0 ? s.ro_conc : i.q_m3h) : 0;
  s.cl2_gal = (d.dis && (d.disSel === "Chlorine / hypochlorite" || d.disSel === "UV + chlorine residual")) ? i.qpk_gpm * C.cl2_min : 0;
  s.uv_dose = (d.dis && (d.disSel === "UV" || d.disSel === "UV + chlorine residual"))
    ? ((i.goal === "Unrestricted urban reuse" || i.goal === "Groundwater recharge") ? C.uv_reuse : C.uv_sec) : 0;
  s.o3_kgd = (d.dis && d.disSel === "Ozone") ? i.q_m3d * C.o3 / 1000 : 0;
  s.ps = d.primary ? i.q_m3d * i.tss_in / 1000 * R.prim_tss : 0;
  s.was = d.aerobic ? bodLoad * 0.6 : 0;
  s.chemsl = s.alum_kgd * 0.35 + (i.q_m3d * i.tp_in / 1000) * 2 + s.met_sludge;
  s.sludge = s.ps + s.was + s.chemsl;
  s.nPlus = nPlus;
  s.split = split;
  return s;
}

function sizeCogs(i, d, s) {
  const out = { duty: [], standby: [], total_o2: 0, total_kw: 0, total_hp: 0, note: "" };
  if (!d.aerobic) { out.note = "No aerobic oxygen demand."; return out; }
  let need = s.aor_lb;
  const lagoon = ["Agricultural / CAFO"].includes(i.stream) || i.tankType === "Existing lagoon / pond";
  const pack = [...COG_MODELS].sort((a,b) => b.o2_lb_d - a.o2_lb_d);
  const pickPool = lagoon ? pack.filter(m => m.hp >= 1) : pack;
  const counts = {};
  while (need > 0.25) {
    const model = pickPool.find(m => m.o2_lb_d <= Math.max(need, 5.5) * 1.05) || pickPool[pickPool.length-1];
    counts[model.id] = (counts[model.id] || 0) + 1;
    need -= model.o2_lb_d;
    if (counts[model.id] > 200) break;
  }
  for (const m of COG_MODELS) {
    const n = counts[m.id] || 0;
    if (!n) continue;
    out.duty.push({ ...m, qty: n });
    out.total_o2 += n * m.o2_lb_d;
    out.total_kw += n * m.kw;
    out.total_hp += n * m.hp;
  }
  if (s.nPlus && out.duty.length) {
    const largest = out.duty[0];
    out.standby.push({ ...largest, qty: 1 });
  }
  out.note = `Manufacturer rating ${fmt(out.total_o2,0)} lb O₂/d vs process AOR ${fmt(s.aor_lb,0)} lb O₂/d. Vacuum microbubbles (~0.25 mm). Motor must stay dry; air tube ~12 in into water; never run dry.`;
  return out;
}

function liquidDepth(i, box) {
  const head = i.tankType === "ISO containerized plant" ? 2.25 : 1.25;
  const cap = box ? box.uH - head : i.maxDepth;
  let z = Math.min(i.maxDepth, cap);
  z = Math.max(i.minDepth, z);
  return Math.max(2.5, z);
}

function tankFootprint(vol_m3, depth_ft, shape) {
  const ft3 = m3ToFt3(vol_m3);
  if (ft3 <= 0) return { sf: 0, L: 0, W: 0, D: 0, dia: 0 };
  const D = depth_ft;
  if (shape === "round") {
    const dia = Math.sqrt(4 * ft3 / (Math.PI * D));
    return { sf: Math.PI * dia * dia / 4, L: dia, W: dia, D, dia };
  }
  const sf = ft3 / D;
  const W = Math.min(7.7, Math.sqrt(sf));
  const L = sf / W;
  return { sf, L, W, D, dia: 0 };
}

function packContainers(i, d, s) {
  const allowed = (i.isoAllowed || ISO_BOXES).map(isoUsable);
  const shape = i.tankType === "Circular / round" ? "round" : "rect";
  const modules = [];
  const addWet = (name, m3, kind) => {
    if (m3 > 0.05) modules.push({ name, kind, m3, gal: m3ToGal(m3), ft3: m3ToFt3(m3) });
  };
  const addSkid = (name, sf) => { if (sf > 0) modules.push({ name, kind:"skid", sf, m3:0, gal:0, ft3:0 }); };

  addWet("Equalization", s.eq_m3, "wet");
  addWet("API / CPI chamber", s.api_gal / 264.172, "wet");
  addWet("Primary settling", s.prim_m3, "wet");
  addWet("Metals / pH reactor", d.metals || d.ph ? Math.max(2, i.q_m3h * 0.5) : 0, "wet");
  addWet("Anaerobic reactor", s.uasb_m3, "wet");
  addWet("Anoxic zone", s.v_ax, "wet");
  addWet("Anaerobic Bio-P zone", s.v_an, "wet");
  addWet("Aerobic bioreactor", s.v_ox || s.v_bio, "wet");
  addWet("Secondary settling", s.sec_m3, "wet");
  addWet("Chlorine contact", s.cl2_gal / 264.172, "wet");
  addWet("Sludge holding", s.sludge > 50 ? Math.max(5, s.sludge / 20) : 0, "wet");
  addSkid("Screening / grit", (d.screen||d.grit||d.fine) ? 40 : 0);
  addSkid("DAF package", d.daf ? Math.max(80, s.daf_sf * 0.4) : 0);
  addSkid("Media / disc filters", (d.sand||d.disc) ? Math.max(60, s.filt_sf * 0.3) : 0);
  addSkid("GAC vessels", d.gac ? Math.max(40, s.gac_sf * 0.5) : 0);
  addSkid("UF / MBR skid", (d.uf||d.mbr) ? 80 : 0);
  addSkid("RO / NF skid", d.ro ? 90 : 0);
  addSkid("UV / chemical room", d.dis ? 30 : 0);
  addSkid("MCC / controls", 25);

  const boxes = [];
  const splitWet = [];
  for (const m of modules.filter(x => x.kind === "wet")) {
    const largest = allowed.slice().sort((a,b)=> (b.uL*b.uW*(b.uH-2.25)) - (a.uL*a.uW*(a.uH-2.25)))[0];
    const depth = liquidDepth(i, largest);
    const capFt3 = largest.uL * largest.uW * depth * 0.90;
    const n = Math.max(1, Math.ceil(m.ft3 / capFt3));
    for (let k=0;k<n;k++) {
      const piece = { ...m, ft3: m.ft3 / n, gal: m.gal / n, m3: m.m3 / n, part: n>1 ? `${k+1}/${n}` : "" };
      piece.geo = tankFootprint(piece.m3, depth, shape === "round" && i.tankType !== "ISO containerized plant" ? "round" : "rect");
      piece.depth = depth;
      splitWet.push(piece);
    }
  }
  const skids = modules.filter(x => x.kind === "skid");

  function bestBoxFor(sf, depth) {
    const fits = allowed
      .map(b => ({ b, floor: b.uL * b.uW, okH: liquidDepth(i,b) + 2.0 <= b.uH + 0.05 || depth <= b.uH - 2.0 }))
      .filter(x => x.okH && x.floor >= sf * 1.08)
      .sort((a,b) => a.floor - b.floor);
    return (fits[0] || { b: allowed.slice().sort((a,b)=>b.uL*b.uW-a.uL*a.uW)[0] }).b;
  }

  for (const m of splitWet) {
    const box = bestBoxFor(m.geo.sf, m.depth);
    boxes.push({
      id: box.id, role: "process tank", modules: [m],
      usedSf: m.geo.sf, floor: box.uL*box.uW, depth: m.depth,
      L: box.L, W: box.W, H: box.H
    });
  }

  const equipQueue = skids.slice().sort((a,b)=>b.sf-a.sf);
  while (equipQueue.length) {
    const largest = allowed.slice().sort((a,b)=>b.uL*b.uW-a.uL*a.uW)[0];
    let rem = largest.uL * largest.uW * 0.85;
    const held = [];
    for (let idx=0; idx<equipQueue.length; ) {
      if (equipQueue[idx].sf <= rem) {
        rem -= equipQueue[idx].sf;
        held.push(equipQueue.splice(idx,1)[0]);
      } else idx++;
    }
    if (!held.length) {
      const one = equipQueue.shift();
      held.push(one);
    }
    const used = held.reduce((a,x)=>a+x.sf,0);
    const box = bestBoxFor(used, 0);
    boxes.push({ id: box.id, role: "equipment skid", modules: held, usedSf: used, floor: box.uL*box.uW, depth: 0, L: box.L, W: box.W, H: box.H });
  }

  const summary = {};
  boxes.forEach(b => { summary[b.id] = (summary[b.id]||0)+1; });
  return {
    modules: splitWet.concat(skids),
    boxes,
    summary,
    total: boxes.length,
    note: i.tankType === "ISO containerized plant"
      ? `Plant packaged in ${boxes.length} intermodal box${boxes.length===1?"":"es"} using ${allowed.map(b=>b.id).join(", ")}.`
      : `Tank shape ${i.tankType}; min/max water ${i.minDepth}–${i.maxDepth} ft.`
  };
}

function massBalance(i, d) {
  const step = (c, flag, r) => c * (flag ? (1 - r) : 1);
  let bod=i.bod_in, cod=i.cod_in, tss=i.tss_in, tds=i.tds_in, og=i.og_in, tn=i.tn_in, nh3=i.nh3_in, tp=i.tp_in, ph=i.ph_in, fc=i.fc_in, turb=i.turb_in, met=i.met_in;
  tss = step(tss, d.screen, R.screen_tss); tss = step(tss, d.grit, R.grit_tss); turb = step(turb, d.screen, R.screen_tss);
  bod = step(bod, d.daf, R.daf_bod); cod = step(cod, d.daf, R.daf_bod*0.7);
  tss = step(tss, d.api, R.api_tss); tss = step(tss, d.daf, R.daf_tss);
  og = step(og, d.api, R.api_og); og = step(og, d.daf, R.daf_og);
  tp = step(tp, d.daf, 0.10); turb = step(turb, d.daf, R.daf_tss);
  bod = step(bod, d.primary, R.prim_bod); cod = step(cod, d.primary, R.prim_bod*0.8);
  tss = step(tss, d.primary, R.prim_tss); tss = step(tss, d.metals, 0.30);
  og = step(og, d.primary, R.prim_og); tn = step(tn, d.primary, 0.10);
  tp = step(tp, d.primary, R.prim_tp); tp = step(tp, d.cept, 0.30);
  if (d.ph) ph = Math.max(6, Math.min(9, i.ph_out || 7));
  fc = step(fc, d.primary, 0.50); turb = step(turb, d.primary, R.prim_tss);
  met = step(met, d.metals, R.metals);
  bod = step(bod, d.ana, R.ana_bod); cod = step(cod, d.ana, R.ana_cod);
  tss = step(tss, d.ana, 0.20); tn = step(tn, d.ana, 0.15);
  if (d.ana) nh3 *= 1.1; tp = step(tp, d.ana, 0.10);
  bod = step(bod, d.aerobic, R.aer_bod); cod = step(cod, d.aerobic, R.aer_bod*0.85);
  if (d.family === "MBR") tss = step(tss, true, R.mbr_tss);
  else if (d.secclar || d.aerobic) tss = step(tss, true, R.aer_tss);
  og = step(og, d.aerobic, 0.30);
  if (d.denit) tn = step(tn, true, d.family === "Bardenpho / A2O" ? R.tn_bp : R.tn_mle);
  else tn = step(tn, d.aerobic, R.tn_as);
  nh3 = d.nit ? step(nh3, true, R.nh3) : step(nh3, d.aerobic, 0.30);
  tp = d.biop ? step(tp, true, R.tp_bio) : step(tp, d.aerobic, R.tp_as);
  fc = step(fc, d.aerobic, 0.90);
  turb = d.family === "MBR" ? step(turb, true, R.mbr_tss) : step(turb, d.aerobic, R.aer_tss);
  met = step(met, d.aerobic, 0.30);
  bod = step(bod, d.sand||d.disc, R.sand_bod); bod = step(bod, d.gac, R.gac_bod);
  cod = step(cod, d.gac, R.gac_cod); cod = step(cod, d.sand||d.disc, 0.10);
  tss = step(tss, d.sand||d.disc, R.sand_tss); og = step(og, d.sand||d.disc, 0.30);
  tp = step(tp, d.chemp, R.tp_chem); fc = step(fc, d.sand||d.disc, 0.50);
  turb = step(turb, d.sand||d.disc, R.sand_tss); met = step(met, d.sand||d.disc, 0.40);
  bod = step(bod, d.ro, R.ro_cod); bod = step(bod, d.uf || d.family==="MBR", 0.30);
  cod = step(cod, d.ro, R.ro_cod);
  tss = step(tss, d.uf || d.family==="MBR", R.uf_tss);
  tds = step(tds, d.ro, R.ro_tds);
  og = step(og, d.ro, 0.80); og = step(og, d.uf || d.family==="MBR", 0.70);
  tn = step(tn, d.ro, 0.70); nh3 = step(nh3, d.ro, 0.70); tp = step(tp, d.ro, 0.80);
  if (d.dis) fc *= Math.pow(10, -R.uv_log);
  fc = step(fc, d.uf || d.family==="MBR", 0.99);
  turb = step(turb, d.uf || d.family==="MBR", R.uf_turb);
  met = step(met, d.ix, R.ix); met = step(met, d.ro, 0.95);
  const rows = [
    ["BOD5", bod, i.bod_out, i.bod_lim, "mg/L"],
    ["COD", cod, i.cod_out, i.cod_lim, "mg/L"],
    ["TSS", tss, i.tss_out, i.tss_lim, "mg/L"],
    ["TDS", tds, i.tds_out, i.tds_lim, "mg/L"],
    ["Oil & grease", og, i.og_out, i.og_lim, "mg/L"],
    ["TN", tn, i.tn_out, i.tn_lim, "mg/L"],
    ["NH3-N", nh3, i.nh3_out, i.nh3_lim, "mg/L"],
    ["TP", tp, i.tp_out, i.tp_lim, "mg/L"],
    ["pH", ph, i.ph_out, i.ph_lim, "s.u."],
    ["Fecal coliform", fc, i.fc_out, i.fc_lim, "MPN/100 mL"],
    ["Turbidity", turb, i.turb_out, i.turb_lim, "NTU"],
    ["Metals", met, i.met_out, i.met_lim, "mg/L"]
  ];
  return rows.map(([name, pred, tgt, lim, unit]) => {
    let st = "LIMIT OFF";
    if (lim) {
      if (name === "pH") st = (pred >= 6 && pred <= 9) ? "PASS" : "SHORTFALL";
      else st = pred <= tgt * 1.001 ? "PASS" : "SHORTFALL";
    }
    return { name, pred, tgt, lim, unit, st };
  });
}

function equipment(i, d, s, cog) {
  const items = [];
  const add = (tag, name, req, duty, stby, type, size) => {
    if (!req) return;
    items.push({ tag, name, duty, stby, type, size });
  };
  add("EQ-01","Coarse bar screen", d.screen, s.split?2:1, s.nPlus?1:0, `Mechanically cleaned bar, ${C.coarse_mm} mm`, `${fmt(i.phf,2)} MGD peak`);
  add("EQ-02","Fine screen", d.fine, 1, s.nPlus?1:0, `Rotary drum / step screen, ${C.fine_mm} mm`, `${fmt(i.phf,2)} MGD peak`);
  add("EQ-03","Grit removal", d.grit, s.grit_n, (s.nPlus && s.grit_n<2)?1:0, "Vortex degritter or aerated grit", `${fmt(s.grit_ft3,0)} ft³ chamber`);
  add("EQ-04","Equalization tank", d.eq, 1, 0, i.tankType, `${fmt(s.eq_gal,0)} gal (${fmt(s.eq_h,1)} h)`);
  add("EQ-05","pH adjustment skid", d.ph, 1, 0, "In-line mixer + dual chemical feed", `~${fmt(s.pH_dose,0)} mg/L reagent (jar test)`);
  add("EQ-06","API / CPI separator", d.api, 1, 0, "Coalescing-plate interceptor", `${fmt(s.cpi_sf,0)} sf`);
  add("EQ-07","Dissolved air flotation", d.daf, s.daf_n, s.nPlus?1:0, "Packaged DAF + saturator", `${fmt(s.daf_sf,0)} sf`);
  add("EQ-08","Primary clarifier / settler", d.primary, s.prim_n, 0, i.tankType === "Circular / round" ? "Circular scraper" : "Rectangular settler",
    i.tankType === "Circular / round" ? `${s.prim_n} × ${fmt(s.prim_dia,1)} ft` : `${fmt(s.prim_m3,0)} m³`);
  add("EQ-09","CEPT coagulant feed", d.cept, 1, 0, "Metering pump to primary influent", `${fmt(s.alum_mgl,0)} mg/L alum equiv.`);
  add("EQ-10","Metals precipitation", d.metals, 1, 0, "pH 9–9.5 hydroxide precip + clarifier", `${fmt(s.met_sludge,0)} kg/d sludge`);
  add("EQ-11","Anaerobic reactor", d.ana, 1, 0, "UASB or CSTR + biogas holder", `${fmt(s.uasb_m3,0)} m³`);
  add("EQ-12","Bioreactor", d.aerobic, Math.max(s.trains, s.sbr_n, 1), 0, d.family, `${fmt(s.v_bio,0)} m³ · HRT ${fmt(s.hrt,1)} h · SRT ${fmt(s.srt,0)} d`);
  if (d.useCog) {
    cog.duty.forEach((m, idx) => {
      add(`COG-${String(idx+1).padStart(2,"0")}`, m.id + " Vacuum Bubble® aerator", true, m.qty, 0,
        `${m.aka} · ${m.hp} hp · ${m.volt} · 0.25 mm bubbles`,
        `${m.qty} duty · ${fmt(m.o2_lb_d,1)} lb O₂/d each · sphere ~${m.sphere_ft} ft`);
    });
    if (cog.standby.length) {
      const m = cog.standby[0];
      add("COG-ST","COG standby", true, 0, m.qty, m.id + " N+1", "Keep dry; rotate into service");
    }
  } else {
    add("EQ-13","Blowers", d.aerobic, s.nPlus?2:1, s.nPlus?1:0, "Fine-bubble + turbo/PD blowers", `${fmt(s.kw_blower,0)} kW est. · ${fmt(s.aor,0)} kg O₂/d`);
  }
  add("EQ-14","Secondary clarifier / settler", d.secclar, s.sec_n, 0, i.tankType === "Circular / round" ? "Circular suction or scraper" : "Rectangular settler",
    i.tankType === "Circular / round" ? `${s.sec_n} × ${fmt(s.sec_dia,1)} ft` : `${fmt(s.sec_m3,0)} m³`);
  add("EQ-15","MBR membrane trains", d.mbr, Math.max(s.uf_trains,1), s.nPlus?1:0, "Submerged hollow-fiber or flat-sheet", `${fmt(s.uf_m2,0)} m²`);
  add("EQ-16","MBBR tanks", d.mbbr, Math.max(s.trains,1), 0, "HDPE carrier media 30–50% fill", `${fmt(s.v_bio,0)} m³`);
  add("EQ-17","Chemical P feed", d.chemp, 1, 0, d.pchemSel + " metering + mix", `${fmt(s.alum_kgd,0)} kg/d alum`);
  add("EQ-18","Granular media filters", d.sand && !d.disc, s.filt_duty, s.filt_stby, i.foot==="Minimize footprint"?"Pressure multimedia":"Gravity dual-media", `${s.filt_duty}+${s.filt_stby} cells · ${fmt(s.filt_each,0)} sf each`);
  add("EQ-19","Cloth / disc filters", d.disc, Math.max(2,s.filt_duty), s.nPlus?1:0, "Pile-cloth disc filter", `${fmt(s.filt_sf,0)} sf cloth`);
  add("EQ-20","GAC contactors", d.gac, s.gac_duty, Math.max(0,s.gac_tot-s.gac_duty), "Downflow pressure GAC, lead-lag", `${s.gac_tot} vessels · ${fmt(s.gac_dia,1)} ft dia · EBCT ${C.gac_ebct} min`);
  add("EQ-21","Cartridge guard filters", d.cart, s.cart_h, s.nPlus?1:0, `${C.cart_um} µm polypropylene`, `${s.cart_el} × 20-in elements in ${s.cart_h} housings`);
  add("EQ-22","Ultrafiltration skid", d.uf, Math.max(s.uf_trains,1), s.nPlus?1:0, "Pressurized UF, auto backwash + CEB", `${s.uf_mod} modules · ${fmt(s.uf_m2,0)} m²`);
  add("EQ-23","Ion-exchange metals polish", d.ix, 2, 0, "Lead-lag selective / chelating resin", `${fmt(i.q_gpm,0)} gpm`);
  add("EQ-24","RO / NF train", d.ro, s.split?2:1, i.redun==="N+1 duty/standby"?1:0, `Spiral-wound PA, ${fmt(s.ro_psi,0)} psi class`, `${s.ro_el} elements / ${s.ro_pv} vessels`);
  add("EQ-26","Evaporator / crystallizer", d.evap, 1, 0, "MEE + forced-circulation crystallizer", `${fmt(s.evap,2)} m³/h feed`);
  add("EQ-27","UV disinfection", d.dis && (d.disSel==="UV" || d.disSel==="UV + chlorine residual"), 1, s.nPlus?1:0, "LPHO in-channel or closed vessel", `${fmt(s.uv_dose,0)} mJ/cm²`);
  add("EQ-28","Chlorine contact", d.dis && (d.disSel==="Chlorine / hypochlorite" || d.disSel==="UV + chlorine residual"), 1, 0, "Baffled contact tank + hypo", `${fmt(s.cl2_gal,0)} gal · ${C.cl2_min} min`);
  add("EQ-29","Ozone contactor", d.dis && d.disSel==="Ozone", 1, 0, "Generator + venturi / diffuser", `${fmt(s.o3_kgd,2)} kg/d O₃`);
  add("EQ-30","Sludge thickening + dewatering", s.sludge > 50, 1, 0, "Thickener + screw press or centrifuge", `${fmt(s.sludge,0)} kg/d dry solids`);
  return items;
}

function train(d) {
  const steps = [
    [d.screen,"Coarse screening"],[d.fine,"Fine screening"],[d.grit,"Grit removal"],[d.eq,"Equalization"],
    [d.ph,"pH adjustment"],[d.api,"API / CPI"],[d.daf,"DAF"],[d.primary,"Primary clarifier"],
    [d.cept,"CEPT"],[d.metals,"Metals precipitation"],[d.ana,"Anaerobic pretreatment"],
    [d.aerobic, d.family],[d.useCog && d.aerobic,"WSI COG aeration"],[d.secclar,"Secondary clarifier"],[d.chemp,"Chemical P"],
    [d.sand && !d.disc,"Media filters"],[d.disc,"Disc filters"],[d.gac,"GAC"],
    [d.cart,"Cartridge filters"],[d.uf,"Ultrafiltration"],[d.ix,"Ion exchange"],
    [d.ro,"RO / NF"],[d.evap,"Evaporator / ZLD"],[d.dis, d.disSel]
  ];
  return steps.filter(x => x[0] && x[1] && x[1] !== "None").map(x => x[1]);
}

function designFromInputs(i) {
  const d = decide(i);
  const s = size(i, d);
  const cog = sizeCogs(i, d, s);
  const pack = packContainers(i, d, s);
  const mb = massBalance(i, d);
  const eq = equipment(i, d, s, cog);
  const tr = train(d);
  return { inputs: i, d, s, cog, pack, mb, eq, train: tr };
}

function applyPresetToForm() {
  const s = val("stream");
  const p = PRESETS[s] || PRESETS["Custom / other"];
  const map = { bod:"bod_in",cod:"cod_in",tss:"tss_in",tds:"tds_in",og:"og_in",tn:"tn_in",nh3:"nh3_in",tp:"tp_in",ph:"ph_in",fc:"fc_in",turb:"turb_in",met:"met_in" };
  if ($("load_preset") && $("load_preset").checked) {
    Object.entries(map).forEach(([k,id]) => { if ($(id)) $(id).value = p[k]; });
    if ($("temp")) $("temp").value = p.temp;
    if ($("pf")) $("pf").value = p.pf;
  }
}

function applyGoalHintsToForm() {
  const h = GOAL_HINTS[val("goal")];
  if (!h) return;
  ["bod","cod","tss","tds","og","tn","nh3","tp","ph","fc","turb","met"].forEach(k => {
    if ($(k+"_out")) $(k+"_out").value = h[k];
    if ($(k+"_lim")) $(k+"_lim").checked = !!h.use[k];
  });
}

function renderDesign(res, mount) {
  const { inputs:i, d, s, cog, pack, mb, eq } = res;
  const cogLines = cog.duty.map(m => `${m.qty} × ${m.id} (${m.hp} hp, ${fmt(m.o2_lb_d,1)} lb O₂/d)`).join("; ") || "None";
  const boxLines = Object.entries(pack.summary).map(([k,v]) => `${v} × ${k} ft`).join("; ") || "n/a";
  mount.innerHTML = `
    <div class="kpis">
      <div class="kpi"><span>Design flow</span><b>${fmt(i.adf,3)} MGD</b></div>
      <div class="kpi"><span>Peak hourly</span><b>${fmt(i.phf,3)} MGD</b></div>
      <div class="kpi"><span>ISO boxes</span><b>${pack.total}</b></div>
      <div class="kpi"><span>COG duty O₂</span><b>${fmt(cog.total_o2,0)} lb/d</b></div>
    </div>
    <p class="hint">${[i.project,i.client,i.contact,i.email,i.date].filter(Boolean).join(" · ")}</p>
    <div class="train">${res.train.join("  →  ") || "No unit processes required."}</div>
    <p class="hint">${i.stream} at ${fmt(i.adf,3)} MGD to ${i.goal}. Tanks: ${i.tankType}, water ${i.minDepth}–${i.maxDepth} ft. Aeration: ${cogLines}. Containers: ${boxLines}.</p>
    <h3>WSI COG aerators</h3>
    <p class="hint">${cog.note}</p>
    ${cog.duty.map(m => `<div class="eq-row"><div class="tag">${m.id}</div><div><strong>${m.aka}</strong><small>${m.qty} duty · ${fmt(m.o2_lb_d,1)} lb O₂/d · ${m.kw} kW · sphere ${m.sphere_ft} ft · ${m.mount}</small></div></div>`).join("")}
    ${cog.standby.length ? `<div class="eq-row"><div class="tag">STBY</div><div><strong>${cog.standby[0].id}</strong><small>${cog.standby[0].qty} standby (N+1)</small></div></div>` : ""}
    <h3>ISO container plan</h3>
    <p class="hint">${pack.note}</p>
    ${pack.boxes.map((b,n) => `<div class="box-card"><strong>Box ${n+1} — ${b.id} ft · ${b.role}</strong><div class="hint">${b.modules.map(m => m.name + (m.part?" "+m.part:"") + (m.gal?` (${fmt(m.gal,0)} gal @ ${fmt(m.depth||0,1)} ft)`:` · ${fmt(m.sf,0)} sf`)).join(" · ")}</div></div>`).join("")}
    <h3>Equipment</h3>
    ${eq.map(e => `<div class="eq-row"><div class="tag">${e.tag}</div><div><strong>${e.name}</strong><small>${e.duty} duty${e.stby?` + ${e.stby} standby`:""} · ${e.type}<br>${e.size}</small></div></div>`).join("")}
    <h3>Predicted effluent</h3>
    <table><thead><tr><th>Parameter</th><th>Predicted</th><th>Target</th><th>Status</th></tr></thead>
    <tbody>${mb.map(r => {
      const cls = r.st === "PASS" ? "badge-pass" : r.st === "SHORTFALL" ? "badge-fail" : "badge-off";
      const pred = r.name === "Fecal coliform" ? fmtSci(r.pred) : fmt(r.pred,2);
      const tgt = r.name === "Fecal coliform" ? fmtSci(r.tgt) : fmt(r.tgt,2);
      return `<tr><td>${r.name}</td><td>${pred}</td><td>${tgt} ${r.unit}</td><td><span class="badge ${cls}">${r.st}</span></td></tr>`;
    }).join("")}</tbody></table>`;
}
