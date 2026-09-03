fetch('data/services.json').then(r=>r.json()).then(services => {
  const catSel = document.getElementById('svc-category');
  const locSel = document.getElementById('svc-location');
  const results = document.getElementById('svc-results');
  const search = document.getElementById('svc-search');
  const cats = [...new Set(services.map(s=>s.category))];
  const locs = [...new Set(services.flatMap(s=>s.location))];
  cats.forEach(c=>catSel.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`));
  locs.forEach(l=>locSel.insertAdjacentHTML('beforeend', `<option value="${l}">${l}</option>`));
  function render() {
    const q = search.value.toLowerCase();
    const cat = catSel.value, loc = locSel.value;
    const filtered = services.filter(s =>
      (!q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)) &&
      (!cat || s.category === cat) &&
      (!loc || s.location.includes(loc))
    );
    results.innerHTML = filtered.map(s => `
      <article class="card service-card">
        <div class="icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.summary}</p>
        <p class="meta">Category: ${s.category} · Eligibility: ${s.eligibility[0]}</p>
        <a href="service-${s.slug}.html">Learn more →</a>
      </article>`).join('') || '<p>No services match your filters.</p>';
  }
  [search, catSel, locSel].forEach(el => el.addEventListener('input', render));
  render();
});
