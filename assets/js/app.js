/* 线代 · 研学室 — application */
(function () {
  'use strict';

  /* ==========================================================================
     Data & constants
     ========================================================================== */

  const CHAPTERS = window.LA_CHAPTERS || [];
  const FORMULAS = window.LA_FORMULAS || [];
  const QUESTIONS = window.LA_QUESTIONS || [];
  const CHAPTER_MAP = {};
  CHAPTERS.forEach((c) => { CHAPTER_MAP[c.id] = c; });

  const QUESTION_MAP = {};
  QUESTIONS.forEach((q) => { QUESTION_MAP[q.id] = q; });

  const FORMULA_MAP = {};
  FORMULAS.forEach((f) => { FORMULA_MAP[f.id] = f; });

  const TOTAL_SECTIONS = CHAPTERS.reduce((sum, c) => sum + c.sections.length, 0);
  const STORAGE_KEY = 'linear-algebra-lab-v1';
  const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const app = document.getElementById('app');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('sidebar-scrim');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResultsEl = document.getElementById('search-results');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmTitle = document.getElementById('confirm-title');
  const confirmMessage = document.getElementById('confirm-message');
  const confirmAccept = document.getElementById('confirm-accept');
  const themeToggle = document.getElementById('theme-toggle');
  const searchTrigger = document.getElementById('search-trigger');
  const menuBtn = document.getElementById('menu-btn');
  const toastRegion = document.getElementById('toast-region');
  const backToTop = document.getElementById('back-to-top');

  let confirmHandler = null;
  let searchItems = [];
  let searchActive = -1;
  let lastFocusedElement = null;

  let formulaFilter = { q: '', chapter: 'all', fav: false };
  let wrongFilter = { chapter: 'all', status: 'active' };
  let practiceSetup = { chapterId: 'all', count: 10, difficulty: 'all' };
  let quiz = null;
  let lastResult = null;
  let quizTimer = null;
  let dailyRevealed = false;

  /* ==========================================================================
     Icons
     ========================================================================== */

  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V21h5v-6h4v6h5V9.8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h5"/>',
    formula: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h3M9.5 8v8M15 8h2l-3 8h3"/>',
    practice: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/>',
    flag: '<path d="M4 22V4"/><path d="M4 4c4-2 7 2 11 0v9c-4 2-7-2-11 0"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    alert: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 16.5 20 19l2.5 1-2.5 1-1 2.5-1-2.5L15.5 20l2.5-1 1-2.5Z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6M12 2v3"/>',
    shuffle: '<path d="M3 7h4l10 10h4M14 7h7v7M3 17h4l3-3M17 3l4 4-4 4M17 13l4 4-4 4"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/>',
    refresh: '<path d="M20 6v5h-5"/><path d="M4 18v-5h5"/><path d="M6.1 9A7 7 0 0 1 18.5 7.5L20 11M4 13l1.5 3.5A7 7 0 0 0 17.9 15"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/>',
    medal: '<circle cx="12" cy="14" r="5"/><path d="m8.5 9.5-3-6M15.5 9.5l3-6M12 12v4M10 14h4"/>',
    play: '<path d="M7 4.5v15l13-7.5-13-7.5Z"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    'eye-off': '<path d="M3 3l18 18M10.6 6.2A11 11 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.2 6.2C3.4 8.1 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4.2-.9"/>',
    lightbulb: '<path d="M9 18h6M10 22h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.8.7-1.5 1.5-1.5 2.5h-4c0-1-.7-1.8-1.5-2.5Z"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    determinant: '<path d="M4 4h4M4 4v16M4 20h4M20 4h-4M20 4v16M20 20h-4"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    matrix: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',
    vector: '<path d="M4 20 20 4"/><path d="M14 4h6v6"/><circle cx="4" cy="20" r="1.4"/>',
    system: '<path d="M6 3H4v18h2M18 3h2v18h-2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    quadratic: '<path d="M3 19C7 19 8 5 12 5s5 14 9 14"/><path d="M3 19h18"/>',
    space: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/>',
    'book-open': '<path d="M12 6.5C10.5 5 8 4.5 3 4.5v14c5 0 7.5.5 9 2 1.5-1.5 4-2 9-2v-14c-5 0-7.5.5-9 2Z"/><path d="M12 6.5v14"/>',
    'graduation-cap': '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    'layers': '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.4 5.6L8 16l2.4-5.6L16 8Z"/>',
    circle: '<circle cx="12" cy="12" r="8"/>'
  };

  function iconSvg(name) {
    const paths = ICONS[name] || ICONS.circle;
    return `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  }

  function injectIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      el.innerHTML = iconSvg(el.dataset.icon);
    });
  }

  /* ==========================================================================
     Helpers
     ========================================================================== */

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, '&#96;');
  }

  function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function stripHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html || '';
    return (temp.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function todayISO() {
    const d = new Date();
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function dayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now - start) / 86400000);
  }

  function dateLabel(iso) {
    if (!iso) return '';
    const d = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(seconds));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function chapterOf(id) {
    return CHAPTER_MAP[id] || null;
  }

  function sectionKey(chapterId, sectionId) {
    return `${chapterId}/${sectionId}`;
  }

  function tone(chapter) {
    return chapter ? `tone-${chapter.tone}` : 'tone-slate';
  }

  function getChapterProgress(chapter) {
    const done = chapter.sections.filter((s) => state.completedSections.includes(sectionKey(chapter.id, s.id))).length;
    return {
      done,
      total: chapter.sections.length,
      pct: chapter.sections.length ? Math.round((done / chapter.sections.length) * 100) : 0
    };
  }

  function getOverallProgress() {
    const done = state.completedSections.filter((key) => {
      const [chapterId, sectionId] = key.split('/');
      const chapter = chapterOf(chapterId);
      return chapter && chapter.sections.some((s) => s.id === sectionId);
    }).length;
    return {
      done,
      total: TOTAL_SECTIONS,
      pct: TOTAL_SECTIONS ? Math.round((done / TOTAL_SECTIONS) * 100) : 0
    };
  }

  function activeMistakes() {
    return Object.keys(state.mistakes)
      .map((id) => ({ id, ...state.mistakes[id], question: QUESTION_MAP[id] }))
      .filter((item) => item.question && !item.mastered);
  }

  function masteredMistakes() {
    return Object.keys(state.mistakes)
      .map((id) => ({ id, ...state.mistakes[id], question: QUESTION_MAP[id] }))
      .filter((item) => item.question && item.mastered);
  }

  function countByChapter(questions, chapterId) {
    return questions.filter((q) => q.chapterId === chapterId).length;
  }

  function optionText(question, index) {
    if (question.type === 'judge') return index === 0 ? '正确' : '错误';
    return (question.options && question.options[index]) || '';
  }

  function questionAnswerText(question) {
    if (question.type === 'fill') return escapeHTML((question.answers || [])[0] || '');
    if (question.type === 'judge') return question.answer === 0 ? '正确' : '错误';
    return optionText(question, question.answer);
  }

  function questionAnswerPlain(question) {
    if (question.type === 'fill') return (question.answers || [])[0] || '';
    if (question.type === 'judge') return question.answer === 0 ? '正确' : '错误';
    return stripHTML(optionText(question, question.answer));
  }

  function difficultyLabel(diff) {
    return diff === 'advanced' ? '进阶' : '基础';
  }

  function typeLabel(type) {
    return type === 'fill' ? '填空题' : type === 'judge' ? '判断题' : '单选题';
  }

  function chapterLabel(chapterId) {
    return chapterOf(chapterId) ? chapterOf(chapterId).title : '综合';
  }

  function getContinueTarget() {
    if (state.lastVisited && state.lastVisited.chapterId) {
      const chapter = chapterOf(state.lastVisited.chapterId);
      const section = chapter && chapter.sections.find((s) => s.id === state.lastVisited.sectionId);
      if (chapter && section) return { chapter, section };
    }
    for (const chapter of CHAPTERS) {
      const section = chapter.sections.find((s) => !state.completedSections.includes(sectionKey(chapter.id, s.id)));
      if (section) return { chapter, section };
    }
    if (CHAPTERS[0] && CHAPTERS[0].sections[0]) {
      return { chapter: CHAPTERS[0], section: CHAPTERS[0].sections[0] };
    }
    return null;
  }

  function normalizeAnswer(value) {
    return String(value == null ? '' : value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[＋]/g, '+')
      .replace(/[−–—]/g, '-')
      .replace(/[（]/g, '(')
      .replace(/[）]/g, ')')
      .replace(/[，]/g, ',')
      .replace(/[。.]$/g, '');
  }

  function numericValue(value) {
    const v = normalizeAnswer(value);
    if (/^[+-]?\d+(\.\d+)?$/.test(v)) return Number(v);
    const fraction = v.match(/^([+-]?\d+)\/(\d+)$/);
    if (fraction) return Number(fraction[1]) / Number(fraction[2]);
    return null;
  }

  function isFillCorrect(input, question) {
    const cleaned = normalizeAnswer(input);
    if (!cleaned) return false;
    const accepted = question.answers || [];
    if (accepted.some((a) => normalizeAnswer(a) === cleaned)) return true;
    const n = numericValue(cleaned);
    if (n === null) return false;
    return accepted.some((a) => {
      const m = numericValue(a);
      return m !== null && Math.abs(n - m) < 1e-9;
    });
  }

  function focusWithoutScroll(el) {
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
  }

  /* ==========================================================================
     Persistence
     ========================================================================== */

  function defaultState() {
    return {
      theme: 'light',
      completedSections: [],
      favorites: [],
      mistakes: {},
      answered: {},
      history: {},
      sessions: [],
      activeDays: [],
      lastVisited: null
    };
  }

  function loadState() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return base;
      return {
        ...base,
        ...saved,
        completedSections: Array.isArray(saved.completedSections) ? saved.completedSections : [],
        favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
        mistakes: saved.mistakes && typeof saved.mistakes === 'object' ? saved.mistakes : {},
        answered: saved.answered && typeof saved.answered === 'object' ? saved.answered : {},
        history: saved.history && typeof saved.history === 'object' ? saved.history : {},
        sessions: Array.isArray(saved.sessions) ? saved.sessions : [],
        activeDays: Array.isArray(saved.activeDays) ? saved.activeDays : []
      };
    } catch (e) {
      return base;
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* private mode / quota — keep the session usable */
    }
  }

  function touchToday() {
    const day = todayISO();
    if (!state.activeDays.includes(day)) {
      state.activeDays.push(day);
      if (state.activeDays.length > 400) state.activeDays = state.activeDays.slice(-400);
    }
    if (!state.history[day]) state.history[day] = { answered: 0, correct: 0 };
  }

  function currentStreak() {
    const days = new Set(state.activeDays);
    const cursor = new Date();
    if (!days.has(todayISO())) cursor.setDate(cursor.getDate() - 1);
    let count = 0;
    while (days.has(localISO(cursor))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function localISO(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  /* ==========================================================================
     Math rendering
     ========================================================================== */

  function renderTexNodes(root) {
    if (!window.katex || !root) return;
    root.querySelectorAll('[data-tex]').forEach((el) => {
      if (el.dataset.rendered === '1') return;
      const tex = el.dataset.tex;
      if (!tex) return;
      try {
        window.katex.render(tex, el, {
          displayMode: el.dataset.display === 'true',
          throwOnError: false,
          strict: false,
          trust: false
        });
        el.dataset.rendered = '1';
      } catch (e) {
        el.textContent = tex;
      }
    });
  }

  function renderMath(root) {
    if (!window.renderMathInElement || !root) return;
    try {
      window.renderMathInElement(root, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$$', right: '$$', display: true }
        ],
        throwOnError: false,
        strict: false,
        trust: false,
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option']
      });
    } catch (e) {
      /* If KaTeX fails on one formula, keep the rest of the page usable. */
    }
  }

  function paint(root) {
    const target = root || app;
    injectIcons(target);
    renderTexNodes(target);
    renderMath(target);
  }

  /* ==========================================================================
     Toast / modals
     ========================================================================== */

  function toast(message, icon) {
    if (!toastRegion) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span data-icon="${icon || 'check'}"></span><span>${escapeHTML(message)}</span>`;
    toastRegion.appendChild(el);
    injectIcons(el);
    window.setTimeout(() => {
      el.classList.add('leaving');
      window.setTimeout(() => el.remove(), 260);
    }, 2400);
  }

  function updateBodyLock() {
    const locked = !searchModal.hidden ||
      !confirmModal.hidden ||
      sidebar.classList.contains('open');
    document.body.classList.toggle('no-scroll', locked);
  }

  function openSearch() {
    lastFocusedElement = document.activeElement;
    searchModal.hidden = false;
    document.body.classList.add('no-scroll');
    searchTrigger.setAttribute('aria-expanded', 'true');
    searchInput.value = '';
    updateSearch('');
    window.setTimeout(() => focusWithoutScroll(searchInput), 30);
  }

  function closeSearch() {
    if (searchModal.hidden) return;
    searchModal.hidden = true;
    searchTrigger.setAttribute('aria-expanded', 'false');
    updateBodyLock();
    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      focusWithoutScroll(lastFocusedElement);
    }
  }

  function showConfirm(options) {
    confirmTitle.textContent = options.title || '确认操作';
    confirmMessage.textContent = options.message || '';
    confirmAccept.textContent = options.acceptLabel || '确认';
    confirmAccept.className = options.danger === false ? 'btn btn-success' : 'btn btn-danger';
    confirmHandler = options.onAccept || null;
    confirmModal.hidden = false;
    document.body.classList.add('no-scroll');
    window.setTimeout(() => focusWithoutScroll(confirmAccept), 30);
  }

  function closeConfirm() {
    if (confirmModal.hidden) return;
    confirmModal.hidden = true;
    confirmHandler = null;
    updateBodyLock();
  }

  /* ==========================================================================
     Sidebar / topbar
     ========================================================================== */

  function openSidebar() {
    sidebar.classList.add('open');
    scrim.classList.add('visible');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll', 'sidebar-open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    scrim.classList.remove('visible');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sidebar-open');
    updateBodyLock();
  }

  function setTheme(next) {
    document.documentElement.dataset.theme = next;
    state.theme = next;
    saveState();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0e141b' : '#f4f1e9');
    themeToggle.setAttribute('aria-label', next === 'dark' ? '切换浅色模式' : '切换深色模式');
    renderTexNodes(document);
  }

  function updateSidebar() {
    const overall = getOverallProgress();
    const pctEl = document.getElementById('side-progress-pct');
    const fill = document.getElementById('side-progress-fill');
    const track = document.getElementById('side-progress-track');
    const note = document.getElementById('side-progress-note');
    if (pctEl) pctEl.textContent = `${overall.pct}%`;
    if (fill) fill.style.width = `${overall.pct}%`;
    if (track) {
      track.setAttribute('aria-valuenow', String(overall.pct));
      track.setAttribute('title', `已完成 ${overall.done} / ${overall.total} 节`);
    }
    if (note) {
      note.textContent = overall.done === overall.total
        ? '全部课程已完成，去练习中检验掌握程度。'
        : `已完成 ${overall.done} / ${overall.total} 节，继续构建知识地图。`;
    }

    const chapterCount = document.getElementById('nav-chapter-count');
    if (chapterCount) chapterCount.textContent = String(CHAPTERS.length);

    const badge = document.getElementById('nav-mistake-count');
    if (badge) {
      const active = activeMistakes().length;
      badge.textContent = String(active);
      badge.classList.toggle('hidden', active === 0);
    }

    const streakEl = document.getElementById('side-streak');
    if (streakEl) {
      const todayCount = state.history[todayISO()] ? state.history[todayISO()].answered : 0;
      const activeToday = state.activeDays.includes(todayISO());
      const streak = currentStreak();
      if (todayCount > 0) {
        streakEl.textContent = `今日已答 ${todayCount} 题${streak > 1 ? ` · 连续 ${streak} 天` : ''}`;
      } else if (activeToday) {
        streakEl.textContent = `今日已学习${streak > 1 ? ` · 连续 ${streak} 天` : ''}`;
      } else if (streak > 1) {
        streakEl.textContent = `连续学习 ${streak} 天 · 今天还没开始`;
      } else {
        streakEl.textContent = '今日还未学习';
      }
    }
  }

  function setActiveNav(section) {
    document.querySelectorAll('[data-route]').forEach((el) => {
      const route = el.dataset.route;
      const active = route === section || (route === 'learn' && section === 'learn');
      el.classList.toggle('active', active);
      if (active) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  function setBreadcrumb(items) {
    const el = document.getElementById('breadcrumb');
    if (!el) return;
    el.innerHTML = items.map((item, index) => {
      if (index === items.length - 1) {
        return `<span class="crumb-current">${escapeHTML(item.label)}</span>`;
      }
      return `<a href="${escapeAttr(item.href || '#/home')}">${escapeHTML(item.label)}</a><span class="crumb-sep" aria-hidden="true">/</span>`;
    }).join('');
  }

  /* ==========================================================================
     Routing
     ========================================================================== */

  function parseHash() {
    const raw = (location.hash || '#/home').replace(/^#\/?/, '');
    const [pathPart, queryPart] = raw.split('?');
    const parts = pathPart.split('/').filter(Boolean);
    const params = new URLSearchParams(queryPart || '');
    return { parts, params };
  }

  function navigate(target) {
    if (!target) return;
    if (location.hash === target) {
      route();
      return;
    }
    location.hash = target;
  }

  function route(options) {
    const opts = options || {};
    stopQuizTimer();
    const { parts, params } = parseHash();
    const first = parts[0] || 'home';

    closeSidebar();

    if (first === 'home' || !parts.length) {
      renderHome();
      setActiveNav('home');
      setBreadcrumb([{ label: '学习首页' }]);
      document.title = '线代 · 研学室｜线性代数学习站';
    } else if (first === 'learn') {
      const chapter = parts[1] ? chapterOf(parts[1]) : null;
      if (parts[1] && !chapter) {
        renderNotFound();
      } else if (chapter && parts[2]) {
        const section = chapter.sections.find((s) => s.id === parts[2]);
        if (!section) renderNotFound();
        else {
          renderReader(chapter, section);
          const sectionIndex = chapter.sections.findIndex((s) => s.id === section.id);
          setBreadcrumb([
            { label: '学习首页', href: '#/home' },
            { label: '知识课程', href: '#/learn' },
            { label: chapter.title, href: `#/learn/${chapter.id}` },
            { label: section.title === chapter.title ? `第 ${sectionIndex + 1} 节` : section.title }
          ]);
          document.title = `${section.title} · ${chapter.title}｜线代研学室`;
        }
      } else if (chapter) {
        renderChapter(chapter);
        setBreadcrumb([
          { label: '学习首页', href: '#/home' },
          { label: '知识课程', href: '#/learn' },
          { label: chapter.title }
        ]);
        document.title = `${chapter.title}｜线代研学室`;
      } else {
        renderLearnMap();
        setBreadcrumb([
          { label: '学习首页', href: '#/home' },
          { label: '知识课程' }
        ]);
        document.title = '知识课程｜线代研学室';
      }
      setActiveNav('learn');
    } else if (first === 'formulas') {
      if (parts[1] && FORMULA_MAP[parts[1]]) {
        formulaFilter = { q: '', chapter: 'all', fav: false };
      } else if (params.get('chapter') && CHAPTER_MAP[params.get('chapter')]) {
        formulaFilter = { q: '', chapter: params.get('chapter'), fav: false };
      }
      renderFormulaPage(parts[1] || '');
      setActiveNav('formulas');
      setBreadcrumb([
        { label: '学习首页', href: '#/home' },
        { label: '公式手册' }
      ]);
      document.title = '公式手册｜线代研学室';
    } else if (first === 'practice') {
      if (parts[1] === 'session') {
        renderQuiz();
      } else if (parts[1] === 'result') {
        renderResult();
      } else {
        renderPracticePage();
      }
      setActiveNav('practice');
      setBreadcrumb([
        { label: '学习首页', href: '#/home' },
        { label: '习题练习' }
      ]);
      document.title = '习题练习｜线代研学室';
    } else if (first === 'wrongbook') {
      renderWrongbook();
      setActiveNav('wrongbook');
      setBreadcrumb([
        { label: '学习首页', href: '#/home' },
        { label: '错题本' }
      ]);
      document.title = '错题本｜线代研学室';
    } else if (first === 'report') {
      renderReport();
      setActiveNav('report');
      setBreadcrumb([
        { label: '学习首页', href: '#/home' },
        { label: '学习报告' }
      ]);
      document.title = '学习报告｜线代研学室';
    } else if (first === 'about') {
      renderAbout();
      setActiveNav('');
      setBreadcrumb([
        { label: '学习首页', href: '#/home' },
        { label: '关于本站' }
      ]);
      document.title = '关于本站｜线代研学室';
    } else {
      renderNotFound();
      setActiveNav('');
    }

    app.classList.toggle('page-wide', first === 'home');
    updateSidebar();
    updateReadingProgress();
    if (opts.scroll !== false) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function showPage(html) {
    app.innerHTML = html;
    paint(app);
  }

  function setReadingProgressActive(active) {
    const bar = document.getElementById('reading-progress');
    if (bar) bar.classList.toggle('active', !!active);
  }

  function updateReadingProgress() {
    const bar = document.getElementById('reading-bar');
    if (!bar) return;
    const article = document.querySelector('.lesson-body');
    if (!article) {
      bar.style.width = '0%';
      return;
    }
    const rect = article.getBoundingClientRect();
    const total = article.offsetHeight - window.innerHeight * 0.42;
    const scrolled = Math.min(Math.max(-rect.top + 110, 0), Math.max(total, 1));
    bar.style.width = `${Math.min(100, Math.round((scrolled / Math.max(total, 1)) * 100))}%`;
  }

  /* ==========================================================================
     Home
     ========================================================================== */

  function chapterCard(chapter, index) {
    const p = getChapterProgress(chapter);
    const wide = index === CHAPTERS.length - 1 && CHAPTERS.length % 2 === 1;
    return `
      <a href="#/learn/${chapter.id}" class="chapter-card ${tone(chapter)}${wide ? ' wide' : ''} reveal" style="--reveal-i:${index}">
        <div class="chapter-card-head">
          <span class="chapter-card-icon">${iconSvg(chapter.icon)}</span>
          <span class="chapter-card-num">${chapter.number}</span>
        </div>
        <div class="chapter-body">
          <div class="chapter-main">
            <h3>${escapeHTML(chapter.title)}<small>${escapeHTML(chapter.en)}</small></h3>
            <p>${escapeHTML(chapter.description)}</p>
          </div>
          ${wide ? `<div class="chapter-wide-note">
            <span class="chapter-wide-kicker">ADVANCED · 选学</span>
            <strong>基 → 坐标 → 矩阵</strong>
            <p>把前六章收束到线性变换的语言中。</p>
          </div>` : ''}
        </div>
        <div class="chapter-card-foot">
          <span class="chapter-meta">${chapter.sections.length} 节 · ${chapter.hours}h</span>
          <div class="progress-track"><span class="progress-fill" style="width:${p.pct}%"></span></div>
          <span class="chapter-pct">${p.pct}%</span>
          <span class="chapter-arrow">${iconSvg('arrow-right')}</span>
        </div>
      </a>`;
  }

  function heroArt() {
    let grid = '';
    for (let i = 0; i <= 12; i += 1) {
      const x = 20 + i * 30;
      const y = 20 + i * 26;
      grid += `<line x1="${x}" y1="15" x2="${x}" y2="325" />`;
      grid += `<line x1="15" y1="${y}" x2="395" y2="${y}" />`;
    }
    return `
      <svg viewBox="0 0 410 340" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-shape" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#e2bf86" stop-opacity=".28"/>
            <stop offset="1" stop-color="#7fbab0" stop-opacity=".08"/>
          </linearGradient>
        </defs>
        <g stroke="rgba(235,241,247,.12)" stroke-width="1">${grid}</g>
        <path d="M200 178 318 140 356 228 238 266Z" fill="url(#hero-shape)" stroke="#d9b57a" stroke-opacity=".72" stroke-width="1.4"/>
        <path d="M200 178 318 140M200 178 238 266" stroke="#d9b57a" stroke-width="1.6"/>
        <path d="M200 178 258 154" stroke="#8fc8bd" stroke-width="1.6"/>
        <circle cx="200" cy="178" r="3" fill="#f1d7aa"/>
        <circle cx="318" cy="140" r="3.5" fill="#e2bd84"/>
        <circle cx="238" cy="266" r="3.5" fill="#86c4b9"/>
        <path d="M318 140l-9 2.5M318 140l-4-8" stroke="#e2bd84" stroke-width="1.4"/>
        <path d="M238 266l4-9M238 266l9 1.5" stroke="#86c4b9" stroke-width="1.4"/>
        <text x="328" y="132" fill="rgba(242,229,205,.7)" font-size="11" font-family="Georgia,serif" font-style="italic">Ae₁</text>
        <text x="246" y="284" fill="rgba(160,210,201,.7)" font-size="11" font-family="Georgia,serif" font-style="italic">Ae₂</text>
      </svg>`;
  }

  function renderHome() {
    const overall = getOverallProgress();
    const target = getContinueTarget();
    const daily = QUESTIONS[dayOfYear() % Math.max(QUESTIONS.length, 1)] || null;
    const spotlight = FORMULAS[(dayOfYear() * 3) % Math.max(FORMULAS.length, 1)] || null;
    const targetChapter = target ? target.chapter : null;
    const targetProgress = targetChapter ? getChapterProgress(targetChapter) : { pct: 0 };

    const continueHTML = target ? `
      <div class="continue-strip reveal" style="--reveal-i:1">
        <span class="icon-chip">${iconSvg('play')}</span>
        <div class="continue-copy">
          <small>${state.lastVisited ? '上次读到' : '从这里开始'}</small>
          <strong>${escapeHTML(target.chapter.title)} · ${escapeHTML(target.section.title)}</strong>
        </div>
        <div class="continue-progress">
          <div class="progress-track"><span class="progress-fill" style="width:${targetProgress.pct}%"></span></div>
          <span>本章 ${targetProgress.pct}%</span>
        </div>
        <a class="btn btn-sm" href="#/learn/${target.chapter.id}/${target.section.id}">${overall.done === overall.total ? '再读一遍' : '继续学习'} ${iconSvg('arrow-right')}</a>
      </div>` : '';

    const chapterCards = CHAPTERS.map((chapter, i) => chapterCard(chapter, i)).join('');

    const spotlightHTML = spotlight ? `
      <div class="spotlight-card reveal" style="--reveal-i:0">
        <span class="eyebrow">Formula of the day · 每日公式</span>
        <p class="spotlight-label">${escapeHTML(chapterLabel(spotlight.chapterId))} / ${escapeHTML(spotlight.label)}</p>
        <div class="spotlight-formula" data-tex="${escapeAttr(spotlight.tex)}" data-display="true"></div>
        <p>${escapeHTML(spotlight.description)}</p>
        <div class="spotlight-foot">
          <span class="chip">${escapeHTML(spotlight.title)}</span>
          <a href="#/formulas/${spotlight.id}">查看来源 ${iconSvg('arrow-up-right')}</a>
        </div>
      </div>` : '';

    const dailyHTML = daily ? `
      <div class="daily-card reveal" style="--reveal-i:1">
        <div class="daily-head">
          <h3>每日一题</h3>
          <span class="chip gold">${chapterLabel(daily.chapterId)}</span>
        </div>
        <div class="daily-stem">${daily.stem}</div>
        <div class="daily-actions">
          <button class="btn btn-ghost btn-sm" type="button" id="daily-reveal">${dailyRevealed ? '收起答案' : '查看答案'}</button>
          <a class="btn btn-sm" href="#/practice">去练习</a>
        </div>
        <div class="daily-answer ${dailyRevealed ? '' : 'hidden'}" id="daily-answer">
          <strong>答案：</strong>${questionAnswerText(daily)}<br>
          <span>${daily.explanation}</span>
        </div>
      </div>` : '';

    showPage(`
      <section class="hero">
        <div class="hero-copy">
          <div class="hero-eyebrow">Linear Algebra · 系统学习</div>
          <h1>把线性代数，<br>学成一幅<em>清晰的地图</em>。</h1>
          <p>从行列式、矩阵到特征值与二次型，用讲解建立直觉，用公式串起条件，用练习检验理解。这里是一条可以走完的学习路径。</p>
          <div class="hero-actions">
            <a class="btn btn-light btn-lg" href="#/learn">开始系统学习 ${iconSvg('arrow-right')}</a>
            <a class="btn btn-outline-light btn-lg" href="#/practice">直接刷题</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><strong>${CHAPTERS.length}</strong><span>核心章节</span></div>
            <div class="hero-stat"><strong>${TOTAL_SECTIONS}</strong><span>知识讲解</span></div>
            <div class="hero-stat"><strong>${FORMULAS.length}</strong><span>公式速查</span></div>
            <div class="hero-stat"><strong>${QUESTIONS.length}</strong><span>精编习题</span></div>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-grid-art">${heroArt()}</div>
          <div class="hero-float hero-float-a"><span class="dot"></span><span>特征方程</span><strong class="hero-math" data-tex="${escapeAttr(String.raw`\det(A-\lambda I)=0`)}"></strong></div>
          <div class="hero-matrix-card">
            <div class="hero-matrix-head"><span>Linear Map</span><span>2 × 2</span></div>
            <div class="hero-matrix">
              <span>1.6</span><span>0.4</span><span>0.5</span><span>1.2</span>
            </div>
            <div class="hero-matrix-foot"><span>det(A) = <strong>1.72</strong></span><span>λ ∈ ℝ</span></div>
          </div>
          <div class="hero-float hero-float-b"><span class="dot"></span><span>不变方向</span><strong class="hero-math" data-tex="${escapeAttr(String.raw`A\mathbf{x}=\lambda\mathbf{x}`)}"></strong></div>
        </div>
      </section>

      ${continueHTML}

      <div class="section-head">
        <div><h2>知识地图</h2><p>七个章节，从计算到结构，按顺序建立完整框架。</p></div>
        <a class="section-head-link" href="#/learn">查看完整课程 ${iconSvg('arrow-right')}</a>
      </div>
      <div class="chapter-grid">${chapterCards}</div>

      <div class="section-head">
        <div><h2>今日拾遗</h2><p>每天一个公式、一道题，让复习保持温度。</p></div>
        <a class="section-head-link" href="#/formulas">全部公式 ${iconSvg('arrow-right')}</a>
      </div>
      <div class="home-split">
        ${spotlightHTML}
        ${dailyHTML}
      </div>

      <div class="section-head">
        <div><h2>学习闭环</h2><p>理解、查阅、练习，三步让知识真正留下来。</p></div>
      </div>
      <div class="loop-grid">
        <div class="loop-card reveal" style="--reveal-i:0"><span class="loop-step">01</span><h3>读讲解，建框架</h3><p>先理解定义、定理和反例，不急着背公式。知道“为什么”之后，“是什么”会更牢。</p></div>
        <div class="loop-card reveal" style="--reveal-i:1"><span class="loop-step">02</span><h3>查公式，连条件</h3><p>公式不是孤立的字符串。在公式手册里同时看条件、结论与使用场景，避免条件缺失。</p></div>
        <div class="loop-card reveal" style="--reveal-i:2"><span class="loop-step">03</span><h3>做练习，找漏洞</h3><p>做完立即看解析，把错题收进错题本。隔天重做一次，比连续刷十道新题更有效。</p></div>
      </div>
    `);

    setReadingProgressActive(false);

    const revealBtn = document.getElementById('daily-reveal');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        dailyRevealed = !dailyRevealed;
        const answer = document.getElementById('daily-answer');
        if (answer) answer.classList.toggle('hidden', !dailyRevealed);
        revealBtn.textContent = dailyRevealed ? '收起答案' : '查看答案';
      });
    }
  }

  /* ==========================================================================
     Learn map / chapter / reader
     ========================================================================== */

  function renderLearnMap() {
    const overall = getOverallProgress();
    const rows = CHAPTERS.map((chapter, i) => {
      const p = getChapterProgress(chapter);
      return `
        <a class="learn-row ${tone(chapter)} reveal" style="--reveal-i:${i}" href="#/learn/${chapter.id}">
          <span class="learn-num">${chapter.number}</span>
          <div class="learn-row-main">
            <div class="learn-row-title">
              <h3>${escapeHTML(chapter.title)}</h3>
              <small>${escapeHTML(chapter.en)}</small>
              <span class="chip ${p.pct === 100 ? 'success' : ''}">${p.pct === 100 ? '已完成' : chapter.level}</span>
            </div>
            <p>${escapeHTML(chapter.description)}</p>
            <div class="learn-row-meta">
              <span class="chip">${chapter.sections.length} 节</span>
              <span class="chip">${chapter.hours} 小时</span>
              <span class="chip">${p.done}/${p.total} 已完成</span>
            </div>
          </div>
          <div class="learn-row-progress">
            <div class="learn-row-progress-head"><span>进度</span><strong>${p.pct}%</strong></div>
            <div class="progress-track"><span class="progress-fill" style="width:${p.pct}%"></span></div>
          </div>
          <span class="learn-arrow">${iconSvg('arrow-right')}</span>
        </a>`;
    }).join('');

    showPage(`
      <section class="learn-hero">
        <div class="learn-hero-copy">
          <span class="eyebrow">Curriculum · 课程</span>
          <h1>知识课程</h1>
          <p>从行列式到线性变换，每一章都由“概念—公式—例题—易错点”组成。按顺序阅读，或在已熟悉的部分直接跳读。</p>
        </div>
        <div class="learn-progress">
          <div class="ring" style="--pct:${overall.pct}"><span>${overall.pct}%</span></div>
          <div class="learn-progress-copy">
            <small>整体进度</small>
            <strong>${overall.done} / ${overall.total} 节</strong>
            <span>${overall.done === 0 ? '从一个概念开始' : overall.done === overall.total ? '全部完成' : '保持节奏，继续推进'}</span>
          </div>
        </div>
      </section>
      <div class="learn-list">${rows}</div>
      <div class="learn-note">
        <span class="icon-chip">${iconSvg('lightbulb')}</span>
        <div><h3>建议的学习路线</h3><p>先学 01–04 建立“矩阵—向量—方程组”的主干，再进入 05–06 的特征值与二次型。第 07 章作为结构提升，可以在掌握前六章后阅读。每学完一节，用右侧“标记完成”记录进度。</p></div>
      </div>
    `);
    setReadingProgressActive(false);
  }

  function asideFormulaList(chapter) {
    return FORMULAS.filter((f) => f.chapterId === chapter.id).slice(0, 5).map((f) => `
      <a class="aside-formula-link" href="#/formulas/${f.id}">
        <span>${escapeHTML(f.title)}</span>${iconSvg('chevron-right')}
      </a>`).join('');
  }

  function renderChapter(chapter) {
    const p = getChapterProgress(chapter);
    const firstIncomplete = chapter.sections.find((s) => !state.completedSections.includes(sectionKey(chapter.id, s.id))) || chapter.sections[0];
    const target = firstIncomplete || chapter.sections[0];
    const formulaHTML = asideFormulaList(chapter);

    const sections = chapter.sections.map((section, i) => {
      const done = state.completedSections.includes(sectionKey(chapter.id, section.id));
      return `
        <a class="chapter-section-item ${done ? 'done' : ''}" href="#/learn/${chapter.id}/${section.id}">
          <span class="chapter-section-num">${done ? iconSvg('check') : String(i + 1).padStart(2, '0')}</span>
          <div class="chapter-section-copy">
            <h3>${escapeHTML(section.title)} ${done ? '<span class="chip success">已学</span>' : ''}</h3>
            <p>${escapeHTML(section.summary)}</p>
          </div>
          <span class="chapter-section-tail"><span class="min-read">${section.minutes} min</span><span class="chapter-arrow">${iconSvg('arrow-right')}</span></span>
        </a>`;
    }).join('');

    showPage(`
      <section class="chapter-banner ${tone(chapter)}" data-number="${chapter.number}">
        <div class="chapter-banner-copy">
          <div class="chapter-banner-top">
            <span class="chapter-banner-icon">${iconSvg(chapter.icon)}</span>
            <span class="chip">第 ${chapter.number} 章</span>
            <span class="chip">${chapter.level}</span>
          </div>
          <h1>${escapeHTML(chapter.title)}<small>${escapeHTML(chapter.en)}</small></h1>
          <p>${escapeHTML(chapter.description)}</p>
          <div class="chapter-banner-meta">
            <span class="chip">${chapter.sections.length} 节</span>
            <span class="chip">约 ${chapter.hours} 小时</span>
            <span class="chip">${p.done} 节已完成</span>
          </div>
        </div>
        <div class="chapter-banner-side">
          <div class="ring" style="--pct:${p.pct}"><span>${p.pct}%</span></div>
          <a class="btn btn-sm" href="#/learn/${chapter.id}/${target.id}">${p.done ? '继续学习' : '开始本章'} ${iconSvg('arrow-right')}</a>
        </div>
      </section>

      <div class="chapter-layout">
        <div>
          <div class="section-head" style="margin-top:0"><div><h2>本章目录</h2><p>${p.done === p.total ? '本章已完成，可以复习或进入练习。' : '建议按顺序学习，每节 8–15 分钟。'}</p></div></div>
          <div class="chapter-sections">${sections}</div>
        </div>
        <aside class="chapter-aside">
          <div class="aside-card">
            <div class="aside-card-head"><h3>本章核心公式</h3><a href="#/formulas?chapter=${chapter.id}">全部 →</a></div>
            ${formulaHTML || '<p>本章暂无速查公式。</p>'}
          </div>
          <div class="aside-card">
            <div class="aside-card-head"><h3>学习提示</h3></div>
            <p>${chapter.id === 'determinants' ? '先熟悉二阶、三阶的计算，再把性质当成“化简工具”，不要死记展开式。' :
              chapter.id === 'matrices' ? '矩阵乘法先确认维度，再逐行乘列。特别留意“不可交换”和“不可消去”。' :
              chapter.id === 'vectors' ? '把“线性相关”翻译成“齐次方程组有非零解”，很多判断会立刻变简单。' :
              chapter.id === 'systems' ? '解方程组时只做行变换；判断解的结构时，永远先比较两个秩。' :
              chapter.id === 'eigen' ? '每求出一组特征值，先用迹和行列式验算，再求特征向量。' :
              chapter.id === 'quadratic' ? '写矩阵时交叉项系数要除以 2；判断正定优先试顺序主子式。' :
              '线性空间的关键是“选基”。选定基后，抽象问题就变成矩阵问题。'}</p>
            <a class="btn btn-ghost btn-sm btn-block" href="#/practice" data-practice-chapter="${chapter.id}">去练习本章 ${iconSvg('arrow-right')}</a>
          </div>
        </aside>
      </div>
    `);
    setReadingProgressActive(false);
    document.querySelectorAll('[data-practice-chapter]').forEach((link) => {
      link.addEventListener('click', () => {
        practiceSetup.chapterId = link.dataset.practiceChapter;
      });
    });
  }

  function renderReader(chapter, section) {
    const idx = chapter.sections.findIndex((s) => s.id === section.id);
    const prev = idx > 0 ? chapter.sections[idx - 1] : null;
    const next = idx < chapter.sections.length - 1 ? chapter.sections[idx + 1] : null;
    const done = state.completedSections.includes(sectionKey(chapter.id, section.id));
    const p = getChapterProgress(chapter);
    const formulaHTML = asideFormulaList(chapter);

    state.lastVisited = { chapterId: chapter.id, sectionId: section.id, at: new Date().toISOString() };
    saveState();

    const toc = chapter.sections.map((s, i) => {
      const active = s.id === section.id;
      const sDone = state.completedSections.includes(sectionKey(chapter.id, s.id));
      return `<a class="reader-toc-link ${active ? 'active' : ''} ${sDone ? 'done' : ''}" href="#/learn/${chapter.id}/${s.id}">
        <span class="toc-num">${sDone ? iconSvg('check') : String(i + 1).padStart(2, '0')}</span>
        <span>${escapeHTML(s.title)}</span>
      </a>`;
    }).join('');

    showPage(`
      <div class="reader-layout ${tone(chapter)}">
        <article class="reader-main">
          <header class="reader-head">
            <div class="reader-kicker">
              <a href="#/learn">知识课程</a><span class="sep">/</span>
              <a href="#/learn/${chapter.id}">${escapeHTML(chapter.title)}</a><span class="sep">/</span>
              <span class="chip">第 ${idx + 1} / ${chapter.sections.length} 节</span>
            </div>
            <h1>${escapeHTML(section.title)}</h1>
            <p class="reader-lead">${escapeHTML(section.summary)}</p>
            <div class="reader-meta">
              <span class="meta-item">${iconSvg('clock')} ${section.minutes} 分钟</span>
              <span class="meta-item">${iconSvg('layers')} 本章 ${p.done}/${p.total} 节</span>
              <span class="meta-item">${iconSvg('chart')} 本章进度 ${p.pct}%</span>
              <span class="meta-spacer"></span>
              <button class="reader-complete ${done ? 'done' : ''}" type="button" data-toggle-complete="${sectionKey(chapter.id, section.id)}">
                ${done ? `${iconSvg('check')} 已完成` : `${iconSvg('circle')} 标记完成`}
              </button>
            </div>
          </header>

          <div class="lesson-body">${section.html}</div>

          <div class="reader-footer">
            <div>
              ${prev ? `<a class="reader-nav" href="#/learn/${chapter.id}/${prev.id}">${iconSvg('arrow-left')} ${escapeHTML(prev.title)}</a>` : `<a class="reader-nav" href="#/learn/${chapter.id}">${iconSvg('arrow-left')} 返回本章目录</a>`}
            </div>
            <button class="btn ${done ? 'btn-ghost' : 'btn-success'}" type="button" data-toggle-complete="${sectionKey(chapter.id, section.id)}">
              ${done ? '标记为未完成' : '学完这一节'} ${iconSvg(done ? 'refresh' : 'check')}
            </button>
            <div>
              ${next ? `<a class="reader-nav" href="#/learn/${chapter.id}/${next.id}">下一节：${escapeHTML(next.title)} ${iconSvg('arrow-right')}</a>` : `<a class="reader-nav" href="#/learn/${chapter.id}">完成本章 ${iconSvg('arrow-right')}</a>`}
            </div>
          </div>
        </article>

        <aside class="reader-aside">
          <div class="reader-toc">
            <h3>本章目录 · ${chapter.number}</h3>
            <div class="reader-toc-list">${toc}</div>
            <div class="reader-toc-foot">已完成 ${p.done} / ${p.total} 节 · ${p.pct}%</div>
          </div>
          <div class="aside-card">
            <div class="aside-card-head"><h3>本章公式</h3><a href="#/formulas?chapter=${chapter.id}">全部 →</a></div>
            ${formulaHTML}
          </div>
        </aside>
      </div>
    `);

    setReadingProgressActive(true);
    updateReadingProgress();

    document.querySelectorAll('[data-toggle-complete]').forEach((btn) => {
      btn.addEventListener('click', () => toggleSectionComplete(btn.dataset.toggleComplete));
    });
  }

  function toggleSectionComplete(key) {
    const [chapterId, sectionId] = key.split('/');
    const chapter = chapterOf(chapterId);
    const section = chapter && chapter.sections.find((s) => s.id === sectionId);
    if (!section) return;
    const index = state.completedSections.indexOf(key);
    const scrollY = window.scrollY;
    if (index >= 0) {
      state.completedSections.splice(index, 1);
      toast('已标记为未完成');
    } else {
      state.completedSections.push(key);
      touchToday();
      toast('完成一节，进度已更新', 'check-circle');
    }
    saveState();
    route({ scroll: false });
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  }

  /* ==========================================================================
     Formula handbook
     ========================================================================== */

  function getFilteredFormulas() {
    const q = formulaFilter.q.trim().toLowerCase();
    return FORMULAS.filter((f) => {
      if (formulaFilter.chapter !== 'all' && f.chapterId !== formulaFilter.chapter) return false;
      if (formulaFilter.fav && !state.favorites.includes(f.id)) return false;
      if (!q) return true;
      const haystack = [
        f.title, f.description, f.condition, f.tex, f.label,
        ...(f.tags || []), chapterLabel(f.chapterId)
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  function formulaCardHTML(f) {
    const chapter = chapterOf(f.chapterId);
    const fav = state.favorites.includes(f.id);
    const longFormula = f.tex.length > 115 || /\n/.test(f.tex);
    return `
      <article class="formula-card ${tone(chapter)}" data-formula-id="${f.id}" id="formula-${f.id}">
        <div class="formula-card-top">
          <div>
            <div class="formula-card-label">${escapeHTML(chapterLabel(f.chapterId))} · ${escapeHTML(f.label || '公式')}</div>
            <h3>${escapeHTML(f.title)}</h3>
          </div>
          <button class="formula-fav ${fav ? 'active' : ''}" type="button" data-fav-id="${f.id}" aria-label="${fav ? '取消收藏' : '收藏公式'}" aria-pressed="${fav}">
            ${iconSvg('star')}
          </button>
        </div>
        <div class="formula-math ${longFormula ? 'long' : ''}" data-tex="${escapeAttr(f.tex)}" data-display="true"></div>
        <p class="formula-desc">${escapeHTML(f.description)}</p>
        <p class="formula-condition"><strong>适用条件：</strong>${escapeHTML(f.condition)}</p>
        <div class="formula-card-foot">
          ${(f.tags || []).slice(0, 3).map((tag) => `<span class="formula-tag">${escapeHTML(tag)}</span>`).join('')}
          <button class="formula-copy" type="button" data-copy-id="${f.id}">${iconSvg('copy')} 复制 LaTeX</button>
        </div>
      </article>`;
  }

  function renderFormulaPage(focusId) {
    const chapter = focusId && FORMULA_MAP[focusId] ? chapterOf(FORMULA_MAP[focusId].chapterId) : null;
    const filtered = getFilteredFormulas();
    const chapterButtons = `<button class="filter-chip ${formulaFilter.chapter === 'all' ? 'active' : ''}" type="button" data-formula-chapter="all">全部</button>` +
      CHAPTERS.map((c) => `<button class="filter-chip ${formulaFilter.chapter === c.id ? 'active' : ''}" type="button" data-formula-chapter="${c.id}">${escapeHTML(c.title)}</button>`).join('');

    showPage(`
      <div class="formula-hero">
        <div>
          <span class="eyebrow">Formula Index · 速查</span>
          <h1>公式手册</h1>
          <p>不只记公式，更要知道它在什么条件下成立。收藏高频公式，随时回来复习。</p>
        </div>
        <div class="formula-hero-stat">
          <div class="stat-box"><strong>${FORMULAS.length}</strong><span>条公式</span></div>
          <div class="stat-box"><strong>${state.favorites.length}</strong><span>条收藏</span></div>
        </div>
      </div>

      <div class="formula-toolbar">
        <div class="formula-search">
          <span data-icon="search"></span>
          <input type="search" id="formula-search" value="${escapeAttr(formulaFilter.q)}" placeholder="搜索公式名称、条件、标签…" aria-label="搜索公式">
        </div>
        <div class="filter-scroll" id="formula-chapters">${chapterButtons}</div>
        <button class="filter-chip filter-fav ${formulaFilter.fav ? 'active' : ''}" type="button" id="formula-fav-filter">${iconSvg('star')} 收藏</button>
      </div>

      <div class="formula-count" id="formula-count">共 <strong>${filtered.length}</strong> 条公式</div>
      <div class="formula-grid" id="formula-grid">${filtered.map(formulaCardHTML).join('') || emptyFormulaHTML()}</div>
    `);

    setReadingProgressActive(false);
    bindFormulaPage();

    if (focusId && FORMULA_MAP[focusId]) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`formula-${focusId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('flash');
          window.setTimeout(() => el.classList.remove('flash'), 1900);
        }
      });
    }
  }

  function clearFormulaQuery() {
    if (location.hash.indexOf('?') === -1) return;
    try {
      history.replaceState(null, '', '#/formulas');
    } catch (e) {
      location.hash = '#/formulas';
    }
  }

  function emptyFormulaHTML() {
    return `
      <div class="empty-state no-results">
        <span class="empty-icon">${iconSvg('search')}</span>
        <h3>没有找到匹配的公式</h3>
        <p>换一个关键词，或清除章节筛选和收藏筛选后再试。</p>
        <button class="btn btn-ghost btn-sm" type="button" id="formula-reset">清除筛选</button>
      </div>`;
  }

  function refreshFormulaGrid() {
    const grid = document.getElementById('formula-grid');
    if (!grid) return;
    const filtered = getFilteredFormulas();
    const count = document.getElementById('formula-count');
    if (count) count.innerHTML = `共 <strong>${filtered.length}</strong> 条公式`;
    grid.innerHTML = filtered.map(formulaCardHTML).join('') || emptyFormulaHTML();
    paint(grid);
    const reset = document.getElementById('formula-reset');
    if (reset) {
      reset.addEventListener('click', () => {
        formulaFilter = { q: '', chapter: 'all', fav: false };
        clearFormulaQuery();
        const input = document.getElementById('formula-search');
        if (input) input.value = '';
        document.querySelectorAll('[data-formula-chapter]').forEach((b) => b.classList.toggle('active', b.dataset.formulaChapter === 'all'));
        const fav = document.getElementById('formula-fav-filter');
        if (fav) fav.classList.remove('active');
        refreshFormulaGrid();
      });
    }
  }

  function bindFormulaPage() {
    const input = document.getElementById('formula-search');
    if (input) {
      input.addEventListener('input', () => {
        formulaFilter.q = input.value;
        clearFormulaQuery();
        refreshFormulaGrid();
      });
    }

    document.querySelectorAll('[data-formula-chapter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        formulaFilter.chapter = btn.dataset.formulaChapter;
        clearFormulaQuery();
        document.querySelectorAll('[data-formula-chapter]').forEach((b) => b.classList.toggle('active', b === btn));
        refreshFormulaGrid();
      });
    });

    const favFilter = document.getElementById('formula-fav-filter');
    if (favFilter) {
      favFilter.addEventListener('click', () => {
        formulaFilter.fav = !formulaFilter.fav;
        clearFormulaQuery();
        favFilter.classList.toggle('active', formulaFilter.fav);
        refreshFormulaGrid();
      });
    }

    const initialReset = document.getElementById('formula-reset');
    if (initialReset) {
      initialReset.addEventListener('click', () => {
        formulaFilter = { q: '', chapter: 'all', fav: false };
        clearFormulaQuery();
        route({ scroll: false });
      });
    }

    const grid = document.getElementById('formula-grid');
    if (grid) {
      grid.addEventListener('click', (event) => {
        const favBtn = event.target.closest('[data-fav-id]');
        if (favBtn) {
          const id = favBtn.dataset.favId;
          const index = state.favorites.indexOf(id);
          if (index >= 0) {
            state.favorites.splice(index, 1);
            favBtn.classList.remove('active');
            favBtn.setAttribute('aria-pressed', 'false');
            favBtn.setAttribute('aria-label', '收藏公式');
            toast('已取消收藏');
          } else {
            state.favorites.push(id);
            favBtn.classList.add('active');
            favBtn.setAttribute('aria-pressed', 'true');
            favBtn.setAttribute('aria-label', '取消收藏');
            toast('已收藏，之后可在“收藏”中快速找到', 'star');
          }
          saveState();
          const stat = document.querySelector('.formula-hero-stat .stat-box:nth-child(2) strong');
          if (stat) stat.textContent = String(state.favorites.length);
          if (formulaFilter.fav) refreshFormulaGrid();
          return;
        }

        const copyBtn = event.target.closest('[data-copy-id]');
        if (copyBtn) {
          const formula = FORMULA_MAP[copyBtn.dataset.copyId];
          if (formula) copyToClipboard(formula.tex, copyBtn);
        }
      });
    }
  }

  function copyToClipboard(text, button) {
    const done = () => {
      if (!button) return;
      const original = button.innerHTML;
      button.innerHTML = `${iconSvg('check')} 已复制`;
      window.setTimeout(() => { button.innerHTML = original; }, 1500);
      toast('LaTeX 已复制到剪贴板', 'copy');
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      done();
    } catch (e) {
      toast('复制失败，请手动选择公式', 'alert');
    }
  }

  /* ==========================================================================
     Practice setup
     ========================================================================== */

  function filteredQuestions() {
    return QUESTIONS.filter((q) => {
      if (practiceSetup.chapterId !== 'all' && q.chapterId !== practiceSetup.chapterId) return false;
      if (practiceSetup.difficulty !== 'all' && q.difficulty !== practiceSetup.difficulty) return false;
      return true;
    });
  }

  function renderPracticePage() {
    const available = filteredQuestions();
    const wrongCount = activeMistakes().length;
    const totalAnswered = Object.keys(state.answered).length;
    const accuracy = getOverallAccuracy();
    const chapterButtons = `<button class="chapter-pill ${practiceSetup.chapterId === 'all' ? 'active' : ''}" type="button" data-setup-chapter="all"><span class="pill-dot" style="background:var(--teal)"></span>综合练习</button>` +
      CHAPTERS.map((c) => `<button class="chapter-pill ${tone(c)} ${practiceSetup.chapterId === c.id ? 'active' : ''}" type="button" data-setup-chapter="${c.id}"><span class="pill-dot"></span>${escapeHTML(c.title)}</button>`).join('');

    showPage(`
      <section class="practice-hero">
        <div>
          <span class="eyebrow">Practice · 刻意练习</span>
          <h1>做题，是理解的试金石。</h1>
          <p>从精编题库中随机抽题，提交后立即获得答案与解析。做错的题会自动进入错题本，等你回来攻克。</p>
        </div>
        <div class="practice-hero-stat"><strong>${QUESTIONS.length}</strong><span>道精编习题</span></div>
      </section>

      <div class="practice-layout">
        <div class="setup-card">
          <div class="setup-section">
            <div class="setup-section-head"><h2>选择章节</h2><span>不确定时选综合练习</span></div>
            <div class="chapter-pills">${chapterButtons}</div>
          </div>

          <div class="setup-section">
            <div class="setup-section-head"><h2>练习设置</h2><span>随时可以调整</span></div>
            <div class="setup-row">
              <div class="setup-field">
                <span class="setup-field-label">题目数量</span>
                <div class="segmented" id="count-segment">
                  ${[5, 10, 15, 20].map((n) => `<button type="button" data-count="${n}" class="${practiceSetup.count === n ? 'active' : ''}">${n} 题</button>`).join('')}
                </div>
              </div>
              <div class="setup-field">
                <span class="setup-field-label">难度</span>
                <div class="segmented" id="difficulty-segment">
                  <button type="button" data-difficulty="all" class="${practiceSetup.difficulty === 'all' ? 'active' : ''}">全部</button>
                  <button type="button" data-difficulty="basic" class="${practiceSetup.difficulty === 'basic' ? 'active' : ''}">基础</button>
                  <button type="button" data-difficulty="advanced" class="${practiceSetup.difficulty === 'advanced' ? 'active' : ''}">进阶</button>
                </div>
              </div>
            </div>
            <div class="setup-note">
              <span data-icon="info"></span>
              <span>本组筛选下共有 <strong>${available.length}</strong> 道题，实际抽取 <strong>${Math.min(practiceSetup.count, available.length)}</strong> 道。每道题提交后都会显示完整解析。</span>
            </div>
          </div>

          <div class="setup-actions">
            <span class="setup-available">累计答题 <strong>${totalAnswered}</strong> 道${accuracy === null ? '' : ` · 正确率 <strong>${accuracy}%</strong>`}</span>
            <button class="btn btn-lg" type="button" id="start-quiz" ${available.length ? '' : 'disabled'}>开始练习 ${iconSvg('arrow-right')}</button>
          </div>
        </div>

        <aside class="setup-side">
          <div class="setup-side-card">
            <h3>练习方式</h3>
            <p>选择适合现在的节奏。</p>
            <div class="mode-list">
              <button class="mode-item" type="button" id="mode-random">
                <span class="mode-icon">${iconSvg('shuffle')}</span>
                <span><strong>随机练习</strong><span>按当前筛选抽题</span></span>
                <span class="mode-arrow">${iconSvg('chevron-right')}</span>
              </button>
              <button class="mode-item" type="button" id="mode-wrong" ${wrongCount ? '' : 'disabled'}>
                <span class="mode-icon">${iconSvg('flag')}</span>
                <span><strong>错题重练</strong><span>${wrongCount ? `待攻克 ${wrongCount} 道` : '还没有错题'}</span></span>
                <span class="mode-arrow">${iconSvg('chevron-right')}</span>
              </button>
              <button class="mode-item daily-mode" type="button" id="mode-daily">
                <span class="mode-icon">${iconSvg('target')}</span>
                <span><strong>每日一题</strong><span>用一道题保持手感</span></span>
                <span class="mode-arrow">${iconSvg('chevron-right')}</span>
              </button>
            </div>
          </div>
          <div class="setup-tip">
            <span data-icon="lightbulb"></span>
            <p>先自己写出思路，再提交答案。看懂解析不等于会做，隔天重做同一道题，才能真正掌握。</p>
          </div>
        </aside>
      </div>

      <div class="section-head">
        <div><h2>练习概览</h2><p>每一次提交都会留下记录，用来发现自己的薄弱章节。</p></div>
        <a class="section-head-link" href="#/report">查看学习报告 ${iconSvg('arrow-right')}</a>
      </div>
      <div class="practice-insights">
        <div class="mini-stat"><span class="icon-chip">${iconSvg('practice')}</span><div><strong>${state.sessions.length}</strong><span>完成练习组数</span></div></div>
        <div class="mini-stat"><span class="icon-chip">${iconSvg('target')}</span><div><strong>${accuracy === null ? '—' : `${accuracy}%`}</strong><span>累计正确率</span></div></div>
        <div class="mini-stat"><span class="icon-chip">${iconSvg('flag')}</span><div><strong>${activeMistakes().length}</strong><span>待攻克错题</span></div></div>
        <div class="mini-stat"><span class="icon-chip">${iconSvg('spark')}</span><div><strong>${currentStreak()}</strong><span>连续学习天数</span></div></div>
      </div>
    `);

    setReadingProgressActive(false);
    bindPracticeSetup();
  }

  function bindPracticeSetup() {
    document.querySelectorAll('[data-setup-chapter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        practiceSetup.chapterId = btn.dataset.setupChapter;
        route({ scroll: false });
      });
    });

    document.querySelectorAll('[data-count]').forEach((btn) => {
      btn.addEventListener('click', () => {
        practiceSetup.count = Number(btn.dataset.count);
        route({ scroll: false });
      });
    });

    document.querySelectorAll('[data-difficulty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        practiceSetup.difficulty = btn.dataset.difficulty;
        route({ scroll: false });
      });
    });

    const start = document.getElementById('start-quiz');
    if (start) {
      start.addEventListener('click', () => {
        const pool = filteredQuestions();
        if (!pool.length) {
          toast('当前筛选下没有题目', 'alert');
          return;
        }
        const count = Math.min(practiceSetup.count, pool.length);
        startQuizWithQuestions(shuffle(pool).slice(0, count), {
          ...practiceSetup,
          count,
          mode: 'random'
        });
      });
    }

    const randomMode = document.getElementById('mode-random');
    if (randomMode) {
      randomMode.addEventListener('click', () => {
        const startBtn = document.getElementById('start-quiz');
        if (startBtn) startBtn.click();
      });
    }

    const wrongMode = document.getElementById('mode-wrong');
    if (wrongMode) {
      wrongMode.addEventListener('click', () => {
        startWrongPractice();
      });
    }

    const dailyMode = document.getElementById('mode-daily');
    if (dailyMode) {
      dailyMode.addEventListener('click', () => {
        if (!QUESTIONS.length) return;
        const q = QUESTIONS[dayOfYear() % QUESTIONS.length];
        startQuizWithQuestions([q], {
          chapterId: q.chapterId,
          difficulty: q.difficulty,
          count: 1,
          mode: 'daily'
        });
      });
    }
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startQuizWithQuestions(questions, config) {
    if (!questions || !questions.length) {
      toast('没有可用的题目', 'alert');
      return;
    }
    stopQuizTimer();
    quiz = {
      questions,
      index: 0,
      selected: {},
      inputs: {},
      results: {},
      config: config || { chapterId: 'all', difficulty: 'all', count: questions.length, mode: 'random' },
      startedAt: Date.now(),
      timerId: null
    };
    lastResult = null;
    dailyRevealed = false;
    if (location.hash === '#/practice/session') route();
    else location.hash = '#/practice/session';
  }

  function startWrongPractice() {
    const pool = activeMistakes().map((item) => item.question).filter(Boolean);
    if (!pool.length) {
      toast('错题本已经是空的', 'check-circle');
      return;
    }
    startQuizWithQuestions(shuffle(pool).slice(0, 20), {
      chapterId: 'all',
      difficulty: 'all',
      count: Math.min(20, pool.length),
      mode: 'wrong'
    });
  }

  /* ==========================================================================
     Quiz
     ========================================================================== */

  function stopQuizTimer() {
    if (quizTimer) {
      clearInterval(quizTimer);
      quizTimer = null;
    }
    if (quiz) quiz.timerId = null;
  }

  function startQuizTimer() {
    const el = document.getElementById('quiz-timer');
    if (!el || !quiz) return;
    const tick = () => {
      if (!quiz) return;
      el.textContent = formatTime((Date.now() - quiz.startedAt) / 1000);
    };
    tick();
    quizTimer = window.setInterval(tick, 1000);
    if (quiz) quiz.timerId = quizTimer;
  }

  function renderQuiz() {
    if (!quiz) {
      showPage(`
        <div class="quiz-empty">
          <div class="empty-state">
            <span class="empty-icon">${iconSvg('practice')}</span>
            <h2>还没有进行中的练习</h2>
            <p>先选择章节与题量，开始一组练习。每道题提交后都会给出解析。</p>
            <a class="btn" href="#/practice">去设置练习 ${iconSvg('arrow-right')}</a>
          </div>
        </div>`);
      setReadingProgressActive(false);
      return;
    }

    const q = quiz.questions[quiz.index];
    const result = quiz.results[quiz.index];
    const submitted = !!result;
    const total = quiz.questions.length;
    const progress = Math.round(((quiz.index + (submitted ? 1 : 0)) / total) * 100);
    const chapter = chapterOf(q.chapterId);
    const selected = quiz.selected[quiz.index];
    const inputValue = quiz.inputs[quiz.index] || '';

    let optionsHTML = '';
    if (q.type === 'fill') {
      optionsHTML = `
        <div class="fill-answer">
          <label for="fill-input">你的答案</label>
          <div class="fill-input-row">
            <input class="fill-input ${submitted ? (result.correct ? 'correct' : 'wrong') : ''}" id="fill-input" type="text" value="${escapeAttr(inputValue)}" placeholder="输入答案" autocomplete="off" ${submitted ? 'disabled' : ''} aria-describedby="fill-format">
            ${q.suffix ? `<span class="fill-suffix">${escapeHTML(q.suffix)}</span>` : ''}
          </div>
          <p class="fill-format" id="fill-format">${escapeHTML(q.format || '填写数值或表达式，不要带单位')}</p>
        </div>`;
    } else {
      const count = q.type === 'judge' ? 2 : q.options.length;
      optionsHTML = `<div class="answer-options">${Array.from({ length: count }, (_, i) => {
        const isCorrect = submitted && i === q.answer;
        const isWrong = submitted && result.userChoice === i && !result.correct;
        const isSelected = !submitted && selected === i;
        return `
          <button class="option-btn ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" type="button" data-option="${i}" aria-pressed="${isSelected}" ${submitted ? 'disabled' : ''}>
            <span class="option-key">${String.fromCharCode(65 + i)}</span>
            <span class="option-text">${q.type === 'judge' ? (i === 0 ? '正确' : '错误') : q.options[i]}</span>
            ${isCorrect ? `<span class="option-state">${iconSvg('check-circle')}</span>` : isWrong ? `<span class="option-state wrong">${iconSvg('x-circle')}</span>` : ''}
          </button>`;
      }).join('')}</div>`;
    }

    const feedbackHTML = submitted ? `
      <div class="feedback ${result.correct ? '' : 'wrong'}" role="status">
        <span class="feedback-icon">${iconSvg(result.correct ? 'check' : 'x')}</span>
        <div class="feedback-copy">
          <h3>${result.correct ? '回答正确' : '再想一步'}</h3>
          <p><strong>正确答案：</strong>${questionAnswerText(q)}</p>
          <p>${q.explanation}</p>
        </div>
      </div>` : '';

    const dots = quiz.questions.map((item, i) => {
      const r = quiz.results[i];
      let cls = 'answer-dot';
      if (i === quiz.index) cls += ' current';
      else if (r && r.correct) cls += ' correct';
      else if (r && !r.correct) cls += ' wrong';
      return `<button class="${cls}" type="button" data-question-index="${i}" aria-label="第 ${i + 1} 题${r ? (r.correct ? '，答对' : '，答错') : ''}">${i + 1}</button>`;
    }).join('');

    const correctSoFar = Object.values(quiz.results).filter((r) => r.correct).length;
    const answeredSoFar = Object.keys(quiz.results).length;

    showPage(`
      <div class="quiz-page">
        <div class="quiz-top">
          <button class="quiz-exit" type="button" id="quiz-exit">${iconSvg('arrow-left')} 退出</button>
          <div class="quiz-progress-wrap">
            <div class="quiz-progress-head"><span>第 <strong>${quiz.index + 1}</strong> / ${total} 题</span><strong>${progress}%</strong></div>
            <div class="progress-track"><span class="progress-fill" style="width:${progress}%"></span></div>
          </div>
          <span class="quiz-timer">${iconSvg('timer')} <span id="quiz-timer">${formatTime((Date.now() - quiz.startedAt) / 1000)}</span></span>
        </div>

        <div class="quiz-layout">
          <div class="quiz-main">
            <section class="question-card ${tone(chapter)}">
              <div class="question-meta">
                <span class="chip">${escapeHTML(chapterLabel(q.chapterId))}</span>
                <span class="chip ${q.difficulty === 'advanced' ? 'gold' : 'teal'}">${difficultyLabel(q.difficulty)}</span>
                <span class="chip">${typeLabel(q.type)}</span>
                <span class="q-index">QUESTION ${String(quiz.index + 1).padStart(2, '0')}</span>
              </div>
              <h2 class="question-stem">${q.stem}</h2>
              ${optionsHTML}
              ${feedbackHTML}
              <div class="quiz-actions">
                ${submitted
                  ? `<button class="btn btn-lg" type="button" id="quiz-next">${quiz.index === total - 1 ? '查看结果' : '下一题'} ${iconSvg('arrow-right')}</button>`
                  : `<button class="btn btn-lg" type="button" id="quiz-submit" ${q.type === 'fill' ? (inputValue ? '' : 'disabled') : (selected === undefined ? 'disabled' : '')}>提交答案</button>`}
                <span class="kb-hint"><kbd>Enter</kbd> ${submitted ? '下一题' : '提交'} · <kbd>1–4</kbd> 选择</span>
              </div>
            </section>
          </div>

          <aside class="answer-sheet">
            <h3>答题卡 <span>${answeredSoFar}/${total}</span></h3>
            <div class="answer-dots">${dots}</div>
            <div class="answer-sheet-legend">
              <span><i class="legend-dot good"></i>正确</span>
              <span><i class="legend-dot bad"></i>错误</span>
              <span><i class="legend-dot"></i>未答</span>
            </div>
            <div class="answer-sheet-score">
              <span>当前正确</span>
              <strong>${correctSoFar}<small> / ${answeredSoFar || 0}</small></strong>
            </div>
          </aside>
        </div>
      </div>
    `);

    setReadingProgressActive(false);
    startQuizTimer();
    bindQuiz(q, submitted, result);
  }

  function bindQuiz(q, submitted, result) {
    document.querySelectorAll('[data-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (submitted) return;
        selectOption(Number(btn.dataset.option));
      });
    });

    const fillInput = document.getElementById('fill-input');
    if (fillInput && !submitted) {
      fillInput.addEventListener('input', () => {
        quiz.inputs[quiz.index] = fillInput.value;
        const submit = document.getElementById('quiz-submit');
        if (submit) submit.disabled = !fillInput.value.trim();
      });
      fillInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submitCurrentAnswer();
        }
      });
    }

    const submit = document.getElementById('quiz-submit');
    if (submit) submit.addEventListener('click', submitCurrentAnswer);

    const next = document.getElementById('quiz-next');
    if (next) {
      next.addEventListener('click', () => {
        if (quiz.index >= quiz.questions.length - 1) finishQuiz();
        else {
          quiz.index += 1;
          route({ scroll: false });
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    }

    document.querySelectorAll('[data-question-index]').forEach((dot) => {
      dot.addEventListener('click', () => {
        quiz.index = Number(dot.dataset.questionIndex);
        route({ scroll: false });
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });

    const exit = document.getElementById('quiz-exit');
    if (exit) {
      exit.addEventListener('click', () => {
        showConfirm({
          title: '退出本次练习？',
          message: '退出后本轮不会生成成绩，但已经提交的题目仍会计入累计答题数据。',
          acceptLabel: '退出练习',
          onAccept: () => {
            quiz = null;
            stopQuizTimer();
            lastResult = null;
            if (location.hash === '#/practice') route();
            else location.hash = '#/practice';
          }
        });
      });
    }
  }

  function selectOption(index) {
    if (!quiz || quiz.results[quiz.index]) return;
    quiz.selected[quiz.index] = index;
    document.querySelectorAll('[data-option]').forEach((btn) => {
      const active = Number(btn.dataset.option) === index;
      btn.classList.toggle('selected', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const submit = document.getElementById('quiz-submit');
    if (submit) submit.disabled = false;
  }

  function submitCurrentAnswer() {
    if (!quiz) return;
    const index = quiz.index;
    if (quiz.results[index]) return;
    const q = quiz.questions[index];
    let correct = false;
    let userChoice = null;
    let userText = '';

    if (q.type === 'fill') {
      const input = document.getElementById('fill-input');
      const value = input ? input.value : (quiz.inputs[index] || '');
      if (!normalizeAnswer(value)) {
        toast('请先填写答案', 'info');
        return;
      }
      correct = isFillCorrect(value, q);
      userText = escapeHTML(value);
      quiz.inputs[index] = value;
    } else {
      const choice = quiz.selected[index];
      if (choice === undefined) {
        toast('请先选择一个选项', 'info');
        return;
      }
      userChoice = choice;
      correct = choice === q.answer;
      userText = optionText(q, choice);
    }

    quiz.results[index] = {
      correct,
      userChoice,
      userText,
      correctText: questionAnswerText(q)
    };
    recordAnswer(q, correct);
    route({ scroll: false });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function recordAnswer(question, correct) {
    const now = new Date().toISOString();
    const prev = state.answered[question.id] || { count: 0 };
    state.answered[question.id] = {
      correct,
      count: prev.count + 1,
      lastAt: now
    };

    touchToday();
    if (!state.history[todayISO()]) state.history[todayISO()] = { answered: 0, correct: 0 };
    state.history[todayISO()].answered += 1;
    if (correct) state.history[todayISO()].correct += 1;

    if (correct) {
      if (state.mistakes[question.id]) {
        state.mistakes[question.id].mastered = true;
        state.mistakes[question.id].masteredAt = now;
      }
    } else {
      const old = state.mistakes[question.id] || { count: 0 };
      state.mistakes[question.id] = {
        count: old.count + 1,
        lastAt: now,
        mastered: false,
        masteredAt: null
      };
    }

    saveState();
    updateSidebar();
  }

  function finishQuiz() {
    if (!quiz) return;
    const total = quiz.questions.length;
    const results = quiz.questions.map((q, i) => quiz.results[i] || {
      correct: false,
      userChoice: null,
      userText: '',
      correctText: questionAnswerText(q)
    });
    const correct = results.filter((r) => r.correct).length;
    const durationSec = Math.max(1, Math.round((Date.now() - quiz.startedAt) / 1000));
    const config = { ...quiz.config };

    lastResult = {
      questions: quiz.questions.slice(),
      results,
      config,
      correct,
      total,
      score: total ? Math.round((correct / total) * 100) : 0,
      durationSec,
      completedAt: new Date().toISOString()
    };

    state.sessions.push({
      date: lastResult.completedAt,
      total,
      correct,
      score: lastResult.score,
      chapterId: config.chapterId,
      mode: config.mode || 'random',
      durationSec
    });
    if (state.sessions.length > 40) state.sessions = state.sessions.slice(-40);
    saveState();
    quiz = null;
    stopQuizTimer();
    updateSidebar();
    toast('练习完成，成绩已记录', 'trophy');
    if (location.hash === '#/practice/result') route();
    else location.hash = '#/practice/result';
  }

  /* ==========================================================================
     Results
     ========================================================================== */

  function renderResult() {
    if (!lastResult) {
      showPage(`
        <div class="quiz-empty">
          <div class="empty-state">
            <span class="empty-icon">${iconSvg('trophy')}</span>
            <h2>还没有本轮成绩</h2>
            <p>完成一组练习后，这里会显示得分、用时与逐题回顾。</p>
            <a class="btn" href="#/practice">开始练习 ${iconSvg('arrow-right')}</a>
          </div>
        </div>`);
      setReadingProgressActive(false);
      return;
    }

    const r = lastResult;
    const ringColor = r.score >= 85 ? 'var(--teal)' : r.score >= 60 ? 'var(--gold)' : 'var(--danger)';
    const message = r.score >= 90 ? '非常稳，已经形成了清晰的概念网络。' :
      r.score >= 75 ? '基础扎实，再把少数薄弱点补上就更好了。' :
      r.score >= 60 ? '大方向正确，建议回到相关章节重读关键定义。' :
      '不要急着刷更多题，先对照解析找出概念断点，再重做这一组。';
    const chapterStats = {};
    r.questions.forEach((q, i) => {
      const key = q.chapterId;
      if (!chapterStats[key]) chapterStats[key] = { total: 0, correct: 0 };
      chapterStats[key].total += 1;
      if (r.results[i].correct) chapterStats[key].correct += 1;
    });
    const breakdown = Object.entries(chapterStats).map(([chapterId, v]) => `
      <div class="breakdown-row">
        <div class="breakdown-row-head"><span>${escapeHTML(chapterLabel(chapterId))}</span><strong>${v.correct}/${v.total}</strong></div>
        <div class="progress-track"><span class="progress-fill" style="width:${Math.round((v.correct / v.total) * 100)}%"></span></div>
      </div>`).join('');

    const review = r.questions.map((q, i) => {
      const item = r.results[i];
      return `
        <div class="review-item ${item.correct ? '' : 'wrong-open'}" data-review-item>
          <span class="review-status ${item.correct ? '' : 'wrong'}">${iconSvg(item.correct ? 'check' : 'x')}</span>
          <div>
            <h4>${q.stem}</h4>
            <div class="review-detail">
              <span>你的答案：<strong class="${item.correct ? '' : 'wrong-ans'}">${item.userText || '未作答'}</strong></span>
              ${item.correct ? '' : `<span>正确答案：<strong>${item.correctText}</strong></span>`}
              <span>${chapterLabel(q.chapterId)} · ${difficultyLabel(q.difficulty)}</span>
            </div>
            <button class="review-toggle" type="button" data-review-toggle>查看解析</button>
            <div class="review-explanation">${q.explanation}</div>
          </div>
        </div>`;
    }).join('');

    const wrongIds = r.questions.filter((q, i) => !r.results[i].correct).map((q) => q.id);

    showPage(`
      <section class="result-hero">
        <div class="result-ring" style="--pct:${r.score};--result-color:${ringColor}">
          <div class="result-ring-inner"><strong>${r.score}<small>分</small></strong><span>SCORE</span></div>
        </div>
        <div class="result-copy">
          <span class="eyebrow">Practice Report · 本轮成绩</span>
          <h1>${r.score >= 85 ? '做得漂亮。' : r.score >= 60 ? '继续向前。' : '先停下来复盘。'}</h1>
          <p>${message}</p>
          <div class="result-stats">
            <div class="result-stat"><strong>${r.correct}/${r.total}</strong><span>答对题数</span></div>
            <div class="result-stat"><strong>${formatTime(r.durationSec)}</strong><span>用时</span></div>
            <div class="result-stat"><strong>${r.config.mode === 'wrong' ? '错题重练' : r.config.mode === 'daily' ? '每日一题' : '随机练习'}</strong><span>练习模式</span></div>
          </div>
          <div class="result-actions">
            <button class="btn" type="button" id="result-retry">再练一组 ${iconSvg('refresh')}</button>
            ${wrongIds.length ? `<button class="btn btn-ghost" type="button" id="result-wrong">重练本轮错题（${wrongIds.length}）</button>` : ''}
            <a class="btn btn-ghost" href="#/practice">返回练习设置</a>
          </div>
        </div>
      </section>

      <div class="result-layout">
        <div class="result-review">
          <div class="result-review-head"><h2>逐题回顾</h2><span>${r.total} 道题</span></div>
          <div class="review-list">${review}</div>
        </div>
        <aside class="result-side">
          <div class="result-breakdown">
            <h3>章节表现</h3>
            ${breakdown}
          </div>
          <div class="result-note">
            <span data-icon="lightbulb"></span>
            <p>${wrongIds.length ? '把本轮错题重做一遍，并在明天再复习一次，比继续刷新题更有效。' : '全部答对。可以尝试更高难度，或进入下一章继续学习。'}</p>
          </div>
          <a class="btn btn-ghost btn-block" href="#/wrongbook">打开错题本 ${iconSvg('arrow-right')}</a>
        </aside>
      </div>
    `);

    setReadingProgressActive(false);

    document.querySelectorAll('[data-review-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('[data-review-item]');
        if (!item) return;
        item.classList.toggle('open');
        btn.textContent = item.classList.contains('open') ? '收起解析' : '查看解析';
      });
    });

    const retry = document.getElementById('result-retry');
    if (retry) {
      retry.addEventListener('click', () => {
        if (r.config.mode === 'wrong') {
          startWrongPractice();
          return;
        }
        const pool = QUESTIONS.filter((q) => {
          if (r.config.chapterId !== 'all' && q.chapterId !== r.config.chapterId) return false;
          if (r.config.difficulty !== 'all' && q.difficulty !== r.config.difficulty) return false;
          return true;
        });
        if (!pool.length) {
          toast('没有可重练的题目', 'alert');
          return;
        }
        const count = Math.min(r.config.count || pool.length, pool.length);
        startQuizWithQuestions(shuffle(pool).slice(0, count), { ...r.config, mode: 'random', count });
      });
    }

    const wrongBtn = document.getElementById('result-wrong');
    if (wrongBtn) {
      wrongBtn.addEventListener('click', () => {
        const wrongQuestions = r.questions.filter((q, i) => !r.results[i].correct);
        if (!wrongQuestions.length) return;
        startQuizWithQuestions(shuffle(wrongQuestions), {
          chapterId: 'all',
          difficulty: 'all',
          count: wrongQuestions.length,
          mode: 'wrong'
        });
      });
    }
  }

  /* ==========================================================================
     Wrong book
     ========================================================================== */

  function allMistakeEntries() {
    return Object.keys(state.mistakes)
      .map((id) => ({ id, ...state.mistakes[id], question: QUESTION_MAP[id] }))
      .filter((item) => item.question)
      .sort((a, b) => (a.mastered === b.mastered ? (b.count || 0) - (a.count || 0) : a.mastered ? 1 : -1));
  }

  function renderWrongbook() {
    const all = allMistakeEntries();
    const active = all.filter((item) => !item.mastered);
    const mastered = all.filter((item) => item.mastered);
    const chapterIds = Array.from(new Set(all.map((item) => item.question.chapterId)));
    const filtered = all.filter((item) => {
      if (wrongFilter.chapter !== 'all' && item.question.chapterId !== wrongFilter.chapter) return false;
      if (wrongFilter.status === 'active' && item.mastered) return false;
      if (wrongFilter.status === 'mastered' && !item.mastered) return false;
      return true;
    });

    const chapterFilters = `<button class="filter-chip ${wrongFilter.chapter === 'all' ? 'active' : ''}" type="button" data-wrong-chapter="all">全部章节</button>` +
      chapterIds.map((id) => `<button class="filter-chip ${wrongFilter.chapter === id ? 'active' : ''}" type="button" data-wrong-chapter="${id}">${escapeHTML(chapterLabel(id))}</button>`).join('');

    const cards = filtered.map((item) => {
      const q = item.question;
      const chapter = chapterOf(q.chapterId);
      return `
        <article class="wrong-card ${tone(chapter)}" data-wrong-id="${q.id}">
          <div class="wrong-card-head">
            <span class="chip">${escapeHTML(chapterLabel(q.chapterId))}</span>
            <span class="chip ${item.mastered ? 'success' : 'danger'}">${item.mastered ? '已攻克' : `错 ${item.count || 1} 次`}</span>
            <span class="chip">${difficultyLabel(q.difficulty)}</span>
            <span class="q-index">${q.type === 'fill' ? '填空题' : q.type === 'judge' ? '判断题' : '单选题'}</span>
          </div>
          <div class="wrong-card-body">
            <div class="question-stem">${q.stem}</div>
            <div class="wrong-answer-box">
              <span>正确答案：<strong>${questionAnswerText(q)}</strong></span>
              ${item.lastAt ? `<span>最近错误：${dateLabel(item.lastAt.slice(0, 10))}</span>` : ''}
            </div>
            <div class="wrong-explanation">${q.explanation}</div>
            <div class="wrong-card-actions">
              <button class="btn btn-ghost btn-sm" type="button" data-wrong-action="practice" data-wrong-id="${q.id}">重做这道题 ${iconSvg('arrow-right')}</button>
              ${item.mastered
                ? `<button class="btn btn-ghost btn-sm" type="button" data-wrong-action="unmaster" data-wrong-id="${q.id}">重新标记待复习</button>`
                : `<button class="btn btn-ghost btn-sm" type="button" data-wrong-action="master" data-wrong-id="${q.id}">${iconSvg('check')} 标记已掌握</button>`}
              <button class="btn btn-ghost btn-sm remove-btn" type="button" data-wrong-action="remove" data-wrong-id="${q.id}">${iconSvg('trash')} 移出</button>
            </div>
          </div>
        </article>`;
    }).join('');

    showPage(`
      <div class="wrongbook-head">
        <div>
          <span class="eyebrow">Mistake Review · 复盘</span>
          <h1>错题本</h1>
          <p>错误是最具体的学习线索。把每一道错题弄懂，比盲目多刷十道题更有价值。</p>
        </div>
        <div class="wrongbook-head-actions">
          <button class="btn" type="button" id="wrong-redo" ${active.length ? '' : 'disabled'}>错题重练 ${iconSvg('refresh')}</button>
          ${mastered.length ? `<button class="btn btn-ghost" type="button" id="wrong-clear">清空已攻克</button>` : ''}
        </div>
      </div>

      <div class="wrongbook-stats">
        <div class="mini-stat"><span class="icon-chip">${iconSvg('flag')}</span><div><strong>${active.length}</strong><span>道待攻克</span></div></div>
        <div class="mini-stat"><span class="icon-chip">${iconSvg('check-circle')}</span><div><strong>${mastered.length}</strong><span>道已攻克</span></div></div>
        <div class="mini-stat"><span class="icon-chip">${iconSvg('target')}</span><div><strong>${all.reduce((sum, item) => sum + (item.count || 0), 0)}</strong><span>累计错误次数</span></div></div>
      </div>

      <div class="wrongbook-toolbar">
        <button class="filter-chip ${wrongFilter.status === 'active' ? 'active' : ''}" type="button" data-wrong-status="active">待攻克 ${active.length}</button>
        <button class="filter-chip ${wrongFilter.status === 'mastered' ? 'active' : ''}" type="button" data-wrong-status="mastered">已攻克 ${mastered.length}</button>
        <button class="filter-chip ${wrongFilter.status === 'all' ? 'active' : ''}" type="button" data-wrong-status="all">全部 ${all.length}</button>
        <span style="flex:1"></span>
        ${chapterFilters}
      </div>

      ${filtered.length ? `<div class="wrong-list">${cards}</div>` : `
        <div class="empty-state wrong-empty">
          <span class="empty-icon">${iconSvg('flag')}</span>
          <h2>${all.length ? '这个筛选下还没有错题' : '错题本还是空的'}</h2>
          <p>${all.length ? '试着切换章节或状态筛选。' : '去练习中检验一下，答错的题会自动收进这里，方便以后集中攻克。'}</p>
          <a class="btn" href="#/practice">去练习 ${iconSvg('arrow-right')}</a>
        </div>`}
    `);

    setReadingProgressActive(false);
    bindWrongbook();
  }

  function bindWrongbook() {
    document.querySelectorAll('[data-wrong-status]').forEach((btn) => {
      btn.addEventListener('click', () => {
        wrongFilter.status = btn.dataset.wrongStatus;
        route({ scroll: false });
      });
    });
    document.querySelectorAll('[data-wrong-chapter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        wrongFilter.chapter = btn.dataset.wrongChapter;
        route({ scroll: false });
      });
    });

    document.querySelectorAll('[data-wrong-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.wrongId;
        const action = btn.dataset.wrongAction;
        if (action === 'practice') {
          const q = QUESTION_MAP[id];
          if (q) startQuizWithQuestions([q], { chapterId: q.chapterId, difficulty: q.difficulty, count: 1, mode: 'wrong' });
        } else if (action === 'master') {
          if (state.mistakes[id]) {
            state.mistakes[id].mastered = true;
            state.mistakes[id].masteredAt = new Date().toISOString();
            saveState();
            toast('已标记为掌握', 'check-circle');
            route({ scroll: false });
          }
        } else if (action === 'unmaster') {
          if (state.mistakes[id]) {
            state.mistakes[id].mastered = false;
            state.mistakes[id].masteredAt = null;
            saveState();
            toast('已移回待攻克');
            route({ scroll: false });
          }
        } else if (action === 'remove') {
          delete state.mistakes[id];
          saveState();
          toast('已移出错题本');
          route({ scroll: false });
        }
      });
    });

    const redo = document.getElementById('wrong-redo');
    if (redo) redo.addEventListener('click', startWrongPractice);

    const clear = document.getElementById('wrong-clear');
    if (clear) {
      clear.addEventListener('click', () => {
        showConfirm({
          title: '清空已攻克错题？',
          message: '这会删除所有已标记为“已攻克”的错题记录，待攻克的错题不受影响。',
          acceptLabel: '清空',
          onAccept: () => {
            Object.keys(state.mistakes).forEach((id) => {
              if (state.mistakes[id].mastered) delete state.mistakes[id];
            });
            saveState();
            route({ scroll: false });
            toast('已清空已攻克错题');
          }
        });
      });
    }
  }

  /* ==========================================================================
     Report
     ========================================================================== */

  function getOverallAccuracy() {
    const values = Object.values(state.history);
    const answered = values.reduce((sum, item) => sum + (item.answered || 0), 0);
    const correct = values.reduce((sum, item) => sum + (item.correct || 0), 0);
    if (!answered) return null;
    return Math.round((correct / answered) * 100);
  }

  function renderReport() {
    const overall = getOverallProgress();
    const historyValues = Object.values(state.history);
    const totalAnswered = historyValues.reduce((sum, item) => sum + (item.answered || 0), 0);
    const totalCorrect = historyValues.reduce((sum, item) => sum + (item.correct || 0), 0);
    const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : null;
    const streak = currentStreak();
    const activeDaysSet = new Set(state.activeDays);
    const last7 = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setHours(12, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const iso = localISO(d);
      const h = state.history[iso] || { answered: 0, correct: 0 };
      last7.push({
        iso,
        label: i === 0 ? '今天' : WEEKDAYS[d.getDay()],
        answered: h.answered || 0,
        correct: h.correct || 0
      });
    }
    const maxActivity = Math.max(1, ...last7.map((d) => d.answered));
    const chart = last7.map((d) => `
      <div class="activity-day ${d.label === '今天' ? 'today' : ''}" title="${dateLabel(d.iso)}：答题 ${d.answered} 道，答对 ${d.correct} 道">
        <div class="activity-bars">
          <span class="activity-bar answered" style="height:${Math.max(3, Math.round((d.answered / maxActivity) * 100))}%"></span>
          <span class="activity-bar correct" style="height:${d.answered ? Math.max(3, Math.round((d.correct / maxActivity) * 100)) : 3}%"></span>
        </div>
        <span class="activity-label">${d.label}</span>
      </div>`).join('');

    const masteryRows = CHAPTERS.map((chapter) => {
      const p = getChapterProgress(chapter);
      const chapterQuestionIds = QUESTIONS.filter((q) => q.chapterId === chapter.id).map((q) => q.id);
      const answered = chapterQuestionIds.filter((id) => state.answered[id]).length;
      const correct = chapterQuestionIds.filter((id) => state.answered[id] && state.answered[id].correct).length;
      const acc = answered ? Math.round((correct / answered) * 100) : null;
      const score = Math.round(p.pct * 0.75 + (acc === null ? p.pct * 0.25 : acc * 0.25));
      return `
        <div class="mastery-item ${tone(chapter)}">
          <div class="mastery-name"><span class="pill-dot"></span>${escapeHTML(chapter.title)}<span class="chip" style="margin-left:auto">${p.done}/${p.total} 节</span></div>
          <span class="mastery-pct">${p.pct}%</span>
          <div class="progress-track"><span class="progress-fill" style="width:${score}%"></span></div>
          <div class="mastery-caption"><span>课程完成 ${p.pct}%</span><span>${acc === null ? '尚未练习' : `答题正确率 ${acc}%`}</span></div>
        </div>`;
    }).join('');

    const hasAnyChapterComplete = CHAPTERS.some((c) => getChapterProgress(c).pct === 100);
    const achievements = [
      { id: 'first-section', icon: 'book-open', title: '迈出第一步', desc: '完成第一节课程', unlocked: overall.done >= 1 },
      { id: 'first-practice', icon: 'practice', title: '开始练习', desc: '完成一组习题', unlocked: state.sessions.length >= 1 },
      { id: 'accuracy', icon: 'target', title: '稳定发挥', desc: '累计 20 题且正确率 ≥ 80%', unlocked: totalAnswered >= 20 && accuracy !== null && accuracy >= 80 },
      { id: 'chapter-master', icon: 'medal', title: '章节通关', desc: '完成任意一整章', unlocked: hasAnyChapterComplete },
      { id: 'mistake-hunter', icon: 'flag', title: '错题猎手', desc: '攻克 1 道错题', unlocked: masteredMistakes().length >= 1 },
      { id: 'streak-3', icon: 'spark', title: '保持节奏', desc: '连续学习 3 天', unlocked: streak >= 3 },
      { id: 'collector', icon: 'star', title: '公式收藏家', desc: '收藏 5 条公式', unlocked: state.favorites.length >= 5 },
      { id: 'all-clear', icon: 'trophy', title: '全线贯通', desc: '完成全部课程', unlocked: overall.done === overall.total && overall.total > 0 }
    ];
    const achievementHTML = achievements.map((a) => `
      <div class="achievement ${a.unlocked ? 'unlocked' : ''}">
        <span class="achievement-icon">${iconSvg(a.icon)}</span>
        <div><strong>${a.title}</strong><span>${a.desc}</span></div>
      </div>`).join('');

    const recentSessions = state.sessions.slice(-4).reverse();
    const recentHTML = recentSessions.map((s) => `
      <div class="mastery-item">
        <div class="mastery-name">${escapeHTML(chapterLabel(s.chapterId))}<span class="chip" style="margin-left:auto">${s.correct}/${s.total}</span></div>
        <span class="mastery-pct">${s.score}%</span>
        <div class="progress-track"><span class="progress-fill" style="width:${s.score}%"></span></div>
        <div class="mastery-caption"><span>${dateLabel(String(s.date).slice(0, 10))}</span><span>${formatTime(s.durationSec || 0)}</span></div>
      </div>`).join('');

    showPage(`
      <div class="report-head">
        <div>
          <span class="eyebrow">Learning Report · 成长记录</span>
          <h1>学习报告</h1>
          <p>${overall.done === 0 && !totalAnswered ? '从今天开始记录你的学习轨迹。完成后回到这里，看见积累。' : `你已经完成 ${overall.done} 节课程，累计答题 ${totalAnswered} 道。继续保持。`}</p>
        </div>
        <a class="btn btn-ghost" href="#/learn">继续学习 ${iconSvg('arrow-right')}</a>
      </div>

      <div class="report-stats">
        <div class="report-stat" data-mark="∫"><span>课程完成</span><strong>${overall.pct}%</strong><small>${overall.done} / ${overall.total} 节</small></div>
        <div class="report-stat" data-mark="Σ"><span>累计答题</span><strong>${totalAnswered}</strong><small>含重复练习</small></div>
        <div class="report-stat" data-mark="λ"><span>答题正确率</span><strong>${accuracy === null ? '—' : `${accuracy}%`}</strong><small>${totalCorrect} 道答对</small></div>
        <div class="report-stat" data-mark="∞"><span>连续学习</span><strong>${streak}</strong><small>天</small></div>
      </div>

      <div class="report-grid">
        <div class="report-column">
          <div class="report-card">
            <div class="report-card-head"><h2>近七日学习</h2><span>答题量 / 正确量</span></div>
            <div class="activity-chart">${chart}</div>
            <div class="activity-legend">
              <span><i class="legend-swatch"></i>正确</span>
              <span><i class="legend-swatch faint"></i>答题总量</span>
              <span style="margin-left:auto">活跃 ${activeDaysSet.size} 天</span>
            </div>
            ${totalAnswered ? '' : '<div class="activity-empty-note">还没有答题记录。完成一组练习，这里就会出现你的学习曲线。</div>'}
          </div>

          <div class="report-card">
            <div class="report-card-head"><h2>最近练习</h2><span>${state.sessions.length} 组成绩</span></div>
            ${recentHTML || '<div class="study-calendar-note">还没有练习记录。完成一组练习后，这里会显示最近成绩。</div>'}
            <div class="study-calendar-note">建议每次练习 10–15 题，做完立即复盘，不要只关注分数。</div>
          </div>
        </div>

        <div class="report-column">
          <div class="report-card">
            <div class="report-card-head"><h2>章节掌握度</h2><span>课程进度 + 答题表现</span></div>
            <div class="mastery-list">${masteryRows}</div>
          </div>

          <div class="report-card">
            <div class="report-card-head"><h2>成就徽章</h2><span>${achievements.filter((a) => a.unlocked).length} / ${achievements.length}</span></div>
            <div class="achievements">${achievementHTML}</div>
          </div>
        </div>
      </div>

      <div class="data-card">
        <p>学习数据只保存在当前浏览器中，不会上传。你可以导出备份，或清空后重新开始。</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" type="button" id="export-data">${iconSvg('download')} 导出数据</button>
          <button class="btn btn-ghost btn-sm" type="button" id="reset-data">${iconSvg('trash')} 清空记录</button>
        </div>
      </div>
    `);

    setReadingProgressActive(false);

    const exportBtn = document.getElementById('export-data');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = {
          exportedAt: new Date().toISOString(),
          state,
          meta: {
            chapters: CHAPTERS.length,
            sections: TOTAL_SECTIONS,
            formulas: FORMULAS.length,
            questions: QUESTIONS.length
          }
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `线代学习数据-${todayISO()}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast('学习数据已导出', 'download');
      });
    }

    const resetBtn = document.getElementById('reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        showConfirm({
          title: '清空全部学习记录？',
          message: '课程进度、错题本、答题统计、收藏与练习成绩都会被删除。此操作无法撤销，建议先导出备份。',
          acceptLabel: '确认清空',
          onAccept: () => {
            const theme = state.theme;
            state = defaultState();
            state.theme = theme;
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* noop */ }
            saveState();
            wrongFilter = { chapter: 'all', status: 'active' };
            formulaFilter = { q: '', chapter: 'all', fav: false };
            route();
            toast('学习记录已清空');
          }
        });
      });
    }
  }

  /* ==========================================================================
     About / not found
     ========================================================================== */

  function renderAbout() {
    showPage(`
      <div class="about-page">
        <span class="eyebrow">About · 关于</span>
        <h1>一间安静的线性代数研学室</h1>
        <p class="about-lead">这个网站把线性代数的核心知识、常用公式与练习放在同一个地方。没有信息流，没有打卡焦虑，只有一条从概念到练习的清晰路径。</p>
        <div class="about-grid">
          <div class="about-card"><h2>课程内容</h2><p>覆盖行列式、矩阵、向量组、线性方程组、特征值、二次型与线性空间，共 ${CHAPTERS.length} 章 ${TOTAL_SECTIONS} 节。每节包含定义、定理、公式、例题与易错提醒。</p></div>
          <div class="about-card"><h2>公式手册</h2><p>${FORMULAS.length} 条公式，按章节与关键词检索。每条都标注适用条件，支持收藏与一键复制 LaTeX。</p></div>
          <div class="about-card"><h2>练习系统</h2><p>${QUESTIONS.length} 道精编习题，覆盖选择、判断与填空。提交后立即显示答案与解析，错题自动进入错题本。</p></div>
          <div class="about-card"><h2>本地数据</h2><p>学习进度、错题、收藏与成绩保存在浏览器 localStorage 中，不会上传服务器。可在学习报告中导出 JSON 备份。</p></div>
        </div>
        <div class="note-card tip" style="margin-top:20px">
          <span class="note-card-icon" data-icon="info"></span>
          <div><h4>关于公式渲染</h4><p>本站使用本地 KaTeX 渲染数学公式，无需联网即可使用。若公式较多，首次打开时可能需要一点时间完成排版。</p></div>
        </div>
        <div class="note-card" style="margin-top:12px">
          <span class="note-card-icon" data-icon="lightbulb"></span>
          <div><h4>学习建议</h4><p>先读章节，再查公式，最后练习。遇到错题不要只看答案，先判断它对应哪一节、哪个条件被忽略了。把“为什么错”写下来，比记住正确答案更重要。</p></div>
        </div>
      </div>
    `);
    setReadingProgressActive(false);
  }

  function renderNotFound() {
    showPage(`
      <div class="empty-state" style="min-height:60vh">
        <span class="empty-icon">${iconSvg('compass')}</span>
        <h2>这个页面不在地图上</h2>
        <p>链接可能写错了，或者内容已经移动。回到首页，从知识地图重新出发。</p>
        <a class="btn" href="#/home">返回首页 ${iconSvg('arrow-right')}</a>
      </div>`);
    setReadingProgressActive(false);
  }

  /* ==========================================================================
     Search
     ========================================================================== */

  const searchIndex = (() => {
    const items = [];
    CHAPTERS.forEach((chapter) => {
      items.push({
        type: 'chapter',
        icon: chapter.icon,
        title: chapter.title,
        subtitle: chapter.tagline,
        text: `${chapter.title} ${chapter.en} ${chapter.tagline} ${chapter.description}`,
        target: `#/learn/${chapter.id}`,
        meta: `第 ${chapter.number} 章 · ${chapter.sections.length} 节`
      });
      chapter.sections.forEach((section) => {
        items.push({
          type: 'section',
          icon: 'book-open',
          title: section.title,
          subtitle: `${chapter.title} · ${section.summary}`,
          text: `${section.title} ${section.summary} ${stripHTML(section.html)}`,
          target: `#/learn/${chapter.id}/${section.id}`,
          meta: `${chapter.title} · ${section.minutes} 分钟`
        });
      });
    });
    FORMULAS.forEach((formula) => {
      items.push({
        type: 'formula',
        icon: 'formula',
        title: formula.title,
        subtitle: `${chapterLabel(formula.chapterId)} · ${formula.description}`,
        text: `${formula.title} ${formula.description} ${formula.condition} ${(formula.tags || []).join(' ')} ${formula.tex.replace(/\\/g, ' ')}`,
        target: `#/formulas/${formula.id}`,
        meta: `${chapterLabel(formula.chapterId)} · 公式`
      });
    });
    return items;
  })();

  function searchAll(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      const popular = searchIndex.filter((item) => item.type === 'chapter');
      const formulaPicks = FORMULAS.slice(0, 4).map((f) => searchIndex.find((item) => item.target === `#/formulas/${f.id}`)).filter(Boolean);
      return { query: q, items: [...popular, ...formulaPicks] };
    }
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = [];
    searchIndex.forEach((item) => {
      const haystack = `${item.title} ${item.subtitle} ${item.text}`.toLowerCase();
      let score = 0;
      tokens.forEach((token) => {
        if (item.title.toLowerCase().includes(token)) score += 25;
        if (item.subtitle.toLowerCase().includes(token)) score += 8;
        if (haystack.includes(token)) score += 4;
      });
      if (score > 0) {
        if (item.type === 'chapter') score += 6;
        if (item.type === 'formula') score += 2;
        scored.push({ ...item, score });
      }
    });
    scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'zh-CN'));
    return { query: q, items: scored.slice(0, 18) };
  }

  function highlightText(text, query) {
    const safe = escapeHTML(text);
    if (!query) return safe;
    try {
      return safe.replace(new RegExp(`(${escapeRegex(escapeHTML(query))})`, 'gi'), '<mark>$1</mark>');
    } catch (e) {
      return safe;
    }
  }

  function updateSearch(query) {
    const result = searchAll(query);
    const typeOrder = { chapter: 0, section: 1, formula: 2 };
    searchItems = result.items.slice().sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
    searchActive = searchItems.length ? 0 : -1;
    if (!searchItems.length) {
      searchResultsEl.innerHTML = `<div class="search-empty"><strong>没有找到相关内容</strong>试试更短的关键词，例如“秩”“特征值”“正交”。</div>`;
      return;
    }

    const groups = [
      { type: 'chapter', label: '课程章节' },
      { type: 'section', label: '知识讲解' },
      { type: 'formula', label: '公式' }
    ];
    let globalIndex = 0;
    searchResultsEl.innerHTML = groups.map((group) => {
      const items = searchItems.filter((item) => item.type === group.type);
      if (!items.length) return '';
      return `<div class="search-group-label">${group.label}</div>` + items.map((item) => {
        const idx = globalIndex;
        globalIndex += 1;
        return `<button class="search-result ${idx === searchActive ? 'active' : ''}" type="button" data-search-index="${idx}" data-target="${escapeAttr(item.target)}">
          <span class="search-result-icon">${iconSvg(item.icon)}</span>
          <span class="search-result-copy">
            <strong>${highlightText(item.title, result.query)}</strong>
            <span>${highlightText(item.subtitle, result.query)}</span>
          </span>
          <span class="search-result-kind">${escapeHTML(item.meta || '')}</span>
        </button>`;
      }).join('');
    }).join('');
  }

  function updateSearchActive(nextIndex) {
    if (!searchItems.length) return;
    searchActive = (nextIndex + searchItems.length) % searchItems.length;
    searchResultsEl.querySelectorAll('.search-result').forEach((el, i) => {
      el.classList.toggle('active', i === searchActive);
    });
    const active = searchResultsEl.querySelector('.search-result.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function openSearchResult(index) {
    const item = searchItems[index];
    if (!item) return;
    closeSearch();
    navigate(item.target);
  }

  function bindSearch() {
    searchInput.addEventListener('input', () => updateSearch(searchInput.value));
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        updateSearchActive(searchActive + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        updateSearchActive(searchActive - 1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        openSearchResult(searchActive);
      }
    });
    searchResultsEl.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-search-index]');
      if (!btn) return;
      openSearchResult(Number(btn.dataset.searchIndex));
    });
    searchResultsEl.addEventListener('mousemove', (event) => {
      const btn = event.target.closest('[data-search-index]');
      if (!btn) return;
      const idx = Number(btn.dataset.searchIndex);
      if (idx !== searchActive) {
        searchActive = idx;
        searchResultsEl.querySelectorAll('.search-result').forEach((el, i) => el.classList.toggle('active', i === idx));
      }
    });
    document.querySelectorAll('[data-search-term]').forEach((btn) => {
      btn.addEventListener('click', () => {
        searchInput.value = btn.dataset.searchTerm;
        updateSearch(btn.dataset.searchTerm);
        focusWithoutScroll(searchInput);
      });
    });
  }

  /* ==========================================================================
     Global events / init
     ========================================================================== */

  function handleGlobalKeydown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (searchModal.hidden) openSearch();
      else closeSearch();
      return;
    }

    if (event.key === 'Escape') {
      if (!searchModal.hidden) { event.preventDefault(); closeSearch(); return; }
      if (!confirmModal.hidden) { event.preventDefault(); closeConfirm(); return; }
      if (sidebar.classList.contains('open')) { closeSidebar(); return; }
    }

    if (!searchModal.hidden || !confirmModal.hidden) return;
    if (!quiz || !location.hash.startsWith('#/practice/session')) return;
    const target = event.target;
    const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (typing) return;
    if (target && target.closest && target.closest('button, a, select')) return;
    const currentResult = quiz.results[quiz.index];
    if (/^[1-4]$/.test(event.key) && !currentResult) {
      const q = quiz.questions[quiz.index];
      const max = q.type === 'judge' ? 2 : q.type === 'fill' ? 0 : q.options.length;
      const num = Number(event.key);
      if (num >= 1 && num <= max) {
        event.preventDefault();
        selectOption(num - 1);
      }
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (currentResult) {
        const next = document.getElementById('quiz-next');
        if (next) next.click();
      } else {
        submitCurrentAnswer();
      }
    }
  }

  function init() {
    document.documentElement.dataset.theme = state.theme || 'light';
    setTheme(state.theme || 'light');
    injectIcons(document);
    searchTrigger.setAttribute('aria-expanded', 'false');
    searchTrigger.setAttribute('aria-controls', 'search-modal');
    bindSearch();

    const reading = document.createElement('div');
    reading.className = 'reading-progress';
    reading.id = 'reading-progress';
    reading.setAttribute('aria-hidden', 'true');
    reading.innerHTML = '<span id="reading-bar"></span>';
    document.body.appendChild(reading);

    themeToggle.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    menuBtn.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) closeSidebar();
      else openSidebar();
    });
    scrim.addEventListener('click', closeSidebar);

    searchTrigger.addEventListener('click', openSearch);
    document.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', closeSearch);
    });
    document.querySelectorAll('[data-close-confirm]').forEach((el) => {
      el.addEventListener('click', closeConfirm);
    });
    confirmAccept.addEventListener('click', () => {
      const handler = confirmHandler;
      closeConfirm();
      if (handler) handler();
    });

    document.addEventListener('keydown', handleGlobalKeydown);
    window.addEventListener('hashchange', () => {
      closeSidebar();
      route();
    });
    window.addEventListener('scroll', () => {
      updateReadingProgress();
      backToTop.classList.toggle('visible', window.scrollY > 700);
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeSidebar();
      updateReadingProgress();
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('.sidebar a[href], .mobile-tabbar a[href], .brand').forEach((link) => {
      link.addEventListener('click', () => closeSidebar());
    });

    route();
  }

  init();
})();
