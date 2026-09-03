fetch('data/faq.json').then(r=>r.json()).then(items=>{
  const list = document.getElementById('faq-list');
  list.innerHTML = items.map(i=>`
    <div class="accordion-item" id="${i.id}">
      <button aria-expanded="false"><span>${i.q}</span><span class="chevron" aria-hidden="true">⌄</span></button>
      <div class="accordion-panel"><p>${i.a}</p></div>
    </div>`).join('');
  list.querySelectorAll('.accordion-item button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.accordion-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      if(open) history.replaceState(null,'','#'+item.id);
    });
  });
  if(location.hash){
    const t=document.querySelector(location.hash);
    if(t){t.classList.add('open'); t.querySelector('button').setAttribute('aria-expanded','true'); t.scrollIntoView();}
  }
});
