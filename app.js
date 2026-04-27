/* ================================================================
   PawCals — Dog Calorie Tracker
   app.js — Complete application
   ================================================================ */

'use strict';

// ----------------------------------------------------------------
// DEFAULT FOOD LIBRARY
// ----------------------------------------------------------------
// defaultServingUnit: 'cup' | 'tbsp' | 'tsp' | 'each' | 'g'
// defaultServingAmount: number of that unit for one default serving
// defaultServingGrams: gram equivalent (used for all calorie math)
// gramsPerUnit is always derived: defaultServingGrams / defaultServingAmount
const DEFAULT_FOODS = [
  // --- Dry / Kibble (1 cup ≈ 100g for most adult dog kibble) ---
  { id:'f_d01', name:'Pedigree Adult Dry',           brand:'Pedigree',     kcalPer100g:340, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d02', name:'Royal Canin Medium Adult',     brand:'Royal Canin',  kcalPer100g:356, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d03', name:'Purina Pro Plan Adult Dry',    brand:'Purina',       kcalPer100g:395, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d04', name:'Blue Buffalo Life Protection', brand:'Blue Buffalo', kcalPer100g:370, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d05', name:"Hill's Science Diet Adult",   brand:"Hill's",       kcalPer100g:363, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d06', name:'Purina ONE SmartBlend',        brand:'Purina',       kcalPer100g:378, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d07', name:'Diamond Naturals Dry',         brand:'Diamond',      kcalPer100g:367, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d08', name:'Iams ProActive Health',        brand:'Iams',         kcalPer100g:352, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d09', name:'Wellness Complete Health Dry', brand:'Wellness',     kcalPer100g:380, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  { id:'f_d10', name:'Merrick Grain Free Dry',       brand:'Merrick',      kcalPer100g:390, defaultServingGrams:100, defaultServingUnit:'cup',  defaultServingAmount:1,    category:'kibble', source:'default' },
  // --- Wet Food (1 can ≈ 155g) ---
  { id:'f_w01', name:'Purina Pro Plan Wet (Can)',  brand:'Purina',       kcalPer100g:95,  defaultServingGrams:155, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  { id:'f_w02', name:"Hill's Science Diet Wet",   brand:"Hill's",       kcalPer100g:85,  defaultServingGrams:155, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  { id:'f_w03', name:'Royal Canin Wet Food',       brand:'Royal Canin',  kcalPer100g:90,  defaultServingGrams:155, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  { id:'f_w04', name:'Pedigree Wet Dog Food',      brand:'Pedigree',     kcalPer100g:80,  defaultServingGrams:155, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  { id:'f_w05', name:'Blue Buffalo Wet Food',      brand:'Blue Buffalo', kcalPer100g:100, defaultServingGrams:155, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  // --- Treats (each) ---
  { id:'f_t01', name:'Milk-Bone Original (Small)', brand:'Milk-Bone',    kcalPer100g:357, defaultServingGrams:7,   defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_t02', name:"Zuke's Mini Naturals",       brand:"Zuke's",       kcalPer100g:290, defaultServingGrams:3,   defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_t03', name:'Greenies Dental (Petite)',   brand:'Greenies',     kcalPer100g:327, defaultServingGrams:11,  defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_t04', name:'Blue Buffalo Bits Treats',   brand:'Blue Buffalo', kcalPer100g:280, defaultServingGrams:3,   defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_t05', name:"Beggin' Strips",             brand:'Purina',       kcalPer100g:375, defaultServingGrams:8,   defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  // --- Human Foods Safe for Dogs ---
  { id:'f_h01', name:'Chicken Breast (cooked, plain)', brand:null, kcalPer100g:165, defaultServingGrams:50, defaultServingUnit:'g',    defaultServingAmount:50,   category:'human',  source:'default' },
  { id:'f_h02', name:'Peanut Butter (unsalted)',       brand:null, kcalPer100g:588, defaultServingGrams:15, defaultServingUnit:'tbsp', defaultServingAmount:1,    category:'human',  source:'default' },
  { id:'f_h03', name:'Carrots (raw)',                  brand:null, kcalPer100g:41,  defaultServingGrams:30, defaultServingUnit:'g',    defaultServingAmount:30,   category:'human',  source:'default' },
  { id:'f_h04', name:'Blueberries (fresh)',            brand:null, kcalPer100g:57,  defaultServingGrams:20, defaultServingUnit:'g',    defaultServingAmount:20,   category:'human',  source:'default' },
  { id:'f_h05', name:'Apple (no seeds or core)',       brand:null, kcalPer100g:52,  defaultServingGrams:30, defaultServingUnit:'g',    defaultServingAmount:30,   category:'human',  source:'default' },
  { id:'f_h06', name:'Sweet Potato (cooked, plain)',   brand:null, kcalPer100g:86,  defaultServingGrams:50, defaultServingUnit:'g',    defaultServingAmount:50,   category:'human',  source:'default' },
  { id:'f_h07', name:'Salmon (cooked, plain)',         brand:null, kcalPer100g:208, defaultServingGrams:50, defaultServingUnit:'g',    defaultServingAmount:50,   category:'human',  source:'default' },
  { id:'f_h08', name:'Green Beans (plain)',            brand:null, kcalPer100g:31,  defaultServingGrams:40, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_h09', name:'White Rice (cooked)',            brand:null, kcalPer100g:130, defaultServingGrams:80, defaultServingUnit:'g',    defaultServingAmount:80,   category:'human',  source:'default' },
  { id:'f_h10', name:'Egg (cooked, plain)',            brand:null, kcalPer100g:155, defaultServingGrams:50, defaultServingUnit:'each', defaultServingAmount:1,    category:'human',  source:'default' },
  // --- User-specified foods ---
  { id:'f_u01', name:'Chicken Breast (cooked, shredded)',  brand:null,                kcalPer100g:200, defaultServingGrams:40, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u02', name:'Lean Ground Beef 90% (cooked)',      brand:null,                kcalPer100g:223, defaultServingGrams:65, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u03', name:'Carrots (cooked, chopped)',          brand:null,                kcalPer100g:33,  defaultServingGrams:40, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u04', name:'Zucchini (cooked, chopped)',         brand:null,                kcalPer100g:13,  defaultServingGrams:46, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u05', name:'Peas (cooked)',                      brand:null,                kcalPer100g:75,  defaultServingGrams:40, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u06', name:'Butternut Squash (cooked, cubed)',   brand:null,                kcalPer100g:40,  defaultServingGrams:50, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u07', name:'White Rice (cooked, ¼ cup)',         brand:null,                kcalPer100g:111, defaultServingGrams:45, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'human',  source:'default' },
  { id:'f_u08', name:"Hill's Science Diet Small Breed Dry",brand:"Hill's",            kcalPer100g:360, defaultServingGrams:25, defaultServingUnit:'cup',  defaultServingAmount:0.25, category:'kibble', source:'default' },
  { id:'f_u09', name:"Hill's Science Diet Wet Tub (3.5 oz)",brand:"Hill's",           kcalPer100g:91,  defaultServingGrams:99, defaultServingUnit:'each', defaultServingAmount:1,    category:'wet',    source:'default' },
  { id:'f_u10', name:"Stella & Chewy's Magical Dinner Dust",brand:"Stella & Chewy's", kcalPer100g:300, defaultServingGrams:5,  defaultServingUnit:'tsp',  defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_u11', name:"Stella & Chewy's Lamb Heart Treats",  brand:"Stella & Chewy's", kcalPer100g:150, defaultServingGrams:4,  defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_u12', name:"Bocce's Sunday Roast Training Bites", brand:"Bocce's Bakery",   kcalPer100g:300, defaultServingGrams:1,  defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_u13', name:'Beef Jerky Treat (dog)',               brand:null,               kcalPer100g:350, defaultServingGrams:10, defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
  { id:'f_u14', name:'Cooked Egg (whole, plain)',            brand:null,               kcalPer100g:144, defaultServingGrams:49, defaultServingUnit:'each', defaultServingAmount:1,    category:'human',  source:'default' },
  { id:'f_u15', name:'Cooked Egg White (plain)',             brand:null,               kcalPer100g:52,  defaultServingGrams:33, defaultServingUnit:'each', defaultServingAmount:1,    category:'human',  source:'default' },
  { id:'f_u16', name:'Oinkies Pig Skin Treat',               brand:'Oinkies',          kcalPer100g:500, defaultServingGrams:10, defaultServingUnit:'each', defaultServingAmount:1,    category:'treat',  source:'default' },
];

// ----------------------------------------------------------------
// STATE
// ----------------------------------------------------------------
const S = {
  // Session (sessionStorage)
  session: null, // { username, expiresAt }

  // Runtime data
  config: null,   // { auth, dog }
  foods:  [],     // food library items
  logs:   {},     // { 'YYYY-MM-DD': { entries:[], totalKcal:0 } }

  // UI
  route:          'login',     // login | setup | dashboard | foods | history | profile
  viewDate:       null,        // Date key being viewed on dashboard (YYYY-MM-DD)
  foodSearch:     '',
  historyRange:   '7d',        // today | 7d | 30d | 90d | custom
  historyView:    'chart',     // chart | list
  historyStart:   null,
  historyEnd:     null,
  chartInstance:  null,
};

// ----------------------------------------------------------------
// UTILITY
// ----------------------------------------------------------------
function todayKey() {
  // YYYY-MM-DD in local timezone
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function parseDateKey(key) {
  const [y,m,d] = key.split('-').map(Number);
  return new Date(y, m-1, d);
}

function formatDateDisplay(key) {
  const d = parseDateKey(key);
  const today = todayKey();
  const yesterday = dateKey(new Date(Date.now() - 864e5));
  if (key === today) return 'Today';
  if (key === yesterday) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
}

function formatTime(isoStr) {
  return new Date(isoStr).toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
}

function genId(prefix='e') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function clamp(val, min, max) { return Math.min(max, Math.max(min, val)); }

// ----------------------------------------------------------------
// SERVING UNIT UTILITIES
// ----------------------------------------------------------------

// All foods support all units — computeGrams handles the density conversion
function allowedUnits(food) {
  const su = food.defaultServingUnit || 'g';
  if (su === 'each') return ['each', 'cup', 'tbsp', 'tsp', 'g'];
  return ['cup', 'tbsp', 'tsp', 'each', 'g'];
}

const UNIT_LABELS = { cup:'Cup', tbsp:'Tbsp', tsp:'Tsp', each:'Each', g:'Grams' };

// Convert amount+unit → grams using the food's density
function computeGrams(food, amount, unit) {
  if (unit === 'g') return amount;
  const sa = food.defaultServingAmount || 1;
  const sg = food.defaultServingGrams  || 100;
  const gpnu = sg / sa; // grams per 1 natural unit

  if (unit === 'each') return amount * gpnu;

  // For volumetric units, first figure out grams-per-cup for this food
  const su = food.defaultServingUnit || 'g';
  let gpc; // grams per cup
  if      (su === 'cup')  gpc = gpnu;
  else if (su === 'tbsp') gpc = gpnu * 16;
  else if (su === 'tsp')  gpc = gpnu * 48;
  else                    gpc = sg * 4; // rough fallback

  if (unit === 'cup')  return amount * gpc;
  if (unit === 'tbsp') return amount * gpc / 16;
  if (unit === 'tsp')  return amount * gpc / 48;
  return amount;
}

function computeCaloriesFromServing(food, amount, unit) {
  const grams = computeGrams(food, amount, unit);
  return { grams: Math.round(grams * 10) / 10, kcal: Math.round((grams / 100) * food.kcalPer100g) };
}

// Format a fraction as a unicode character where possible
function fmtFraction(n) {
  const map = { 0.125:'⅛', 0.25:'¼', 0.333:'⅓', 0.375:'⅜', 0.5:'½',
                0.625:'⅝', 0.667:'⅔', 0.75:'¾', 0.875:'⅞',
                1:'1', 1.5:'1½', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6',
                7:'7', 8:'8', 9:'9', 10:'10' };
  const rounded = Math.round(n * 1000) / 1000;
  return map[rounded] ?? n.toString();
}

// Friendly display: "¼ cup", "2 tbsp", "3 each", "40g"
function formatServing(amount, unit) {
  if (unit === 'g') return `${amount}g`;
  const fracStr  = fmtFraction(amount);
  const unitStr  = { cup:'cup', tbsp:'tbsp', tsp:'tsp', each:'' }[unit] ?? unit;
  const plural   = unit === 'cup' && amount > 1 ? 's' : '';
  return unitStr ? `${fracStr} ${unitStr}${plural}` : `×${fracStr}`;
}

// Quick-select values per unit type
function quickAmounts(unit) {
  if (unit === 'each') return [1, 2, 3, 4, 5, 6, 8, 10];
  if (unit === 'tsp')  return [0.5, 1, 1.5, 2, 3];
  if (unit === 'tbsp') return [0.5, 1, 1.5, 2, 3, 4];
  if (unit === 'g')    return [10, 25, 50, 100, 150, 200];
  // cup
  return [0.125, 0.25, 0.5, 0.75, 1, 1.5, 2];
}

function categoryLabel(cat) {
  return { kibble:'Kibble', wet:'Wet Food', treat:'Treat', human:'Human Food', custom:'Custom', online:'Online' }[cat] || cat;
}

function categoryTagClass(cat) {
  return `tag tag-${cat}`;
}

// Generate date range array (inclusive) from startKey to endKey
function dateRange(startKey, endKey) {
  const keys = [];
  let cur = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  while (cur <= end) {
    keys.push(dateKey(cur));
    cur = new Date(cur.getTime() + 864e5);
  }
  return keys;
}

// ----------------------------------------------------------------
// STORAGE (Firebase Firestore)
// ----------------------------------------------------------------
let db;

function initFirebase() {
  firebase.initializeApp(FIREBASE_CONFIG);
  db = firebase.firestore();
}

async function fsRead(docName) {
  const snap = await db.collection('pawcals').doc(docName).get();
  if (!snap.exists) throw new Error(`Document ${docName} not found`);
  return snap.data();
}

async function fsWrite(docName, data) {
  await db.collection('pawcals').doc(docName).set(data);
}

// ----------------------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------------------
const SALT = typeof APP_SALT !== 'undefined' ? APP_SALT : 'pawcals-v1-2026';
const SESSION_KEY = 'pc_session';
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

async function hashPassword(pw) {
  return sha256(SALT + pw);
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const sess = JSON.parse(raw);
    if (Date.now() > sess.expiresAt) { sessionStorage.removeItem(SESSION_KEY); return false; }
    S.session = sess;
    return true;
  } catch { return false; }
}

function saveSession(username) {
  S.session = { username, expiresAt: Date.now() + SESSION_TTL };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(S.session));
}

function clearSession() {
  S.session = null;
  sessionStorage.removeItem(SESSION_KEY);
}

async function attemptLogin(username, password) {
  const hash = await hashPassword(password);
  if (!S.config || !S.config.auth) throw new Error('No config loaded');
  if (username !== S.config.auth.username || hash !== S.config.auth.passwordHash)
    throw new Error('Invalid username or password');
  saveSession(username);
}

// ----------------------------------------------------------------
// INTERNET FOOD SEARCH
// Searches Open Pet Food Facts (dog/cat food database) by keyword.
// Also supports exact barcode/UPC lookup via the OPFF product API.
// ----------------------------------------------------------------
const OPFF_SEARCH  = 'https://world.openpetfoodfacts.org/cgi/search.pl';
const OPFF_PRODUCT = 'https://world.openpetfoodfacts.org/api/v0/product';

// inetResults is an array of { header, items } groups
let inetResults = [];
let inetLoading = false;

// Extract kcal/100g from nutriments — OFF/OPFF use inconsistent field names
function extractKcal(n) {
  if (!n) return 0;
  if (n['energy-kcal_100g'] > 0) return Math.round(n['energy-kcal_100g']);
  if (n['energy-kcal']      > 0) return Math.round(n['energy-kcal']);
  // Fall back to kJ fields and convert (1 kcal = 4.184 kJ)
  const kj = n['energy-kj_100g'] || n['energy_100g'] || 0;
  if (kj > 0) return Math.round(kj / 4.184);
  return 0;
}

// Map raw API product → our food object. kcalPer100g may be 0 if data is missing.
function mapProduct(p, isPet) {
  return {
    id: genId('o'),
    name: p.product_name.trim(),
    brand: p.brands ? p.brands.split(',')[0].trim() : null,
    kcalPer100g: extractKcal(p.nutriments),
    defaultServingGrams: 100,
    defaultServingUnit: 'g',
    defaultServingAmount: 100,
    category: 'custom',
    source: isPet ? 'opff' : 'off',
    offCode: p.code || null,
  };
}

// Fetch from one endpoint; returns raw product list (no kcal filter yet)
async function fetchFoodDb(baseUrl, params) {
  const qs = Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const url = `${baseUrl}?${qs}&json=1&fields=product_name,brands,nutriments,code`;
  const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) return [];
  const data = await r.json();
  return (data.products || []).filter(p => p.product_name?.trim());
}

// Merge two arrays, deduplicate by lowercased name, keep items with kcal preferred
function mergeDedup(a, b) {
  const seen = new Map();
  for (const f of [...a, ...b]) {
    const key = f.name.toLowerCase();
    if (!seen.has(key) || (f.kcalPer100g > 0 && seen.get(key).kcalPer100g === 0)) {
      seen.set(key, f);
    }
  }
  return Array.from(seen.values());
}

// Route to barcode lookup if input is 8–13 digits, otherwise keyword search
function doSmartSearch() {
  const q = document.getElementById('inet-search-input')?.value.trim() ?? '';
  if (/^\d{8,13}$/.test(q)) {
    doBarcodeSearch(q);
  } else {
    doInetSearch(q);
  }
}

async function doInetSearch(q) {
  q = (q ?? document.getElementById('inet-search-input')?.value.trim()) || '';
  if (!q) return;
  inetLoading = true;
  inetResults = [];
  const btn = document.getElementById('inet-search-btn');
  if (btn) btn.disabled = true;
  renderInetResults();

  const baseParams = { search_simple: 1, action: 'process', page_size: 20 };
  const brandParams = { tagtype_0: 'brands', tag_contains_0: 'contains', tag_0: q, action: 'process', page_size: 20 };

  try {
    // Run text + brand searches in parallel against the pet food database
    const [petText, petBrand] = await Promise.all([
      fetchFoodDb(OPFF_SEARCH, { ...baseParams, search_terms: q }).catch(() => []),
      fetchFoodDb(OPFF_SEARCH, brandParams).catch(() => []),
    ]);

    const petAll = mergeDedup(
      petText.map(p => mapProduct(p, true)),
      petBrand.map(p => mapProduct(p, true))
    ).slice(0, 15);

    inetResults = [];
    if (petAll.length > 0) inetResults.push({ header: '🐾 Pet Food Database', items: petAll });

    if (inetResults.length === 0) toast('No results found. Try a shorter keyword or brand name.', 'warn');
  } catch (e) {
    toast('Search failed. Check your connection and try again.', 'error');
  } finally {
    inetLoading = false;
    if (btn) btn.disabled = false;
    renderInetResults();
  }
}

async function doBarcodeSearch(barcode) {
  if (!barcode) return;

  const btn = document.getElementById('inet-search-btn');
  if (btn) btn.disabled = true;
  inetResults = [];
  renderInetResults();

  try {
    const r = await fetch(`${OPFF_PRODUCT}/${barcode}.json`, { signal: AbortSignal.timeout(10000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const data = await r.json();

    if (data.status !== 1 || !data.product?.product_name?.trim()) {
      toast('Barcode not found in pet food database. Try searching by name instead.', 'warn');
      return;
    }

    const food = mapProduct(data.product, true);
    inetResults = [{ header: '🔍 Barcode Result', items: [food] }];
    renderInetResults();
  } catch (e) {
    toast('Barcode lookup failed. Check your connection and try again.', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

function renderInetResults() {
  const el = document.getElementById('inet-results');
  if (!el) return;

  if (inetLoading) {
    el.innerHTML = `<div class="search-loading"><span class="spinner dark"></span> Searching pet food database...</div>`;
    return;
  }

  if (inetResults.length === 0) { el.innerHTML = ''; return; }

  // Build flat index for importInetResult(idx) to reference
  let flatIdx = 0;
  let html = '<div class="search-results" style="margin-top:8px">';
  for (const group of inetResults) {
    html += `<div class="search-section-header">${group.header}</div>`;
    for (const f of group.items) {
      const i = flatIdx++;
      const kcalDisplay = f.kcalPer100g > 0 ? `${f.kcalPer100g} cal/100g · enter your serving size when adding` : `<span style="color:var(--warn)">cal unknown — enter manually</span>`;
      html += `
        <div class="search-result-item" style="cursor:default">
          <div style="flex:1;min-width:0">
            <div class="result-name">${escHtml(f.name)}</div>
            <div class="result-meta">${f.brand ? escHtml(f.brand) + ' · ' : ''}${kcalDisplay}</div>
          </div>
          <button class="btn btn-primary btn-sm" style="flex-shrink:0" onclick="importInetResult(${i})">+ Add</button>
        </div>`;
    }
  }
  html += '</div>';
  el.innerHTML = html;

  // Store flat array for index lookup
  inetResults._flat = inetResults.flatMap(g => g.items);
}

function importInetResult(idx) {
  const flat = inetResults._flat || inetResults.flatMap(g => g.items);
  const food = flat[idx];
  if (!food) return;
  const needsKcal = !food.kcalPer100g;
  openFoodModal({ ...food }, needsKcal);
}

function filterLocal(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return S.foods.filter(f =>
    f.name.toLowerCase().includes(q) ||
    (f.brand && f.brand.toLowerCase().includes(q))
  ).slice(0, 8);
}

// ----------------------------------------------------------------
// DATA OPERATIONS
// ----------------------------------------------------------------
async function loadAllData() {
  // Load config, foods, and logs in parallel
  const [cfg, foods, logs] = await Promise.all([
    fsRead('config'),
    fsRead('foods'),
    fsRead('logs'),
  ]);
  S.config = cfg;
  S.foods = foods.items || [];
  S.logs = logs.days || {};
  // Silently push any new default foods that aren't in the library yet
  await syncDefaultFoods();
}

// Adds any DEFAULT_FOODS entries missing from the library (matched by ID).
// Also backfills new serving unit fields onto existing entries that predate this feature.
// Safe to run every login — only ever adds or fills missing fields, never removes.
async function syncDefaultFoods() {
  const defaultMap = new Map(DEFAULT_FOODS.map(f => [f.id, f]));
  let changed = false;

  // Add missing foods
  const existing = new Set(S.foods.map(f => f.id));
  const missing = DEFAULT_FOODS.filter(f => !existing.has(f.id));
  if (missing.length > 0) { S.foods.push(...missing); changed = true; }

  // Backfill serving unit fields onto existing foods that don't have them yet
  S.foods = S.foods.map(f => {
    if (f.defaultServingUnit != null) return f; // already has unit data
    const def = defaultMap.get(f.id);
    if (!def) return f; // custom food — leave alone
    changed = true;
    return { ...f, defaultServingUnit: def.defaultServingUnit, defaultServingAmount: def.defaultServingAmount };
  });

  if (changed) await saveFoods();
}

async function saveConfig() {
  await fsWrite('config', S.config);
}

async function saveFoods() {
  await fsWrite('foods', { items: S.foods });
}

async function saveLogs() {
  await fsWrite('logs', { days: S.logs });
}

function ensureDayExists(key) {
  if (!S.logs[key]) S.logs[key] = { entries:[], totalKcal:0 };
}

function recomputeDayTotal(key) {
  const day = S.logs[key];
  if (!day) return;
  day.totalKcal = day.entries.reduce((s, e) => s + e.kcal, 0);
}

function addLogEntry(foodItem, grams, dateKey_, servingAmt, servingUnt) {
  const key = dateKey_ || S.viewDate || todayKey();
  ensureDayExists(key);
  const kcal = Math.round((grams / 100) * foodItem.kcalPer100g);
  S.logs[key].entries.push({
    id: genId('e'),
    foodId: foodItem.id,
    foodName: foodItem.name,
    grams,
    kcal,
    servingAmount: servingAmt ?? grams,
    servingUnit:   servingUnt ?? 'g',
    loggedAt: new Date().toISOString(),
  });
  recomputeDayTotal(key);
}

function deleteLogEntry(key, entryId) {
  if (!S.logs[key]) return;
  S.logs[key].entries = S.logs[key].entries.filter(e => e.id !== entryId);
  recomputeDayTotal(key);
}

function addFoodToLibrary(food) {
  // Avoid duplicate if already there
  if (S.foods.some(f => f.id === food.id)) return;
  S.foods.push({ ...food, id: genId('f'), source: food.source || 'custom' });
}

function updateFood(id, updates) {
  const idx = S.foods.findIndex(f => f.id === id);
  if (idx < 0) return;
  S.foods[idx] = { ...S.foods[idx], ...updates };
}

function deleteFood(id) {
  S.foods = S.foods.filter(f => f.id !== id);
}

// ----------------------------------------------------------------
// TOAST
// ----------------------------------------------------------------
function toast(msg, type='info', duration=3200) {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = { success:'✓', error:'✕', warn:'⚠', info:'ℹ' }[type] || '';
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  const container = document.getElementById('toast-container');
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 350);
  }, duration);
}

// ----------------------------------------------------------------
// MODAL
// ----------------------------------------------------------------
function showModal(html, title='') {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const box     = document.getElementById('modal-box');
  box.innerHTML = `
    <div class="modal-header">
      <span class="modal-title">${title}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div id="modal-body">${html}</div>`;
  overlay.classList.remove('hidden');
  // focus first input if present
  requestAnimationFrame(() => box.querySelector('input,select,textarea')?.focus());
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// click outside modal to close
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ----------------------------------------------------------------
// ROUTER / NAVIGATION
// ----------------------------------------------------------------
function navigate(route, opts={}) {
  S.route = route;
  render();
}

function render() {
  const root = document.getElementById('root');
  switch (S.route) {
    case 'setup':     root.innerHTML = renderSetup();     break;
    case 'login':     root.innerHTML = renderLogin();     break;
    case 'dashboard': root.innerHTML = renderAppShell(renderDashboard()); bindDashboard(); break;
    case 'foods':     root.innerHTML = renderAppShell(renderFoods());     bindFoods();     break;
    case 'history':   root.innerHTML = renderAppShell(renderHistory());   bindHistory();   break;
    case 'profile':   root.innerHTML = renderAppShell(renderProfile());   bindProfile();   break;
    default:          root.innerHTML = renderLogin();
  }
}

function renderAppShell(viewHtml) {
  const dog = S.config?.dog;
  const dogName = dog?.name || 'My Dog';
  const today = todayKey();
  const todayTotal = S.logs[today]?.totalKcal || 0;
  const goal = dog?.dailyCalorieGoal || 0;
  const pct = goal > 0 ? Math.round((todayTotal / goal) * 100) : 0;
  const over = todayTotal > goal && goal > 0;

  const headerSub = goal > 0
    ? (over ? `${todayTotal} / ${goal} cal — Over goal!` : `${todayTotal} / ${goal} cal today`)
    : '';

  const nav = [
    { key:'dashboard', icon:'🏠', label:'Today'   },
    { key:'history',   icon:'📊', label:'History'  },
    { key:'foods',     icon:'🔍', label:'Foods'    },
    { key:'profile',   icon:'🐾', label:'Profile'  },
  ];

  return `
    <div class="app-shell">
      <header class="app-header">
        <span class="logo">🐾</span>
        <div style="flex:1">
          <div class="header-title">${dogName}</div>
          ${headerSub ? `<div class="header-sub">${headerSub}${over ? ' ⚠' : ''}</div>` : ''}
        </div>
        <button class="header-action" onclick="doLogout()">Sign out</button>
      </header>
      <div class="view-content" id="view-content">
        ${viewHtml}
      </div>
      <nav class="bottom-nav">
        ${nav.map(n => `
          <button class="nav-btn ${S.route===n.key?'active':''}" onclick="navigate('${n.key}')">
            <span class="nav-icon">${n.icon}</span>
            <span>${n.label}</span>
          </button>`).join('')}
      </nav>
    </div>`;
}

// ----------------------------------------------------------------
// SETUP SCREEN
// ----------------------------------------------------------------
function renderSetup() {
  return `
    <div class="centered-screen">
      <div class="auth-card">
        <div class="auth-logo">🐾</div>
        <div class="auth-title">Welcome to PawCals</div>
        <div class="auth-sub">Let's get you set up. This takes about 1 minute.</div>
        <div class="step-indicator">
          <div class="step-dot active" id="dot-0"></div>
          <div class="step-dot" id="dot-1"></div>
        </div>
        <div id="setup-step-content">${renderSetupStep0()}</div>
      </div>
    </div>`;
}

function renderSetupStep0() {
  return `
    <div>
      <p class="text-sm text-muted" style="margin-bottom:12px">
        <strong>Step 1:</strong> Create your PawCals login credentials.
        <br><small style="color:var(--text-light)">Note: Your password is hashed before being stored. This provides access control, not bank-level security.</small>
      </p>
      <div class="form-group">
        <label class="form-label">Username</label>
        <input class="form-input" id="setup-username" type="text" autocomplete="off" placeholder="e.g. cfent">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input class="form-input" id="setup-password" type="password" autocomplete="new-password" placeholder="Choose a password">
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password</label>
        <input class="form-input" id="setup-password2" type="password" autocomplete="new-password" placeholder="Repeat password">
      </div>
      <div class="auth-error" id="setup-err-0"></div>
      <button class="btn btn-primary btn-lg" onclick="setupStep0Next()">Continue →</button>
    </div>`;
}

function renderSetupStep1() {
  return `
    <div>
      <p class="text-sm text-muted" style="margin-bottom:12px">
        <strong>Step 2:</strong> Tell us about your dog.
      </p>
      <div class="form-group">
        <label class="form-label">Dog's Name</label>
        <input class="form-input" id="setup-dogname" type="text" placeholder="e.g. Biscuit">
      </div>
      <div class="form-group">
        <label class="form-label">Breed</label>
        <input class="form-input" id="setup-breed" type="text" placeholder="e.g. Labrador Retriever">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Weight</label>
          <input class="form-input" id="setup-weight" type="number" step="0.1" min="0.5" max="200" placeholder="e.g. 32">
        </div>
        <div class="form-group">
          <label class="form-label">Unit</label>
          <div class="unit-toggle" id="setup-unit-toggle">
            <button class="active" data-unit="lbs" onclick="setupSelectUnit(this)">lbs</button>
            <button data-unit="kg" onclick="setupSelectUnit(this)">kg</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Daily Calorie Goal</label>
        <input class="form-input" id="setup-goal" type="number" min="100" max="5000" placeholder="e.g. 1400">
        <div class="form-hint">Consult your vet for the correct amount. A rough estimate for adult dogs is 30 × (weight in kg) + 70 calories/day. Dog food labels show kcal — that's the same number as calories here.</div>
      </div>
      <div class="auth-error" id="setup-err-2"></div>
      <button class="btn btn-primary btn-lg" id="setup-finish-btn" onclick="setupFinish()">
        Create My Account
      </button>
    </div>`;
}

let setupData = {}; // temporary storage across steps

function showSetupErr(step, msg) {
  const el = document.getElementById(`setup-err-${step}`);
  if (el) { el.textContent = msg; el.classList.add('visible'); }
}

function setupSelectUnit(btn) {
  document.querySelectorAll('#setup-unit-toggle button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setupData.weightUnit = btn.dataset.unit;
}

async function setupStep0Next() {
  const username = document.getElementById('setup-username').value.trim();
  const pw       = document.getElementById('setup-password').value;
  const pw2      = document.getElementById('setup-password2').value;
  if (!username) { showSetupErr(0, 'Username is required.'); return; }
  if (pw.length < 4) { showSetupErr(0, 'Password must be at least 4 characters.'); return; }
  if (pw !== pw2) { showSetupErr(0, 'Passwords do not match.'); return; }
  setupData.username = username;
  setupData.passwordHash = await hashPassword(pw);
  document.getElementById('dot-0').classList.remove('active');
  document.getElementById('dot-1').classList.add('active');
  document.getElementById('setup-step-content').innerHTML = renderSetupStep1();
  setupData.weightUnit = 'lbs';
}

async function setupFinish() {
  const name   = document.getElementById('setup-dogname').value.trim();
  const breed  = document.getElementById('setup-breed').value.trim();
  const weight = parseFloat(document.getElementById('setup-weight').value);
  const goal   = parseInt(document.getElementById('setup-goal').value);
  if (!name) { showSetupErr(1, 'Dog name is required.'); return; }
  if (!weight || weight <= 0) { showSetupErr(1, 'Please enter a valid weight.'); return; }
  if (!goal || goal < 50) { showSetupErr(1, 'Please enter a valid calorie goal.'); return; }

  const btn = document.getElementById('setup-finish-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Creating...';

  try {
    const configData = {
      version: 1,
      auth: { username: setupData.username, passwordHash: setupData.passwordHash },
      dog: { name, breed, weight, weightUnit: setupData.weightUnit || 'lbs', dailyCalorieGoal: goal }
    };
    const foodsData = { version:1, items: DEFAULT_FOODS };
    const logsData  = { version:1, days: {} };

    // Write all docs in parallel
    await Promise.all([
      fsWrite('config', configData),
      fsWrite('foods', foodsData),
      fsWrite('logs', logsData),
    ]);

    S.config = configData;
    S.foods  = foodsData.items;
    S.logs   = {};

    saveSession(setupData.username);
    S.viewDate = todayKey();
    toast('Account created! Welcome to PawCals 🐾', 'success');
    navigate('dashboard');
  } catch(e) {
    btn.disabled = false;
    btn.innerHTML = 'Create My Account';
    showSetupErr(1, `Setup failed: ${e.message}. Check your Firebase config and try again.`);
  }
}

// ----------------------------------------------------------------
// LOGIN SCREEN
// ----------------------------------------------------------------
function renderLogin() {
  return `
    <div class="centered-screen">
      <div class="auth-card">
        <div class="auth-logo">🐾</div>
        <div class="auth-title">PawCals</div>
        <div class="auth-sub">Sign in to track your dog's calories</div>
        <div class="auth-error" id="login-err"></div>
        <div class="form-group">
          <label class="form-label">Username</label>
          <input class="form-input" id="login-user" type="text" autocomplete="username" placeholder="Your username">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" id="login-pw" type="password" autocomplete="current-password" placeholder="Your password"
            onkeydown="if(event.key==='Enter') doLogin()">
        </div>
        <button class="btn btn-primary btn-lg" id="login-btn" onclick="doLogin()">Sign In</button>
        <div class="text-center mt-16 text-sm text-muted">
          First time? <a href="#" onclick="navigate('setup'); return false;" style="color:var(--primary)">Set up your account</a>
        </div>
      </div>
    </div>`;
}

async function doLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pw   = document.getElementById('login-pw').value;
  const err  = document.getElementById('login-err');
  const btn  = document.getElementById('login-btn');
  err.classList.remove('visible');
  if (!user || !pw) { err.textContent = 'Please fill in both fields.'; err.classList.add('visible'); return; }
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  try {
    await loadAllData();
    await attemptLogin(user, pw);
    S.viewDate = todayKey();
    navigate('dashboard');
  } catch(e) {
    err.textContent = e.message || 'Login failed.';
    err.classList.add('visible');
    btn.disabled = false;
    btn.innerHTML = 'Sign In';
  }
}

function doLogout() {
  clearSession();
  S.config = null; S.foods = []; S.logs = {};
  navigate('login');
}

// ----------------------------------------------------------------
// DASHBOARD VIEW
// ----------------------------------------------------------------
function renderDashboard() {
  const key  = S.viewDate || todayKey();
  const day  = S.logs[key] || { entries:[], totalKcal:0 };
  const dog  = S.config?.dog || {};
  const goal = dog.dailyCalorieGoal || 0;
  const consumed = day.totalKcal || 0;
  const remaining = Math.max(0, goal - consumed);
  const over = consumed > goal && goal > 0;
  const pct = goal > 0 ? clamp((consumed / goal) * 100, 0, 100) : 0;
  const isToday = key === todayKey();

  const barClass = over ? 'over' : pct >= 90 ? 'warn' : '';

  return `
    <!-- Date Navigation -->
    <div class="date-nav">
      <button class="date-nav-btn" onclick="dashboardShift(-1)">‹</button>
      <div class="date-nav-label">${formatDateDisplay(key)}</div>
      <button class="date-nav-btn" onclick="dashboardShift(1)" ${isToday ? 'disabled' : ''}>›</button>
    </div>

    <!-- Calorie Summary -->
    <div class="card" style="margin-bottom:14px">
      <div class="calorie-numbers">
        <span class="calorie-consumed${over?' over':''}">${consumed}</span>
        <span class="calorie-unit">cal</span>
      </div>
      ${goal > 0 ? `
        <div class="calorie-goal-label">${isToday ? 'of' : ''} ${goal} cal daily goal</div>
        <div class="progress-bar-wrap" style="margin:10px 0 8px">
          <div class="progress-bar ${barClass}" style="width:${pct}%"></div>
        </div>
        ${over ? `<div class="over-badge">⚠ ${consumed - goal} cal over goal</div>` : ''}
        <div class="calorie-stats">
          <div class="calorie-stat">
            <div class="calorie-stat-value green">${consumed}</div>
            <div class="calorie-stat-label">Consumed</div>
          </div>
          <div class="calorie-stat">
            <div class="calorie-stat-value">${goal}</div>
            <div class="calorie-stat-label">Goal</div>
          </div>
          <div class="calorie-stat">
            <div class="calorie-stat-value ${over?'red':'green'}">${over ? consumed-goal : remaining}</div>
            <div class="calorie-stat-label">${over ? 'Over' : 'Remaining'}</div>
          </div>
        </div>
      ` : `<div class="text-sm text-muted text-center mt-8">Set a calorie goal in <a href="#" onclick="navigate('profile');return false;" style="color:var(--primary)">Profile</a></div>`}
    </div>

    <!-- Add Food -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Log Food${!isToday ? ` <span style="font-size:12px;font-weight:400;color:var(--text-muted)">(editing past day)</span>` : ''}</div>
      <div id="dash-search-wrap">
        ${renderSearchBar('dash')}
      </div>
      <div id="dash-search-results"></div>
      <div id="dash-serving-entry"></div>
    </div>

    <!-- Food Log -->
    <div class="card">
      <div class="card-title flex" style="justify-content:space-between;align-items:center">
        <span>${isToday ? "Today's Log" : "Food Log"}</span>
        <span class="text-sm" style="font-weight:400;text-transform:none">${day.entries.length} item${day.entries.length!==1?'s':''}</span>
      </div>
      ${day.entries.length === 0
        ? `<div class="empty-log"><div class="empty-icon">🍽</div>No food logged ${isToday ? 'yet today' : 'this day'}.</div>`
        : day.entries.map(e => `
          <div class="log-entry">
            <div class="log-entry-dot"></div>
            <div class="log-entry-info">
              <div class="log-entry-name">${escHtml(e.foodName)}</div>
              <div class="log-entry-meta">${formatServing(e.servingAmount ?? e.grams, e.servingUnit ?? 'g')} · ${formatTime(e.loggedAt)}</div>
            </div>
            <div class="log-entry-kcal">${e.kcal} cal</div>
            <button class="log-entry-delete" onclick="removeLogEntry('${key}','${e.id}')" title="Remove">✕</button>
          </div>`).join('')
      }
    </div>`;
}

function bindDashboard() {
  bindSearchBar('dash', null, true);
}

function dashboardShift(delta) {
  const cur = parseDateKey(S.viewDate || todayKey());
  const next = new Date(cur.getTime() + delta * 864e5);
  const nextKey = dateKey(next);
  if (nextKey > todayKey()) return;
  S.viewDate = nextKey;
  navigate('dashboard');
}

async function removeLogEntry(key, entryId) {
  deleteLogEntry(key, entryId);
  rerender('dashboard');
  try {
    await saveLogs();
  } catch(e) {
    toast('Failed to save. Check your connection.', 'error');
  }
}

// ----------------------------------------------------------------
// FOOD SEARCH BAR (shared by dashboard & foods view)
// ----------------------------------------------------------------
function renderSearchBar(ctx) {
  const placeholder = ctx === 'dash' ? 'Search food to log...' : 'Search food library...';
  return `
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input class="search-input" id="${ctx}-search-input" type="search"
        placeholder="${placeholder}" autocomplete="off" value="${escHtml(S.foodSearch)}">
      <button class="search-clear ${S.foodSearch ? 'visible' : ''}" id="${ctx}-clear-btn"
        onclick="clearSearch('${ctx}')">✕</button>
    </div>`;
}

// Debounced handler for search input
const debouncedRenderResults = debounce(renderSearchResults, 250);

function bindSearchBar(ctx, onSelect, logMode=false) {
  const input = document.getElementById(`${ctx}-search-input`);
  const clearBtn = document.getElementById(`${ctx}-clear-btn`);
  if (!input) return;

  input.addEventListener('input', e => {
    S.foodSearch = e.target.value;
    clearBtn.classList.toggle('visible', !!S.foodSearch);
    debouncedRenderResults(ctx, logMode);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') clearSearch(ctx);
  });

  // Initial render
  if (S.foodSearch) renderSearchResults(ctx, logMode);
}

function clearSearch(ctx) {
  S.foodSearch = '';
  const input = document.getElementById(`${ctx}-search-input`);
  if (input) input.value = '';
  const clearBtn = document.getElementById(`${ctx}-clear-btn`);
  if (clearBtn) clearBtn.classList.remove('visible');
  renderSearchResults(ctx, false);
  const serving = document.getElementById('dash-serving-entry');
  if (serving) serving.innerHTML = '';
}

function renderSearchResults(ctx='dash', logMode=false) {
  const resultsEl = document.getElementById(`${ctx}-search-results`);
  if (!resultsEl) return;

  const q = S.foodSearch.trim();
  if (!q) { resultsEl.innerHTML = ''; return; }

  const local = filterLocal(q);

  let html = '<div class="search-results">';
  if (local.length > 0) {
    html += local.map(f => resultItemHtml(f, ctx, logMode)).join('');
  } else {
    html += `<div class="search-hint">
      Not in your library.
      <a href="#" onclick="navigate('foods');return false;" style="color:var(--primary);font-weight:600">
        Search Online in the Foods tab →
      </a>
    </div>`;
  }
  html += '</div>';
  resultsEl.innerHTML = html;
}

function resultItemHtml(f, ctx, logMode) {
  const data = escAttr(JSON.stringify(f));
  const action = logMode
    ? `onclick="selectFoodToLog('${ctx}','${f.id}',${data})" `
    : `onclick="openFoodModal(${data})"`;
  return `
    <div class="search-result-item" ${action}>
      <div>
        <div class="result-name">${escHtml(f.name)}</div>
        <div class="result-meta">
          ${f.brand ? escHtml(f.brand) + ' · ' : ''}
          ${categoryLabel(f.category)} · per 100g
          ${f.source==='opff'||f.source==='online' ? ' · <span class="tag tag-online">Online</span>' : ''}
        </div>
      </div>
      <div class="result-kcal">${f.kcalPer100g} cal</div>
    </div>`;
}

// ----------------------------------------------------------------
// LOG FOOD (serving entry on dashboard)
// ----------------------------------------------------------------
let selectedFood = null;

function selectFoodToLog(ctx, foodId, foodData) {
  // Always prefer the live S.foods entry over the serialized onclick snapshot —
  // this ensures migration-added fields (defaultServingUnit etc.) are present.
  // Fall back to the passed object for online results not yet in the library.
  const liveFood = S.foods.find(f => f.id === foodId);
  const food = liveFood || (typeof foodData === 'object' ? foodData : null);
  if (!food) return;
  selectedFood = food;
  const serving = document.getElementById('dash-serving-entry');
  if (!serving) return;
  serving.innerHTML = renderServingEntry(food);
  document.getElementById(`${ctx}-search-results`).innerHTML = '';
  // Scroll the serving entry into view
  requestAnimationFrame(() => serving.scrollIntoView({ behavior:'smooth', block:'nearest' }));
}

// Tracks the current serving form state
let servingUnit   = 'g';
let servingAmount = 0;

function renderServingEntry(food) {
  // Belt-and-suspenders: if the food somehow still lacks unit data (e.g. migration
  // hasn't saved yet this session), pull it from the DEFAULT_FOODS definition.
  if (!food.defaultServingUnit) {
    const def = DEFAULT_FOODS.find(d => d.id === food.id);
    if (def) food = { ...food, defaultServingUnit: def.defaultServingUnit, defaultServingAmount: def.defaultServingAmount };
  }

  const units   = allowedUnits(food);
  const defUnit = food.defaultServingUnit || 'g'; // use the food's natural unit as default
  servingUnit   = units.includes(defUnit) ? defUnit : units[0];
  const defAmt  = food.defaultServingAmount || 1;
  servingAmount = servingUnit === 'g' ? (food.defaultServingGrams || 100) : defAmt;

  const { kcal, grams } = computeCaloriesFromServing(food, servingAmount, servingUnit);
  const isOnline = food.source === 'off' || food.source === 'online';

  return `
    <div class="serving-entry" id="serving-entry-box">
      <div class="serving-food-name">${escHtml(food.name)}</div>

      <div id="serving-pills" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
        ${pillsHtml(servingUnit, servingAmount)}
      </div>

      <div class="serving-row" style="margin-bottom:8px">
        <input class="serving-input" id="serving-amount-input" type="number"
          min="0.01" step="0.125" max="99"
          value="${servingAmount}" oninput="updateServingPreview(this.value)">
        <select id="serving-unit-select" class="form-select" style="width:auto;padding:8px 10px"
          onchange="changeServingUnit(this.value)">
          ${units.map(u => `<option value="${u}" ${u===servingUnit?'selected':''}>${UNIT_LABELS[u]}</option>`).join('')}
        </select>
      </div>

      <div class="serving-preview">
        <strong id="serving-kcal-preview">${kcal}</strong> cal
        <span id="serving-gram-hint" style="color:var(--text-light);font-size:12px"> · ~${grams}g</span>
      </div>

      ${isOnline ? `
        <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-muted);margin-bottom:10px;margin-top:6px">
          <input type="checkbox" id="save-to-lib" checked> Save to my library for future use
        </label>` : ''}
      <div class="flex gap-8" style="margin-top:10px">
        <button class="btn btn-primary" style="flex:1" onclick="confirmLogFood()">Add to Log</button>
        <button class="btn btn-ghost" onclick="cancelServingEntry()">Cancel</button>
      </div>
    </div>`;
}

function pillsHtml(unit, currentAmount) {
  return quickAmounts(unit).map(q => `
    <button class="range-pill ${currentAmount === q ? 'active' : ''}"
      onclick="setServingQuick(${q})">${fmtFraction(q)}</button>`).join('');
}

function setServingQuick(amount) {
  servingAmount = amount;
  const input = document.getElementById('serving-amount-input');
  if (input) input.value = amount;
  updateServingPreview(amount);
  // Update pill active state
  document.querySelectorAll('#serving-entry-box .range-pill').forEach(p => {
    p.classList.toggle('active', parseFloat(p.textContent.trim()) === amount ||
      fmtFraction(amount) === p.textContent.trim());
  });
}

function changeServingUnit(unit) {
  servingUnit = unit;
  const pillsEl = document.getElementById('serving-pills');
  if (pillsEl) {
    pillsEl.style.display = 'flex';
    pillsEl.innerHTML = pillsHtml(unit, servingAmount);
  }
  updateServingPreview(servingAmount);
}

function updateServingPreview(rawAmount) {
  const amount = parseFloat(rawAmount) || 0;
  servingAmount = amount;
  if (!selectedFood) return;
  const { kcal, grams } = computeCaloriesFromServing(selectedFood, amount, servingUnit);
  const kcalEl = document.getElementById('serving-kcal-preview');
  const gramEl = document.getElementById('serving-gram-hint');
  if (kcalEl) kcalEl.textContent = kcal;
  if (gramEl) gramEl.textContent = ` · ~${grams}g`;
}

async function confirmLogFood() {
  if (!selectedFood) return;
  const amount = parseFloat(document.getElementById('serving-amount-input')?.value) || 0;
  if (amount <= 0) { toast('Enter a valid amount.', 'warn'); return; }

  const saveToLib = document.getElementById('save-to-lib');
  const isOnline  = selectedFood.source === 'off' || selectedFood.source === 'online';

  if (isOnline && saveToLib && saveToLib.checked) {
    addFoodToLibrary(selectedFood);
    try { await saveFoods(); } catch {}
  }

  const { grams } = computeCaloriesFromServing(selectedFood, amount, servingUnit);
  addLogEntry(selectedFood, grams, null, amount, servingUnit);
  selectedFood = null;
  S.foodSearch = '';

  try {
    await saveLogs();
    toast(`Added to ${formatDateDisplay(S.viewDate)} log`, 'success');
  } catch(e) {
    toast('Failed to save. Check your connection.', 'error');
  }
  rerender('dashboard');
}

function cancelServingEntry() {
  selectedFood = null;
  const el = document.getElementById('dash-serving-entry');
  if (el) el.innerHTML = '';
  clearSearch('dash');
}

// ----------------------------------------------------------------
// PROFILE VIEW
// ----------------------------------------------------------------
function renderProfile() {
  const dog = S.config?.dog || {};
  const wUnit = dog.weightUnit || 'lbs';
  return `
    <div class="card">
      <div class="card-title">Dog Profile</div>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" id="p-name" type="text" value="${escHtml(dog.name||'')}">
      </div>
      <div class="form-group">
        <label class="form-label">Breed</label>
        <input class="form-input" id="p-breed" type="text" value="${escHtml(dog.breed||'')}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Weight</label>
          <input class="form-input" id="p-weight" type="number" step="0.1" min="0.5" max="200" value="${dog.weight||''}">
        </div>
        <div class="form-group">
          <label class="form-label">Unit</label>
          <div class="unit-toggle" id="p-unit-toggle">
            <button class="${wUnit==='lbs'?'active':''}" data-unit="lbs" onclick="profileSelectUnit(this)">lbs</button>
            <button class="${wUnit==='kg'?'active':''}" data-unit="kg" onclick="profileSelectUnit(this)">kg</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Daily Calorie Goal</label>
        <input class="form-input" id="p-goal" type="number" min="50" max="10000" value="${dog.dailyCalorieGoal||''}">
        <div class="form-hint">
          Rough estimate for adult dogs: (30 × weight in kg) + 70 calories/day<br>
          Dog food labels show kcal — that equals calories here. Always verify with your vet.
        </div>
      </div>
      <button class="btn btn-primary btn-lg mt-8" id="p-save-btn" onclick="saveProfile()">Save Changes</button>
    </div>

    <div class="card">
      <div class="card-title">Account</div>
      <p class="text-sm text-muted" style="margin-bottom:12px">Signed in as <strong>${escHtml(S.session?.username||'')}</strong></p>
      <button class="btn btn-ghost btn-sm" onclick="showChangePasswordModal()">Change Password</button>
    </div>

    <div class="card">
      <div class="card-title" style="color:var(--danger)">Danger Zone</div>
      <p class="text-sm text-muted" style="margin-bottom:12px">Clear all food log history. This cannot be undone.</p>
      <button class="btn btn-danger btn-sm" onclick="confirmClearLogs()">Clear All Logs</button>
    </div>`;
}

function bindProfile() {}

function profileSelectUnit(btn) {
  document.querySelectorAll('#p-unit-toggle button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

async function saveProfile() {
  const name   = document.getElementById('p-name').value.trim();
  const breed  = document.getElementById('p-breed').value.trim();
  const weight = parseFloat(document.getElementById('p-weight').value);
  const goal   = parseInt(document.getElementById('p-goal').value);
  const unitEl = document.querySelector('#p-unit-toggle button.active');
  const wUnit  = unitEl ? unitEl.dataset.unit : 'lbs';

  if (!name) { toast('Dog name is required.', 'warn'); return; }
  if (!weight || weight <= 0) { toast('Enter a valid weight.', 'warn'); return; }
  if (!goal || goal < 50) { toast('Enter a valid calorie goal.', 'warn'); return; }

  const btn = document.getElementById('p-save-btn');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Saving...';

  S.config.dog = { name, breed, weight, weightUnit: wUnit, dailyCalorieGoal: goal };
  try {
    await saveConfig();
    toast('Profile saved!', 'success');
    rerender('profile');
  } catch(e) {
    toast('Save failed. Check your connection.', 'error');
    btn.disabled = false; btn.innerHTML = 'Save Changes';
  }
}

function showChangePasswordModal() {
  showModal(`
    <div class="form-group">
      <label class="form-label">New Password</label>
      <input class="form-input" id="new-pw" type="password" autocomplete="new-password">
    </div>
    <div class="form-group">
      <label class="form-label">Confirm New Password</label>
      <input class="form-input" id="new-pw2" type="password" autocomplete="new-password">
    </div>
    <div class="auth-error" id="pw-err"></div>
    <button class="btn btn-primary btn-lg" onclick="doChangePassword()">Update Password</button>
  `, 'Change Password');
}

async function doChangePassword() {
  const pw  = document.getElementById('new-pw').value;
  const pw2 = document.getElementById('new-pw2').value;
  const err = document.getElementById('pw-err');
  if (pw.length < 4) { err.textContent='At least 4 characters required.'; err.classList.add('visible'); return; }
  if (pw !== pw2)    { err.textContent='Passwords do not match.'; err.classList.add('visible'); return; }
  S.config.auth.passwordHash = await hashPassword(pw);
  try {
    await saveConfig();
    closeModal();
    toast('Password updated.', 'success');
  } catch { toast('Failed to update password.', 'error'); }
}

function confirmClearLogs() {
  showModal(`
    <p style="margin-bottom:20px;color:var(--text-muted)">
      This will permanently delete all food log history. Your food library and profile will be kept.
      <br><br><strong>Are you sure?</strong>
    </p>
    <div class="flex gap-8">
      <button class="btn btn-danger" style="flex:1" onclick="doClearLogs()">Yes, Clear All Logs</button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    </div>
  `, '⚠ Clear All Logs');
}

async function doClearLogs() {
  S.logs = {};
  try {
    await saveLogs();
    closeModal();
    toast('All logs cleared.', 'success');
  } catch { toast('Failed. Try again.', 'error'); }
}

// ----------------------------------------------------------------
// FOODS LIBRARY VIEW
// ----------------------------------------------------------------
function renderFoods() {
  const q     = S.foodSearch.trim().toLowerCase();
  const items = q
    ? S.foods.filter(f => f.name.toLowerCase().includes(q) || (f.brand||'').toLowerCase().includes(q))
    : S.foods;

  return `
    <!-- Card 1: Food Library -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-title flex" style="justify-content:space-between;align-items:center;margin-bottom:10px">
        <span>Food Library (${S.foods.length})</span>
      </div>
      <div id="foods-search-wrap">${renderSearchBar('foods')}</div>
      <div id="foods-search-results"></div>
      <div style="margin-top:10px">
        ${items.length === 0 && !q
          ? `<div class="empty-log"><div class="empty-icon">🍽</div>No foods in your library yet.</div>`
          : items.length === 0
            ? `<div class="empty-log"><div class="empty-icon">🔍</div>No matching foods.</div>`
            : `<div class="food-list">${items.map(f => foodItemHtml(f)).join('')}</div>`
        }
      </div>
    </div>

    <!-- Card 2: Search Online -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Search Online</div>
      <p class="text-sm text-muted" style="margin-bottom:10px">
        Search by name, brand, UPC, or barcode. Click <strong>+ Add</strong> on any result to import it into your library.
      </p>
      <div class="flex gap-8" style="margin-bottom:4px">
        <input class="form-input" id="inet-search-input" type="search"
          placeholder="Name, brand, UPC, or barcode..."
          onkeydown="if(event.key==='Enter') doSmartSearch()">
        <button class="btn btn-primary" id="inet-search-btn" onclick="doSmartSearch()" style="white-space:nowrap">Search</button>
      </div>
      <div id="inet-results"></div>
    </div>

    <!-- Card 3: Add Custom Food -->
    <div class="card">
      <div class="card-title">Add Custom Food</div>
      <p class="text-sm text-muted" style="margin-bottom:12px">
        Manually enter a food that isn't in your library or the online database.
      </p>
      <button class="btn btn-primary btn-lg" onclick="openAddFoodModal()">+ Add Custom Food</button>
    </div>`;
}

function bindFoods() {
  bindSearchBar('foods', null, false);
  // Re-render inet results in case they existed before navigating away
  renderInetResults();
}

function foodItemHtml(f) {
  const data = escAttr(JSON.stringify(f));
  return `
    <div class="food-item">
      <div class="food-item-info">
        <div class="food-item-name">${escHtml(f.name)}</div>
        <div class="food-item-meta">
          ${f.brand ? escHtml(f.brand) + ' · ' : ''}
          <span class="${categoryTagClass(f.category)}">${categoryLabel(f.category)}</span>
        </div>
      </div>
      <div class="food-item-kcal">${Math.round((f.defaultServingGrams||100)/100*f.kcalPer100g)} cal/${f.defaultServingAmount||1}${UNIT_LABELS[f.defaultServingUnit||'g']}</div>
      <div class="food-item-actions">
        <button class="btn btn-icon btn-ghost" onclick="openFoodModal(${data})" title="Edit">✏️</button>
        <button class="btn btn-icon btn-ghost" onclick="confirmDeleteFood('${f.id}')" title="Delete">🗑</button>
      </div>
    </div>`;
}

function openAddFoodModal() {
  openFoodModal(null);
}

function openFoodModal(food, focusKcal = false) {
  // food = null → add mode (blank form)
  // food = library entry → edit mode
  // food = search-result import → add mode with prefilled fields
  const isEdit = !!food && S.foods.some(x => x.id === food.id);
  const f = food || { name:'', brand:'', kcalPer100g:'', defaultServingGrams:100, category:'custom' };
  const cats  = ['kibble','wet','treat','human','custom'];
  const units = ['cup','tbsp','tsp','each','g'];
  const fUnit = f.defaultServingUnit || 'g';
  const fAmt  = f.defaultServingAmount ?? (f.defaultServingGrams || 100);
  // Derive calories-per-serving for display from kcalPer100g + defaultServingGrams
  const displayKcal = f.kcalPer100g && f.defaultServingGrams
    ? Math.round((f.defaultServingGrams / 100) * f.kcalPer100g)
    : (f.kcalPer100g || '');
  const modal = `
    <div class="form-group">
      <label class="form-label">Name *</label>
      <input class="form-input" id="fe-name" type="text" value="${escHtml(f.name)}" placeholder="Food name">
    </div>
    <div class="form-group">
      <label class="form-label">Brand</label>
      <input class="form-input" id="fe-brand" type="text" value="${escHtml(f.brand||'')}" placeholder="Brand (optional)">
    </div>
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-select" id="fe-category">
        ${cats.map(c => `<option value="${c}" ${f.category===c?'selected':''}>${categoryLabel(c)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Default Serving Size</label>
      <div class="flex gap-8">
        <input class="form-input" id="fe-serving-amt" type="number" min="0.01" step="0.125" style="max-width:100px"
          value="${fAmt}" placeholder="e.g. 0.25">
        <select class="form-select" id="fe-serving-unit" style="flex:1">
          ${units.map(u => `<option value="${u}" ${u===fUnit?'selected':''}>${UNIT_LABELS[u]}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Calories for that serving *</label>
      <input class="form-input" id="fe-kcal" type="number" min="0" step="1" value="${displayKcal}" placeholder="e.g. 25">
      <div class="form-hint">Enter the calories for the serving size above. The app scales up or down when you log a different amount.</div>
    </div>
    ${isEdit && (f.source==='off'||f.source==='opff') ? `<p class="text-sm text-muted" style="margin-bottom:12px">Imported from Open Food Facts</p>` : ''}
    <div class="flex gap-8">
      <button class="btn btn-primary" style="flex:1" onclick="saveFoodModal('${isEdit ? f.id : ''}')">
        ${isEdit ? 'Save Changes' : 'Add to Library'}
      </button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    </div>`;
  showModal(modal, isEdit ? 'Edit Food' : 'Add Food');
  if (focusKcal) requestAnimationFrame(() => document.getElementById('fe-kcal')?.focus());
}

async function saveFoodModal(existingId) {
  const name       = document.getElementById('fe-name').value.trim();
  const brand      = document.getElementById('fe-brand').value.trim();
  const kcal       = parseInt(document.getElementById('fe-kcal').value);
  const cat        = document.getElementById('fe-category').value;
  const servingAmt = parseFloat(document.getElementById('fe-serving-amt').value);
  const servingUnt = document.getElementById('fe-serving-unit').value;

  if (!name) { toast('Name is required.', 'warn'); return; }
  if (!kcal || kcal < 0) { toast('Enter a valid calorie value.', 'warn'); return; }
  if (!servingAmt || servingAmt <= 0) { toast('Enter a valid serving amount.', 'warn'); return; }

  // Derive grams per default serving from the unit so we can store kcalPer100g internally.
  // These are standard reference densities — only used for proportional scaling when
  // the user logs a different amount/unit than the default (e.g. logs 2 cups vs 1 cup).
  const gramsPerUnit = { g: 1, each: 1, cup: 240, tbsp: 15, tsp: 5 };
  const servingG = servingUnt === 'g'
    ? servingAmt                              // grams serving → grams IS the amount
    : (gramsPerUnit[servingUnt] || 100) * servingAmt;
  const kcalPer100g = Math.round((kcal / servingG) * 100);

  const foodData = {
    name, brand: brand||null, kcalPer100g,
    defaultServingGrams: servingG,
    defaultServingUnit:  servingUnt,
    defaultServingAmount: servingAmt,
    category: cat,
  };

  if (existingId) {
    updateFood(existingId, foodData);
  } else {
    S.foods.push({ id: genId('f'), ...foodData, source:'custom' });
  }

  try {
    await saveFoods();
    closeModal();
    toast(existingId ? 'Food updated.' : 'Food added to library.', 'success');
    rerender('foods');
  } catch(e) {
    toast('Save failed. Try again.', 'error');
  }
}

function confirmDeleteFood(id) {
  const food = S.foods.find(f => f.id === id);
  if (!food) return;
  showModal(`
    <p style="margin-bottom:20px;color:var(--text-muted)">
      Delete <strong>${escHtml(food.name)}</strong> from your library?
      <br>Past log entries that used this food will not be affected.
    </p>
    <div class="flex gap-8">
      <button class="btn btn-danger" style="flex:1" onclick="doDeleteFood('${id}')">Delete</button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    </div>
  `, 'Delete Food');
}

async function doDeleteFood(id) {
  deleteFood(id);
  try {
    await saveFoods();
    closeModal();
    toast('Food deleted.', 'success');
    rerender('foods');
  } catch { toast('Delete failed.', 'error'); }
}

// ----------------------------------------------------------------
// HISTORY VIEW
// ----------------------------------------------------------------
function renderHistory() {
  return `
    <!-- Range selector -->
    <div class="card">
      <div class="card-title">Date Range</div>
      <div class="range-pills">
        ${['today','7d','30d','90d','custom'].map(r => `
          <button class="range-pill ${S.historyRange===r?'active':''}" onclick="setHistoryRange('${r}')">
            ${{today:'Today', '7d':'7 Days', '30d':'30 Days', '90d':'90 Days', custom:'Custom'}[r]}
          </button>`).join('')}
      </div>
      <div class="custom-range ${S.historyRange==='custom'?'visible':''}" id="custom-range">
        <input type="date" id="hist-start" value="${S.historyStart||''}">
        <span class="text-muted">to</span>
        <input type="date" id="hist-end" value="${S.historyEnd||''}">
        <button class="btn btn-primary btn-sm" onclick="applyCustomRange()">Apply</button>
      </div>
    </div>

    <!-- View toggle + content -->
    <div class="card">
      <div class="view-toggle">
        <button class="${S.historyView==='chart'?'active':''}" onclick="setHistoryView('chart')">📊 Chart</button>
        <button class="${S.historyView==='list'?'active':''}" onclick="setHistoryView('list')">☰ List</button>
      </div>
      <div id="history-content">
        ${renderHistoryContent()}
      </div>
    </div>`;
}

function bindHistory() {
  if (S.historyView === 'chart') {
    renderHistoryChart(getHistoryDays());
  }
}

function getHistoryRange() {
  const today = todayKey();
  let start, end = today;
  switch (S.historyRange) {
    case 'today': start = today; break;
    case '7d': {
      const d = new Date(Date.now() - 6 * 864e5);
      start = dateKey(d); break;
    }
    case '30d': {
      const d = new Date(Date.now() - 29 * 864e5);
      start = dateKey(d); break;
    }
    case '90d': {
      const d = new Date(Date.now() - 89 * 864e5);
      start = dateKey(d); break;
    }
    case 'custom':
      start = S.historyStart || today;
      end   = S.historyEnd   || today;
      break;
    default: start = today;
  }
  return { start, end };
}

function getHistoryDays() {
  const { start, end } = getHistoryRange();
  const keys = dateRange(start, end);
  const goal = S.config?.dog?.dailyCalorieGoal || 0;
  return keys.map(key => ({
    key,
    label: parseDateKey(key).toLocaleDateString('en-US', { month:'short', day:'numeric' }),
    entries: S.logs[key]?.entries || [],
    totalKcal: S.logs[key]?.totalKcal || 0,
    goal,
  }));
}

function renderHistoryContent() {
  const days = getHistoryDays();
  if (S.historyView === 'chart') {
    return `<div class="chart-container"><canvas id="history-chart"></canvas></div>`;
  }
  // List view
  if (days.length === 0) return `<div class="empty-log"><div class="empty-icon">📅</div>No data in this range.</div>`;
  return days.slice().reverse().map(d => {
    const over = d.goal > 0 && d.totalKcal > d.goal;
    const diff = d.goal > 0 ? d.totalKcal - d.goal : null;
    return `
      <div class="history-list-item" onclick="toggleHistoryDay(this)">
        <div class="history-list-row">
          <div class="history-date">${formatDateDisplay(d.key)}</div>
          <div style="display:flex;align-items:center;gap:8px">
            ${diff !== null ? `<span class="history-vs ${over?'over':'ok'}">${over?'+':''}${diff} cal</span>` : ''}
            <div class="history-kcal ${over?'over':''}">${d.totalKcal} cal</div>
          </div>
        </div>
        ${d.entries.length > 0 ? `
          <div class="history-entries" style="display:none">
            ${d.entries.map(e => `
              <div class="history-sub-entry">
                <span>${escHtml(e.foodName)} · ${formatServing(e.servingAmount ?? e.grams, e.servingUnit ?? 'g')}</span>
                <span class="history-sub-entry-kcal">${e.kcal} cal</span>
              </div>`).join('')}
          </div>` : ''}
      </div>`;
  }).join('');
}

function toggleHistoryDay(el) {
  const entries = el.querySelector('.history-entries');
  if (!entries) return;
  const open = entries.style.display !== 'none';
  entries.style.display = open ? 'none' : 'block';
}

function setHistoryRange(range) {
  S.historyRange = range;
  if (range !== 'custom') {
    S.historyStart = null; S.historyEnd = null;
    rerender('history');
    if (S.historyView === 'chart') renderHistoryChart(getHistoryDays());
  } else {
    rerender('history');
  }
}

function applyCustomRange() {
  const start = document.getElementById('hist-start')?.value;
  const end   = document.getElementById('hist-end')?.value;
  if (!start || !end) { toast('Pick both start and end dates.', 'warn'); return; }
  if (start > end) { toast('Start must be before end.', 'warn'); return; }
  S.historyStart = start; S.historyEnd = end;
  const content = document.getElementById('history-content');
  if (content) content.innerHTML = renderHistoryContent();
  if (S.historyView === 'chart') renderHistoryChart(getHistoryDays());
}

function setHistoryView(v) {
  S.historyView = v;
  const content = document.getElementById('history-content');
  // Toggle active buttons
  document.querySelectorAll('.view-toggle button').forEach((b,i) => {
    b.classList.toggle('active', (i===0&&v==='chart')||(i===1&&v==='list'));
  });
  if (content) {
    content.innerHTML = renderHistoryContent();
    if (v === 'chart') renderHistoryChart(getHistoryDays());
  }
}

function renderHistoryChart(days) {
  const canvas = document.getElementById('history-chart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (S.chartInstance) { S.chartInstance.destroy(); S.chartInstance = null; }

  const goal = S.config?.dog?.dailyCalorieGoal || 0;
  const labels = days.map(d => d.label);
  const data   = days.map(d => d.totalKcal);
  const colors = days.map(d => d.totalKcal > goal && goal > 0 ? '#e63946' : '#52b788');

  S.chartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'calories consumed',
          data,
          backgroundColor: colors,
          borderRadius: 6,
          borderSkipped: false,
        },
        ...(goal > 0 ? [{
          label: `Goal (${goal} cal)`,
          data: days.map(() => goal),
          type: 'line',
          borderColor: '#f4a261',
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
          tension: 0,
        }] : [])
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode:'index', intersect:false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth:14, font:{ size:12 } }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} cal`
          }
        }
      },
      scales: {
        x: { grid:{ display:false }, ticks:{ font:{ size:11 } } },
        y: {
          beginAtZero: true,
          grid:{ color:'rgba(0,0,0,0.05)' },
          ticks: {
            font:{ size:11 },
            callback: v => v + ' cal'
          }
        }
      }
    }
  });
}

// ----------------------------------------------------------------
// RERENDER (update current view without full page reload)
// ----------------------------------------------------------------
function rerender(view) {
  // Update just the view content area instead of full page reload
  S.route = view;
  const vc = document.getElementById('view-content');
  if (!vc) { render(); return; }
  switch (view) {
    case 'dashboard': {
      vc.innerHTML = renderDashboard();
      bindDashboard();
      // Update header subtitle
      updateHeaderSub();
      break;
    }
    case 'profile': vc.innerHTML = renderProfile(); bindProfile(); break;
    case 'foods':   vc.innerHTML = renderFoods();   bindFoods();   break;
    case 'history':
      vc.innerHTML = renderHistory();
      bindHistory();
      break;
  }
}

function updateHeaderSub() {
  const dog = S.config?.dog || {};
  const goal = dog.dailyCalorieGoal || 0;
  const today = todayKey();
  const consumed = S.logs[today]?.totalKcal || 0;
  const over = consumed > goal && goal > 0;
  const subEl = document.querySelector('.header-sub');
  if (subEl && goal > 0) {
    subEl.textContent = over
      ? `${consumed} / ${goal} cal — Over goal! ⚠`
      : `${consumed} / ${goal} cal today`;
  }
}

// ----------------------------------------------------------------
// ESCAPE HELPERS (XSS prevention)
// ----------------------------------------------------------------
function escHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function escAttr(str) {
  return escHtml(str).replace(/`/g,'&#96;');
}

// ----------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------
async function init() {
  initFirebase();

  // Check for existing session
  if (loadSession()) {
    try {
      await loadAllData();
      S.viewDate = todayKey();
      navigate('dashboard');
      return;
    } catch(e) {
      clearSession();
    }
  }

  // Try to load config — if not found, first-time setup is needed
  try {
    S.config = await fsRead('config');
    navigate('login');
  } catch(e) {
    navigate('setup');
  }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
