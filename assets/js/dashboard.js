(function(){
  function bindNav(){
    const links = Array.from(document.querySelectorAll('[data-dash-link]'));
    const panels = Array.from(document.querySelectorAll('[data-dash-panel]'));

    function show(id){
      links.forEach(a => a.classList.toggle('active', a.getAttribute('data-dash-link') === id));
      panels.forEach(p => p.style.display = p.getAttribute('data-dash-panel') === id ? '' : 'none');
    }

    links.forEach(a => {
      a.addEventListener('click', function(e){
        e.preventDefault();
        const id = a.getAttribute('data-dash-link');
        show(id);
        history.replaceState(null, '', '#' + id);
      });
    });

    const hash = (location.hash || '').replace('#','');
    const first = links[0] ? links[0].getAttribute('data-dash-link') : '';
    show(hash || first);
  }

  function bindQuickSearch(){
    const input = document.querySelector('[data-dash-search]');
    const items = Array.from(document.querySelectorAll('[data-dash-item]'));
    const empty = document.querySelector('[data-dash-empty]');

    if(!input || !items.length) return;

    function apply(){
      const q = input.value.trim().toLowerCase();
      let visible = 0;

      items.forEach(el => {
        const hay = (el.getAttribute('data-haystack') || el.textContent || '').toLowerCase();
        const show = !q || hay.includes(q);
        el.style.display = show ? '' : 'none';
        if(show) visible++;
      });

      if(empty){
        empty.style.display = visible === 0 ? '' : 'none';
      }
    }

    input.addEventListener('input', apply);
    apply();
  }

  document.addEventListener('DOMContentLoaded', function(){
    bindNav();
    bindQuickSearch();
  });
})();
