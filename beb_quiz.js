/**
 * БЕБ ТРЕНАЖЕР — Інтерактивна система підготовки до конкурсного відбору БЕБ
 * Стиль Duolingo + Брендинг Бюро економічної безпеки України
 */

// WEB AUDIO API ЗВУКОВИЙ ДВИГУНЕЦЬ (100% автономний без mp3 файлів)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    // Приємний мажорний акорд (D5 -> A5 -> D6)
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.setValueAtTime(880.00, now + 0.08); // A5
    osc1.frequency.setValueAtTime(1174.66, now + 0.16); // D6

    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.setValueAtTime(659.25, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // М'який бас помилки (низхідний тон)
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.3);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.45);
    });
  }
}

const sfx = new SoundFX();

// DEFAULT MODULE DEFINITIONS (14 офіційних блоків тестування аналітиків БЕБ)
const DEFAULT_BEB_MODULES = [
  {
    "id": "beb_law",
    "title": "Закон «Про Бюро економічної безпеки України»",
    "icon": "⚖️",
    "badge": "БЕБ",
    "desc": "Основи діяльності БЕБ, статус аналітиків і детективів, аналіз ризиків",
    "match": "безпеки",
    "color": "#1e3a8a"
  },
  {
    "id": "tax_law",
    "title": "Податковий кодекс та фінансові ризики",
    "icon": "📊",
    "badge": "БЕБ",
    "desc": "Податки, збори, ЄСВ, бюджетні правила та запобігання схемному кредиту",
    "match": "податков",
    "color": "#2563eb"
  },
  {
    "id": "constitution",
    "title": "Конституція України",
    "icon": "🏛️",
    "badge": "БЕБ",
    "desc": "Основи державного устрою, права людини, повноваження гілок влади",
    "match": "конституція",
    "color": "#059669"
  },
  {
    "id": "anticorruption",
    "title": "Закон «Про запобігання корупції»",
    "icon": "🛡️",
    "badge": "БЕБ",
    "desc": "Конфлікт інтересів, е-декларування, доброчесність, статус викривачів",
    "match": "корупці",
    "color": "#d97706"
  },
  {
    "id": "competition",
    "title": "Захист економічної конкуренції",
    "icon": "💼",
    "badge": "БЕБ",
    "desc": "Антимонопольне законодавство, антиконкурентні дії, концентрація, штрафи АМКУ",
    "match": "конкуренц",
    "color": "#7c3aed"
  },
  {
    "id": "procurement",
    "title": "Закон «Про публічні закупівлі»",
    "icon": "🏢",
    "badge": "БЕБ",
    "desc": "Тендери, Prozorro, моніторинг закупівель та правопорушення у сфері торгів",
    "match": "закупівл",
    "color": "#0284c7"
  },
  {
    "id": "banking",
    "title": "Банки та банківська діяльність",
    "icon": "🏦",
    "badge": "БЕБ",
    "desc": "Банківська таємниця, регулювання НБУ, розкриття фінансової інформації",
    "match": "банк",
    "color": "#0d9488"
  },
  {
    "id": "finmon",
    "title": "Фінансовий моніторинг та відмивання коштів",
    "icon": "💸",
    "badge": "БЕБ",
    "desc": "ПВК/ФТ, підозрілі фінансові операції, суб'єкти первинного фінмоніторингу",
    "match": "легалізаці",
    "color": "#dc2626"
  },
  {
    "id": "kpk",
    "title": "Кримінальний процесуальний кодекс",
    "icon": "🔍",
    "badge": "БЕБ",
    "desc": "Засади КПК, досудове розслідування, слідчі дії, докази та підозра",
    "match": "процесуальн",
    "color": "#4338ca"
  },
  {
    "id": "kk",
    "title": "Кримінальний кодекс України",
    "icon": "🕵️",
    "badge": "БЕБ",
    "desc": "Злочини у сфері економіки (ст. 212, 209, 222), склад злочину, покарання",
    "match": "кримінальний кодекс",
    "color": "#b91c1c"
  },
  {
    "id": "capital_markets",
    "title": "Ринки капіталу та товарні ринки",
    "icon": "📈",
    "badge": "БЕБ",
    "desc": "Цінні папери, фондовий ринок, товарні біржі",
    "match": "ринки капіталу",
    "color": "#16a34a"
  },
  {
    "id": "budget",
    "title": "Бюджетний кодекс України",
    "icon": "💰",
    "badge": "БЕБ",
    "desc": "Бюджетний процес, міжбюджетні трансферти, цільове використання коштів",
    "match": "бюджетн",
    "color": "#ca8a04"
  },
  {
    "id": "ord",
    "title": "Оперативно-розшукова діяльність (ОРД)",
    "icon": "🕵️‍♂️",
    "badge": "БЕБ",
    "desc": "Закон про ОРД, оперативно-розшукові справи, підстави та заходи",
    "match": "розшуков",
    "color": "#475569"
  },
  {
    "id": "state_bodies",
    "title": "Державне управління та доступ до інформації",
    "icon": "📑",
    "badge": "БЕБ",
    "desc": "ЦОВВ, Кабмін, публічна інформація, захист персональних даних, звернення",
    "match": "громадян|інформаці|виконавчої|міністрів|персональн",
    "color": "#6366f1"
  }
];

// Initialize window.BEB_MODULES immediately so views never render blank
window.BEB_MODULES = (window.BEB_MODULES && window.BEB_MODULES.length > 0) ? window.BEB_MODULES : DEFAULT_BEB_MODULES;

// APP STATE
const STATE = {
  xp: 0,
  streak: 1,
  lives: 5,
  unlimitedLives: false,
  sound: true,
  currentView: 'path', // 'path', 'quiz', 'exam', 'mistakes', 'dict'
  completedQuestions: {}, // id -> true/false
  mistakeBank: [], // array of question IDs
  // Active quiz session
  quiz: {
    title: '',
    questions: [],
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctCount: 0,
    startTime: null,
    isExam: false,
    timerInterval: null,
    timeLeftSeconds: 2400 // 40 minutes for exam
  }
};

// SYNC INDICATOR
function updateSyncIndicator(status, title) {
  const dot = document.getElementById('sync-dot-status');
  if (!dot) return;
  dot.className = 'sync-dot ' + (status === 'syncing' ? 'syncing' : (status === 'offline' ? 'offline' : ''));
  if (title) dot.title = title;
}

let syncTimeout = null;
function pushStateToServer() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    updateSyncIndicator('syncing', 'Збереження на сервер...');
    try {
      const payload = {
        xp: STATE.xp,
        streak: STATE.streak,
        lives: STATE.lives,
        unlimitedLives: STATE.unlimitedLives,
        completedQuestions: STATE.completedQuestions,
        mistakeBank: STATE.mistakeBank,
        lastUpdated: Date.now()
      };
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        updateSyncIndicator('online', 'Синхронізовано з сервером');
      } else {
        updateSyncIndicator('offline', 'Помилка збереження на сервері');
      }
    } catch (e) {
      updateSyncIndicator('offline', 'Автономний режим (сервер недоступний)');
    }
  }, 350);
}

async function syncWithServer(isInitial = false) {
  try {
    updateSyncIndicator('syncing', 'Синхронізація...');
    const res = await fetch('/api/state', { cache: 'no-store' });
    if (!res.ok) throw new Error('Network error');
    const remote = await res.json();

    if (remote && (remote.completedQuestions || remote.xp !== undefined)) {
      const localCompletedKeys = Object.keys(STATE.completedQuestions);
      const remoteCompletedKeys = Object.keys(remote.completedQuestions || {});

      // Intelligent merge: union of completed questions
      STATE.completedQuestions = {
        ...(remote.completedQuestions || {}),
        ...STATE.completedQuestions
      };

      STATE.xp = Math.max(STATE.xp, remote.xp || 0);
      STATE.streak = Math.max(STATE.streak, remote.streak || 1);
      if (remote.unlimitedLives !== undefined) {
        STATE.unlimitedLives = remote.unlimitedLives || STATE.unlimitedLives;
      }

      // Merge mistakes: union minus any questions that are now completed
      const allMistakes = new Set([...(remote.mistakeBank || []), ...STATE.mistakeBank]);
      STATE.mistakeBank = Array.from(allMistakes).filter(id => !STATE.completedQuestions[id]);

      // If local had additions that the server didn't have, push merged up
      if (localCompletedKeys.length > remoteCompletedKeys.length) {
        pushStateToServer();
      }

      try {
        localStorage.setItem('BEB_TRAINER_STATE', JSON.stringify({
          xp: STATE.xp,
          streak: STATE.streak,
          lives: STATE.lives,
          unlimitedLives: STATE.unlimitedLives,
          completedQuestions: STATE.completedQuestions,
          mistakeBank: STATE.mistakeBank
        }));
      } catch (e) {}

      updateHeaderStats();

      // Refresh view if not currently in an active quiz
      if (!isInitial && STATE.currentView !== 'quiz' && (!STATE.quiz || STATE.quiz.questions.length === 0)) {
        const mainView = document.getElementById('main-view-container');
        if (STATE.currentView === 'path') renderPathView(mainView);
        else if (STATE.currentView === 'unanswered') renderUnansweredView(mainView);
      }
    } else {
      // Server empty, push our local state to initialize it
      pushStateToServer();
    }
    updateSyncIndicator('online', 'Синхронізовано з сервером');
  } catch (e) {
    updateSyncIndicator('offline', 'Автономний режим (сервер недоступний)');
  }
}

