/* The poster look: faint code text behind the page and the pink ticker on top. Shared by every page. */
(() => {
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
    'const prototype = await ai.build(idea); // pray',
    'console.log("HEAR ME OUT. idea.isQuestionable() == true");',
    'if (life.isHard()) { cope(); seethe(); repeat(); }',
    'rizz.unlock(); grass.touch(); aura += 1000;',
    'catch (err) { blame(AI); }',
    'system.crash(); restart(); // as is tradition',
  ];

  const bg = document.getElementById('codeBg');
  if (bg) {
    const lines = [];
    for (let i = 0; i < 70; i++) lines.push(CODE_LINES[i % CODE_LINES.length] + '   ' + CODE_LINES[(i * 5 + 3) % CODE_LINES.length]);
    bg.textContent = lines.join('\n');
  }

  const track = document.getElementById('tickerTrack');
  if (track) {
    const t = TICKER.join('  ★  ') + '  ★  ';
    track.textContent = t + t + t + t;
  }
})();
