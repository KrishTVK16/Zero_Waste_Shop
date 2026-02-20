(function(){
  const THEME_KEY = 'zw-theme';
  const DIR_KEY = 'zw-dir';

  function setTheme(theme){
    const root = document.documentElement;
    root.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const icon = document.querySelector('[data-theme-icon]');
    if(icon){
      icon.className = theme === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
    }
  }

  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function setDir(dir){
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);

    const btn = document.querySelector('[data-dir-btn]');
    if(btn){
      btn.textContent = dir.toUpperCase();
    }
  }

  function toggleDir(){
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    setDir(current === 'rtl' ? 'ltr' : 'rtl');
  }

  function initThemeAndDir(){
    const savedTheme = localStorage.getItem(THEME_KEY);
    const savedDir = localStorage.getItem(DIR_KEY);

    setTheme(savedTheme || 'dark');
    setDir(savedDir || 'ltr');

    const themeBtn = document.querySelector('[data-theme-toggle]');
    if(themeBtn){
      themeBtn.addEventListener('click', toggleTheme);
    }

    const dirBtn = document.querySelector('[data-dir-toggle]');
    if(dirBtn){
      dirBtn.addEventListener('click', toggleDir);
    }
  }

  function initBackToTop(){
    const btn = document.querySelector('[data-back-to-top]');
    if(!btn) return;

    function sync(){
      btn.style.display = window.scrollY > 500 ? 'inline-flex' : 'none';
    }

    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  function initNavbarScroll(){
    const header = document.querySelector('.zw-navbar');
    if(!header) return;

    function sync(){
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  function initCardFilters(){
    const search = document.querySelector('[data-search-input]');
    const filter = document.querySelector('[data-filter-select]');
    const cards = Array.from(document.querySelectorAll('[data-filter-card]'));
    const empty = document.querySelector('[data-empty-state]');

    if(!cards.length) return;

    function apply(){
      const q = (search ? search.value : '').trim().toLowerCase();
      const f = (filter ? filter.value : 'all').toLowerCase();
      let visible = 0;

      cards.forEach(card => {
        const hay = (card.getAttribute('data-haystack') || card.textContent || '').toLowerCase();
        const tag = (card.getAttribute('data-tag') || '').toLowerCase();
        const okText = !q || hay.includes(q);
        const okFilter = f === 'all' || tag === f;
        const show = okText && okFilter;
        card.style.display = show ? '' : 'none';
        if(show) visible++;
      });

      if(empty){
        empty.style.display = visible === 0 ? '' : 'none';
      }
    }

    if(search) search.addEventListener('input', apply);
    if(filter) filter.addEventListener('change', apply);
    apply();
  }

  function initActiveMenu(){
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if(href === path){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initThemeAndDir();
    initNavbarScroll();
    initBackToTop();
    initCardFilters();
    initActiveMenu();
  });
})();
