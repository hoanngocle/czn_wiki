(() => {
  const assetsUrl = new URL('.', document.currentScript.src);
  const embedded = window.self !== window.top;
  document.documentElement.classList.toggle('embedded-reader', embedded);
  const settingsKey = 'chu-gioi-reader-settings';
  const progressKey = 'chu-gioi-reader-progress';
  const read = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Reading works with storage disabled. */ } };
  const saved = read(settingsKey);
  const settings = { theme: saved?.theme === 'dark' ? 'dark' : 'light', font: Math.max(16, Math.min(30, Number(saved?.font) || 20)) };
  const reportState = () => {
    if (embedded) window.parent.postMessage({ type: 'reader-state', theme: settings.theme, font: settings.font,
      chapter: Number(document.body.dataset.chapter) || null,
      previous: !!document.querySelector('a[rel="prev"]'), next: !!document.querySelector('a[rel="next"]') }, window.location.origin);
  };
  const applySettings = () => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.setProperty('--reading-size', `${settings.font}px`);
    const output = document.querySelector('#font-size');
    if (output) output.textContent = String(settings.font);
    document.querySelector('#theme-toggle')?.setAttribute('aria-pressed', String(settings.theme === 'dark'));
    document.querySelectorAll('[data-font]').forEach(button => { button.disabled = Number(button.dataset.font) < 0 ? settings.font <= 16 : settings.font >= 30; });
    reportState();
  };
  applySettings();
  const settingsDialog = document.querySelector('.reader-settings');
  const settingsTrigger = document.querySelector('[data-settings]');
  if (settingsDialog && settingsTrigger) {
    settingsTrigger.addEventListener('click', () => {
      settingsDialog.showModal();
      settingsTrigger.setAttribute('aria-expanded', 'true');
    });
    settingsDialog.querySelector('[data-close-settings]').addEventListener('click', () => settingsDialog.close());
    settingsDialog.addEventListener('click', event => {
      const box = settingsDialog.getBoundingClientRect();
      if (event.target === settingsDialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) settingsDialog.close();
    });
    settingsDialog.addEventListener('close', () => {
      settingsTrigger.setAttribute('aria-expanded', 'false');
      settingsTrigger.focus({ preventScroll: true });
    });
  }
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
    applySettings(); save(settingsKey, settings);
  });
  document.querySelectorAll('[data-font]').forEach(button => button.addEventListener('click', () => {
    settings.font = Math.max(16, Math.min(30, settings.font + Number(button.dataset.font)));
    applySettings(); save(settingsKey, settings);
  }));
  window.addEventListener('message', event => {
    if (!embedded || event.source !== window.parent || event.origin !== window.location.origin || event.data?.type !== 'reader-action') return;
    const action = event.data.action;
    if (action === 'state') reportState();
    else if (action === 'previous' || action === 'next') document.querySelector(`a[rel="${action === 'previous' ? 'prev' : 'next'}"]`)?.click();
    else if (action === 'contents') document.querySelector('[data-contents]')?.click();
    else if (action === 'theme' || action === 'font-up' || action === 'font-down') {
      if (action === 'theme') settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
      else settings.font = Math.max(16, Math.min(30, settings.font + (action === 'font-up' ? 1 : -1)));
      applySettings(); save(settingsKey, settings);
    }
  });

  const chapter = document.body.dataset.chapter;
  if (chapter) {
    const dialog = document.createElement('dialog');
    dialog.className = 'chapter-picker';
    dialog.setAttribute('aria-labelledby', 'picker-title');
    dialog.innerHTML = '<div class="picker-heading"><h2 id="picker-title">Mục lục</h2><button type="button" aria-label="Đóng mục lục">✕</button></div><label class="picker-search">Tìm chương<input type="search" placeholder="Số chương hoặc tên chương…"></label><p class="picker-status" role="status"></p><nav class="picker-list" aria-label="Danh sách chương"></nav>';
    document.body.append(dialog);
    const search = dialog.querySelector('input');
    const list = dialog.querySelector('.picker-list');
    const status = dialog.querySelector('.picker-status');
    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
    let loading;
    let entries = [];
    let opener;
    const centerCurrent = () => {
      const active = list.querySelector('[aria-current="page"]');
      if (!active || active.hidden) { list.scrollTop = 0; return; }
      const row = active.getBoundingClientRect();
      const box = list.getBoundingClientRect();
      list.scrollTop += row.top + row.height / 2 - box.top - box.height / 2;
    };
    const filter = () => {
      const query = normalize(search.value.trim());
      let count = 0;
      entries.forEach(({ link, number, title }) => {
        link.hidden = /^\d+$/.test(query) ? number !== Number(query) : !title.includes(query);
        if (!link.hidden) count++;
      });
      status.textContent = count ? `${count.toLocaleString('vi-VN')} chương · Đang đọc chương ${chapter}` : 'Không tìm thấy chương phù hợp.';
      centerCurrent();
    };
    const loadChapters = () => loading ||= new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('chapters.js', assetsUrl).href;
      script.onload = resolve;
      script.onerror = () => { script.remove(); loading = null; reject(new Error('Unable to load chapters')); };
      document.head.append(script);
    });
    document.querySelectorAll('[data-contents]').forEach(button => button.addEventListener('click', async () => {
      opener = button;
      search.value = '';
      dialog.showModal();
      button.setAttribute('aria-expanded', 'true');
      search.focus({ preventScroll: true });
      status.textContent = 'Đang tải mục lục…';
      try {
        await loadChapters();
        if (!entries.length) {
          const fragment = document.createDocumentFragment();
          entries = window.readerChapters.map(item => {
            const link = document.createElement('a');
            link.href = new URL('../' + item.href, assetsUrl).href;
            link.textContent = item.title;
            if (item.number === Number(chapter)) link.setAttribute('aria-current', 'page');
            fragment.append(link);
            return { link, number: item.number, title: normalize(item.title) };
          });
          list.append(fragment);
        }
        if (dialog.open) filter();
      } catch { status.textContent = 'Chưa tải được mục lục. Đóng và mở lại để thử lại.'; }
    }));
    search.addEventListener('input', filter);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      opener?.setAttribute('aria-expanded', 'false');
      opener?.focus({ preventScroll: true });
    });
    const previous = read(progressKey);
    const href = document.body.dataset.href;
    const title = document.querySelector('article h1')?.textContent || '';
    const scroll = previous?.href === href && Number.isFinite(previous.scroll) ? previous.scroll : 0;
    const persist = () => save(progressKey, { href, title, chapter: Number(chapter), scroll: window.scrollY });
    const restore = () => {
      if (!location.hash && scroll > 0) window.scrollTo(0, scroll);
      persist();
    };
    if (document.readyState === 'complete') restore();
    else window.addEventListener('load', restore, { once: true });
    let timer;
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.querySelector('.scroll-progress').style.width = `${max > 0 ? window.scrollY / max * 100 : 100}%`;
      clearTimeout(timer); timer = setTimeout(persist, 200);
    }, { passive: true });
    window.addEventListener('pagehide', persist);
    document.addEventListener('keydown', event => {
      if (dialog.open || settingsDialog?.open) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.tagName) || event.target.isContentEditable) return;
      const direction = event.key === 'ArrowLeft' ? 'prev' : event.key === 'ArrowRight' ? 'next' : null;
      if (direction) document.querySelector(`a[rel="${direction}"]`)?.click();
    });
  }

  const list = document.querySelector('.chapter-list');
  if (list) {
    const rows = [...list.children];
    const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
    const searchable = rows.map(row => normalize(row.textContent));
    const input = document.querySelector('#chapter-search');
    const more = document.querySelector('#load-more');
    let limit = 80;
    const render = () => {
      const query = normalize(input.value.trim());
      const numeric = /^\d+$/.test(query) ? Number(query) : null;
      let matches = 0;
      rows.forEach((row, index) => {
        const match = numeric !== null ? index + 1 === numeric : searchable[index].includes(query);
        row.hidden = !match || ++matches > limit;
      });
      more.hidden = matches <= limit;
      document.querySelector('#empty-search').hidden = matches !== 0;
      document.querySelector('#search-status').textContent = query ? `${matches.toLocaleString('vi-VN')} chương phù hợp` : `Hiển thị ${Math.min(limit, matches).toLocaleString('vi-VN')} / ${rows.length.toLocaleString('vi-VN')} chương`;
    };
    input.addEventListener('input', () => { limit = 80; render(); });
    more.addEventListener('click', () => { limit += 80; render(); });
    render();
    const progress = read(progressKey);
    const resume = document.querySelector('#resume');
    const current = rows.find(row => row.querySelector('a').getAttribute('href') === progress?.href);
    if (current) {
      resume.href = current.querySelector('a').getAttribute('href');
      resume.textContent = `Tiếp tục: ${progress.title} →`;
      resume.hidden = false;
      current.classList.add('last-read');
    }
  }
})();
