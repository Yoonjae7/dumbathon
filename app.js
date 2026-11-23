/* Dumb-A-Thon 2026 live tracker
   Dates come from the EPF (30 Nov to 8 Dec 2026). Tasks come from the formal proposal.
   Every time is Malaysia time (UTC+8) so the countdown is identical for everyone, wherever they are.

   The page only ever shows what applies to the CURRENT stage (see PHASES). When the clock moves
   into the next stage, the card is swapped for that stage's tasks and info.
   NOTE: this is a static site, so upcoming content is hidden from the page but still sits in this file.
   It stops casual peeking, not someone who reads the source. */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     ORGANISERS: edit this one line at the opening (30 Nov, 18:00).
     Leave it empty and the site just says "check WhatsApp and your email".
     Do NOT fill it in before the opening (anyone could read it in "view source").
     ------------------------------------------------------------------ */
  const TOPIC = '';

  const MYT = '+08:00';
  const at = (iso) => new Date(iso + MYT).getTime();

  const STAGES = [
    {
      id: 'brainstorm', short: 'Brainstorm', name: 'Brainstorm & Proposal', tag: 'Think dumb. Write confidently.',
      start: at('2026-11-30T18:00:00'), end: at('2026-12-02T23:59:59'),
      startLabel: 'Mon 30 Nov · 18:00', endLabel: 'Wed 2 Dec · 23:59',
      deadline: 'Proposal report due', who: 'All teams',
      tasks: [
        'Join the <b>WhatsApp group</b>. Announcements live there.',
        'Get the <b>assignment &amp; topic</b> (sent by email and announced in the group).',
        'Form your team: <b>2 or 3 members</b>, no solo teams. Individuals get matched.',
        'Brainstorm the <b>dumbest idea</b> that still solves a real pain point. AI tools are allowed. F**k the laws of physics.',
        '<b>Confirm your idea</b> (Day 2, Tue 1 Dec).',
        'Write the <b>proposal report</b> (max 2 pages): startup name &amp; tagline, the pain point, the solution, the customer. <b>Do not explain the joke.</b>',
        '<b>Submit the proposal report</b> by Wed 2 Dec, 23:59.',
      ],
    },
    {
      id: 'shortlist', short: 'Shortlist', name: 'Shortlist', tag: 'Refresh your email. No wait, don\'t.',
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
      id: 'build', short: 'Build', name: 'Build', tag: 'Prototype it. Ship it. Pray to Vercel.',
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
      id: 'prep', short: 'Pitch prep', name: 'Pitch Prep', tag: 'Submissions locked. Touch no code.',
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
      id: 'pitch', short: 'Pitch night', name: 'Pitch Night', tag: 'Say it with full confidence.',
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

  const first = STAGES[0];
  const last = STAGES[STAGES.length - 1];
  const stageById = (id) => STAGES.find((s) => s.id === id);

  const CRITERIA = [
    { name: 'Creative Absurdity', w: 30, d: 'How original, funny and gloriously dumb the idea is.' },
    { name: 'Practicality', w: 20, d: 'Does it actually solve the pain point, and could it work in real life (physics optional)?' },
    { name: 'Product Execution', w: 25, d: 'Does the prototype work, and are the GitHub repo and Vercel link live?' },
    { name: 'Presentation', w: 25, d: 'Confidence, delivery and quality of the slides.' },
  ];

  const TICKER = [
    'FREE POOL RM700', 'NO SOLO TEAMS', 'DO NOT EXPLAIN THE JOKE', 'AI TOOLS ALLOWED',
    'FXXK LAWS OF PHYSICS', 'RESULTS BY EMAIL ONLY', 'BE CONFIDENTLY DUMB', 'GILBERT IS WATCHING',
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
      'Dumb ideas only. Smart ideas will be asked to leave. (Unless they are dumb but smart.)',
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

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  /* ---------- storage (safe: can throw in private mode) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };
  const session = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } },
    del(k) { try { sessionStorage.removeItem(k); } catch { /* ignore */ } },
  };

  /* ------------------------------------------------------------------
     CLOCK. `sim` is null for real time. When the dev panel (or ?t=) sets a
     time, `sim` holds a simulated clock that can run at any speed or be paused.
     Everything on the page reads time through now().
     ------------------------------------------------------------------ */
  const SIM_KEY = 'dumbathon26:sim';
  let sim = null; // { base, real0, speed, paused }

  const now = () => {
    if (!sim) return Date.now();
    return sim.paused ? sim.base : sim.base + (Date.now() - sim.real0) * sim.speed;
  };
  const saveSim = () => (sim ? session.set(SIM_KEY, JSON.stringify(sim)) : session.del(SIM_KEY));
  function setSimTime(ms) {
    sim = { base: ms, real0: Date.now(), speed: sim ? sim.speed : 1, paused: sim ? sim.paused : false };
    saveSim(); refreshDev(true); tick();
  }
  function setSpeed(x) {
    if (!sim) return;
    sim.base = now(); sim.real0 = Date.now(); sim.speed = x;
    saveSim(); tick();
  }
  function setPaused(p) {
    if (!sim) sim = { base: Date.now(), real0: Date.now(), speed: 1, paused: false };
    sim.base = now(); sim.real0 = Date.now(); sim.paused = p;
    saveSim(); refreshDev(); tick();
  }
  function resetSim() {
    sim = null; saveSim(); refreshDev(true); tick();
    // drop a leftover ?t= so a reload doesn't jump back into the simulation
    try {
      const u = new URL(location.href);
      if (u.searchParams.has('t')) { u.searchParams.delete('t'); history.replaceState(null, '', u); }
    } catch { /* ignore */ }
  }

  try {
    const saved = session.get(SIM_KEY);
    if (saved) sim = JSON.parse(saved);
  } catch { sim = null; }
  const params = new URLSearchParams(location.search);
  if (params.get('t')) {
    const t = at(params.get('t'));
    if (!Number.isNaN(t)) sim = { base: t, real0: Date.now(), speed: 1, paused: false };
  }

  /* ---------- formatting ---------- */
  function parts(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, totalH: Math.floor(s / 3600) };
  }
  const hm = (ms) => { const p = parts(ms); return `${p.totalH}h ${pad(p.m)}m`; };
  const dh = (ms) => { const p = parts(ms); return p.d ? `≈ ${p.d}d ${p.h}h` : ''; };
  const mytClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const mytFull = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const toInputValue = (ms) => new Date(ms + 8 * 3600e3).toISOString().slice(0, 19); // MYT wall clock for <input type=datetime-local>
  const quip = (list, t) => list[Math.floor(t / 15000) % list.length];

  /* ---------- static bits ---------- */
  function buildBackdrop() {
    const lines = [];
    for (let i = 0; i < 60; i++) lines.push(CODE_LINES[i % CODE_LINES.length] + '   ' + CODE_LINES[(i * 5 + 3) % CODE_LINES.length]);
    $('codeBg').textContent = lines.join('\n');
    const t = TICKER.join('  ★  ') + '  ★  ';
    $('tickerTrack').textContent = t + t + t + t;
  }

  function buildCriteria() {
    const box = $('criteria');
    if (!box) return;
    box.innerHTML = CRITERIA.map((c) => `
      <div class="crit-row">
        <div class="crit-top"><b>${c.name}</b><span>${c.w}%</span></div>
        <div class="crit-bar"><i data-w="${c.w * 3}"></i></div>
        <p>${c.d}</p>
      </div>`).join('');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      box.querySelectorAll('.crit-bar i').forEach((el) => { el.style.width = Math.min(100, Number(el.dataset.w)) + '%'; });
    }));
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- what to show in each phase ----------
     Only the current phase is ever rendered. Stage phases take their title/tasks from STAGES. */
  const PHASES = {
    pre: {
      title: 'Get ready', tag: 'Brain cells: loading…',
      tasks: [
        'Join the <b>WhatsApp group</b>. Announcements live there.',
        'Find your team: <b>2 or 3 members</b>, no solo teams. Friends can sign up together. Individuals get matched.',
        'Charge your laptop and lower your standards.',
        'The topic drops on <b>Mon 30 Nov at 18:00</b>. Not a second earlier.',
      ],
      panels: ['topic', 'prizes'],
    },
    brainstorm: { panels: ['topic', 'rule', 'proposal', 'inspo'] },
    shortlist: { panels: ['goose'] },
    build: { panels: ['judging'] },
    prep: { panels: ['judging'] },
    pitch: { panels: ['itinerary', 'judging', 'prizes'] },
    post: { title: 'That\'s a wrap', tag: 'Brain cells: 0. Worth it.', tasks: [], panels: ['goose'] },
  };

  const PANELS = {
    topic: (phase) => `
      <div class="panel wide topic">
        <img class="sticker topic-sticker" src="assets/blob-lollipop.png" alt="" width="110" height="112">
        <div>
          <p class="eyebrow">The assignment</p>
          ${phase === 'pre' ? `
            <h3>🔒 TOPIC: ████████████</h3>
            <p>Classified. Locked. Top secret. It is sent by email and announced in the WhatsApp group the moment the clock hits zero.</p>
            <p class="topic-count">Declassified in <b data-k="topicCd">--</b></p>` : `
            <h3>🔓 ${TOPIC ? esc(TOPIC) : 'THE TOPIC HAS DROPPED'}</h3>
            <p>${TOPIC ? 'Now go be gloriously dumb about it.' : 'Check your email and the WhatsApp group. Then start brainstorming your silliest startup.'}</p>`}
        </div>
      </div>`,

    rule: () => `
      <div class="panel wide">
        <p class="eyebrow">The One Rule</p>
        <p class="rule-text">Imagine you're a Nottingham student who can start <b>any startup</b> or build <b>anything</b> for campus. Come up with the <mark>funniest solution</mark> and present it with <mark>full confidence</mark>. It doesn't have to be realistic, but it has to be <b>creative</b>. <mark>F**k the laws of physics.</mark> Every idea must solve a <b>pain point</b>. AI tools are allowed.</p>
      </div>`,

    proposal: () => `
      <div class="panel">
        <p class="eyebrow">Proposal report <small>(max 2 pages)</small></p>
        <ol class="list num">
          <li>Startup name &amp; tagline</li>
          <li>The pain point</li>
          <li>The solution</li>
          <li>The customer</li>
        </ol>
        <p class="callout">⚠️ Do <b>not</b> explain the joke. Present everything with full confidence.</p>
      </div>`,

    inspo: () => `
      <div class="panel">
        <details class="inspo">
          <summary>💡 Need inspo? Example: <b>Gilbert Remote</b></summary>
          <dl>
            <dt>Pain point</dt><dd>Gilbert goes wherever he wants, and students have no way to control what he does.</dd>
            <dt>The idea</dt><dd>A digital remote controller for Gilbert, our unofficial mascot goose.</dd>
            <dt>How it works</dt><dd>Open the app, pick a button, press it. Honk. Waddle. Wave at the lake. Gilbert may or may not respond.</dd>
            <dt>Who it helps</dt><dd>Everyone on campus. Humans and Gilbert get to interact, which creates harmony, and a harmonious campus is a prosperous university.</dd>
            <dt>Dumber add-ons</dt><dd><b>Gilbert Premium:</b> same buttons, but Gilbert ignores you faster. <b>Honk Meter.</b> <b>Exam Week Mode:</b> Gilbert becomes your emotional support goose.</dd>
          </dl>
        </details>
      </div>`,

    judging: () => `
      <div class="panel">
        <p class="eyebrow">How you'll be judged <small>(finals)</small></p>
        <div class="crit" id="criteria"></div>
      </div>`,

    prizes: () => `
      <div class="panel">
        <p class="eyebrow">Prize pool</p>
        <div class="podium" aria-label="Prizes: 1st RM400, 2nd RM200, 3rd RM100">
          <div class="pod p2"><span>2nd</span><b>RM200</b></div>
          <div class="pod p1"><span>1st</span><b>RM400</b></div>
          <div class="pod p3"><span>3rd</span><b>RM100</b></div>
        </div>
        <p class="total-prize">Total: <b>RM700</b>. One track, three places.</p>
      </div>`,

    itinerary: () => `
      <div class="panel wide itin">
        <h4>Pitch night run sheet</h4>
        <ol>
          ${stageById('pitch').itinerary.map((it, j) => `<li data-it="${j}"><time>${it.t}</time><span>${it.a}${it.d ? `<small>${it.d}</small>` : ''}</span></li>`).join('')}
        </ol>
      </div>`,

    goose: () => `
      <div class="panel">
        <button class="goose" type="button" aria-label="Honk the goose">
          <img src="assets/goose-poster.png" alt="A goose typing at a computer, with a lightbulb above its head" width="411" height="300">
          <span class="goose-tag">click to HONK</span>
        </button>
      </div>`,
  };

  function renderNow(phase) {
    const st = stageById(phase);
    const P = PHASES[phase];
    const title = st ? st.name : P.title;
    const tag = st ? st.tag : P.tag;
    const tasks = st ? st.tasks : P.tasks;
    const kind = phase === 'pre' ? 'pre' : phase === 'post' ? 'post' : 'live';
    const badge = { pre: '<span class="badge idle">GET READY</span>', post: '<span class="badge done">FINISHED</span>', live: '<span class="badge live">RIGHT NOW</span>' }[kind];
    const when = st
      ? `<div class="when"><span>🟢 <b>${st.startLabel}</b></span><span class="deadline">⏰ ${st.deadline}: <b>${st.endLabel}</b></span><span class="who">👥 ${st.who}</span></div>`
      : phase === 'pre' ? `<div class="when"><span>🟢 Opens <b>${first.startLabel}</b> (MYT)</span></div>` : '';
    const taskList = tasks.length ? `
      <ul class="tasks">
        ${tasks.map((t, j) => {
          const key = `dumbathon26:${phase}:${j}`;
          return `<li><label><input type="checkbox" data-key="${key}" ${store.get(key) === '1' ? 'checked' : ''}><span>${t}</span></label></li>`;
        }).join('')}
      </ul>
      <p class="save-note">Ticks are saved in this browser only.</p>` : '';
    const panels = P.panels.length ? `<div class="panels">${P.panels.map((k) => PANELS[k](phase)).join('')}</div>` : '';

    $('nowCard').innerHTML = `
      <article class="card now-card is-${kind}">
        <div class="now-head">${badge}<h2>${title}</h2><p class="stage-tag">${tag}</p></div>
        ${when}
        ${taskList}
        ${panels}
        <p class="upnext" id="upNext" hidden></p>
      </article>`;
    if (P.panels.includes('judging')) buildCriteria();
  }

  /* ---------- timeline strip (names and dates only, no details) ---------- */
  function buildTrack() {
    $('track').innerHTML = STAGES.map((s, i) => `
      <li class="trk" data-id="${s.id}">
        <span class="n">${i + 1}</span><b>${s.short}</b><small>${s.startLabel}</small><em data-k="st"></em>
      </li>`).join('');
    $('nowCard').addEventListener('change', (e) => {
      const cb = e.target;
      if (cb.matches && cb.matches('.tasks input')) store.set(cb.dataset.key, cb.checked ? '1' : '0');
    });
  }

  function updateTrack(t, cur) {
    STAGES.forEach((s, i) => {
      const li = $('track').querySelector(`[data-id="${s.id}"]`);
      const state = t < s.start ? 'upcoming' : t < s.end ? 'live' : 'done';
      const isNext = state === 'upcoming' && (cur.mode === 'pre' ? i === 0 : i === cur.i + 1);
      li.className = 'trk' + (state === 'live' ? ' live' : state === 'done' ? ' done' : isNext ? ' next' : '');
      li.querySelector('[data-k=st]').textContent = state === 'live' ? 'LIVE' : state === 'done' ? 'DONE ✓' : isNext ? 'NEXT' : 'LOCKED';
    });
  }

  /* things inside the "right now" card that change every tick */
  function updateNow(t, cur) {
    const up = $('upNext');
    if (up) {
      if (cur.mode === 'live') {
        const next = STAGES[cur.i + 1];
        up.hidden = false;
        up.innerHTML = next
          ? `🔜 <b>Up next: ${next.name}</b>, starts ${next.startLabel} (in <b>${hm(next.start - t)}</b>). Its tasks stay hidden until then.`
          : '🏁 That\'s the last stage. After this: go touch grass.';
      } else {
        up.hidden = true;
      }
    }
    const cd = document.querySelector('[data-k=topicCd]');
    if (cd) cd.textContent = hm(first.start - t);
    stageById('pitch').itinerary.forEach((it, j) => {
      const li = document.querySelector(`#nowCard [data-it="${j}"]`);
      if (!li) return;
      li.classList.toggle('now', t >= it.s && t < it.e);
      li.classList.toggle('past', t >= it.e);
    });
  }

  /* ---------- per-tick updates ---------- */
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
    } else if (cur.mode === 'post') {
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
    $('heroQuip').textContent = quip(QUIPS[level], t);
    $('heroBar').style.width = Math.min(100, Math.max(0, pct)) + '%';
    panel.querySelector('.bar').style.display = cur.mode === 'pre' ? 'none' : '';

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

  /* ---------- dev panel ---------- */
  const PRESETS = [
    ['Before opening (now-ish)', '2026-11-27T12:00:00'],
    ['Topic drop −15 sec', '2026-11-30T17:59:45'],
    ['Brainstorming', '2026-12-01T12:00:00'],
    ['Proposal panic −30 min', '2026-12-02T23:29:00'],
    ['Shortlist wait', '2026-12-03T09:00:00'],
    ['Build mode', '2026-12-05T12:00:00'],
    ['Submission panic −30 min', '2026-12-07T23:29:00'],
    ['Pitch prep (morning)', '2026-12-08T10:00:00'],
    ['Pitch night, live', '2026-12-08T17:40:00'],
    ['After the event', '2026-12-08T20:00:00'],
  ];
  const JUMPS = [['−1d', -864e5], ['−1h', -36e5], ['−10m', -6e5], ['−1m', -6e4], ['+1m', 6e4], ['+10m', 6e5], ['+1h', 36e5], ['+1d', 864e5]];

  let devOpen = false;
  function openDev(open) {
    devOpen = open;
    $('devPanel').hidden = !open;
    refreshDev(true);
    updateBanner();
  }
  function updateBanner() {
    $('simBanner').hidden = !sim || devOpen;
  }
  function refreshDev(syncInput) {
    $('devMode').textContent = !sim ? 'REAL TIME' : sim.paused ? 'SIMULATED · PAUSED' : sim.speed > 1 ? `SIMULATED · ${sim.speed}× SPEED` : 'SIMULATED';
    $('devMode').className = sim ? 'sim' : '';
    $('devPlay').textContent = sim && sim.paused ? '▶ Play' : '⏸ Pause';
    $('devSpeed').value = String(sim ? sim.speed : 1);
    if (syncInput) $('devInput').value = toInputValue(now());
    updateBanner();
  }
  function stepStage(dir) {
    const t = now();
    const marks = [...new Set([first.start, ...STAGES.map((s) => s.end), ...STAGES.map((s) => s.start)])].sort((a, b) => a - b);
    const target = dir > 0 ? marks.find((m) => m > t + 500) : [...marks].reverse().find((m) => m < t - 2000);
    if (target) setSimTime(target);
  }
  function wireDev() {
    $('devJumps').innerHTML = JUMPS.map(([l, ms]) => `<button type="button" class="dbtn" data-ms="${ms}">${l}</button>`).join('');
    $('devPresets').innerHTML = PRESETS.map(([l, iso]) => `<button type="button" class="dbtn" data-iso="${iso}">${l}</button>`).join('');

    $('devJumps').addEventListener('click', (e) => { const b = e.target.closest('[data-ms]'); if (b) setSimTime(now() + Number(b.dataset.ms)); });
    $('devPresets').addEventListener('click', (e) => { const b = e.target.closest('[data-iso]'); if (b) setSimTime(at(b.dataset.iso)); });
    $('devSet').addEventListener('click', () => { const v = $('devInput').value; if (v) { const ms = at(v); if (!Number.isNaN(ms)) setSimTime(ms); } });
    $('devInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('devSet').click(); });
    $('devPrev').addEventListener('click', () => stepStage(-1));
    $('devNext').addEventListener('click', () => stepStage(1));
    $('devSpeed').addEventListener('change', (e) => {
      if (!sim) sim = { base: Date.now(), real0: Date.now(), speed: 1, paused: false };
      setSpeed(Number(e.target.value)); refreshDev();
    });
    $('devPlay').addEventListener('click', () => setPaused(!(sim && sim.paused)));
    $('devReset').addEventListener('click', resetSim);
    $('devClose').addEventListener('click', () => openDev(false));
    $('simBannerDev').addEventListener('click', () => openDev(true));
    $('simBannerReset').addEventListener('click', resetSim);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') { e.preventDefault(); openDev(!devOpen); }
    });
    if (params.has('dev')) openDev(true);
    refreshDev(true);
  }

  /* ---------- main loop ---------- */
  let timer = 0;
  let shownPhase = null;
  function tick() {
    clearTimeout(timer);
    const t = now();
    const cur = currentStage(t);
    const phase = cur.mode === 'live' ? cur.stage.id : cur.mode;
    $('clock').textContent = mytClock.format(new Date(t));
    updateHero(t, cur);
    updateTrack(t, cur);
    if (phase !== shownPhase) { shownPhase = phase; renderNow(phase); }
    updateNow(t, cur);
    if (sim) {
      $('simBannerTime').textContent = mytFull.format(new Date(t));
      if (devOpen) $('devNow').textContent = mytFull.format(new Date(t));
    } else if (devOpen) {
      $('devNow').textContent = mytFull.format(new Date(t));
    }
    // fast clock needs faster redraws; real time ticks on the second boundary
    const fast = sim && !sim.paused && sim.speed > 1;
    const delay = fast ? 150 : sim && sim.paused ? 500 : 1000 - (Date.now() % 1000) + 5;
    timer = setTimeout(tick, delay);
  }

  /* ---------- honk ---------- */
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

  function wireHonk() {
    $('honkBtn').addEventListener('click', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      honk(e.clientX || r.left + r.width / 2, e.clientY || r.top);
    });
    // the goose lives inside the "right now" card, which gets re-rendered, so listen on the document
    document.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('.goose')) honk(e.clientX, e.clientY);
    });
  }

  buildBackdrop();
  buildTrack();
  wireHonk();
  wireDev();
  tick();
  // sections are built by JS, so honour a #hash (e.g. #stage-build) once they exist
  if (location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
