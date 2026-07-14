// EP1~EP8 유튜브 썸네일 생성 (1280x720)
const { chromium } = require('playwright');
const OUT = '/home/user/class-picker/docs/onboarding/assets';

const EPISODES = [
  ['EP1', '클로드 코드\n5분 만에 시작하기', '설치 → 로그인 → 첫 수정', '필수', '$ npm install -g @anthropic-ai/claude-code'],
  ['EP2', '내 프로젝트\n이해시키기', 'CLAUDE.md · /init', '필수', '> 이 프로젝트 구조를 설명해줘'],
  ['EP3', '안전하게\n코드 수정하기', 'Plan Mode · 되돌리기', '필수', '⏸ plan mode on  ·  Esc Esc'],
  ['EP4', 'Git 작업\n맡기기', '커밋 → 브랜치 → PR', '필수', '> 커밋하고 PR 올려줘'],
  ['EP5', '실전! 기능 하나\n처음부터 끝까지', '질문→계획→구현→검증→PR', '필수', '5단계 실전 리듬'],
  ['EP6', '반복 작업\n자동화', '커스텀 커맨드 · 스킬 · Hooks', '선택', '.claude/commands/review.md'],
  ['EP7', '외부 도구 연결\nMCP', 'Slack · Notion · GitHub · DB', '선택', '$ claude mcp add'],
  ['EP8', '어디서든 쓰기', 'IDE · 웹 · GitHub Actions', '선택', '@claude 리뷰 반영해줘'],
];

const page_html = ([ep, title, sub, badge, code]) => `
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden; position:relative;
         background:radial-gradient(1000px 700px at 85% -10%, #33231D 0%, #17171B 55%);
         font-family:'Noto Sans CJK KR',sans-serif; color:#ECECEA; }
  .grid { position:absolute; inset:0;
          background-image:linear-gradient(#22222900 31px, #22232B 32px),
                           linear-gradient(90deg, #22222900 31px, #22232B 32px);
          background-size:32px 32px; opacity:.35; }
  .wrap { position:absolute; inset:0; padding:64px 70px; display:flex; flex-direction:column; }
  .top { display:flex; align-items:center; gap:18px; }
  .ep { font-size:44px; font-weight:900; color:#D97757; letter-spacing:1px; }
  .badge { font-size:22px; font-weight:700; padding:6px 20px; border-radius:99px;
           border:2px solid ${'BADGE' === 'x' ? '' : ''}#D97757; color:#D97757; }
  .badge.opt { border-color:#8B8B93; color:#8B8B93; }
  h1 { font-size:88px; font-weight:900; line-height:1.18; margin-top:34px; white-space:pre-line;
       text-shadow:0 6px 30px rgba(0,0,0,.5); }
  .sub { font-size:32px; color:#C9C7C1; margin-top:26px; font-weight:500; }
  .code { margin-top:auto; display:inline-flex; align-items:center; gap:16px;
          background:#1E1E24; border:2px solid #33333B; border-radius:14px;
          padding:18px 28px; font-family:'Noto Sans Mono CJK KR',monospace;
          font-size:26px; color:#8FBC6F; align-self:flex-start; max-width:900px; }
  .dots { display:flex; gap:8px; }
  .dots i { width:14px; height:14px; border-radius:50%; display:block; }
  .series { position:absolute; right:70px; bottom:56px; font-size:24px; color:#8B8B93; font-weight:600; }
  .mark { position:absolute; right:64px; top:52px; font-size:64px; color:#D97757; opacity:.9; }
</style>
<div class="grid"></div>
<div class="wrap">
  <div class="top">
    <span class="ep">${ep}</span>
    <span class="badge ${badge === '선택' ? 'opt' : ''}">${badge} 코스</span>
  </div>
  <h1>${title}</h1>
  <div class="sub">${sub}</div>
  <div class="code">
    <span class="dots"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></span>
    ${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </div>
</div>
<div class="mark">✻</div>
<div class="series">클로드 코드 온보딩 시리즈</div>`;

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ deviceScaleFactor: 1.5 });
  await page.setViewportSize({ width: 1280, height: 720 });
  for (let i = 0; i < EPISODES.length; i++) {
    await page.setContent(`<!doctype html><html><body>${page_html(EPISODES[i])}</body></html>`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/thumb-ep${i + 1}.png` });
    console.log('✔ thumb-ep' + (i + 1));
  }
  await browser.close();
})();
