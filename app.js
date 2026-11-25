/* Dumb-A-Thon 2026 tracker
   Dates come from the EPF (30 Nov to 8 Dec 2026). Tasks come from the formal proposal.
   Every time is Malaysia time (UTC+8) so the countdown is identical for everyone, wherever they are.

   The "to-do" card only ever shows the CURRENT stage. Upcoming content is hidden from the page,
   but this is a static site, so it still sits in this file. It stops casual peeking, not someone
   who reads the source. */
(() => {
  'use strict';

  /* ==================================================================
     ORGANISERS: these three lines are the only ones you should need to edit.
     TOPIC: paste it at the opening (30 Nov, 18:00). Never earlier, because anyone can view source.
     SUBMIT_*: paste a form link and a "Submit" button appears in that stage. Empty = no button.
     ================================================================== */
  const TOPIC = '';
  const SUBMIT_PROPOSAL_URL = '';
  const SUBMIT_FINAL_URL = '';

  const MYT = '+08:00';
  const at = (iso) => new Date(iso + MYT).getTime();

  const STAGES = [
    {
      id: 'brainstorm', short: 'Brainstorm', name: 'Brainstorm & Proposal', label: 'Proposal due in',
      tag: 'Think dumb. Write confidently.', who: 'All teams',
      start: at('2026-11-30T18:00:00'), end: at('2026-12-02T23:59:59'),
      startLabel: 'Mon 30 Nov · 18:00', endLabel: 'Wed 2 Dec · 23:59',
      tasks: [
        'Read the <b>topic</b> above.',
        'Pick your <b>dumbest (but smart) idea</b>. It must solve a real pain point and follow the laws of physics. AI tools are allowed.',
        '<b>Confirm your idea</b> (Tue 1 Dec).',
        'Write your <b>proposal report</b> using the format below.',
        '<b>Submit it</b> by Wed 2 Dec, 23:59.',
      ],
      extras: ['format', 'rule'],
    },
    {
      id: 'shortlist', short: 'Shortlist', name: 'Shortlist', label: 'Shortlist announced in',
      tag: 'Refresh your email. No wait, don\'t.', who: 'All teams',
      start: at('2026-12-02T23:59:59'), end: at('2026-12-03T18:00:00'),
      startLabel: 'Wed 2 Dec · 23:59', endLabel: 'Thu 3 Dec · 18:00',
      tasks: [
        'Sit tight. The presidents and vice presidents of the hosting societies are picking the top teams.',
        'Watch your <b>email</b>. Results are sent by <b>email only</b>, not on WhatsApp.',
        'Shortlisted teams build a prototype and pitch on the night.',
      ],
      extras: ['goose'],
    },
    {
      id: 'build', short: 'Build', name: 'Build', label: 'Submissions close in',
      tag: 'Let AI do the heavy lifting.', who: 'Shortlisted teams',
      start: at('2026-12-03T18:00:00'), end: at('2026-12-07T23:59:59'),
      startLabel: 'Thu 3 Dec · 18:00', endLabel: 'Mon 7 Dec · 23:59',
      tasks: [
        'Build your <b>prototype</b> with AI. <b>Any kind counts</b>. It does not have to be a website.',
        'Put your project in a <b>GitHub repo</b> and set it to Public.',
        'Make your <b>pitch slides</b> and copy the <b>share link</b>.',
        'Open all 3 links in a private window to check that they work.',
        '<b>Submit the 3 links</b> by Mon 7 Dec, 23:59.',
      ],
      extras: ['links', 'judging'],
    },
    {
      id: 'prep', short: 'Pitch prep', name: 'Pitch Prep', label: 'Pitch night starts in',
      tag: 'Submissions are closed. Practise your straight face.', who: 'Shortlisted teams',
      start: at('2026-12-07T23:59:59'), end: at('2026-12-08T17:00:00'),
      startLabel: 'Mon 7 Dec · 23:59', endLabel: 'Tue 8 Dec · 17:00',
      tasks: [
        'Check that your <b>prototype link</b> and <b>slides link</b> still open.',
        'Rehearse your pitch. <b>Confidence and delivery</b> matter.',
        'Get to <b>F1A15</b> before 17:00 (backup rooms: F1A11, F3A08).',
        'Bring a laptop, plus your prototype if it is a physical one.',
      ],
      extras: ['judging'],
    },
    {
      id: 'pitch', short: 'Pitch night', name: 'Pitch Night', label: 'Event closes in',
      tag: 'Say it with full confidence.', who: 'Shortlisted teams',
      start: at('2026-12-08T17:00:00'), end: at('2026-12-08T19:30:00'),
      startLabel: 'Tue 8 Dec · 17:00', endLabel: 'Tue 8 Dec · 19:30',
      tasks: [
        'Register and take your seat at <b>F1A15</b>.',
        'Pitch your idea and show your prototype. <b>Do not explain the joke.</b>',
        'Stay for the prizes.',
      ],
      extras: ['itinerary', 'judging'],
    },
  ];

  /* before the opening and after the closing */
  const OUTSIDE = {
    pre: {
      name: 'Get ready', tag: 'Brain cells: loading…',
      tasks: [
        'Join the <b>WhatsApp group</b>. Announcements live there.',
        'Find your team: <b>2 or 3 members</b>, no solo. Individuals get matched.',
        'Charge your laptop and lower your standards.',
      ],
      extras: [],
    },
    post: { name: 'That\'s a wrap', tag: 'Thanks for being gloriously dumb with us.', tasks: [], extras: ['goose'] },
  };

  const ITINERARY = [
    ['17:00', '17:15', 'Registration, welcome & opening'],
    ['17:15', '17:30', 'Introducing judges & shortlisted groups'],
    ['17:30', '19:00', 'Idea pitching (judges grade live)'],
    ['19:00', '19:15', 'Prize giving: GrabPay or ShopeePay vouchers'],
    ['19:15', '19:30', 'Event closing'],
  ].map(([s, e, what]) => ({ s: at(`2026-12-08T${s}:00`), e: at(`2026-12-08T${e}:00`), t: `${s} – ${e}`, what }));

  const CRITERIA = [
    { name: 'Creative Absurdity', w: 30, d: 'How original, funny and gloriously dumb the idea is.' },
    { name: 'Practicality', w: 20, d: 'Does it actually solve the pain point, and could it work in real life (within the laws of physics)?' },
    { name: 'Product Execution', w: 25, d: 'Does the prototype work, and do the GitHub repo and prototype links open? It does not have to be a hosted website.' },
    { name: 'Presentation', w: 25, d: 'Confidence, delivery and quality of the slides.' },
  ];

  const QUIPS = {
    pre: ['Brain cells: fully loaded. Not for long.', 'Find two friends. Or let us find some for you.', 'The topic is locked. Even we are scared of it.'],
    calm: ['Plenty of time. (You will still do it in the last hour.)', 'Dumb ideas only. Unless they are dumb but smart.', 'Drink water. Honk occasionally.'],
    day: ['Tomorrow-you is going to be SO mad at today-you.', 'Open the doc. Opening it counts as progress.'],
    urgent: ['Under 6 hours. Stop scrolling.', 'It does not have to be good. It has to be submitted.'],
    panic: ['PANIC(); PANIC(); PANIC();', 'SUBMIT IT. IT DOES NOT NEED TO BE GOOD.', 'Have you tried submitting it?'],
    wait: ['Out of your hands now. Stare at your inbox.', 'Somewhere a society president is reading your startup name.'],
    prep: ['Put the keyboard down.', 'Rehearse in the mirror. Keep a straight face.'],
    live: ['Judges are watching. Pitch like you mean it.', 'Confidence is a skill. Skill issue is optional.'],
    post: ['Brain cells: 0. Worth it.', 'Go touch grass. You earned it.'],
  };

  const first = STAGES[0];
  const last = STAGES[STAGES.length - 1];
  const stageById = (id) => STAGES.find((s) => s.id === id);

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const hms = (ms) => { const p = parts(ms); return `${p.totalH}h ${pad(p.m)}m ${pad(p.s)}s`; };
  const mytClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const mytFull = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const toInputValue = (ms) => new Date(ms + 8 * 3600e3).toISOString().slice(0, 19); // MYT wall clock for <input type=datetime-local>
  const quip = (list, t) => list[Math.floor(t / 15000) % list.length];

  function currentStage(t) {
    if (t < first.start) return { mode: 'pre' };
    if (t >= last.end) return { mode: 'post' };
    const i = STAGES.findIndex((s) => t >= s.start && t < s.end);
    return { mode: 'live', i, stage: STAGES[i] };
  }

  /* ---------- hero: the big centred countdown ---------- */
  function setDigit(id, value) {
    const el = $(id);
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove('roll'); void el.offsetWidth; el.classList.add('roll');
  }

  function updateHero(t, cur) {
    let rem = 0, pct = 0, level = 'calm', stepText, label, when;
    const badge = { pre: ['PRE-GAME', 'idle'], live: ['LIVE NOW', 'live'], post: ['FINISHED', 'done'] }[cur.mode];

    if (cur.mode === 'pre') {
      rem = first.start - t;
      stepText = 'Not started yet';
      label = 'Topic drops in';
      when = `${first.startLabel}, Malaysia time`;
      level = 'pre';
    } else if (cur.mode === 'post') {
      stepText = 'All stages complete';
      label = 'That\'s a wrap. Go touch grass.';
      when = 'Dumb-A-Thon 2026 · 30 Nov to 8 Dec';
      level = 'post';
    } else {
      const s = cur.stage;
      rem = s.end - t;
      pct = ((t - s.start) / (s.end - s.start)) * 100;
      stepText = `Stage ${cur.i + 1} of ${STAGES.length} · ${s.name}`;
      label = s.label;
      when = `${s.endLabel}, Malaysia time`;
      if (s.id === 'shortlist') level = 'wait';
      else if (s.id === 'prep') level = 'prep';
      else if (s.id === 'pitch') level = 'live';
      else level = rem < 3600e3 ? 'panic' : rem < 6 * 3600e3 ? 'urgent' : rem < 24 * 3600e3 ? 'day' : 'calm';
    }

    const hero = $('hero');
    hero.dataset.mode = cur.mode;
    hero.classList.toggle('panic', level === 'panic');
    hero.classList.toggle('warn', level === 'urgent' || level === 'day');

    $('badge').textContent = badge[0];
    $('badge').className = `badge ${badge[1]}`;
    $('stepText').textContent = stepText;
    $('winTitle').textContent = level === 'panic' ? 'countdown.exe (Not Responding)' : 'countdown.exe';
    $('countLabel').textContent = label;
    $('when').textContent = when;
    $('timer').hidden = cur.mode === 'post';
    const p = parts(rem);
    setDigit('dD', pad(p.d));
    setDigit('dH', pad(p.h));
    setDigit('dM', pad(p.m));
    setDigit('dS', pad(p.s));
    $('stageBar').hidden = cur.mode !== 'live';
    $('stageFill').style.width = Math.min(100, Math.max(0, pct)) + '%';
    $('quip').textContent = quip(QUIPS[level], t);

    // compact timer in the top bar (shown once the big one scrolls away) + tab title
    const mini = cur.mode === 'post' ? 'That\'s a wrap' : `${hms(rem)} · ${cur.mode === 'pre' ? 'Topic' : cur.stage.short}`;
    $('mini').textContent = mini;
    document.title = cur.mode === 'post' ? 'Dumb-A-Thon 2026' : `${level === 'panic' ? '🚨' : '⏳'} ${hms(rem)} · Dumb-A-Thon`;
  }

  /* ---------- timeline strip: five stage tiles ---------- */
  function buildSteps() {
    $('steps').innerHTML = STAGES.map((s, i) => `
      <li class="trk" data-id="${s.id}">
        <span class="n">${i + 1}</span><b>${s.short}</b><small>${s.startLabel}</small><em></em>
      </li>`).join('');
  }
  function updateSteps(t, cur) {
    STAGES.forEach((s, i) => {
      const li = $('steps').querySelector(`[data-id="${s.id}"]`);
      const isNext = t < s.start && (cur.mode === 'pre' ? i === 0 : i === cur.i + 1);
      const state = t >= s.end ? 'done' : t >= s.start ? 'live' : isNext ? 'next' : '';
      li.className = `trk ${state}`;
      li.querySelector('em').textContent = { done: 'DONE ✓', live: 'LIVE', next: 'NEXT', '': 'LOCKED' }[state];
    });
  }

  /* ---------- topic card ---------- */
  const SCRAMBLE = 'ABCDEFGHJKLMNPQRSTUVWXYZ#$%&?!*+<>';
  function renderTopic(phase) {
    const card = $('topicCard');
    card.hidden = phase === 'post';
    if (phase === 'post') return;
    const locked = phase === 'pre';
    card.className = `card topic ${locked ? 'locked' : 'open'}`;
    $('topicBody').innerHTML = locked
      ? `<p class="eyebrow">🔒 The topic</p>
         <p class="topic-text" id="scramble" aria-hidden="true">????? ????? ????</p>
         <p class="muted">It appears right here when the timer hits zero.</p>`
      : `<p class="eyebrow">🔓 The topic</p>
         <p class="topic-text">${TOPIC ? esc(TOPIC) : 'The topic has dropped!'}</p>
         <p class="muted">${TOPIC ? 'Now go be gloriously dumb about it.' : 'It is being posted on this page. Refresh in a moment.'}</p>`;
  }
  function startScramble() {
    if (reducedMotion) return;
    setInterval(() => {
      const el = $('scramble');
      if (!el) return;
      let s = '';
      for (let i = 0; i < 16; i++) s += i === 5 || i === 11 ? ' ' : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      el.textContent = s;
    }, 110);
  }

  /* ---------- the blocks that can appear under the to-do list ---------- */
  const submitButton = (url, text) => (url ? `<a class="btn alt" href="${esc(url)}" target="_blank" rel="noopener">${text} →</a>` : '');

  const EXTRAS = {
    format: () => `
      <div class="box">
        <h3>📝 Proposal format</h3>
        <ol class="format">
          <li><b>Team details</b><span>Founder, Co-Founder 1 and Co-Founder 2 (teams of 3), each with student ID and WhatsApp number</span></li>
          <li><b>Startup name &amp; tagline</b></li>
          <li><b>The pain point</b></li>
          <li><b>The idea</b></li>
          <li><b>How it works</b></li>
          <li><b>Who and how it helps</b></li>
          <li><b>Dumber add-ons</b><span>optional</span></li>
        </ol>
        <p class="note">Maximum 2 pages. Do <b>not</b> explain the joke.</p>
        <div class="actions">
          <a class="btn" href="assets/Dumbathon_Proposal_Example.pdf" download>📄 Download example (PDF)</a>
          ${submitButton(SUBMIT_PROPOSAL_URL, 'Submit proposal')}
        </div>
      </div>`,

    rule: () => `
      <details class="box">
        <summary>🪿 The One Rule</summary>
        <p class="reveal">Imagine you're a Nottingham student who can start <b>any startup</b> or build <b>anything</b> for campus. Come up with the <b>funniest solution</b> and present it with <b>full confidence</b>. It doesn't have to be realistic, but it has to be creative and follow the laws of physics. Every idea must solve a pain point. AI tools are allowed.</p>
      </details>`,

    links: () => `
      <div class="box">
        <h3>📦 What to submit: three links</h3>
        <ul class="links">
          <li><i>🐙</i><div><b>GitHub repo link</b><span>Your project's files, set to Public.</span></div></li>
          <li><i>🧪</i><div><b>Prototype link</b><span>A hosted site, or any other kind of prototype. Hosting is not required.</span></div></li>
          <li><i>🖥️</i><div><b>Slides link</b><span>A link only. Slide files are not accepted.</span></div></li>
        </ul>
        <p class="note">This hackathon is about using AI well, not coding well.</p>
        <div class="actions">
          <a class="btn" href="guide.html">📘 Never used GitHub? Start here</a>
          ${submitButton(SUBMIT_FINAL_URL, 'Submit links')}
        </div>
      </div>`,

    judging: () => `
      <details class="box">
        <summary>⚖️ How you'll be judged (finals)</summary>
        <div class="crit">
          ${CRITERIA.map((c) => `
            <div>
              <p class="crit-top"><b>${c.name}</b><span>${c.w}%</span></p>
              <div class="crit-bar"><i style="--w:${c.w * 3}%"></i></div>
              <p class="muted small">${c.d}</p>
            </div>`).join('')}
        </div>
      </details>`,

    itinerary: () => `
      <div class="box">
        <h3>🎤 Run sheet</h3>
        <p class="muted small">Venue: F1A15</p>
        <ol class="itin">
          ${ITINERARY.map((it, j) => `<li data-it="${j}"><time>${it.t}</time><span>${it.what}</span></li>`).join('')}
        </ol>
      </div>`,

    goose: () => `
      <button class="goose" type="button" aria-label="Honk the goose">
        <img src="assets/goose-poster.png" alt="A goose typing at a computer, with a lightbulb above its head" width="411" height="300">
        <span>click to HONK</span>
      </button>`,
  };

  /* ---------- the to-do card: current stage only ---------- */
  function renderTodo(phase) {
    const st = stageById(phase);
    const P = st || OUTSIDE[phase];
    const eyebrow = st ? `What to do now · ${st.who}` : phase === 'pre' ? 'Before it starts' : 'Done and dusted';
    const tasks = P.tasks.map((t, j) => {
      const key = `dumbathon26:v2:${phase}:${j}`;
      return `<li><label><input type="checkbox" data-key="${key}" ${store.get(key) === '1' ? 'checked' : ''}><span>${t}</span></label></li>`;
    }).join('');

    $('todo').dataset.kind = st ? 'live' : phase;
    $('todo').innerHTML = `
      <div class="card">
        <div class="card-head">
          <div>
            <p class="eyebrow">${eyebrow}</p>
            <h2>${P.name}</h2>
            <p class="stage-tag">${P.tag}</p>
          </div>
          ${tasks ? '<div class="progress"><b id="doneCount"></b><div class="meter"><i id="doneFill"></i></div></div>' : ''}
        </div>
        ${tasks ? `<ul class="tasks">${tasks}</ul>` : ''}
        ${P.extras.map((k) => EXTRAS[k]()).join('')}
        <p class="upnext" id="upNext" hidden></p>
      </div>`;
    updateProgress();
  }

  function updateProgress(celebrate) {
    const boxes = [...$('todo').querySelectorAll('.tasks input')];
    if (!boxes.length) return;
    const done = boxes.filter((b) => b.checked).length;
    const all = done === boxes.length;
    $('doneCount').textContent = all ? 'All done 🎉' : `${done}/${boxes.length} done`;
    $('doneFill').style.width = (done / boxes.length) * 100 + '%';
    if (all && celebrate && !reducedMotion) {
      const box = document.createElement('div');
      box.className = 'confetti fixed';
      document.body.appendChild(box);
      spawnConfetti(box, 60);
      setTimeout(() => box.remove(), 4200);
    }
  }

  /* things inside the cards that change every tick */
  function updateLive(t, cur) {
    const up = $('upNext');
    if (up) {
      const next = cur.mode === 'live' ? STAGES[cur.i + 1] : null;
      up.hidden = !next;
      if (next) up.innerHTML = `Next: <b>${next.name}</b> · ${next.startLabel}`;
    }
    ITINERARY.forEach((it, j) => {
      const li = document.querySelector(`#todo [data-it="${j}"]`);
      if (!li) return;
      li.classList.toggle('now', t >= it.s && t < it.e);
      li.classList.toggle('past', t >= it.e);
    });
  }

  /* ---------- timetable: the whole flow (dates only) ---------- */
  const TIMETABLE = [
    { date: 'Mon 30 Nov', time: '18:00', what: 'Topic drops here. Brainstorming starts.', doneAt: first.start },
    { date: 'Tue 1 Dec', time: 'all day', what: 'Confirm your idea.', doneAt: at('2026-12-01T23:59:59') },
    { date: 'Wed 2 Dec', time: '23:59', what: 'Proposal report due.', doneAt: stageById('brainstorm').end },
    { date: 'Thu 3 Dec', time: '18:00', what: 'Shortlist announced by email. Building starts.', doneAt: stageById('shortlist').end },
    { date: 'Mon 7 Dec', time: '23:59', what: 'GitHub, prototype and slides links due.', doneAt: stageById('build').end },
    { date: 'Tue 8 Dec', time: '17:00', what: 'Pitch night at F1A15, until 19:30.', startAt: stageById('pitch').start, doneAt: last.end },
  ];

  function buildTimetable() {
    $('ttList').innerHTML = TIMETABLE.map((r) => `
      <li><i></i><time>${r.date}<small>${r.time}</small></time><div><p>${r.what}</p><em></em></div></li>`).join('');
  }

  function updateTimetable(t) {
    const nextIndex = TIMETABLE.findIndex((r) => t < r.doneAt);
    [...$('ttList').children].forEach((li, i) => {
      const r = TIMETABLE[i];
      const past = t >= r.doneAt;
      const isNext = i === nextIndex;
      li.className = past ? 'past' : isNext ? 'next' : '';
      li.querySelector('em').textContent = isNext ? (r.startAt && t >= r.startAt ? 'HAPPENING NOW' : 'NEXT UP') : '';
    });
  }

  /* ---------- confetti (topic drop + finished to-do list) ---------- */
  const CONFETTI = ['#ff8fdc', '#3ee6c8', '#ffd25e', '#7a4dff', '#ff9b3d', '#fbf8ff'];
  function spawnConfetti(box, count) {
    box.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const c = document.createElement('i');
      c.style.left = Math.random() * 100 + '%';
      c.style.background = CONFETTI[i % CONFETTI.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.8 + 's';
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.width = c.style.height = 8 + Math.random() * 10 + 'px';
      box.appendChild(c);
    }
  }

  /* ---------- the 10-second topic drop countdown (full-screen) ---------- */
  const DROP_QUIPS = {
    10: 'Hands off the keyboard.', 9: 'Stretch your fingers.', 8: 'Drink some water.', 7: 'Hide your plans from the other teams.',
    6: 'Gilbert is watching.', 5: 'Lower your standards.', 4: 'Find your team. Fast.', 3: 'Brain cells: ready.', 2: 'Be confident.', 1: 'HONK.',
  };
  let prevT = null, lastDropN = 0, dropDismissed = false, burstUntil = 0;

  function audio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    audio.ctx = audio.ctx || new AC();
    if (audio.ctx.state === 'suspended') audio.ctx.resume().catch(() => {});
    return audio.ctx;
  }
  function beep(freq, dur = 0.09) {
    try {
      const ac = audio();
      const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime;
      o.type = 'square'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(ac.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    } catch { /* audio blocked until the visitor interacts: the visuals still run */ }
  }
  const popNumber = () => { const n = $('dropNum'); n.classList.remove('pop'); void n.offsetWidth; n.classList.add('pop'); };

  function updateDrop(t) {
    const el = $('drop');
    const toDrop = first.start - t;
    // crossing zero by itself (a normal tick), not a jump from the dev panel
    const crossed = prevT !== null && prevT < first.start && t >= first.start && t - prevT < 5000;
    prevT = t;
    if (toDrop > 10500) dropDismissed = false;

    if (crossed && !dropDismissed) {
      burstUntil = Date.now() + 3600;
      lastDropN = 0;
      el.dataset.mode = 'burst';
      el.classList.remove('final');
      $('dropLabel').textContent = 'TOPIC';
      $('dropNum').textContent = 'DROPPED!';
      $('dropQuip').textContent = 'Go go go. Be gloriously dumb.';
      popNumber();
      spawnConfetti($('confetti'), 70);
      beep(660, 0.12); setTimeout(() => beep(880, 0.12), 120); setTimeout(() => beep(1320, 0.25), 240);
      el.hidden = false;
      return;
    }
    if (Date.now() < burstUntil && !dropDismissed) return; // let the burst play out

    if (toDrop > 0 && toDrop <= 10000 && !dropDismissed) {
      const n = Math.ceil(toDrop / 1000);
      el.dataset.mode = 'count';
      if (n !== lastDropN) {
        lastDropN = n;
        $('dropLabel').textContent = 'TOPIC DROPS IN';
        $('dropNum').textContent = n;
        $('dropQuip').textContent = DROP_QUIPS[n];
        el.classList.toggle('final', n <= 3);
        popNumber();
        beep(n <= 3 ? 880 : 520);
      }
      el.hidden = false;
    } else {
      el.hidden = true;
      lastDropN = 0;
    }
  }

  /* ---------- dev panel ---------- */
  const PRESETS = [
    ['Before opening (now-ish)', '2026-11-27T12:00:00'],
    ['Topic drop (12 sec before)', '2026-11-30T17:59:48'],
    ['Brainstorming', '2026-12-01T12:00:00'],
    ['Proposal panic −30 min', '2026-12-02T23:29:00'],
    ['Shortlist wait', '2026-12-03T09:00:00'],
    ['Build mode', '2026-12-05T12:00:00'],
    ['Submission panic −30 min', '2026-12-07T23:29:00'],
    ['Pitch prep (morning)', '2026-12-08T10:00:00'],
    ['Pitch night, live', '2026-12-08T17:40:00'],
    ['After the event', '2026-12-08T20:00:00'],
  ];

  let devOpen = false;
  function openDev(open) {
    devOpen = open;
    $('devPanel').hidden = !open;
    refreshDev(true);
    tick();
  }
  function updateBanner() {
    $('simBanner').hidden = !sim || devOpen;
  }
  function refreshDev(syncInput) {
    $('devMode').textContent = !sim ? 'REAL TIME' : sim.paused ? 'SIM · PAUSED' : sim.speed > 1 ? `SIM · ${sim.speed}×` : 'SIMULATED';
    $('devPlay').textContent = sim && sim.paused ? '▶' : '⏸';
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
    $('devPresets').innerHTML = '<option value="">Jump to…</option>' + PRESETS.map(([l, iso]) => `<option value="${iso}">${l}</option>`).join('');
    $('devPresets').addEventListener('change', (e) => { if (e.target.value) setSimTime(at(e.target.value)); e.target.value = ''; });
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
    if (params.has('dev')) { devOpen = true; $('devPanel').hidden = false; }
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
    updateHero(t, cur);
    updateSteps(t, cur);
    if (phase !== shownPhase) { shownPhase = phase; renderTopic(phase); renderTodo(phase); }
    updateLive(t, cur);
    updateTimetable(t);
    updateDrop(t);
    $('clock').textContent = mytClock.format(new Date(t));
    if (sim) $('simBannerTime').textContent = mytFull.format(new Date(t));
    if (devOpen) $('devNow').textContent = mytFull.format(new Date(t));
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
      const ac = audio();
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
    // the goose and the checkboxes live inside cards that get re-rendered, so delegate
    document.addEventListener('click', (e) => {
      const target = e.target.closest && e.target.closest('.goose, #honkBtn');
      if (!target) return;
      const r = target.getBoundingClientRect();
      honk(e.clientX || r.left + r.width / 2, e.clientY || r.top);
    });
    $('todo').addEventListener('change', (e) => {
      const cb = e.target;
      if (!cb.matches('.tasks input')) return;
      store.set(cb.dataset.key, cb.checked ? '1' : '0');
      updateProgress(cb.checked);
    });
    $('drop').addEventListener('click', () => { dropDismissed = true; burstUntil = 0; $('drop').hidden = true; });
    // once the big countdown scrolls away, show the small one in the top bar
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        $('topbar').classList.toggle('scrolled', !entry.isIntersecting && entry.boundingClientRect.top < 100);
      }, { rootMargin: '-56px 0px 0px 0px' }).observe($('countdown'));
    }
  }

  buildSteps();
  buildTimetable();
  wireUp();
  wireDev();
  tick();
  startScramble();
})();
