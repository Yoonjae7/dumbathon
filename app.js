/* Dumb-A-Thon 2026 live tracker
   Dates come from the EPF (30 Nov to 8 Dec 2026). Tasks come from the formal proposal.
   Every time is Malaysia time (UTC+8) so the countdown is identical for everyone, wherever they are. */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     ORGANISERS: edit this one line at the opening (30 Nov, 18:00).
     Leave it empty and the site just says "check WhatsApp and your email".
     Do NOT fill it in before the opening: this is a static site, so anyone
     could read it in "view source" even while the topic still looks locked.
     ------------------------------------------------------------------ */
  const TOPIC = '';

  const MYT = '+08:00';
  const at = (iso) => new Date(iso + MYT).getTime();

  const STAGES = [
    {
      id: 'brainstorm', name: 'Brainstorm & Proposal', tag: 'Think dumb. Write confidently.',
      start: at('2026-11-30T18:00:00'), end: at('2026-12-02T23:59:59'),
      startLabel: 'Mon 30 Nov · 18:00', endLabel: 'Wed 2 Dec · 23:59',
      deadline: 'Proposal report due', who: 'All teams',
      tasks: [
        'Join the <b>WhatsApp group</b>. Announcements live there.',
        'Get the <b>assignment &amp; topic</b> (sent by email and announced in the group).',
        'Form your team: <b>2 or 3 members</b>, no solo teams. Individuals get matched.',
        'Brainstorm the <b>dumbest idea</b> that still solves a real pain point. AI tools are allowed. Laws of physics still apply.',
        '<b>Confirm your idea</b> (Day 2, Tue 1 Dec).',
        'Write the <b>proposal report</b> (max 2 pages): startup name &amp; tagline, the pain point, the solution, the customer. <b>Do not explain the joke.</b>',
        '<b>Submit the proposal report</b> by Wed 2 Dec, 23:59.',
      ],
    },
    {
      id: 'shortlist', name: 'Shortlist', tag: 'Refresh your email. No wait, don\'t.',
      start: at('2026-12-02T23:59:59'), end: at('2026-12-03T18:00:00'),
      startLabel: 'Wed 2 Dec · 23:59', endLabel: 'Thu 3 Dec · 18:00',
      deadline: 'Shortlist announced', who: 'All teams',
      tasks: [
        'Sit tight. The presidents and vice presidents of the hosting societies are picking the top teams.',
        'Watch your <b>email</b>. Results are sent by <b>email only</b>, not on WhatsApp.',
        'Shortlisted? Only <b>shortlisted teams</b> build the prototype and pitch on the night.',
      ],
    },
    {
      id: 'build', name: 'Build', tag: 'Prototype it. Ship it. Pray to Vercel.',
      start: at('2026-12-03T18:00:00'), end: at('2026-12-07T23:59:59'),
      startLabel: 'Thu 3 Dec · 18:00', endLabel: 'Mon 7 Dec · 23:59',
      deadline: 'GitHub link, Vercel link & slides due', who: 'Shortlisted teams',
      tasks: [
        'Build your <b>working prototype</b>.',
        'Push the code to a <b>GitHub repo</b>.',
        'Deploy it <b>live on Vercel</b>. Judges will click it.',
        'Make your <b>pitch slides</b>. These are the ones you present on the night.',
        '<b>Submit</b> the GitHub link, the Vercel link and the slides by Mon 7 Dec, 23:59.',
      ],
    },
    {
      id: 'prep', name: 'Pitch Prep', tag: 'Submissions locked. Touch no code.',
      start: at('2026-12-07T23:59:59'), end: at('2026-12-08T17:00:00'),
      startLabel: 'Mon 7 Dec · 23:59', endLabel: 'Tue 8 Dec · 17:00',
      deadline: 'Doors open at F1A15', who: 'Shortlisted teams',
      tasks: [
        'Check your <b>Vercel link is still live</b>. Product Execution is 25% of your score.',
        'Rehearse your pitch. <b>Confidence and delivery</b> count for 25%.',
        'Get to <b>F1A15</b> before 17:00 (backup rooms: F1A11, F3A08).',
        'Bring a laptop and your best straight face.',
      ],
    },
    {
      id: 'pitch', name: 'Pitch Night', tag: 'Say it with full confidence.',
      start: at('2026-12-08T17:00:00'), end: at('2026-12-08T19:30:00'),
      startLabel: 'Tue 8 Dec · 17:00', endLabel: 'Tue 8 Dec · 19:30',
      deadline: 'Closing ceremony', who: 'Shortlisted teams',
      tasks: [
        'Register and take your seat at <b>F1A15</b>.',
        'Pitch your idea and demo your prototype. <b>Do not explain the joke.</b>',
        'Judges score you on <b>Creative Absurdity (30%)</b>, <b>Practicality (20%)</b>, <b>Product Execution (25%)</b> and <b>Presentation (25%)</b>.',
        'Stay for the prizes: <b>RM400 / RM200 / RM100</b>.',
      ],
      itinerary: [
        { s: '2026-12-08T17:00:00', e: '2026-12-08T17:15:00', t: '17:00 – 17:15', a: 'Registration, welcome & opening' },
        { s: '2026-12-08T17:15:00', e: '2026-12-08T17:30:00', t: '17:15 – 17:30', a: 'Introduction of judges & shortlisted groups' },
        { s: '2026-12-08T17:30:00', e: '2026-12-08T19:00:00', t: '17:30 – 19:00', a: 'Idea pitching', d: 'Teams pitch and demo. Judges grade live.' },
        { s: '2026-12-08T19:00:00', e: '2026-12-08T19:15:00', t: '19:00 – 19:15', a: 'Prize giving ceremony', d: 'Top 3 announced. Cash prizes.' },
        { s: '2026-12-08T19:15:00', e: '2026-12-08T19:30:00', t: '19:15 – 19:30', a: 'Event closing' },
      ],
    },
  ];
  STAGES.forEach((s) => (s.itinerary || []).forEach((i) => { i.s = at(i.s); i.e = at(i.e); }));

  const CRITERIA = [
    { name: 'Creative Absurdity', w: 30, d: 'How original, funny and gloriously dumb the idea is.' },
    { name: 'Practicality', w: 20, d: 'Does it actually solve the pain point, and could it work in real life (within the laws of physics)?' },
    { name: 'Product Execution', w: 25, d: 'Does the prototype work, and are the GitHub repo and Vercel link live?' },
    { name: 'Presentation', w: 25, d: 'Confidence, delivery and quality of the slides.' },
  ];

  const TICKER = [
    'FREE POOL RM700', 'NO SOLO TEAMS', 'DO NOT EXPLAIN THE JOKE', 'AI TOOLS ALLOWED',
    'LAWS OF PHYSICS STILL APPLY', 'RESULTS BY EMAIL ONLY', 'BE CONFIDENTLY DUMB', 'GILBERT IS WATCHING',
  ];

  const CODE_LINES = [
    'if (deadline == tomorrow) { panic(); }',
    'function submitAnything() { return "trust the process"; }',
    'while (!idea.isGood()) { idea.makeItDumber(); }',
    'team.gather(); team.cook(); if (team.isPanicking()) coffee++;',
    'braincells--; braincells--; braincells--; // skill issue',
    'switch (motivation) { case "Monday": procrastinate(); break; }',
    'const vercel = await deploy(); // pray',
    'console.log("HEAR ME OUT. idea.isQuestionable() == true");',
    'if (life.isHard()) { cope(); seethe(); repeat(); }',
    'rizz.unlock(); grass.touch(); aura += 1000;',
    'catch (err) { blame(AI); }',
    'system.crash(); restart(); // as is tradition',
  ];

  const QUIPS = {
    pre: [
      'Brain cells: fully loaded. Not for long.',
      'Charge your laptop. Lower your standards.',
      'Find two friends. Or let us find some for you.',
      'The topic is locked. Even we are scared of it.',
    ],
    calm: [
      'Plenty of time. (You will still do it in the last hour.)',
      'Dumb ideas only. Smart ideas will be asked to leave.',
      'Drink water. Honk occasionally.',
      'Remember: you are not explaining the joke.',
    ],
    day: [
      'Tomorrow-you is going to be SO mad at today-you.',
      'Under 24 hours. The "I work best under pressure" era begins.',
      'Open the doc. Opening it counts as progress.',
    ],
    urgent: [
      'Skill issue loading…',
      'Under 6 hours. This is your sign to stop scrolling.',
      'It does not have to be good. It has to be submitted.',
    ],
    panic: [
      'PANIC(); PANIC(); PANIC();',
      'SUBMIT IT. IT DOES NOT NEED TO BE GOOD.',
      'Have you tried submitting it?',
      'countdown.exe has stopped responding. So should you.',
    ],
    wait: [
      'Out of your hands now. Stare at your inbox.',
      'Somewhere a society president is reading your startup name.',
    ],
    prep: [
      'No more commits. Put the keyboard down.',
      'Rehearse in the mirror. Keep a straight face.',
    ],
    live: [
      'Judges are watching. Pitch like you mean it.',
      'Confidence is a skill. Skill issue is optional.',
    ],
    post: [
      'Dumb-A-Thon 2026 is complete. Brain cells: 0.',
      'Go touch grass. You earned it.',
      'Thanks for being gloriously dumb with us.',
    ],
  };

  /* ---------- time handling ---------- */
  let offset = 0; // "time machine" shifts the clock without touching the real one
  const now = () => Date.now() + offset;

  const qs = new URLSearchParams(location.search).get('t');
  if (qs) {
    const t = at(qs);
    if (!Number.isNaN(t)) offset = t - Date.now();
  }

  const pad = (n) => String(n).padStart(2, '0');
  function parts(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, totalH: Math.floor(s / 3600) };
  }
  const hm = (ms) => { const p = parts(ms); return `${p.totalH}h ${pad(p.m)}m`; };
  const dh = (ms) => { const p = parts(ms); return p.d ? `≈ ${p.d}d ${p.h}h` : ''; };
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  const mytClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const $ = (id) => document.getElementById(id);
  const first = STAGES[0];
  const last = STAGES[STAGES.length - 1];

  const quip = (list, t) => list[Math.floor(t / 15000) % list.length];

  /* ---------- storage (safe) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode etc. */ } },
  };

  /* ---------- build static bits ---------- */
  function buildBackdrop() {
    const lines = [];
    for (let i = 0; i < 60; i++) lines.push(CODE_LINES[i % CODE_LINES.length] + '   ' + CODE_LINES[(i * 5 + 3) % CODE_LINES.length]);
    $('codeBg').textContent = lines.join('\n');
    const t = TICKER.join('  ★  ') + '  ★  ';
    $('tickerTrack').textContent = t + t + t + t;
  }

  function buildCriteria() {
    $('criteria').innerHTML = CRITERIA.map((c) => `
      <div class="crit-row">
        <div class="crit-top"><b>${c.name}</b><span>${c.w}%</span></div>
        <div class="crit-bar"><i data-w="${c.w * 3}"></i></div>
        <p>${c.d}</p>
      </div>`).join('');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll('.crit-bar i').forEach((el) => { el.style.width = Math.min(100, Number(el.dataset.w)) + '%'; });
    }));
  }

  function buildStages() {
    $('stages').innerHTML = STAGES.map((s, i) => `
      <li class="stage upcoming" id="stage-${s.id}" data-id="${s.id}">
        <div class="stage-num" aria-hidden="true">${i + 1}</div>
        <div class="stage-card">
          <div class="stage-head">
            <div class="stage-title">
              <span class="badge locked" data-k="badge">LOCKED</span>
              <h3>${s.name}</h3>
              <p class="stage-tag">${s.tag}</p>
            </div>
            <div class="stage-time">
              <span class="big" data-k="big">--</span>
              <span class="lbl" data-k="lbl"></span>
              <span class="alt" data-k="alt"></span>
            </div>
          </div>
          <div class="when">
            <span>🟢 <b>${s.startLabel}</b></span>
            <span class="deadline">⏰ ${s.deadline}: <b>${s.endLabel}</b></span>
            <span class="who">👥 ${s.who}</span>
          </div>
          <div class="bar" aria-hidden="true"><i data-k="bar"></i></div>
          <ul class="tasks">
            ${s.tasks.map((t, j) => `<li><label><input type="checkbox" data-key="dumbathon26:${s.id}:${j}"><span>${t}</span></label></li>`).join('')}
          </ul>
          ${s.itinerary ? `
          <div class="itin">
            <h4>Pitch night run sheet</h4>
            <ol>
              ${s.itinerary.map((it, j) => `<li data-it="${j}"><time>${it.t}</time><span>${it.a}${it.d ? `<small>${it.d}</small>` : ''}</span></li>`).join('')}
            </ol>
          </div>` : ''}
        </div>
      </li>`).join('');

    document.querySelectorAll('.tasks input').forEach((cb) => {
      cb.checked = store.get(cb.dataset.key) === '1';
      cb.addEventListener('change', () => store.set(cb.dataset.key, cb.checked ? '1' : '0'));
    });
  }

  /* ---------- per-second updates ---------- */
  function currentStage(t) {
    if (t < first.start) return { mode: 'pre' };
    if (t >= last.end) return { mode: 'post' };
    const i = STAGES.findIndex((s) => t >= s.start && t < s.end);
    return { mode: 'live', i, stage: STAGES[i] };
  }

  function setDigits(ms) {
    const p = parts(ms);
    $('dD').textContent = pad(p.d);
    $('dH').textContent = pad(p.h);
    $('dM').textContent = pad(p.m);
    $('dS').textContent = pad(p.s);
    $('heroTotal').textContent = `= ${plural(p.totalH, 'hour')} ${plural(p.m, 'minute')} left`;
  }

  function updateHero(t, cur) {
    const panel = $('panel');
    const badge = $('heroBadge');
    let rem = 0, pct = 0, level = 'calm';

    if (cur.mode === 'pre') {
      rem = first.start - t;
      badge.textContent = 'PRE-GAME'; badge.className = 'badge idle';
      $('heroStep').textContent = 'Not started yet';
      $('heroTitle').textContent = 'Topic drops in…';
      $('heroTarget').textContent = `Opening & assignment: ${first.startLabel} (MYT)`;
      level = 'pre';
      pct = 0;
    } else if (cur.mode === 'post') {
      rem = 0;
      badge.textContent = 'FINISHED'; badge.className = 'badge done';
      $('heroStep').textContent = 'All stages complete';
      $('heroTitle').textContent = 'It\'s over. Go touch grass.';
      $('heroTarget').textContent = 'Dumb-A-Thon 2026 · 30 Nov to 8 Dec';
      level = 'post';
      pct = 100;
    } else {
      const s = cur.stage;
      rem = s.end - t;
      pct = ((t - s.start) / (s.end - s.start)) * 100;
      badge.textContent = 'LIVE NOW'; badge.className = 'badge live';
      $('heroStep').textContent = `Stage ${cur.i + 1} of ${STAGES.length}`;
      $('heroTitle').textContent = s.name;
      $('heroTarget').textContent = `${s.deadline}: ${s.endLabel} (MYT)`;
      if (s.id === 'shortlist') level = 'wait';
      else if (s.id === 'prep') level = 'prep';
      else if (s.id === 'pitch') level = 'live';
      else level = rem < 3600e3 ? 'panic' : rem < 6 * 3600e3 ? 'urgent' : rem < 24 * 3600e3 ? 'day' : 'calm';
    }

    setDigits(rem);
    const panic = level === 'panic';
    panel.classList.toggle('panic', panic);
    panel.classList.toggle('warn', level === 'urgent' || level === 'day');
    $('winTitle').textContent = panic ? 'countdown.exe (Not Responding)' : 'countdown.exe';
    $('heroQuip').textContent = quip(QUIPS[level === 'pre' ? 'pre' : level], t);
    $('heroBar').style.width = Math.min(100, Math.max(0, pct)) + '%';
    $('panel').querySelector('.bar').style.display = cur.mode === 'pre' ? 'none' : '';

    // sticky mini status + tab title
    const mini = $('miniStatus');
    mini.classList.toggle('panic', panic);
    mini.classList.toggle('idle', cur.mode !== 'live');
    let miniText, title;
    if (cur.mode === 'pre') { miniText = `Topic drops in ${hm(rem)}`; title = `⏳ ${hm(rem)} to topic drop`; }
    else if (cur.mode === 'post') { miniText = 'Dumb-A-Thon 2026 is over. Go touch grass.'; title = 'Dumb-A-Thon 2026'; }
    else { miniText = `${cur.stage.name}: ${hm(rem)} left`; title = `${panic ? '🚨' : '⏳'} ${hm(rem)} · ${cur.stage.name}`; }
    $('miniText').textContent = miniText;
    document.title = `${title} | Dumb-A-Thon`;
  }

  function updateBrain(t) {
    const total = last.end - first.start;
    const elapsed = Math.min(1, Math.max(0, (t - first.start) / total));
    const left = Math.round((1 - elapsed) * 100);
    $('brainPct').textContent = left + '%';
    $('brainBar').style.width = (100 - elapsed * 100) + '%';
  }

  function updateTopic(t) {
    const card = $('topicCard');
    if (t < first.start) {
      card.classList.remove('unlocked');
      $('topicTitle').textContent = '🔒 TOPIC: ████████████';
      $('topicText').textContent = 'Classified. Locked. Top secret. It will be sent by email and announced in the WhatsApp group the moment the clock hits zero.';
      $('topicCount').textContent = `Declassified in ${hm(first.start - t)}`;
    } else {
      card.classList.add('unlocked');
      $('topicTitle').textContent = TOPIC ? `🔓 ${TOPIC}` : '🔓 THE TOPIC HAS DROPPED';
      $('topicText').textContent = TOPIC
        ? 'Now go be gloriously dumb about it.'
        : 'Check your email and the WhatsApp group. Then start brainstorming your silliest startup.';
      $('topicCount').textContent = '';
    }
  }

  function updateStages(t) {
    const cur = currentStage(t);
    STAGES.forEach((s, i) => {
      const el = $('stage-' + s.id);
      const state = t < s.start ? 'upcoming' : t < s.end ? 'live' : 'done';
      const isNext = state === 'upcoming' && (cur.mode === 'pre' ? i === 0 : i === cur.i + 1);
      const rem = s.end - t;
      const panic = state === 'live' && (s.id === 'brainstorm' || s.id === 'build') && rem < 3600e3;

      el.classList.toggle('live', state === 'live');
      el.classList.toggle('done', state === 'done');
      el.classList.toggle('upcoming', state === 'upcoming');
      el.classList.toggle('next', isNext);
      el.classList.toggle('panic', panic);

      const badge = el.querySelector('[data-k=badge]');
      const big = el.querySelector('[data-k=big]');
      const lbl = el.querySelector('[data-k=lbl]');
      const alt = el.querySelector('[data-k=alt]');
      const bar = el.querySelector('[data-k=bar]');

      if (state === 'live') {
        badge.className = 'badge live'; badge.textContent = 'LIVE NOW';
        big.textContent = hm(rem); lbl.textContent = 'left'; alt.textContent = dh(rem);
        bar.style.width = ((t - s.start) / (s.end - s.start)) * 100 + '%';
      } else if (state === 'done') {
        badge.className = 'badge done'; badge.textContent = 'DONE ✓';
        big.textContent = 'Done'; lbl.textContent = `ended ${s.endLabel}`; alt.textContent = '';
      } else {
        badge.className = 'badge ' + (isNext ? 'next' : 'locked');
        badge.textContent = isNext ? 'UP NEXT' : 'LOCKED 🔒';
        big.textContent = hm(s.start - t); lbl.textContent = 'until it starts'; alt.textContent = dh(s.start - t);
      }

      (s.itinerary || []).forEach((it, j) => {
        const li = el.querySelector(`[data-it="${j}"]`);
        li.classList.toggle('now', t >= it.s && t < it.e);
        li.classList.toggle('past', t >= it.e);
      });
    });
  }

  function tick() {
    const t = now();
    const cur = currentStage(t);
    $('clock').textContent = mytClock.format(new Date(t));
    updateHero(t, cur);
    updateBrain(t);
    updateTopic(t);
    updateStages(t);
  }

  /* ---------- fun stuff ---------- */
  let honks = 0;
  function honk(x, y) {
    honks++;
    $('honkCount').textContent = honks;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      honk.ac = honk.ac || new AC();
      const ac = honk.ac;
      const t0 = ac.currentTime;
      [0, 0.17].forEach((dt, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(i ? 430 : 350, t0 + dt);
        o.frequency.exponentialRampToValueAtTime(i ? 290 : 250, t0 + dt + 0.19);
        f.type = 'lowpass'; f.frequency.value = 1500;
        g.gain.setValueAtTime(0.0001, t0 + dt);
        g.gain.exponentialRampToValueAtTime(0.22, t0 + dt + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.21);
        o.connect(f); f.connect(g); g.connect(ac.destination);
        o.start(t0 + dt); o.stop(t0 + dt + 0.23);
      });
    } catch { /* audio blocked: the HONK text still shows */ }
    const pop = document.createElement('div');
    pop.className = 'honk-pop';
    pop.textContent = ['HONK!', 'HONK!!', 'HONK?', 'HOOONK'][honks % 4];
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 950);
  }

  function wireUp() {
    const clickPos = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      return e.clientX ? [e.clientX, e.clientY] : [r.left + r.width / 2, r.top];
    };
    $('gooseBtn').addEventListener('click', (e) => honk(...clickPos(e)));
    $('honkBtn').addEventListener('click', (e) => honk(...clickPos(e)));

    const tm = $('timeMachine');
    if (qs) {
      // keep the dropdown in sync when a ?t= link was used
      const opt = [...tm.options].find((o) => o.value && o.value.startsWith(qs));
      if (opt) tm.value = opt.value;
    }
    tm.addEventListener('change', () => {
      offset = tm.value ? at(tm.value) - Date.now() : 0;
      tick();
    });
  }

  buildBackdrop();
  buildCriteria();
  buildStages();
  wireUp();
  tick();
  setInterval(tick, 1000);
  // sections are built by JS, so honour a #hash (e.g. #stage-build) once they exist
  if (location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
