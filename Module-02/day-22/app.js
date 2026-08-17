const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

const statusEl = document.querySelector("#status");
const selectEl = document.querySelector("#currency");
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const addBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");

function save() {
  localStorage.setItem(KEY, JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency
  }));
}

function load() {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.error("Could not parse saved data", e);
    }
  }
}

async function loadRates() {
  statusEl.textContent = "Loading rates…";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    state.rates = data.rates;
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent = "Could not load rates.";
  }
}

function render() {
  const codes = Object.keys(state.rates);
  selectEl.innerHTML = codes.map(c => `<option>${c}</option>`).join("");
  if (state.currency && codes.includes(state.currency)) {
    selectEl.value = state.currency;
  }
  renderWatchlist(); 
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";
    return;
  }
  watchUl.innerHTML = state.watchlist.map(c => {
    const r = state.rates[c];
    return `<li data-c="${c}">1 ETB = ${r} ${c} <button class="rm">×</button></li>`;
  }).join("");
}


formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const amt = Number(amountEl.value);
  
  if (!amt || amt <= 0) {
    resultEl.textContent = "Enter a valid amount.";
    return;
  }


  state.currency = selectEl.value;
  save();

  const rate = state.rates[state.currency];
  const out = (amt * rate).toFixed(2);
  resultEl.textContent = `${amt} ETB = ${out} ${state.currency}`;
});

addBtn.addEventListener("click", () => {
  const c = selectEl.value;
  if (!c || state.watchlist.includes(c)) return; 
  state.watchlist.push(c);
  save();
  renderWatchlist();
});

watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const c = e.target.closest("li").dataset.c;
  state.watchlist = state.watchlist.filter(x => x !== c);
  save();
  renderWatchlist();
});

async function init() {
  load();         
  await loadRates(); 
  render();        
}

init();