// Generate onboarding images (terminal mockups + diagrams) via Playwright
const { chromium } = require('playwright');
const path = require('path');
const OUT = '/home/user/class-picker/docs/onboarding/assets';

const BASE_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:100%; height:100%; }
  body {
    background:#17171B; color:#E8E6E1;
    font-family:'Noto Sans CJK KR','Noto Sans KR',sans-serif;
    display:flex; align-items:center; justify-content:center;
  }
  .mono, pre, code { font-family:'Noto Sans Mono CJK KR','JetBrains Mono',monospace; }
  .coral { color:#D97757; } .green { color:#8FBC6F; } .blue { color:#7AA5D6; }
  .yellow { color:#D9B45B; } .dim { color:#8B8B93; } .purple { color:#A78BC7; }
`;

function term(bodyHtml, title = 'claude — ~/projects/class-picker') {
  return `<style>${BASE_CSS}
    .win { width:1280px; background:#1E1E24; border:1px solid #33333B; border-radius:14px;
           overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,.55); }
    .bar { background:#26262E; padding:14px 20px; display:flex; align-items:center; gap:8px;
           border-bottom:1px solid #33333B; }
    .dot { width:13px; height:13px; border-radius:50%; }
    .bar span.t { color:#8B8B93; font-size:15px; margin-left:14px; font-family:'Noto Sans Mono CJK KR',monospace; }
    .body { padding:28px 34px; font-family:'Noto Sans Mono CJK KR',monospace;
            font-size:19px; line-height:1.75; white-space:pre-wrap; }
    .wbox { border:1.5px solid #D97757; border-radius:10px; padding:16px 22px; margin:10px 0;
            display:inline-block; min-width:560px; }
    .sel { background:#2E2E38; border-radius:6px; padding:1px 10px; display:inline-block; }
    .add { color:#8FBC6F; background:rgba(143,188,111,.12); }
    .del { color:#D0766F; background:rgba(208,118,111,.12); }
  </style>
  <div class="win">
    <div class="bar">
      <div class="dot" style="background:#FF5F57"></div>
      <div class="dot" style="background:#FEBC2E"></div>
      <div class="dot" style="background:#28C840"></div>
      <span class="t">${title}</span>
    </div>
    <div class="body">${bodyHtml}</div>
  </div>`;
}

const IMAGES = [];

// ── 1. cover terminal ─────────────────────────────────────────────
IMAGES.push({
  name: 'cover-terminal', w: 1440, h: 810,
  html: term(
`<span class="dim">$</span> <span class="green">claude</span>

<div class="wbox"><span class="coral">✻ Welcome to Claude Code!</span>

  <span class="dim">/help for help · /status for your current setup</span>

  <span class="dim">cwd:</span> ~/projects/class-picker</div>

<span class="coral">&gt;</span> 이 프로젝트에 다크 모드를 추가해줘<span class="coral">▌</span>`)
});

// ── 2. install terminal ───────────────────────────────────────────
IMAGES.push({
  name: 'term-install', w: 1440, h: 810,
  html: term(
`<span class="dim">$</span> npm install -g @anthropic-ai/claude-code

<span class="dim">added 3 packages in 4s</span>

<span class="dim">$</span> cd class-picker
<span class="dim">$</span> <span class="green">claude</span>

<div class="wbox"><span class="coral">✻ Welcome to Claude Code!</span>

  <span class="dim">Browser opened — log in with your Claude account</span>
  <span class="green">✔ Logged in as</span> you@example.com</div>

<span class="coral">&gt;</span> <span class="dim">Try "explain this project"</span><span class="coral">▌</span>`,
  'terminal — 설치와 첫 실행')
});

// ── 3. codebase question ──────────────────────────────────────────
IMAGES.push({
  name: 'term-codebase-question', w: 1440, h: 880,
  html: term(
`<span class="coral">&gt;</span> 이 프로젝트 구조를 설명해줘

<span class="coral">⏺</span> 프로젝트를 살펴보겠습니다.

<span class="green">⏺ Read</span><span class="dim">(index.html)</span>
  <span class="dim">⎿  Read 96 lines</span>

<span class="green">⏺ Glob</span><span class="dim">(**/*.js)</span>
  <span class="dim">⎿  Found 2 files</span>

<span class="coral">⏺</span> 이 프로젝트는 <b>학급 발표자 뽑기 웹앱</b>입니다.

  · <span class="blue">index.html</span> — 화면 구조, 뽑기 버튼과 결과 영역
  · <span class="blue">app.js</span> — 학생 명단 관리와 랜덤 추첨 로직
  · <span class="blue">style.css</span> — 전체 스타일

  학생 명단은 localStorage에 저장되어 새로고침해도 유지됩니다.`)
});

// ── 4. diff approval ──────────────────────────────────────────────
IMAGES.push({
  name: 'term-diff-approval', w: 1440, h: 880,
  html: term(
`<span class="coral">&gt;</span> 뽑기 결과가 화면에 표시되게 해줘

<span class="green">⏺ Update</span><span class="dim">(index.html)</span>
  <span class="dim">⎿  index.html에 2줄 추가, 1줄 수정</span>

  <span class="dim">14</span>  <span class="del">-  &lt;button onclick="pick()"&gt;뽑기&lt;/button&gt;</span>
  <span class="dim">14</span>  <span class="add">+  &lt;button onclick="pick()" class="btn-primary"&gt;뽑기&lt;/button&gt;</span>
  <span class="dim">15</span>  <span class="add">+  &lt;p id="result" aria-live="polite"&gt;&lt;/p&gt;</span>

<b>이 수정을 index.html에 적용할까요?</b>
<span class="sel"><span class="coral">❯ 1. Yes</span></span>
  <span class="dim">2. Yes, allow all edits during this session (shift+tab)</span>
  <span class="dim">3. No, and tell Claude what to do differently (esc)</span>`)
});

// ── 5. slash commands ─────────────────────────────────────────────
IMAGES.push({
  name: 'term-slash-commands', w: 1440, h: 810,
  html: term(
`<span class="coral">&gt;</span> /<span class="coral">▌</span>

  <span class="sel"><span class="blue">/help</span>     <span class="dim">사용법과 명령어 목록 보기</span></span>
  <span class="blue">/init</span>     <span class="dim">CLAUDE.md 파일 자동 생성</span>
  <span class="blue">/clear</span>    <span class="dim">대화 기록 초기화 (새 작업 시작할 때)</span>
  <span class="blue">/compact</span>  <span class="dim">긴 대화를 요약해 컨텍스트 절약</span>
  <span class="blue">/model</span>    <span class="dim">사용할 Claude 모델 변경</span>
  <span class="blue">/config</span>   <span class="dim">설정 패널 열기</span>
  <span class="blue">/review</span>   <span class="dim">코드 리뷰 요청</span>`)
});

// ── 6. plan mode ──────────────────────────────────────────────────
IMAGES.push({
  name: 'term-plan-mode', w: 1440, h: 880,
  html: term(
`<span class="dim">⏸</span> <span class="yellow">plan mode on</span> <span class="dim">(shift+tab to cycle)</span>

<span class="coral">&gt;</span> 같은 학생이 연속으로 안 뽑히게 개선해줘

<span class="coral">⏺</span> 코드를 분석하고 계획을 세웠습니다.

  <b>계획</b>
  <span class="coral">1.</span> app.js에 이미 뽑힌 학생 목록(picked) 추가
  <span class="coral">2.</span> pick()이 남은 학생 중에서만 추첨하도록 수정
  <span class="coral">3.</span> 전원이 뽑히면 자동 초기화 + 안내 문구 표시
  <span class="coral">4.</span> 브라우저에서 동작 확인

<b>이 계획대로 진행할까요?</b>
<span class="sel"><span class="coral">❯ 1. Yes, and auto-accept edits</span></span>
  <span class="dim">2. Yes, and manually approve edits</span>
  <span class="dim">3. No, keep planning (esc)</span>`)
});

// ── diagram helpers ───────────────────────────────────────────────
const DIAG_CSS = `<style>${BASE_CSS}
  .stage { width:1520px; padding:40px; }
  h1.dt { font-size:34px; font-weight:700; margin-bottom:34px; text-align:center; }
  .card { background:#222229; border:1.5px solid #3A3A44; border-radius:16px; padding:28px 30px; }
  .card h2 { font-size:24px; font-weight:700; margin-bottom:16px; }
  .card li { list-style:none; font-size:19px; line-height:1.9; color:#C9C7C1; }
  .card li::before { content:'·'; color:#D97757; font-weight:700; margin-right:10px; }
  .tag { display:inline-block; font-size:15px; padding:3px 14px; border-radius:99px;
         background:rgba(217,119,87,.15); color:#D97757; font-weight:600; margin-bottom:12px; }
  .arrow { color:#D97757; font-size:34px; font-weight:700; }
  .flowbox { background:#222229; border:1.5px solid #3A3A44; border-radius:14px;
             padding:20px 26px; text-align:center; }
  .flowbox b { font-size:21px; display:block; margin-bottom:6px; }
  .flowbox span { font-size:15px; color:#8B8B93; }
</style>`;

// ── 7. agent vs autocomplete ──────────────────────────────────────
IMAGES.push({
  name: 'diagram-agent-vs-autocomplete', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage">
    <h1 class="dt">코드 자동완성 <span class="dim">vs</span> <span class="coral">AI 코딩 에이전트</span></h1>
    <div style="display:flex; gap:36px; align-items:stretch;">
      <div class="card" style="flex:1; border-color:#3A3A44;">
        <h2 class="dim">기존 코드 자동완성</h2>
        <ul>
          <li>커서 위치에서 <b>한 줄씩</b> 제안</li>
          <li>내가 타이핑해야 반응하는 <b>수동형</b></li>
          <li>지금 <b>열려 있는 파일</b>만 이해</li>
          <li>실행·테스트·커밋은 <b>내 몫</b></li>
        </ul>
      </div>
      <div style="display:flex; align-items:center;" class="arrow">→</div>
      <div class="card" style="flex:1.35; border-color:#D97757;">
        <div class="tag">Claude Code</div>
        <h2>AI 코딩 에이전트</h2>
        <ul>
          <li><b>목표</b>를 말하면 스스로 계획을 세움</li>
          <li>여러 파일을 <b>탐색하고 동시에 수정</b></li>
          <li><b>코드베이스 전체</b>를 맥락으로 이해</li>
          <li>명령 실행 · 테스트 · <b>커밋과 PR까지</b> 수행</li>
        </ul>
        <div style="display:flex; gap:10px; margin-top:22px; align-items:center; justify-content:center;">
          ${['계획','탐색','수정','검증','커밋'].map(s =>
            `<span style="background:#2B2B33;border-radius:8px;padding:8px 18px;font-size:17px;">${s}</span>`
          ).join('<span class="arrow" style="font-size:20px;">→</span>')}
        </div>
      </div>
    </div>
  </div>`
});

// ── 8. levels roadmap ─────────────────────────────────────────────
IMAGES.push({
  name: 'diagram-levels-roadmap', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage">
    <h1 class="dt">3단계 학습 로드맵</h1>
    <div style="display:flex; gap:32px; align-items:flex-end;">
      <div class="card" style="flex:1;">
        <div class="tag">Level 1 · 첫 30분</div>
        <h2>시작하기</h2>
        <ul><li>설치와 첫 대화</li><li>코드베이스에 질문하기</li><li>파일 수정 승인 흐름</li><li>필수 슬래시 커맨드</li></ul>
      </div>
      <div class="card" style="flex:1; padding-bottom:60px;">
        <div class="tag">Level 2 · 1~2시간</div>
        <h2>업무에 붙이기</h2>
        <ul><li>CLAUDE.md 메모리</li><li>Plan Mode로 안전하게</li><li>Git 커밋 · PR 맡기기</li><li>이미지로 소통하기</li></ul>
      </div>
      <div class="card" style="flex:1; padding-bottom:100px; border-color:#D97757;">
        <div class="tag">Level 3 · 필요할 때</div>
        <h2>확장하기</h2>
        <ul><li>커스텀 커맨드 · 스킬</li><li>서브에이전트</li><li>MCP로 외부 도구 연결</li><li>Hooks · CI 자동화</li></ul>
      </div>
    </div>
  </div>`
});

// ── 9. CLAUDE.md diagram ──────────────────────────────────────────
IMAGES.push({
  name: 'diagram-claude-md', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage">
    <h1 class="dt"><span class="coral">CLAUDE.md</span> — 프로젝트를 기억시키는 파일</h1>
    <div style="display:flex; gap:28px; align-items:center; margin-bottom:38px;">
      <div class="card" style="flex:1.2;">
        <h2 class="mono" style="color:#D97757;">CLAUDE.md</h2>
        <pre class="mono" style="font-size:17px; line-height:1.8; color:#C9C7C1;"># class-picker
학급 발표자 뽑기 웹앱

## 명령어
- 실행: index.html 브라우저로 열기

## 컨벤션
- 함수/변수는 camelCase
- 커밋 메시지는 한국어로</pre>
      </div>
      <div style="text-align:center; flex:0.6;">
        <div class="arrow">→</div>
        <div style="font-size:17px; color:#8B8B93; margin-top:6px;">매 세션 시작 시<br>자동으로 로드</div>
      </div>
      <div class="card" style="flex:1; border-color:#D97757; text-align:center; padding:44px 30px;">
        <div style="font-size:44px; margin-bottom:12px;" class="coral">✻</div>
        <h2>Claude Code</h2>
        <div style="font-size:18px; color:#C9C7C1; margin-top:10px;">규칙을 매번 다시 설명할<br>필요가 없어집니다</div>
      </div>
    </div>
    <div style="display:flex; gap:18px; align-items:center; justify-content:center;">
      <div class="flowbox"><b class="mono">~/.claude/CLAUDE.md</b><span>개인 전역 · 모든 프로젝트 공통</span></div>
      <span class="arrow" style="font-size:22px;">＋</span>
      <div class="flowbox" style="border-color:#D97757;"><b class="mono">프로젝트/CLAUDE.md</b><span>팀 공유 · /init 으로 자동 생성</span></div>
      <span class="arrow" style="font-size:22px;">＋</span>
      <div class="flowbox"><b class="mono">하위폴더/CLAUDE.md</b><span>모듈별 세부 규칙</span></div>
    </div>
  </div>`
});

// ── 10. git workflow ──────────────────────────────────────────────
IMAGES.push({
  name: 'diagram-git-workflow', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage">
    <h1 class="dt">한 문장으로 끝나는 <span class="coral">Git 워크플로</span></h1>
    <div class="card" style="text-align:center; margin-bottom:40px; border-color:#D97757;">
      <span class="mono" style="font-size:22px;"><span class="coral">&gt;</span> 중복 뽑기 버그 고치고, 브랜치 만들어서 PR까지 올려줘</span>
    </div>
    <div style="display:flex; gap:14px; align-items:center; justify-content:center;">
      ${[['🌿','브랜치 생성','fix/duplicate-pick'],['✏️','코드 수정','여러 파일 동시에'],['🧪','검증','실행·테스트 확인'],['💾','커밋','메시지도 알아서'],['🔀','PR 생성','설명까지 작성']]
        .map(([e,t,s]) => `<div class="flowbox" style="min-width:210px;"><div style="font-size:30px;margin-bottom:8px;">${e}</div><b>${t}</b><span>${s}</span></div>`)
        .join('<span class="arrow">→</span>')}
    </div>
    <div style="text-align:center; margin-top:36px; font-size:19px; color:#8B8B93;">
      각 단계는 권한 설정에 따라 <b style="color:#D9B45B;">승인 후 실행</b>됩니다 — 원치 않는 커밋은 생기지 않아요
    </div>
  </div>`
});

// ── 11. MCP diagram ───────────────────────────────────────────────
IMAGES.push({
  name: 'diagram-mcp', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage" style="position:relative; height:820px;">
    <h1 class="dt">MCP — 외부 도구를 Claude에 연결</h1>
    <svg width="1520" height="700" style="position:absolute; top:110px; left:40px;">
      ${[[300,180],[300,390],[300,600],[1220,180],[1220,390],[1220,600]]
        .map(([x,y]) => `<line x1="760" y1="390" x2="${x}" y2="${y}" stroke="#D97757" stroke-width="2" stroke-dasharray="7 7" opacity="0.65"/>`).join('')}
    </svg>
    ${[['Slack','메시지 검색·전송',300,180],['Notion','문서 읽고 쓰기',300,390],['GitHub','이슈·PR 관리',300,600],
       ['데이터베이스','쿼리 실행',1220,180],['Figma','디자인 시안 참조',1220,390],['사내 API','커스텀 서버',1220,600]]
      .map(([t,s,x,y]) => `<div class="flowbox" style="position:absolute; left:${x-105+40}px; top:${y-45+110}px; width:230px;"><b>${t}</b><span>${s}</span></div>`).join('')}
    <div class="card" style="position:absolute; left:${760-140+40}px; top:${390-80+110}px; width:280px; height:160px;
         border-color:#D97757; text-align:center; display:flex; flex-direction:column; justify-content:center;">
      <div style="font-size:36px;" class="coral">✻</div>
      <h2 style="margin:6px 0 4px;">Claude Code</h2>
      <span style="font-size:15px; color:#8B8B93;">MCP 클라이언트</span>
    </div>
    <div style="position:absolute; bottom:0; width:1520px; text-align:center; font-size:19px; color:#8B8B93;">
      MCP(Model Context Protocol) 서버를 등록하면 Claude가 해당 도구를 직접 사용합니다 · <span class="mono">claude mcp add</span>
    </div>
  </div>`
});

// ── 12. ecosystem ─────────────────────────────────────────────────
IMAGES.push({
  name: 'diagram-ecosystem', w: 1600, h: 900,
  html: `${DIAG_CSS}
  <div class="stage">
    <h1 class="dt">어디서든 같은 Claude — <span class="coral">4가지 사용 환경</span></h1>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:28px;">
      ${[['⌨️','터미널 (CLI)','기본 환경 · 모든 기능','claude 명령으로 실행, 이 자료의 기준 환경'],
         ['🧩','IDE 확장','VS Code · JetBrains','에디터 안에서 diff 확인, 선택 영역을 맥락으로 전달'],
         ['🌐','웹 · 모바일','claude.ai/code','브라우저에서 클라우드 세션 실행, 이동 중에도 확인'],
         ['🔁','GitHub Actions','@claude 멘션','이슈·PR에서 멘션하면 자동으로 리뷰·수정 커밋']]
        .map(([e,t,s,d]) => `<div class="card"><h2>${e}&nbsp; ${t} <span style="font-size:17px; color:#D97757; font-weight:600;">${s}</span></h2>
          <div style="font-size:19px; color:#C9C7C1; line-height:1.7;">${d}</div></div>`).join('')}
    </div>
    <div style="text-align:center; margin-top:34px; font-size:19px; color:#8B8B93;">
      하나의 계정으로 어디서나 — 상황에 맞는 환경을 골라 쓰세요
    </div>
  </div>`
});

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  for (const img of IMAGES) {
    await page.setViewportSize({ width: img.w, height: img.h });
    await page.setContent(`<!doctype html><html><body>${img.html}</body></html>`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT, `${img.name}.png`) });
    console.log('✔', img.name);
  }
  await browser.close();
})();
