(function () {
  const STORAGE_KEY = 'new-home-planner-v1';

  const URGENCY_ORDER = ['before-move-in', 'first-week', 'first-month', 'later'];
  const URGENCY_LABELS = {
    'before-move-in': 'Before move-in (order now)',
    'first-week': 'First week',
    'first-month': 'First month',
    later: 'Later / nice to have',
  };

  const ROOM_LABELS = {
    'bedroom-1': 'Bedroom 1',
    'bedroom-2': 'Bedroom 2',
    'bedroom-3': 'Bedroom 3',
    living: 'Living room',
    hallway: 'Hallway',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    'office-nursery': 'Office / nursery',
    general: 'General',
  };

  const BUYER_LABELS = {
    vasile: 'Vasile',
    huda: 'Huda',
    either: 'Either',
    '': '—',
  };

  /** @type {typeof window.DEFAULT_ITEMS} */
  let items = [];

  let filterUrgency = 'all';
  let filterRoom = 'all';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function cloneDefaults() {
    return window.DEFAULT_ITEMS.map((it) => ({
      ...it,
      checked: false,
      custom: false,
    }));
  }

  function formatSek(n) {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(n);
  }

  function typicalPrice(item) {
    return Math.round((item.priceMin + item.priceMax) / 2);
  }

  function daysUntilMoveIn() {
    const target = new Date(window.META.moveInDate + 'T12:00:00');
    const now = new Date();
    const diff = target - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  function persist() {
    const payload = {
      version: 1,
      items,
      filterUrgency,
      filterRoom,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* quota */
    }
    updateHashQuiet();
  }

  function updateHashQuiet() {
    const slim = {
      v: 1,
      items: items.map((it) => ({
        id: it.id,
        checked: it.checked,
        priceMin: it.priceMin,
        priceMax: it.priceMax,
        buyer: it.buyer,
        note: it.note,
        name: it.custom ? it.name : undefined,
        room: it.custom ? it.room : undefined,
        urgency: it.custom ? it.urgency : undefined,
        handling: it.custom ? it.handling : undefined,
        custom: it.custom || undefined,
      })),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(slim))));
    if (location.hash.slice(1) !== encoded) {
      history.replaceState(null, '', '#' + encoded);
    }
  }

  function applyHashState() {
    const raw = location.hash.slice(1);
    if (!raw) return false;
    try {
      const json = decodeURIComponent(escape(atob(raw)));
      const data = JSON.parse(json);
      if (!data.items || !Array.isArray(data.items)) return false;
      mergeImportedState(data);
      return true;
    } catch {
      return false;
    }
  }

  function mergeImportedState(data) {
    const byId = new Map(items.map((it) => [it.id, it]));
    for (const patch of data.items) {
      let target = byId.get(patch.id);
      if (!target && patch.custom) {
        target = {
          id: patch.id,
          name: patch.name || 'Custom item',
          room: patch.room || 'general',
          urgency: patch.urgency || 'later',
          priceMin: patch.priceMin ?? 0,
          priceMax: patch.priceMax ?? 0,
          note: patch.note || '',
          buyer: patch.buyer || 'either',
          handling: !!patch.handling,
          checked: !!patch.checked,
          custom: true,
        };
        items.push(target);
        byId.set(target.id, target);
      }
      if (target) {
        if (patch.checked !== undefined) target.checked = patch.checked;
        if (patch.priceMin !== undefined) target.priceMin = patch.priceMin;
        if (patch.priceMax !== undefined) target.priceMax = patch.priceMax;
        if (patch.buyer !== undefined) target.buyer = patch.buyer;
        if (patch.note !== undefined) target.note = patch.note;
        if (patch.custom && patch.name) target.name = patch.name;
        if (patch.custom && patch.room) target.room = patch.room;
        if (patch.custom && patch.urgency) target.urgency = patch.urgency;
      }
    }
  }

  function load() {
    items = cloneDefaults();
    const fromHash = applyHashState();
    if (!fromHash) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          mergeImportedState(data);
          if (data.filterUrgency) filterUrgency = data.filterUrgency;
          if (data.filterRoom) filterRoom = data.filterRoom;
        }
      } catch {
        items = cloneDefaults();
      }
    }
  }

  function catalogItems() {
    return items.filter((it) => !it.handling);
  }

  function handlingItems() {
    return items.filter((it) => it.handling);
  }

  function filteredItems(list) {
    return list.filter((it) => {
      if (filterUrgency !== 'all' && it.urgency !== filterUrgency) return false;
      if (filterRoom !== 'all' && it.room !== filterRoom) return false;
      return true;
    });
  }

  function computeTotals() {
    const catalog = catalogItems();
    let minAll = 0;
    let maxAll = 0;
    let typicalAll = 0;
    let minChecked = 0;
    let maxChecked = 0;
    let typicalChecked = 0;
    let checkedCount = 0;

    for (const it of catalog) {
      minAll += it.priceMin;
      maxAll += it.priceMax;
      typicalAll += typicalPrice(it);
      if (it.checked) {
        checkedCount += 1;
        minChecked += it.priceMin;
        maxChecked += it.priceMax;
        typicalChecked += typicalPrice(it);
      }
    }

    const totalCount = catalog.length;
    const pct = totalCount ? Math.round((checkedCount / totalCount) * 100) : 0;

    return {
      minAll,
      maxAll,
      typicalAll,
      minChecked,
      maxChecked,
      typicalChecked,
      checkedCount,
      totalCount,
      pct,
    };
  }

  function renderItemCard(it) {
    const li = document.createElement('li');
    li.className = 'item-card' + (it.checked ? ' done' : '');
    li.dataset.id = it.id;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'item-check';
    check.checked = it.checked;
    check.setAttribute('aria-label', 'Mark purchased: ' + it.name);
    check.addEventListener('change', () => {
      it.checked = check.checked;
      persist();
      render();
    });

    const main = document.createElement('div');
    main.className = 'item-main';

    const head = document.createElement('div');
    head.className = 'item-head';

    const name = document.createElement('span');
    name.className = 'item-name';
    name.textContent = it.name;

    const price = document.createElement('span');
    price.className = 'item-price';
    price.textContent =
      formatSek(it.priceMin) +
      (it.priceMin !== it.priceMax ? ' – ' + formatSek(it.priceMax) : '') +
      ' · ~' +
      formatSek(typicalPrice(it));

    head.append(name, price);

    const tags = document.createElement('div');
    tags.className = 'item-meta';
    const roomTag = document.createElement('span');
    roomTag.className = 'tag';
    roomTag.textContent = ROOM_LABELS[it.room] || it.room;
    tags.appendChild(roomTag);

    const buyerSel = document.createElement('select');
    buyerSel.setAttribute('aria-label', 'Who is buying');
    ['either', 'vasile', 'huda', ''].forEach((val) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = val ? BUYER_LABELS[val] : 'Unassigned';
      if (it.buyer === val) opt.selected = true;
      buyerSel.appendChild(opt);
    });
    buyerSel.addEventListener('change', () => {
      it.buyer = buyerSel.value;
      persist();
    });
    tags.appendChild(buyerSel);

    const priceEditBtn = document.createElement('button');
    priceEditBtn.type = 'button';
    priceEditBtn.className = 'btn-icon';
    priceEditBtn.textContent = 'Edit price';
    priceEditBtn.addEventListener('click', () => togglePriceEdit(main, it));

    tags.appendChild(priceEditBtn);

    if (it.custom) {
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn-icon';
      del.textContent = 'Remove';
      del.addEventListener('click', () => {
        items = items.filter((x) => x.id !== it.id);
        persist();
        render();
      });
      tags.appendChild(del);
    }

    main.append(head, tags);

    if (it.note) {
      const note = document.createElement('p');
      note.className = 'item-note';
      note.textContent = it.note;
      main.appendChild(note);
    }

    li.append(check, main);
    return li;
  }

  function togglePriceEdit(main, it) {
    const existing = $('.price-edit', main);
    if (existing) {
      existing.remove();
      return;
    }
    const wrap = document.createElement('div');
    wrap.className = 'price-edit item-note';
    wrap.innerHTML = `
      <label>Min <input type="number" min="0" step="50" data-field="min" value="${it.priceMin}"></label>
      <span>–</span>
      <label>Max <input type="number" min="0" step="50" data-field="max" value="${it.priceMax}"></label>
      <span>SEK</span>
      <button type="button" class="btn btn-secondary" data-save>Save</button>
    `;
    wrap.querySelector('[data-save]').addEventListener('click', () => {
      const min = parseInt(wrap.querySelector('[data-field="min"]').value, 10) || 0;
      const max = parseInt(wrap.querySelector('[data-field="max"]').value, 10) || min;
      it.priceMin = Math.min(min, max);
      it.priceMax = Math.max(min, max);
      persist();
      render();
    });
    main.appendChild(wrap);
  }

  function renderLists() {
    const catalogRoot = $('#catalog-sections');
    const handlingRoot = $('#handling-list');
    catalogRoot.innerHTML = '';
    handlingRoot.innerHTML = '';

    const catalog = filteredItems(catalogItems());

    for (const urgency of URGENCY_ORDER) {
      const group = catalog.filter((it) => it.urgency === urgency);
      if (!group.length) continue;

      const block = document.createElement('section');
      block.className = 'urgency-block';
      const h3 = document.createElement('h3');
      h3.innerHTML = `<span class="badge">${URGENCY_LABELS[urgency]}</span> <span>${group.length} items</span>`;
      block.appendChild(h3);

      const ul = document.createElement('ul');
      ul.className = 'item-list';
      group.forEach((it) => ul.appendChild(renderItemCard(it)));
      block.appendChild(ul);
      catalogRoot.appendChild(block);
    }

    if (!catalog.length) {
      catalogRoot.innerHTML =
        '<p class="empty-hint">No items match the current filters.</p>';
    }

    const handling = filteredItems(handlingItems());
    if (!handling.length) {
      handlingRoot.innerHTML = '<p class="empty-hint">Nothing here.</p>';
    } else {
      const ul = document.createElement('ul');
      ul.className = 'item-list';
      handling.forEach((it) => ul.appendChild(renderItemCard(it)));
      handlingRoot.appendChild(ul);
    }
  }

  function renderStats() {
    const t = computeTotals();
    $('#stat-range').textContent = formatSek(t.minAll) + ' – ' + formatSek(t.maxAll);
    $('#stat-typical').textContent = formatSek(t.typicalAll);
    $('#stat-checked-cost').textContent =
      formatSek(t.minChecked) + ' – ' + formatSek(t.maxChecked) + ' (~' + formatSek(t.typicalChecked) + ')';
    $('#stat-checked-count').textContent = t.checkedCount + ' / ' + t.totalCount;
    $('#progress-pct').textContent = t.pct + '%';
    $('#progress-fill').style.width = t.pct + '%';
    const bar = $('.progress-bar');
    if (bar) {
      bar.setAttribute('aria-valuenow', String(t.pct));
    }
    $('#countdown-days').textContent = String(daysUntilMoveIn());
  }

  function renderFilters() {
    const urg = $('#filter-urgency');
    const room = $('#filter-room');
    urg.value = filterUrgency;
    room.value = filterRoom;
  }

  function render() {
    renderStats();
    renderLists();
    renderFilters();
  }

  function showToast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), 2800);
  }

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify({ version: 1, items, filterUrgency, filterRoom }, null, 2)],
      { type: 'application/json' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'our-new-home-planner.json';
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Downloaded JSON backup');
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.items) {
          const defaults = cloneDefaults();
          const defaultIds = new Set(defaults.map((d) => d.id));
          items = defaults.map((d) => {
            const saved = data.items.find((x) => x.id === d.id);
            if (!saved) return d;
            return {
              ...d,
              checked: !!saved.checked,
              priceMin: saved.priceMin ?? d.priceMin,
              priceMax: saved.priceMax ?? d.priceMax,
              buyer: saved.buyer ?? d.buyer,
              note: saved.note ?? d.note,
            };
          });
          for (const saved of data.items) {
            if (saved.custom && !defaultIds.has(saved.id)) {
              items.push({
                id: saved.id,
                name: saved.name || 'Custom item',
                room: saved.room || 'general',
                urgency: saved.urgency || 'later',
                priceMin: saved.priceMin ?? 0,
                priceMax: saved.priceMax ?? 0,
                note: saved.note || '',
                buyer: saved.buyer || 'either',
                handling: !!saved.handling,
                checked: !!saved.checked,
                custom: true,
              });
            }
          }
          if (data.filterUrgency) filterUrgency = data.filterUrgency;
          if (data.filterRoom) filterRoom = data.filterRoom;
          persist();
          render();
          showToast('Import successful');
        }
      } catch {
        showToast('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  function copyShareLink() {
    updateHashQuiet();
    const url = location.href.split('#')[0] + location.hash;
    navigator.clipboard.writeText(url).then(
      () => showToast('Share link copied — send to your partner'),
      () => {
        prompt('Copy this link:', url);
      }
    );
  }

  function addCustomItem(form) {
    const name = form.name.value.trim();
    if (!name) {
      showToast('Enter an item name');
      return;
    }
    const id = 'custom-' + Date.now();
    items.push({
      id,
      name,
      room: form.room.value,
      urgency: form.urgency.value,
      priceMin: parseInt(form.priceMin.value, 10) || 0,
      priceMax: parseInt(form.priceMax.value, 10) || 0,
      note: form.note.value.trim(),
      buyer: form.buyer.value,
      handling: form.handling.checked,
      checked: false,
      custom: true,
    });
    form.reset();
    persist();
    render();
    showToast('Item added');
  }

  function resetToDefaults() {
    if (!confirm('Reset all items to the default list? Your checks and edits will be lost.')) return;
    localStorage.removeItem(STORAGE_KEY);
    location.hash = '';
    items = cloneDefaults();
    filterUrgency = 'all';
    filterRoom = 'all';
    persist();
    render();
    showToast('Reset to defaults');
  }

  function init() {
    document.title = window.META.title;
    $('#hero-title').textContent = window.META.title;
    $('#hero-sub').textContent = window.META.subtitle;

    load();
    render();

    $('#filter-urgency').addEventListener('change', (e) => {
      filterUrgency = e.target.value;
      persist();
      render();
    });
    $('#filter-room').addEventListener('change', (e) => {
      filterRoom = e.target.value;
      persist();
      render();
    });

    $('#btn-export').addEventListener('click', exportJson);
    $('#btn-import').addEventListener('click', () => $('#import-file').click());
    $('#import-file').addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (f) importJson(f);
      e.target.value = '';
    });
    $('#btn-share').addEventListener('click', copyShareLink);
    $('#btn-reset').addEventListener('click', resetToDefaults);

    $('#add-item-form').addEventListener('submit', (e) => {
      e.preventDefault();
      addCustomItem(e.target);
    });

    window.addEventListener('hashchange', () => {
      items = cloneDefaults();
      if (applyHashState()) {
        persist();
        render();
        showToast('Loaded plan from link');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
