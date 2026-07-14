// 데모 애니메이션을 Chromium으로 녹화 (webm) + 타이틀 카드 PNG 생성
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/tmp/claude-0/-home-user-class-picker/fe713ea4-98bf-55fc-9e5e-0097adb0f530/scratchpad/video';

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:800px; background:#17171B; color:#E8E6E1;
         font-family:'Noto Sans CJK KR',sans-serif; overflow:hidden;
         display:flex; align-items:center; justify-content:center; }
  .win { width:1200px; height:740px; background:#1E1E24; border:1px solid #33333B;
         border-radius:14px; overflow:hidden; display:flex; flex-direction:column; }
  .bar { background:#26262E; padding:12px 18px; display:flex; align-items:center; gap:8px;
         border-bottom:1px solid #33333B; flex:none; }
  .dot { width:12px; height:12px; border-radius:50%; }
  .bar span { color:#8B8B93; font-size:14px; margin-left:12px;
              font-family:'Noto Sans Mono CJK KR',monospace; }
  #body { padding:24px 30px; font-family:'Noto Sans Mono CJK KR',monospace;
          font-size:19px; line-height:1.7; white-space:pre-wrap; overflow:hidden; flex:1; }
  .coral { color:#D97757; } .green { color:#8FBC6F; } .blue { color:#7AA5D6; }
  .yellow { color:#D9B45B; } .dim { color:#8B8B93; }
  .sel { background:#2E2E38; border-radius:6px; padding:1px 10px; display:inline-block; }
  .add { color:#8FBC6F; background:rgba(143,188,111,.12); }
  .del { color:#D0766F; background:rgba(208,118,111,.12); }
  .cursor { display:inline-block; width:10px; background:#D97757; animation:bl .9s steps(1) infinite; }
  @keyframes bl { 50% { opacity:0; } }
`;

const PLAYER = `
<div class="win">
  <div class="bar">
    <div class="dot" style="background:#FF5F57"></div>
    <div class="dot" style="background:#FEBC2E"></div>
    <div class="dot" style="background:#28C840"></div>
    <span>claude — ~/projects/class-picker</span>
  </div>
  <div id="body"></div>
</div>
<script>
const B = document.getElementById('body');
const sleep = ms => new Promise(r => setTimeout(r, ms));
function el(html) { const d = document.createElement('div'); d.innerHTML = html; return d; }
async function typeUser(text, speed) {
  const d = el('<span class="coral">&gt;</span> <span class="t"></span><span class="cursor">&nbsp;</span>');
  B.appendChild(d);
  const t = d.querySelector('.t');
  for (const ch of text) { t.textContent += ch; await sleep(speed); }
  await sleep(500);
  d.querySelector('.cursor').remove();
}
async function run(script) {
  for (const s of script) {
    if (s.u) await typeUser(s.u, s.speed || 55);
    else if (s.l !== undefined) { B.appendChild(el(s.l)); await sleep(s.d || 350); }
    else if (s.p) await sleep(s.p);
    else if (s.clear) { B.innerHTML = ''; await sleep(300); }
  }
  window.DONE = true;
}
run(window.SCRIPT);
</script>`;

const DEMO1 = [
  { p: 900 },
  { u: '이 프로젝트 구조를 설명해줘' },
  { l: '', d: 150 },
  { l: '<span class="coral">⏺</span> 프로젝트를 살펴보겠습니다.', d: 800 },
  { l: '<span class="green">⏺ Read</span><span class="dim">(index.html)</span>', d: 500 },
  { l: '  <span class="dim">⎿  Read 96 lines</span>', d: 700 },
  { l: '<span class="green">⏺ Glob</span><span class="dim">(**/*.js)</span>', d: 500 },
  { l: '  <span class="dim">⎿  Found 2 files</span>', d: 800 },
  { l: '<span class="coral">⏺</span> 이 프로젝트는 <b>학급 발표자 뽑기 웹앱</b>입니다.', d: 600 },
  { l: '  · <span class="blue">index.html</span> — 화면 구조, 뽑기 버튼과 결과 영역', d: 420 },
  { l: '  · <span class="blue">app.js</span> — 학생 명단 관리와 랜덤 추첨 로직', d: 420 },
  { l: '  학생 명단은 localStorage에 저장되어 새로고침해도 유지됩니다.', d: 1600 },
  { l: '', d: 100 },
  { u: '뽑기 결과가 화면에 크게 표시되게 해줘' },
  { l: '', d: 150 },
  { l: '<span class="green">⏺ Update</span><span class="dim">(index.html)</span>', d: 600 },
  { l: '  <span class="dim">⎿  index.html에 2줄 추가, 1줄 수정</span>', d: 600 },
  { l: '  <span class="dim">14</span>  <span class="del">-  &lt;button onclick="pick()"&gt;뽑기&lt;/button&gt;</span>', d: 420 },
  { l: '  <span class="dim">14</span>  <span class="add">+  &lt;button onclick="pick()" class="btn-primary"&gt;뽑기&lt;/button&gt;</span>', d: 420 },
  { l: '  <span class="dim">15</span>  <span class="add">+  &lt;p id="result" class="result-big"&gt;&lt;/p&gt;</span>', d: 800 },
  { l: '', d: 100 },
  { l: '<b>이 수정을 index.html에 적용할까요?</b>', d: 400 },
  { l: '<span class="sel"><span class="coral">❯ 1. Yes</span></span>', d: 200 },
  { l: '  <span class="dim">2. Yes, allow all edits during this session (shift+tab)</span>', d: 200 },
  { l: '  <span class="dim">3. No, and tell Claude what to do differently (esc)</span>', d: 2400 },
  { l: '', d: 100 },
  { l: '<span class="green">✔ 적용 완료</span> <span class="dim">— 브라우저를 새로고침해 확인해 보세요.</span>', d: 2500 },
];

const DEMO2 = [
  { p: 900 },
  { l: '<span class="dim">⏸</span> <span class="yellow">plan mode on</span> <span class="dim">(shift+tab to cycle)</span>', d: 900 },
  { l: '', d: 100 },
  { u: '같은 학생이 연속으로 안 뽑히게 개선해줘' },
  { l: '', d: 150 },
  { l: '<span class="coral">⏺</span> 코드를 분석하고 계획을 세웠습니다.', d: 800 },
  { l: '  <b>계획</b>', d: 400 },
  { l: '  <span class="coral">1.</span> app.js에 이미 뽑힌 학생 목록(picked) 추가', d: 450 },
  { l: '  <span class="coral">2.</span> pick()이 남은 학생 중에서만 추첨하도록 수정', d: 450 },
  { l: '  <span class="coral">3.</span> 전원이 뽑히면 자동 초기화 + 안내 문구 표시', d: 450 },
  { l: '  <span class="coral">4.</span> 브라우저에서 동작 확인', d: 800 },
  { l: '', d: 100 },
  { l: '<b>이 계획대로 진행할까요?</b>', d: 400 },
  { l: '<span class="sel"><span class="coral">❯ 1. Yes, and auto-accept edits</span></span>', d: 200 },
  { l: '  <span class="dim">2. Yes, and manually approve edits</span>', d: 2200 },
  { l: '', d: 100 },
  { l: '<span class="green">⏺ Update</span><span class="dim">(app.js)</span>  <span class="dim">⎿  12줄 수정</span>', d: 700 },
  { l: '<span class="green">⏺ Bash</span><span class="dim">(open index.html — 동작 확인)</span>  <span class="green">✔</span>', d: 1400 },
  { l: '', d: 100 },
  { u: '브랜치 만들어서 PR 올려줘' },
  { l: '', d: 150 },
  { l: '<span class="green">⏺ Bash</span><span class="dim">(git checkout -b fix/duplicate-pick)</span>  <span class="green">✔</span>', d: 700 },
  { l: '<span class="green">⏺ Bash</span><span class="dim">(git commit -m "중복 뽑기 방지: 전원 소진 시 자동 초기화")</span>  <span class="green">✔</span>', d: 700 },
  { l: '<span class="green">⏺ Bash</span><span class="dim">(git push · PR 생성)</span>  <span class="green">✔</span>', d: 900 },
  { l: '', d: 100 },
  { l: '<span class="coral">⏺</span> PR을 올렸습니다:', d: 400 },
  { l: '  <span class="blue">github.com/gomgomeet/class-picker/pull/12</span>', d: 500 },
  { l: '  <span class="dim">제목·변경 요약·테스트 방법을 포함했습니다.</span>', d: 2500 },
];

const CARD_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:800px; overflow:hidden;
         background:radial-gradient(900px 600px at 85% -10%, #33231D 0%, #17171B 55%);
         color:#ECECEA; font-family:'Noto Sans CJK KR',sans-serif;
         display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; }
  .mark { color:#D97757; font-size:56px; }
  h1 { font-size:58px; font-weight:900; text-align:center; line-height:1.3; }
  .sub { font-size:26px; color:#9B9B93; }
`;
const card = (title, sub) => `<style>${CARD_CSS}</style>
  <div class="mark">✻</div><h1>${title}</h1><div class="sub">${sub}</div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

  // 타이틀 카드 PNG
  const p0 = await browser.newPage({ deviceScaleFactor: 1 });
  await p0.setViewportSize({ width: 1280, height: 800 });
  const cards = [
    ['card-intro', card('클로드 코드 데모', '학급 발표자 뽑기 앱 · class-picker')],
    ['card-demo1', card('데모 ①  기능 추가하기', '질문 → 수정 요청 → diff 승인')],
    ['card-demo2', card('데모 ②  Plan Mode로 개선하고 PR까지', '계획 검토 → 구현 → 커밋 · PR')],
    ['card-outro', card('직접 해보세요', '터미널을 열고  claude  라고 입력하는 것부터')],
  ];
  for (const [name, html] of cards) {
    await p0.setContent(`<!doctype html><html><body>${html}</body></html>`, { waitUntil: 'networkidle' });
    await p0.screenshot({ path: `${OUT}/${name}.png` });
    console.log('✔', name);
  }
  await p0.close();

  // 데모 녹화
  for (const [name, script] of [['demo1', DEMO1], ['demo2', DEMO2]]) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
    });
    const page = await ctx.newPage();
    await page.setContent(
      `<!doctype html><html><head><style>${CSS}</style></head><body>` +
      `<script>window.SCRIPT=${JSON.stringify(script)}</script>${PLAYER}</body></html>`,
      { waitUntil: 'networkidle' });
    await page.waitForFunction('window.DONE === true', null, { timeout: 120000 });
    await page.waitForTimeout(400);
    const video = page.video();
    await ctx.close();
    const path = await video.path();
    fs.renameSync(path, `${OUT}/${name}.webm`);
    console.log('✔', name + '.webm');
  }
  await browser.close();
})();