// LOAD PERSISTENT DATA
function loadState() {
  try {
    const saved = localStorage.getItem('BEB_TRAINER_STATE');
    if (saved) {
      const data = JSON.parse(saved);
      STATE.xp = data.xp || 0;
      STATE.streak = data.streak || 1;
      STATE.lives = data.lives !== undefined ? data.lives : 5;
      STATE.unlimitedLives = !!data.unlimitedLives;
      STATE.completedQuestions = data.completedQuestions || {};
      STATE.mistakeBank = data.mistakeBank || [];
    }
  } catch (e) {
    console.error('Failed to load localStorage', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('BEB_TRAINER_STATE', JSON.stringify({
      xp: STATE.xp,
      streak: STATE.streak,
      lives: STATE.lives,
      unlimitedLives: STATE.unlimitedLives,
      completedQuestions: STATE.completedQuestions,
      mistakeBank: STATE.mistakeBank
    }));
  } catch (e) {}
  updateHeaderStats();
  pushStateToServer();
}

// UPDATE HEADER COUNTERS
function updateHeaderStats() {
  document.getElementById('stat-xp').textContent = `${STATE.xp} XP`;
  document.getElementById('stat-streak').textContent = `${STATE.streak} дн.`;
  const heartElem = document.getElementById('stat-hearts');
  if (STATE.unlimitedLives) {
    heartElem.innerHTML = '❤️ ♾️';
  } else {
    heartElem.innerHTML = `❤️ ${STATE.lives}/5`;
  }
}

// SWITCH VIEWS
function switchView(viewName) {
  document.body.classList.remove('in-quiz');
  STATE.currentView = viewName;
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  const mainView = document.getElementById('main-view-container');
  if (viewName === 'path') {
    renderPathView(mainView);
  } else if (viewName === 'exam') {
    renderExamStart(mainView);
  } else if (viewName === 'mistakes') {
    renderMistakesView(mainView);
  } else if (viewName === 'unanswered') {
    renderUnansweredView(mainView);
  } else if (viewName === 'dict') {
    renderDictionaryView(mainView);
  }
}

// QUESTION STATUS HELPER
function getQuestionStatus(qid) {
  if (STATE.completedQuestions[qid]) return 'completed';
  if (STATE.mistakeBank.includes(qid)) return 'mistake';
  return 'unseen';
}

// GENERIC QUIZ LAUNCHER FOR ANY SUBSET OF QUESTIONS
function startCustomQuestionsQuiz(questionsList, title) {
  if (!questionsList || questionsList.length === 0) {
    alert("Список питань порожній!");
    return;
  }
  sfx.init();
  sfx.playClick();

  STATE.quiz = {
    title: title || "Вибрані питання",
    questions: [...questionsList],
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctCount: 0,
    startTime: Date.now(),
    isExam: false,
    timerInterval: null
  };

  renderQuizScreen();
}

// START ALL REMAINING UNCOMPLETED QUESTIONS OF A MODULE
function startModuleRemainingQuiz(moduleId) {
  const allQuestions = window.BEB_QUESTIONS || [];
  if (allQuestions.length === 0) {
    alert("База питань ще завантажується. Будь ласка, зачекайте 1-2 секунди...");
    return;
  }
  const modInfo = (window.BEB_MODULES || DEFAULT_BEB_MODULES).find(m => m.id === moduleId);
  const remaining = allQuestions.filter(q => q.module === moduleId && !STATE.completedQuestions[q.id]);

  if (remaining.length === 0) {
    alert("Усі питання цього блоку вже успішно засвоєно! Ви можете повторити їх у звичайному режимі або переглянути список.");
    return;
  }

  const title = `${modInfo ? modInfo.title : "Блок"} (Залишок: ${remaining.length})`;
  startCustomQuestionsQuiz(remaining, title);
}

// 1. PATH / MODULES VIEW
function renderPathView(container) {
  const modules = (window.BEB_MODULES && window.BEB_MODULES.length > 0) ? window.BEB_MODULES : DEFAULT_BEB_MODULES;
  const allQuestions = window.BEB_QUESTIONS || [];
  const isLoading = allQuestions.length === 0;

  // Auto-refresh when questions become available
  if (isLoading && !window._bebQuestionsWatcher) {
    window._bebQuestionsWatcher = setInterval(() => {
      if (window.BEB_QUESTIONS && window.BEB_QUESTIONS.length > 0) {
        clearInterval(window._bebQuestionsWatcher);
        window._bebQuestionsWatcher = null;
        if (STATE.currentView === 'path') {
          const mainView = document.getElementById('main-view-container');
          if (mainView) renderPathView(mainView);
        }
      }
    }, 250);
  }

  let html = `
    <div class="view-header">
      <h2>🏛️ Шлях підготовки аналітика БЕБ</h2>
      <p>Опановуйте законодавство за тематичними блоками в ігровому темпі або проходьте точковий залишок питань</p>
    </div>
  `;

  if (isLoading) {
    html += `
      <div style="background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; border-radius:14px; padding:12px 16px; margin-bottom:18px; display:flex; align-items:center; gap:12px; font-weight:600; font-size:13px;">
        <span style="font-size:20px;">⏳</span>
        <div>
          <div>Завантаження офіційної бази питань БЕБ (838 тестових завдань)...</div>
          <div style="font-size:11px; font-weight:400; color:#3b82f6; margin-top:2px;">Дані завантажуються в офлайн-пам'ять. Список оновиться автоматично за мить.</div>
        </div>
      </div>
    `;
  }

  html += `<div class="modules-grid">`;

  modules.forEach(mod => {
    const modQuestions = allQuestions.filter(q => q.module === mod.id);
    const totalQ = modQuestions.length;
    const completedQ = modQuestions.filter(q => STATE.completedQuestions[q.id]).length;
    const uncompletedQ = totalQ - completedQ;
    const percent = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
    const isMastered = uncompletedQ === 0 && totalQ > 0;
    const modColor = mod.color || '#2563eb';

    html += `
      <div class="module-card">
        <div class="module-top">
          <div class="module-icon-wrap">${mod.icon}</div>
          <span class="module-badge" style="background:${modColor}15; color:${modColor}">${mod.badge || 'БЕБ'}</span>
        </div>
        <div class="module-title">${mod.title}</div>
        <div class="module-desc">${mod.desc}</div>
        <div class="module-progress-bar">
          <div class="module-progress-fill" style="width:${percent}%"></div>
        </div>
        <div class="module-bottom" style="flex-direction:column; align-items:stretch; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="module-stats">
              ${isLoading 
                ? '<span style="color:#64748b;">⏳ Завантаження...</span>'
                : (isMastered 
                    ? '<strong style="color:#15803d;">🌟 Опановано 100%</strong>' 
                    : `${completedQ} / ${totalQ} питань (${percent}%)`)}
            </span>
            ${(!isMastered && !isLoading) ? `
              <span class="status-pill unseen" style="font-size:12px;">Залишок: <strong>${uncompletedQ}</strong></span>
            ` : ''}
          </div>

          <div class="module-actions-row" style="justify-content:flex-end;">
            ${(!isMastered && !isLoading) ? `
              <button class="btn-remaining-unit" title="Пройти всі ${uncompletedQ} питань, які ще не засвоєно" onclick="startModuleRemainingQuiz('${mod.id}')">
                🎯 Залишок (${uncompletedQ})
              </button>
            ` : ''}
            <button class="btn-outline-unit" title="Переглянути всі питання та вибрати конкретні" onclick="openModuleQuestionsModal('${mod.id}')">
              📋 ${isMastered ? 'Список' : 'Обрати'}
            </button>
            <button class="btn-start-unit" title="Пройти чергові 10 питань" onclick="startModuleQuiz('${mod.id}', 10)">
              ${isMastered ? 'Повторити 10' : 'Вчити 10'}
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// START QUIZ ON MODULE
function startModuleQuiz(moduleId, count) {
  sfx.init();
  sfx.playClick();

  const allQuestions = window.BEB_QUESTIONS || [];
  if (allQuestions.length === 0) {
    alert("База питань ще завантажується. Будь ласка, зачекайте 1-2 секунди...");
    return;
  }
  const modInfo = (window.BEB_MODULES || DEFAULT_BEB_MODULES).find(m => m.id === moduleId);
  let questions = allQuestions.filter(q => q.module === moduleId);

  // Пріоритет: спочатку невивчені
  const uncompleted = questions.filter(q => !STATE.completedQuestions[q.id]);
  const pool = uncompleted.length >= count ? uncompleted : (uncompleted.length > 0 ? uncompleted : questions);
  
  // Перемішуємо
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

  STATE.quiz = {
    title: modInfo ? modInfo.title : "Тематичний урок",
    questions: shuffled,
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctCount: 0,
    startTime: Date.now(),
    isExam: false,
    timerInterval: null
  };

  renderQuizScreen();
}

// 2. QUIZ SCREEN
function renderQuizScreen() {
  document.body.classList.add('in-quiz');
  const container = document.getElementById('main-view-container');
  const q = STATE.quiz.questions[STATE.quiz.currentIndex];
  if (!q) {
    showQuizResults();
    return;
  }

  // Динамічне випадкове перемішування варіантів відповідей для кожного показу
  const mappedOptions = q.options.map((text, origIdx) => ({
    text: text,
    origIdx: origIdx,
    isCorrect: origIdx === q.correct
  }));

  // Fisher-Yates shuffle
  for (let i = mappedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mappedOptions[i], mappedOptions[j]] = [mappedOptions[j], mappedOptions[i]];
  }

  STATE.quiz.currentShuffled = mappedOptions;
  STATE.quiz.currentCorrectIndex = mappedOptions.findIndex(m => m.isCorrect);

  const progressPercent = Math.round(((STATE.quiz.currentIndex) / STATE.quiz.questions.length) * 100);

  const letters = ['A', 'B', 'C', 'D'];
  let optionsHtml = '';
  mappedOptions.forEach((opt, idx) => {
    optionsHtml += `
      <div class="option-btn" id="opt-btn-${idx}" onclick="selectOption(${idx})">
        <span class="opt-index">${letters[idx]}</span>
        <span class="opt-text">${opt.text}</span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="quiz-screen">
      <div class="quiz-header">
        <button class="btn-close-quiz" onclick="confirmExitQuiz()">✕</button>
        <div class="quiz-progress-track">
          <div class="quiz-progress-thumb" style="width: ${progressPercent}%"></div>
        </div>
        ${STATE.quiz.isExam ? `
          <div class="exam-timer-badge" id="exam-timer" style="font-weight:800; color:#b91c1c; background:#fee2e2; border:1px solid #fca5a5; padding:6px 14px; border-radius:12px; margin-left:12px; font-size:15px; font-variant-numeric:tabular-nums; display:inline-flex; align-items:center; gap:6px;">
            ⏱️ ${Math.floor(STATE.quiz.timeLeftSeconds / 60)}:${(STATE.quiz.timeLeftSeconds % 60 < 10 ? '0' : '') + STATE.quiz.timeLeftSeconds % 60}
          </div>
        ` : `
          <div class="quiz-hearts" id="quiz-hearts-display">
            ${STATE.unlimitedLives ? '❤️ ♾️' : '❤️ ' + STATE.lives}
          </div>
        `}
      </div>

      <div class="quiz-body">
        <div class="quiz-tag">
          <span>${STATE.quiz.title}</span> • Питання ${STATE.quiz.currentIndex + 1} з ${STATE.quiz.questions.length}
        </div>
        <div class="question-text">${q.question}</div>
        <div class="options-list">
          ${optionsHtml}
        </div>
      </div>

      <!-- DUOLINGO BOTTOM DRAWER -->
      <div class="quiz-drawer" id="quiz-drawer">
        <div class="drawer-content">
          <div class="drawer-icon" id="drawer-icon">✓</div>
          <div>
            <div class="drawer-title" id="drawer-title">Чудово!</div>
            <div class="drawer-desc" id="drawer-desc"></div>
          </div>
        </div>
        <button class="btn-primary-duo" id="drawer-next-btn" onclick="nextQuestion()">Продовжити</button>
      </div>

      <div class="quiz-footer" id="quiz-footer-bar">
        <button class="btn-primary-duo" id="btn-check-answer" disabled onclick="checkSelectedAnswer()">Перевірити</button>
      </div>
    </div>
  `;

  STATE.quiz.selectedOption = null;
  STATE.quiz.isAnswered = false;
}

// SELECT OPTION
function selectOption(index) {
  if (STATE.quiz.isAnswered) return;
  sfx.playClick();
  STATE.quiz.selectedOption = index;

  document.querySelectorAll('.option-btn').forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === index);
  });

  const checkBtn = document.getElementById('btn-check-answer');
  if (checkBtn) checkBtn.disabled = false;
}

// CHECK ANSWER (DUOLINGO BOTTOM DRAWER TRIGGER)
function checkSelectedAnswer() {
  if (STATE.quiz.isAnswered || STATE.quiz.selectedOption === null) return;
  STATE.quiz.isAnswered = true;

  const q = STATE.quiz.questions[STATE.quiz.currentIndex];
  const correctIdx = STATE.quiz.currentCorrectIndex;
  const isCorrect = STATE.quiz.selectedOption === correctIdx;

  // Візуальні ефекти на кнопках
  const selectedBtn = document.getElementById(`opt-btn-${STATE.quiz.selectedOption}`);
  const correctBtn = document.getElementById(`opt-btn-${correctIdx}`);

  const drawer = document.getElementById('quiz-drawer');
  const footerBar = document.getElementById('quiz-footer-bar');
  const drawerIcon = document.getElementById('drawer-icon');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerDesc = document.getElementById('drawer-desc');
  const drawerBtn = document.getElementById('drawer-next-btn');

  footerBar.style.display = 'none';

  if (isCorrect) {
    sfx.playCorrect();
    selectedBtn.classList.remove('selected');
    selectedBtn.classList.add('correct');

    drawer.className = 'quiz-drawer correct';
    drawerIcon.innerHTML = '✓';
    drawerTitle.textContent = 'Чудово! Правильно!';
    drawerDesc.textContent = q.explanation || 'Точна відповідність законодавству України.';
    drawerBtn.className = 'btn-primary-duo';

    STATE.quiz.correctCount++;
    STATE.xp += 10;
    STATE.completedQuestions[q.id] = true;

    // Видаляємо з банку помилок, якщо було
    STATE.mistakeBank = STATE.mistakeBank.filter(id => id !== q.id);
  } else {
    sfx.playWrong();
    if (selectedBtn) {
      selectedBtn.classList.remove('selected');
      selectedBtn.classList.add('wrong');
    }
    if (correctBtn) {
      correctBtn.classList.add('correct');
    }

    const correctText = STATE.quiz.currentShuffled[correctIdx].text;
    drawer.className = 'quiz-drawer wrong';
    drawerIcon.innerHTML = '✕';
    drawerTitle.textContent = 'Неправильно';
    drawerDesc.innerHTML = `<strong>Правильна відповідь:</strong> ${correctText}<br><small style="color:#64748b;">${q.explanation || ''}</small>`;
    drawerBtn.className = 'btn-danger-duo';

    // Втрата життя (тільки в режимі уроків, на іспиті життя не втрачаються)
    if (!STATE.quiz.isExam && !STATE.unlimitedLives && STATE.lives > 0) {
      STATE.lives--;
    }
    // Додаємо в банк помилок
    if (!STATE.mistakeBank.includes(q.id)) {
      STATE.mistakeBank.push(q.id);
    }
  }

  saveState();
}

// NEXT QUESTION OR FINISH
function nextQuestion() {
  sfx.playClick();
  STATE.quiz.currentIndex++;
  if (STATE.quiz.currentIndex < STATE.quiz.questions.length) {
    renderQuizScreen();
  } else {
    showQuizResults();
  }
}

// CONFIRM EXIT
function confirmExitQuiz() {
  if (confirm("Вийти з поточного уроку? Незбережений прогрес цього раунду буде втрачено.")) {
    if (STATE.quiz.timerInterval) clearInterval(STATE.quiz.timerInterval);
    switchView('path');
  }
}

// RESULTS & CELEBRATION
function showQuizResults() {
  document.body.classList.remove('in-quiz');
  if (STATE.quiz && STATE.quiz.timerInterval) {
    clearInterval(STATE.quiz.timerInterval);
    STATE.quiz.timerInterval = null;
  }

  const container = document.getElementById('main-view-container');
  const total = STATE.quiz.questions.length;
  const correct = STATE.quiz.correctCount;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  // Для офіційного екзамену БЕБ прохідний бал - 80% (наприклад 80 зі 100 або 32 з 40)
  const isExam = STATE.quiz.isExam;
  const passingScore = isExam ? (total === 100 ? 80 : Math.round(total * 0.8)) : Math.round(total * 0.75);
  const isPassed = correct >= passingScore;

  if (isPassed) {
    sfx.playVictory();
    triggerConfetti();
  } else {
    sfx.playWrong();
  }

  container.innerHTML = `
    <div class="quiz-screen celebration-screen">
      <div class="celebration-icon">${isPassed ? '🏆' : '⚠️'}</div>
      <div class="celebration-title" style="color: ${isPassed ? 'var(--beb-gold)' : '#ef4444'};">
        ${isExam 
          ? (isPassed ? 'ІСПИТ СКЛАДЕНО УСПІШНО!' : 'ІСПИТ НЕ СКЛАДЕНО') 
          : (isPassed ? 'Урок пройдено успішно!' : 'Гарна спроба! Потрібно повторити')}
      </div>
      <p style="color:var(--text-muted); font-size:16px;">
        ${isExam
          ? (isPassed 
              ? `Вітаємо! Ви подолали офіційний прохідний поріг БЕБ (не менше ${passingScore} балів / 80%). Ви допущені до співбесіди!` 
              : `Набрано ${correct} балів з ${total}. Офіційний прохідний бал Конкурсної комісії БЕБ становить не менше ${passingScore} балів (80%). Рекомендуємо потренувати теми з помилками.`)
          : (isPassed ? 'Ви чудово засвоїли цей нормативний блок.' : 'Рекомендуємо пройти блок ще раз для закріплення.')}
      </p>

      <div class="celebration-stats">
        <div class="stat-box">
          <div class="box-value" style="color:${isPassed ? '#15803d' : '#b91c1c'};">${correct} / ${total}</div>
          <div class="box-label">Правильних відповідей</div>
        </div>
        <div class="stat-box">
          <div class="box-value">${percent}%</div>
          <div class="box-label">Точність (поріг: ${isExam ? '80%' : '75%'})</div>
        </div>
        <div class="stat-box">
          <div class="box-value">+${correct * 10} XP</div>
          <div class="box-label">Отримано досвіду</div>
        </div>
      </div>

      <div class="results-actions-group">
        <button class="btn-primary-duo" onclick="switchView('path')">До списку тем</button>
        ${isExam ? `
          <button class="btn-primary-duo" style="background:#2563eb;" onclick="startOfficialExam(100)">Пройти іспит ще раз (100)</button>
        ` : `
          <button class="btn-start-unit" style="background:#475569;" onclick="startModuleQuiz(STATE.quiz.questions[0].module, 10)">Ще 10 питань</button>
        `}
        <button class="btn-start-unit" style="background:#d97706;" onclick="switchView('mistakes')">Робота над помилками</button>
      </div>
    </div>
  `;
}

// 3. EXAM SIMULATION (100 питань / 100 хвилин / прохідний 80%)
function renderExamStart(container) {
  const allQuestions = window.BEB_QUESTIONS || [];
  const isLoading = allQuestions.length === 0;

  // Auto-refresh when questions become available
  if (isLoading && !window._bebQuestionsWatcherExam) {
    window._bebQuestionsWatcherExam = setInterval(() => {
      if (window.BEB_QUESTIONS && window.BEB_QUESTIONS.length > 0) {
        clearInterval(window._bebQuestionsWatcherExam);
        window._bebQuestionsWatcherExam = null;
        if (STATE.currentView === 'exam') {
          const mainView = document.getElementById('main-view-container');
          if (mainView) renderExamStart(mainView);
        }
      }
    }, 250);
  }

  container.innerHTML = `
    <div class="quiz-screen exam-start-card">
      <div class="exam-start-icon">⏱️</div>
      <h2 class="exam-start-title">
        Офіційна симуляція тестування БЕБ
      </h2>
      <p class="exam-start-desc">
        Повна симуляція комп'ютерного іспиту Конкурсної комісії Бюро економічної безпеки України на знання законодавства (Наказ БЕБ № 378).
      </p>

      ${isLoading ? `
        <div style="background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; border-radius:12px; padding:10px 14px; margin-bottom:16px; font-size:13px; font-weight:600;">
          ⏳ База питань завантажується... Іспит буде доступний за мить.
        </div>
      ` : ''}

      <div class="celebration-stats exam-stats-row">
        <div class="stat-box">
          <div class="box-value">100</div>
          <div class="box-label">Тестових запитань</div>
        </div>
        <div class="stat-box">
          <div class="box-value">100 хв</div>
          <div class="box-label">Час на тест (1 хв / пит)</div>
        </div>
        <div class="stat-box">
          <div class="box-value" style="color:#b45309;">80 / 100</div>
          <div class="box-label">Прохідний бал (80%)</div>
        </div>
      </div>

      <div class="exam-actions-group">
        <button class="btn-primary-duo exam-btn-main" onclick="startOfficialExam(100)">
          🏛️ Почати іспит (100 питань / 100 хв)
        </button>
        <button class="btn-start-unit exam-btn-secondary" onclick="startOfficialExam(40)">
          ⚡ Експрес-тренування (40 питань / 40 хв)
        </button>
      </div>

      <p class="exam-start-note">
        💡 Запитання вибираються методом випадкової комп'ютерної генерації з усіх 14 блоків законодавства для аналітиків БЕБ.
      </p>
    </div>
  `;
}

function startOfficialExam(count = 100) {
  if (STATE.quiz && STATE.quiz.timerInterval) {
    clearInterval(STATE.quiz.timerInterval);
    STATE.quiz.timerInterval = null;
  }

  sfx.init();
  sfx.playClick();

  const allQuestions = window.BEB_QUESTIONS || [];
  if (allQuestions.length === 0) {
    alert("База питань ще завантажується. Будь ласка, зачекайте 1-2 секунди...");
    return;
  }
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);

  STATE.quiz = {
    title: count === 100 ? "Офіційний іспит БЕБ (100 питань)" : "Експрес-іспит БЕБ (40 питань)",
    questions: shuffled,
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctCount: 0,
    startTime: Date.now(),
    isExam: true,
    examTotalCount: count,
    timeLeftSeconds: count * 60,
    timerInterval: null
  };

  // Timer
  STATE.quiz.timerInterval = setInterval(() => {
    STATE.quiz.timeLeftSeconds--;
    const timerElem = document.getElementById('exam-timer');
    if (timerElem) {
      const mins = Math.floor(STATE.quiz.timeLeftSeconds / 60);
      const secs = STATE.quiz.timeLeftSeconds % 60;
      timerElem.textContent = `⏱️ ${mins}:${secs < 10 ? '0' : ''}${secs}`;
      if (STATE.quiz.timeLeftSeconds < 300) {
        timerElem.style.color = '#dc2626';
        timerElem.style.background = '#fef2f2';
      }
    }
    if (STATE.quiz.timeLeftSeconds <= 0) {
      clearInterval(STATE.quiz.timerInterval);
      STATE.quiz.timerInterval = null;
      alert("Час іспиту вичерпано!");
      showQuizResults();
    }
  }, 1000);

  renderQuizScreen();
}

// 4. MISTAKES BANK VIEW (Робота над помилками)
function renderMistakesView(container) {
  const allQuestions = window.BEB_QUESTIONS || [];
  const mistakeQuestions = allQuestions.filter(q => STATE.mistakeBank.includes(q.id));

  let html = `
    <div class="view-header">
      <h2>🎯 Робота над помилками (${mistakeQuestions.length})</h2>
      <p>Тут зібрані всі питання, в яких ви припускалися помилки. Відпрацюйте їх до 100%.</p>
    </div>
  `;

  if (mistakeQuestions.length === 0) {
    html += `
      <div class="quiz-screen" style="padding:60px; text-align:center;">
        <div style="font-size:64px; margin-bottom:16px;">🌟</div>
        <h3 style="font-size:22px; font-weight:800; color:var(--beb-navy);">Скринька помилок порожня!</h3>
        <p style="color:var(--text-muted); margin-top:8px;">Ви ще не зробили жодної помилки, або вже успішно виправили всі складні моменти.</p>
      </div>
    `;
  } else {
    html += `
      <div style="margin-bottom:24px;">
        <button class="btn-primary-duo" onclick="startMistakesDrill()">Пройти всі помилкові питання (${mistakeQuestions.length})</button>
      </div>
      <div class="options-list">
    `;
    mistakeQuestions.forEach((q, idx) => {
      html += `
        <div class="qa-card">
          <div class="qa-law">${q.law}</div>
          <div class="qa-question">${idx + 1}. ${q.question}</div>
          <div class="qa-answer">✓ ${q.options[q.correct]}</div>
          <div class="qa-expl">${q.explanation || ''}</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

function startMistakesDrill() {
  const allQuestions = window.BEB_QUESTIONS || [];
  const mistakeQuestions = allQuestions.filter(q => STATE.mistakeBank.includes(q.id));
  if (mistakeQuestions.length === 0) return;

  STATE.quiz = {
    title: "Робота над помилками",
    questions: [...mistakeQuestions].sort(() => Math.random() - 0.5),
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    correctCount: 0,
    startTime: Date.now(),
    isExam: false
  };

  renderQuizScreen();
}

// 5. UNANSWERED VIEW (Залишок питань)
function renderUnansweredView(container) {
  const allQuestions = window.BEB_QUESTIONS || [];
  const isLoading = allQuestions.length === 0;

  // Auto-refresh when questions become available
  if (isLoading && !window._bebQuestionsWatcherUnans) {
    window._bebQuestionsWatcherUnans = setInterval(() => {
      if (window.BEB_QUESTIONS && window.BEB_QUESTIONS.length > 0) {
        clearInterval(window._bebQuestionsWatcherUnans);
        window._bebQuestionsWatcherUnans = null;
        if (STATE.currentView === 'unanswered') {
          const mainView = document.getElementById('main-view-container');
          if (mainView) renderUnansweredView(mainView);
        }
      }
    }, 250);
  }

  const totalCount = allQuestions.length;
  const completedCount = allQuestions.filter(q => STATE.completedQuestions[q.id]).length;
  const remainingCount = totalCount - completedCount;
  const mistakesCount = STATE.mistakeBank.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const modules = (window.BEB_MODULES && window.BEB_MODULES.length > 0) ? window.BEB_MODULES : DEFAULT_BEB_MODULES;

  let html = `
    <div class="view-header">
      <h2>⏳ Залишок питань (${isLoading ? 'Завантаження...' : `${remainingCount} з ${totalCount}`})</h2>
      <p>Огляд та проходження питань, які ви ще не засвоїли або які не траплялися в процесі тестування</p>
    </div>

    ${isLoading ? `
      <div style="background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; border-radius:14px; padding:12px 16px; margin-bottom:18px; display:flex; align-items:center; gap:12px; font-weight:600; font-size:13px;">
        <span style="font-size:20px;">⏳</span>
        <div>
          <div>Завантаження офіційної бази питань БЕБ (838 тестових завдань)...</div>
          <div style="font-size:11px; font-weight:400; color:#3b82f6; margin-top:2px;">Дані завантажуються в офлайн-пам'ять. Сторінка оновиться автоматично за мить.</div>
        </div>
      </div>
    ` : ''}

    <div class="unanswered-hero">
      <div class="unanswered-hero-left">
        <h3>${remainingCount > 0 ? `Залишилось опанувати ${remainingCount} питань` : '🎉 Вітаємо! Вся база повністю засвоєна!'}</h3>
        <p>
          ${remainingCount > 0 
            ? 'Ви можете точково вибрати конкретні питання з потрібного блоку, пройти залишок окремої теми в один клік, або запустити тренування по всіх непройдених завданнях одразу.' 
            : 'Ви успішно засвоїли всі 838 тестових завдань офіційного наказу БЕБ № 378. Тепер час закріпити результат на повній симуляції іспиту!'}
        </p>
        ${remainingCount > 0 ? `
          <div style="display:flex; gap:12px; margin-top:18px; flex-wrap:wrap;">
            <button class="btn-primary-duo" onclick="startRemainingGlobalQuiz(${Math.min(remainingCount, 50)})">
              🎯 Пройти ${remainingCount > 50 ? '50 питань із залишку' : `весь залишок (${remainingCount})`}
            </button>
            <button class="btn-outline-unit" style="background:#ffffff;" onclick="startRemainingGlobalQuiz(20)">
              🎲 Випадкові 20 із залишку
            </button>
          </div>
        ` : `
          <div style="margin-top:16px;">
            <button class="btn-primary-duo" onclick="switchView('exam')">
              ⏱️ Перейти до симуляції іспиту (100 хв / 80%)
            </button>
          </div>
        `}
      </div>

      <div class="unanswered-hero-stats">
        <div class="stat-metric">
          <div class="num" style="color:#22c55e;">${completedCount}</div>
          <div class="label">Засвоєно (${percent}%)</div>
        </div>
        <div class="stat-metric">
          <div class="num" style="color:#f59e0b;">${remainingCount}</div>
          <div class="label">Залишилось</div>
        </div>
        <div class="stat-metric">
          <div class="num" style="color:#ef4444;">${mistakesCount}</div>
          <div class="label">Помилок</div>
        </div>
      </div>
    </div>

    <div class="modules-grid">
  `;

  modules.forEach(mod => {
    const modQuestions = allQuestions.filter(q => q.module === mod.id);
    const modTotal = modQuestions.length;
    const modCompleted = modQuestions.filter(q => STATE.completedQuestions[q.id]).length;
    const modRemaining = modTotal - modCompleted;
    const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
    const isMastered = modRemaining === 0 && modTotal > 0;

    html += `
      <div class="module-card">
        <div class="module-top">
          <div class="module-icon-wrap">${mod.icon}</div>
          <span class="status-pill ${isMastered ? 'correct' : 'unseen'}">
            ${isMastered ? '✓ 100% Засвоєно' : `Залишок: ${modRemaining}`}
          </span>
        </div>
        <div class="module-title">${mod.title}</div>
        <div class="module-desc">${mod.desc}</div>
        <div class="module-progress-bar">
          <div class="module-progress-fill" style="width:${modPercent}%"></div>
        </div>
        <div class="module-bottom" style="justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <span class="module-stats">${modCompleted} / ${modTotal} (${modPercent}%)</span>
          <div class="module-actions-row">
            ${!isMastered ? `
              <button class="btn-remaining-unit" title="Пройти всі ${modRemaining} питань, яких не було або де була помилка" onclick="startModuleRemainingQuiz('${mod.id}')">
                🎯 Пройти (${modRemaining})
              </button>
            ` : ''}
            <button class="btn-outline-unit" title="Переглянути та вибрати питання блоку" onclick="openModuleQuestionsModal('${mod.id}', 'uncompleted')">
              📋 Обрати
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function startRemainingGlobalQuiz(count) {
  const allQuestions = window.BEB_QUESTIONS || [];
  if (allQuestions.length === 0) {
    alert("База питань ще завантажується. Будь ласка, зачекайте 1-2 секунди...");
    return;
  }
  const remaining = allQuestions.filter(q => !STATE.completedQuestions[q.id]);
  if (remaining.length === 0) {
    alert("Усі 838 питань уже засвоєно!");
    return;
  }
  const shuffled = [...remaining].sort(() => Math.random() - 0.5).slice(0, count);
  startCustomQuestionsQuiz(shuffled, `Залишок питань (${shuffled.length})`);
}

// 6. QUESTION PICKER MODAL (Вибір конкретних питань)
let modalState = {
  moduleId: null,
  filter: 'uncompleted', // 'all', 'uncompleted', 'mistakes', 'completed'
  selectedIds: new Set()
};

function openModuleQuestionsModal(moduleId, defaultFilter = null) {
  sfx.init();
  sfx.playClick();

  const allQuestions = window.BEB_QUESTIONS || [];
  if (allQuestions.length === 0) {
    alert("База питань ще завантажується. Будь ласка, зачекайте 1-2 секунди...");
    return;
  }
  modalState.moduleId = moduleId;
  const modQuestions = allQuestions.filter(q => q.module === moduleId);

  const completedCount = modQuestions.filter(q => STATE.completedQuestions[q.id]).length;
  const uncompletedCount = modQuestions.length - completedCount;

  modalState.filter = defaultFilter || (uncompletedCount > 0 ? 'uncompleted' : 'all');
  modalState.selectedIds.clear();

  renderModalContent();
}

function closeModal() {
  const root = document.getElementById('modal-root');
  if (root) root.innerHTML = '';
  modalState.moduleId = null;
  modalState.selectedIds.clear();
}

function setModalFilter(filter) {
  modalState.filter = filter;
  renderModalContent();
}

function toggleModalQuestion(qid) {
  if (modalState.selectedIds.has(qid)) {
    modalState.selectedIds.delete(qid);
  } else {
    modalState.selectedIds.add(qid);
  }
  renderModalContent();
}

function toggleSelectAllModal(shouldSelect) {
  const allQuestions = window.BEB_QUESTIONS || [];
  const modQuestions = allQuestions.filter(q => q.module === modalState.moduleId);
  const filtered = filterQuestionsByStatus(modQuestions, modalState.filter);

  if (shouldSelect) {
    filtered.forEach(q => modalState.selectedIds.add(q.id));
  } else {
    filtered.forEach(q => modalState.selectedIds.delete(q.id));
  }
  renderModalContent();
}

function filterQuestionsByStatus(list, filter) {
  if (filter === 'uncompleted') {
    return list.filter(q => !STATE.completedQuestions[q.id]);
  } else if (filter === 'mistakes') {
    return list.filter(q => STATE.mistakeBank.includes(q.id));
  } else if (filter === 'completed') {
    return list.filter(q => STATE.completedQuestions[q.id]);
  }
  return list;
}

function startModalSelectedQuiz() {
  const allQuestions = window.BEB_QUESTIONS || [];
  const selected = allQuestions.filter(q => modalState.selectedIds.has(q.id));
  if (selected.length === 0) {
    alert("Будь ласка, виберіть хоча б одне питання!");
    return;
  }
  const modInfo = (window.BEB_MODULES || []).find(m => m.id === modalState.moduleId);
  const title = `${modInfo ? modInfo.title : "Блок"} (Вибрано: ${selected.length})`;
  closeModal();
  startCustomQuestionsQuiz(selected, title);
}

function renderModalContent() {
  const root = document.getElementById('modal-root');
  if (!root || !modalState.moduleId) return;

  const allQuestions = window.BEB_QUESTIONS || [];
  const modInfo = (window.BEB_MODULES || []).find(m => m.id === modalState.moduleId) || { title: "Блок питань", icon: "🏛️" };
  const modQuestions = allQuestions.filter(q => q.module === modalState.moduleId);

  const totalCount = modQuestions.length;
  const completedCount = modQuestions.filter(q => STATE.completedQuestions[q.id]).length;
  const uncompletedCount = totalCount - completedCount;
  const mistakesCount = modQuestions.filter(q => STATE.mistakeBank.includes(q.id)).length;

  const filtered = filterQuestionsByStatus(modQuestions, modalState.filter);
  const allFilteredSelected = filtered.length > 0 && filtered.every(q => modalState.selectedIds.has(q.id));

  let questionsListHtml = '';
  if (filtered.length === 0) {
    questionsListHtml = `
      <div style="text-align:center; padding:50px 20px; color:var(--text-muted);">
        <div style="font-size:40px; margin-bottom:10px;">🍃</div>
        <strong>У цій категорії питань немає</strong>
      </div>
    `;
  } else {
    filtered.forEach(q => {
      const isSelected = modalState.selectedIds.has(q.id);
      const isCompleted = !!STATE.completedQuestions[q.id];
      const isMistake = STATE.mistakeBank.includes(q.id);

      let statusBadge = '';
      if (isCompleted) {
        statusBadge = '<span class="status-pill correct">✓ Засвоєно</span>';
      } else if (isMistake) {
        statusBadge = '<span class="status-pill wrong">✕ Помилка</span>';
      } else {
        statusBadge = '<span class="status-pill unseen">⚪ Не пройдено</span>';
      }

      questionsListHtml += `
        <div class="modal-question-row ${isSelected ? 'selected' : ''}" onclick="toggleModalQuestion('${q.id}')">
          <input type="checkbox" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleModalQuestion('${q.id}')">
          <div class="modal-q-meta">
            <div class="modal-q-top">
              <span style="font-size:12px; font-weight:700; color:var(--beb-blue);">№ ${q.num}</span>
              ${statusBadge}
            </div>
            <div class="modal-q-text">${q.question}</div>
          </div>
        </div>
      `;
    });
  }

  root.innerHTML = `
    <div class="modal-backdrop" onclick="if (event.target === this) closeModal()">
      <div class="modal-card">
        <div class="modal-header">
          <h3>
            <span>${modInfo.icon}</span>
            <span>${modInfo.title}</span>
          </h3>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <div class="modal-sub-toolbar">
          <div class="filter-pills-row" style="margin-bottom:0;">
            <button class="filter-pill ${modalState.filter === 'all' ? 'active' : ''}" onclick="setModalFilter('all')">
              Усі (${totalCount})
            </button>
            <button class="filter-pill ${modalState.filter === 'uncompleted' ? 'active' : ''}" onclick="setModalFilter('uncompleted')">
              ⚪ Непройдені (${uncompletedCount})
            </button>
            <button class="filter-pill ${modalState.filter === 'mistakes' ? 'active' : ''}" onclick="setModalFilter('mistakes')">
              ❌ Помилки (${mistakesCount})
            </button>
            <button class="filter-pill ${modalState.filter === 'completed' ? 'active' : ''}" onclick="setModalFilter('completed')">
              ✅ Засвоєні (${completedCount})
            </button>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn-outline-unit" style="padding:6px 12px; font-size:12px;" onclick="toggleSelectAllModal(${!allFilteredSelected})">
              ${allFilteredSelected ? 'Зняти вибір' : 'Вибрати всі в списку'}
            </button>
          </div>
        </div>

        <div class="modal-body">
          ${questionsListHtml}
        </div>

        <div class="modal-footer">
          <div style="font-weight:700; color:var(--text-muted); font-size:14px;">
            Обрано: <strong style="color:var(--beb-navy); font-size:16px;">${modalState.selectedIds.size}</strong> питань
          </div>
          <div style="display:flex; gap:12px;">
            <button class="btn-outline-unit" onclick="closeModal()">Скасувати</button>
            <button class="btn-primary-duo" ${modalState.selectedIds.size === 0 ? 'disabled' : ''} onclick="startModalSelectedQuiz()">
              ▶️ Пройти вибрані (${modalState.selectedIds.size})
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 7. ENHANCED DICTIONARY & SEARCH VIEW (з фільтрацією та вибором питань)
let dictState = {
  query: '',
  filter: 'all', // 'all', 'uncompleted', 'mistakes', 'completed'
  moduleId: 'all',
  selectedIds: new Set()
};

function renderDictionaryView(container) {
  const allQuestions = window.BEB_QUESTIONS || [];
  const modules = window.BEB_MODULES || [];

  const completedCount = allQuestions.filter(q => STATE.completedQuestions[q.id]).length;
  const uncompletedCount = allQuestions.length - completedCount;
  const mistakesCount = STATE.mistakeBank.length;

  let moduleOptions = `<option value="all">Всі тематичні блоки (838)</option>`;
  modules.forEach(m => {
    const qCount = allQuestions.filter(q => q.module === m.id).length;
    moduleOptions += `<option value="${m.id}" ${dictState.moduleId === m.id ? 'selected' : ''}>${m.icon} ${m.title} (${qCount})</option>`;
  });

  container.innerHTML = `
    <div class="view-header">
      <h2>📚 База питань та пошук (${allQuestions.length} питань)</h2>
      <p>Шукайте за словами, фільтруйте за статусом вивчення та вибирайте питання для проходження</p>
    </div>

    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
      <div class="search-bar" style="margin-bottom:0;">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" id="dict-search-input" value="${dictState.query}" placeholder="Введіть слово для пошуку (наприклад: ПДВ, ризик, строк, детектив)..." oninput="onSearchQuery(this.value)">
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
        <div class="filter-pills-row" style="margin-bottom:0;">
          <button class="filter-pill ${dictState.filter === 'all' ? 'active' : ''}" onclick="setDictFilter('all')">
            Усі (838)
          </button>
          <button class="filter-pill ${dictState.filter === 'uncompleted' ? 'active' : ''}" onclick="setDictFilter('uncompleted')">
            ⚪ Непройдені (${uncompletedCount})
          </button>
          <button class="filter-pill ${dictState.filter === 'mistakes' ? 'active' : ''}" onclick="setDictFilter('mistakes')">
            ❌ Помилки (${mistakesCount})
          </button>
          <button class="filter-pill ${dictState.filter === 'completed' ? 'active' : ''}" onclick="setDictFilter('completed')">
            ✅ Засвоєні (${completedCount})
          </button>
        </div>

        <div style="min-width:240px;">
          <select id="dict-module-select" style="width:100%; padding:8px 12px; border-radius:12px; border:1.5px solid #cbd5e1; font-weight:600; font-size:13px; color:var(--beb-navy);" onchange="onDictModuleChange(this.value)">
            ${moduleOptions}
          </select>
        </div>
      </div>
    </div>

    <div id="dict-results-container"></div>
    <div id="dict-floating-dock"></div>
  `;

  renderDictResults();
}

function setDictFilter(filter) {
  dictState.filter = filter;
  const container = document.getElementById('main-view-container');
  if (container) renderDictionaryView(container);
}

function onDictModuleChange(modId) {
  dictState.moduleId = modId;
  renderDictResults();
}

function onSearchQuery(query) {
  dictState.query = query;
  renderDictResults();
}

function toggleDictQuestion(qid) {
  if (dictState.selectedIds.has(qid)) {
    dictState.selectedIds.delete(qid);
  } else {
    dictState.selectedIds.add(qid);
  }
  renderDictResults();
}

function clearDictSelected() {
  dictState.selectedIds.clear();
  renderDictResults();
}

function startDictSelectedQuiz() {
  const allQuestions = window.BEB_QUESTIONS || [];
  const selected = allQuestions.filter(q => dictState.selectedIds.has(q.id));
  if (selected.length === 0) return;
  startCustomQuestionsQuiz(selected, `Вибрані питання з бази (${selected.length})`);
}

function selectAllCurrentDictResults() {
  const allQuestions = window.BEB_QUESTIONS || [];
  const qClean = dictState.query.trim().toLowerCase();
  let filtered = allQuestions;
  if (dictState.moduleId !== 'all') {
    filtered = filtered.filter(q => q.module === dictState.moduleId);
  }
  if (dictState.filter === 'uncompleted') {
    filtered = filtered.filter(q => !STATE.completedQuestions[q.id]);
  } else if (dictState.filter === 'mistakes') {
    filtered = filtered.filter(q => STATE.mistakeBank.includes(q.id));
  } else if (dictState.filter === 'completed') {
    filtered = filtered.filter(q => STATE.completedQuestions[q.id]);
  }
  if (qClean) {
    filtered = filtered.filter(q => 
      q.question.toLowerCase().includes(qClean) ||
      q.law.toLowerCase().includes(qClean) ||
      q.options.some(o => o.toLowerCase().includes(qClean))
    );
  }
  const displayList = qClean ? filtered : filtered.slice(0, 40);
  displayList.forEach(q => dictState.selectedIds.add(q.id));
  renderDictResults();
}

function renderDictResults() {
  const container = document.getElementById('dict-results-container');
  const dock = document.getElementById('dict-floating-dock');
  if (!container) return;

  const allQuestions = window.BEB_QUESTIONS || [];
  const qClean = dictState.query.trim().toLowerCase();

  let filtered = allQuestions;

  // 1. Filter by module
  if (dictState.moduleId !== 'all') {
    filtered = filtered.filter(q => q.module === dictState.moduleId);
  }

  // 2. Filter by status
  if (dictState.filter === 'uncompleted') {
    filtered = filtered.filter(q => !STATE.completedQuestions[q.id]);
  } else if (dictState.filter === 'mistakes') {
    filtered = filtered.filter(q => STATE.mistakeBank.includes(q.id));
  } else if (dictState.filter === 'completed') {
    filtered = filtered.filter(q => STATE.completedQuestions[q.id]);
  }

  // 3. Filter by search query
  if (qClean) {
    filtered = filtered.filter(q => 
      q.question.toLowerCase().includes(qClean) ||
      q.law.toLowerCase().includes(qClean) ||
      q.options.some(o => o.toLowerCase().includes(qClean))
    );
  }

  const displayList = qClean ? filtered : filtered.slice(0, 40);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:50px; color:var(--text-muted);">
        <div style="font-size:40px; margin-bottom:12px;">🔍</div>
        <strong>За вказаними фільтрами питань не знайдено</strong>
      </div>
    `;
    if (dock) dock.innerHTML = '';
    return;
  }

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:13px; color:var(--text-muted);">
      <span>Знайдено: <strong>${filtered.length}</strong> питань ${!qClean && filtered.length > 40 ? '(показано перші 40)' : ''}</span>
      <button class="btn-outline-unit" style="padding:4px 10px; font-size:12px;" onclick="selectAllCurrentDictResults()">
        Вибрати всі показані (${displayList.length})
      </button>
    </div>
  `;

  displayList.forEach((q, idx) => {
    const isSelected = dictState.selectedIds.has(q.id);
    const isCompleted = !!STATE.completedQuestions[q.id];
    const isMistake = STATE.mistakeBank.includes(q.id);

    let statusBadge = '';
    if (isCompleted) {
      statusBadge = '<span class="status-pill correct">✓ Засвоєно</span>';
    } else if (isMistake) {
      statusBadge = '<span class="status-pill wrong">✕ Помилка</span>';
    } else {
      statusBadge = '<span class="status-pill unseen">⚪ Не пройдено</span>';
    }

    html += `
      <div class="qa-card" style="border: 1.5px solid ${isSelected ? 'var(--beb-blue)' : 'var(--border-color)'}; background:${isSelected ? '#f8faff' : '#ffffff'}; cursor:pointer;" onclick="toggleDictQuestion('${q.id}')">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" ${isSelected ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--beb-blue); cursor:pointer;" onclick="event.stopPropagation(); toggleDictQuestion('${q.id}')">
            <span class="qa-law" style="margin-bottom:0;">${q.law} • № ${q.num}</span>
          </div>
          ${statusBadge}
        </div>
        <div class="qa-question">${q.question}</div>
        <div class="qa-answer">✓ ${q.options[q.correct]}</div>
        <div class="qa-expl">${q.explanation || ''}</div>
      </div>
    `;
  });

  if (!qClean && filtered.length > 40) {
    html += `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:13px;">Введіть пошуковий запит або оберіть блок вище, щоб переглянути решту завдань.</div>`;
  }

  container.innerHTML = html;

  // Floating dock when items are selected
  if (dock) {
    if (dictState.selectedIds.size > 0) {
      dock.innerHTML = `
        <div class="floating-select-bar">
          <div>Обрано: <strong>${dictState.selectedIds.size}</strong> питань</div>
          <div style="display:flex; gap:10px; align-items:center;">
            <button class="btn-primary-duo" style="padding:10px 20px; font-size:14px;" onclick="startDictSelectedQuiz()">
              ▶️ Пройти вибрані (${dictState.selectedIds.size})
            </button>
            <button class="btn-outline-unit" style="background:rgba(255,255,255,0.15); color:#ffffff; border-color:rgba(255,255,255,0.3); padding:10px 14px;" onclick="clearDictSelected()">
              ✕ Скинути
            </button>
          </div>
        </div>
      `;
    } else {
      dock.innerHTML = '';
    }
  }
}

// CONFETTI CANVAS EFFECT
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#22c55e', '#1d4ed8', '#ef4444', '#ec4899', '#8b5cf6'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.rSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 120) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }
  requestAnimationFrame(animate);
}

// KEYBOARD SHORTCUTS (1, 2, 3, 4, Enter, Escape)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }
  if (STATE.currentView === 'quiz' || (STATE.quiz && STATE.quiz.questions.length > 0)) {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      selectOption(idx);
    } else if (e.key === 'Enter') {
      if (!STATE.quiz.isAnswered) {
        checkSelectedAnswer();
      } else {
        nextQuestion();
      }
    }
  }
});

// PHONE SYNC & OFFLINE PROGRESS MODAL
let phoneModalTab = 'wifi'; // 'wifi' | 'offline'

function setPhoneModalTab(tab) {
  phoneModalTab = tab;
  renderPhoneModalContent();
}

let cachedServerUrl = `http://${window.location.hostname || '192.168.0.144'}:8080`;

async function openPhoneSyncModal() {
  sfx.init();
  sfx.playClick();
  phoneModalTab = 'wifi';

  try {
    const res = await fetch('/api/ip');
    if (res.ok) {
      const data = await res.json();
      cachedServerUrl = data.url;
    }
  } catch (e) {}

  renderPhoneModalContent();
}

function renderPhoneModalContent() {
  const root = document.getElementById('modal-root');
  if (!root) return;

  const serverUrl = cachedServerUrl;
  const completedCount = Object.keys(STATE.completedQuestions).length;

  let tabBodyHtml = '';
  if (phoneModalTab === 'wifi') {
    tabBodyHtml = `
      <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
        Відкрийте тренажер на iPhone. Після першого відкриття Safari автоматично збереже всі 838 питань у пам'ять телефону!
      </p>

      <div style="background: #ffffff; padding: 14px; border-radius: 20px; border: 2px solid var(--border-color); box-shadow: 0 4px 16px rgba(0,0,0,0.06); text-align: center; margin: 0 auto;">
        <img src="/api/qr" alt="QR Code" style="width: 200px; height: 200px; display: block; border-radius: 12px; margin: 0 auto;" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent('${serverUrl}')">
      </div>

      <div style="background: #f1f5f9; border: 1.5px dashed #cbd5e1; border-radius: 14px; padding: 10px 16px; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
        <span style="font-family: monospace; font-size: 15px; font-weight: 700; color: var(--beb-navy); user-select: all;">
          ${serverUrl}
        </span>
        <button class="btn-outline-unit" style="padding: 6px 12px; font-size: 12px;" onclick="navigator.clipboard.writeText('${serverUrl}'); this.textContent='✓ Скопійовано!'; setTimeout(() => this.textContent='📋 Копіювати', 2000);">
          📋 Копіювати
        </button>
      </div>

      <div style="text-align: left; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 16px; padding: 14px; width: 100%; font-size: 13px; line-height: 1.5; color: var(--text-muted);">
        <div style="font-weight: 800; color: var(--beb-navy); margin-bottom: 6px;">📱 Інструкція для iPhone (Safari):</div>
        1. Переконайтеся, що iPhone і ноутбук підключені до <strong>однієї мережі Wi-Fi</strong>.<br>
        2. Відкрийте камеру на iPhone і наведіть на QR-код (з'явиться жовте посилання на Safari).<br>
        3. У Safari натисніть кнопку <strong>«Поділитися»</strong> (квадратик зі стрілкою вгору) → <strong>«На початковий екран»</strong>.<br>
        4. <strong>Готово!</strong> З'явиться фірмова іконка 🛡️. Після цього додаток працює офлайн навіть при вимкненому ноутбуці!
      </div>
    `;
  } else {
    // OFFLINE BACKUP / TRANSFER TAB
    tabBodyHtml = `
      <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
        Переносьте історію та прогрес між пристроями <strong>без Wi-Fi та без увімкненого комп'ютера</strong> за допомогою 1 кліку.
      </p>

      <div style="background: #f8fafc; border: 1.5px solid var(--border-color); border-radius: 16px; padding: 16px; width: 100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
          <strong style="color: var(--beb-navy); font-size: 14px;">📤 Експорт прогресу</strong>
          <span class="status-pill correct">Засвоєно: ${completedCount} питань</span>
        </div>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
          Скопіюйте компактний код вашого прогресу і надішліть його собі в Telegram (Збережене) або Нотатки:
        </p>
        <button class="btn-primary-duo" style="width: 100%; font-size: 14px;" onclick="exportProgressCode()">
          📋 Скопіювати код мого прогресу
        </button>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid var(--border-color); border-radius: 16px; padding: 16px; width: 100%;">
        <strong style="color: var(--beb-navy); font-size: 14px; display: block; margin-bottom: 6px;">📥 Імпорт прогресу</strong>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">
          Вставте код, скопійований з іншого пристрою (з телефону або ноутбука):
        </p>
        <input type="text" id="import-progress-input" placeholder="Вставте скопійований код сюди..." style="width:100%; padding:10px 12px; border-radius:12px; border:1.5px solid #cbd5e1; font-size:13px; font-family:monospace; margin-bottom:10px;">
        <button class="btn-outline-unit" style="width: 100%; justify-content: center; font-size: 13px;" onclick="importProgressCode()">
          📥 Застосувати та об'єднати прогрес
        </button>
      </div>
    `;
  }

  root.innerHTML = `
    <div class="modal-backdrop" onclick="if (event.target === this) closeModal()">
      <div class="modal-card" style="max-width: 580px;">
        <div class="modal-header">
          <h3>📱 Мобільний додаток (iPhone / Android)</h3>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <div class="modal-sub-toolbar" style="justify-content: center; gap: 8px;">
          <button class="filter-pill ${phoneModalTab === 'wifi' ? 'active' : ''}" onclick="setPhoneModalTab('wifi')">
            📶 Wi-Fi Підключення (QR)
          </button>
          <button class="filter-pill ${phoneModalTab === 'offline' ? 'active' : ''}" onclick="setPhoneModalTab('offline')">
            💾 Офлайн перенесення (Код)
          </button>
        </div>

        <div class="modal-body" style="padding: 20px 24px; align-items: center; gap: 16px;">
          ${tabBodyHtml}
        </div>

        <div class="modal-footer" style="justify-content: space-between;">
          <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text-muted);">
            <span class="sync-dot"></span> Синхронізація активна
          </div>
          <button class="btn-primary-duo" onclick="closeModal()">Зрозуміло</button>
        </div>
      </div>
    </div>
  `;
}

function exportProgressCode() {
  const data = {
    xp: STATE.xp,
    streak: STATE.streak,
    completed: Object.keys(STATE.completedQuestions),
    mistakes: STATE.mistakeBank,
    ts: Date.now()
  };
  const str = btoa(encodeURIComponent(JSON.stringify(data)));
  navigator.clipboard.writeText(str);
  alert("Код прогресу скопійовано в буфер обміну! Ви можете вставити його на іншому пристрої через вкладку 'Офлайн перенесення'.");
}

function importProgressCode() {
  const input = document.getElementById('import-progress-input');
  if (!input || !input.value.trim()) {
    alert("Будь ласка, вставте код прогресу в поле!");
    return;
  }
  try {
    const raw = decodeURIComponent(atob(input.value.trim()));
    const data = JSON.parse(raw);
    if (!data || !data.completed) throw new Error("Невірний формат коду");

    let countNew = 0;
    (data.completed || []).forEach(qid => {
      if (!STATE.completedQuestions[qid]) {
        STATE.completedQuestions[qid] = true;
        countNew++;
      }
    });

    STATE.xp = Math.max(STATE.xp, data.xp || 0);
    STATE.streak = Math.max(STATE.streak, data.streak || 1);

    const mergedMistakes = new Set([...(data.mistakes || []), ...STATE.mistakeBank]);
    STATE.mistakeBank = Array.from(mergedMistakes).filter(qid => !STATE.completedQuestions[qid]);

    saveState();
    alert(`Успішно перенесено! Додано ${countNew} нових засвоєних питань. Прогрес збережено.`);
    closeModal();
    const mainView = document.getElementById('main-view-container');
    if (STATE.currentView === 'path') renderPathView(mainView);
    else if (STATE.currentView === 'unanswered') renderUnansweredView(mainView);
  } catch (e) {
    alert("Помилка імпорту коду. Перевірте, чи правильно скопійовано код прогресу.");
  }
}

// INITIALIZE APP
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateHeaderStats();
  switchView('path');

  // If questions are still loading/hydrating from cache or network, auto-refresh active view
  if (!window.BEB_QUESTIONS || window.BEB_QUESTIONS.length === 0) {
    const qInterval = setInterval(() => {
      if (window.BEB_QUESTIONS && window.BEB_QUESTIONS.length > 0) {
        clearInterval(qInterval);
        const mainView = document.getElementById('main-view-container');
        if (mainView && STATE.currentView === 'path') renderPathView(mainView);
        else if (mainView && STATE.currentView === 'unanswered') renderUnansweredView(mainView);
        else if (mainView && STATE.currentView === 'exam') renderExamStart(mainView);
      }
    }, 200);
  }

  // Initial server sync
  syncWithServer(true);

  // Background sync every 12 seconds for seamless multi-device updates
  setInterval(() => {
    syncWithServer(false);
  }, 12000);

  // Sync on tab visibility change or window focus
  window.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncWithServer(false);
  });
  window.addEventListener('focus', () => {
    syncWithServer(false);
  });

  // Sound toggle button in stats
  document.getElementById('stat-sound-toggle').addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    document.getElementById('stat-sound-toggle').textContent = sfx.enabled ? '🔊' : '🔇';
  });

  // Lives unlimited toggle
  document.getElementById('stat-hearts').addEventListener('click', () => {
    STATE.unlimitedLives = !STATE.unlimitedLives;
    saveState();
  });
});
