# -*- coding: utf-8 -*-
"""슬라이드 JPEG + 발표자 노트 → 단일 HTML 뷰어 생성"""
import base64, glob, json, html, re, importlib.util

spec = importlib.util.spec_from_file_location(
    'notes', '/tmp/claude-0/-home-user-class-picker/fe713ea4-98bf-55fc-9e5e-0097adb0f530/scratchpad/add_notes.py')
# add_notes.py를 import하면 저장까지 실행되므로 NOTES만 텍스트 파싱으로 추출
src = open('/tmp/claude-0/-home-user-class-picker/fe713ea4-98bf-55fc-9e5e-0097adb0f530/scratchpad/add_notes.py', encoding='utf-8').read()
notes_src = src.split('NOTES = [')[1].split(']\n\nprs')[0]
NOTES = re.findall(r'"""(.*?)"""', notes_src, re.S)
NOTES = [n.strip() for n in NOTES]
assert len(NOTES) == 38, len(NOTES)

TITLES = ['표지', '3단계 로드맵', '클로드 코드란?', '자동완성 vs 에이전트',
          '섹션 — 설치 & 첫 실행', '설치하기', '로그인과 요금', '첫 대화', '권한 시스템',
          '섹션 — Level 1', '코드베이스 질문', '파일 수정 요청', '슬래시 커맨드', '대화 제어',
          '라이브 데모 ①', 'Level 1 정리',
          '섹션 — Level 2', 'CLAUDE.md', 'Plan Mode', '권한 모드 3가지', 'Git 워크플로',
          '이미지 활용', '배포하기', '컨텍스트 관리', '라이브 데모 ②', 'Level 2 정리',
          '섹션 — Level 3', '커스텀 커맨드 & 스킬', '서브에이전트', 'MCP', 'Hooks',
          '어디서든 쓰기', 'Level 3 정리',
          '실전 팁 5가지', '안티패턴', '치트시트', '다음 단계 & 리소스', 'Q&A']
assert len(TITLES) == 38

imgs = sorted(glob.glob('/tmp/claude-0/-home-user-class-picker/fe713ea4-98bf-55fc-9e5e-0097adb0f530/scratchpad/slides/s-*.jpg'))
assert len(imgs) == 38, len(imgs)

slides = []
for i, p in enumerate(imgs):
    b64 = base64.b64encode(open(p, 'rb').read()).decode()
    slides.append({'img': f'data:image/jpeg;base64,{b64}', 'note': NOTES[i], 'title': TITLES[i]})

SECTIONS = [(0, '인트로'), (4, '설치'), (9, 'Level 1'), (16, 'Level 2'), (26, 'Level 3'), (33, '마무리')]

page = """<title>클로드 코드 온보딩 — 슬라이드 미리보기</title>
<style>
  :root {
    --bg:#17171B; --panel:#1E1E24; --line:#33333B; --txt:#ECECEA;
    --dim:#9B9B93; --coral:#D97757;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { height:100%; }
  body { background:var(--bg); color:var(--txt);
         font-family:'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif; }
  .top { display:flex; align-items:center; gap:14px; padding:14px 22px;
         border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .top .mark { color:var(--coral); font-size:20px; }
  .top h1 { font-size:16px; font-weight:700; }
  .top .cnt { margin-left:auto; color:var(--dim); font-size:14px; font-variant-numeric:tabular-nums; }
  .secs { display:flex; gap:6px; padding:10px 22px 0; flex-wrap:wrap; }
  .secs button { background:none; border:1px solid var(--line); color:var(--dim);
                 border-radius:99px; padding:4px 14px; font-size:13px; cursor:pointer;
                 font-family:inherit; }
  .secs button.on { border-color:var(--coral); color:var(--coral); }
  .secs button:focus-visible, .nav button:focus-visible { outline:2px solid var(--coral); outline-offset:2px; }
  main { max-width:1080px; margin:0 auto; padding:18px 22px 40px; }
  .frame { position:relative; border:1px solid var(--line); border-radius:12px; overflow:hidden;
           background:#000; }
  .frame img { display:block; width:100%; }
  .nav { display:flex; align-items:center; gap:10px; margin-top:14px; }
  .nav button { background:var(--panel); border:1px solid var(--line); color:var(--txt);
                border-radius:10px; padding:9px 20px; font-size:14px; cursor:pointer; font-family:inherit; }
  .nav button:hover { border-color:var(--coral); }
  .nav .t { font-size:15px; font-weight:700; }
  .nav .hint { margin-left:auto; color:var(--dim); font-size:12.5px; }
  .note { margin-top:16px; background:var(--panel); border:1px solid var(--line);
          border-radius:12px; padding:16px 20px; }
  .note .lbl { font-size:11.5px; letter-spacing:.12em; color:var(--coral); font-weight:700;
               margin-bottom:8px; }
  .note p { font-size:14.5px; line-height:1.8; color:#C9C7C1; white-space:pre-line; max-width:68ch; }
  .strip { display:grid; grid-template-columns:repeat(auto-fill,minmax(110px,1fr)); gap:8px;
           margin-top:22px; }
  .strip button { border:1.5px solid var(--line); border-radius:8px; overflow:hidden; padding:0;
                  cursor:pointer; background:#000; position:relative; }
  .strip button.on { border-color:var(--coral); }
  .strip img { display:block; width:100%; opacity:.75; }
  .strip button.on img, .strip button:hover img { opacity:1; }
  .strip .n { position:absolute; left:5px; bottom:4px; font-size:10.5px; color:var(--txt);
              background:rgba(23,23,27,.8); border-radius:5px; padding:1px 6px; }
  @media (prefers-reduced-motion:no-preference) { .frame img { transition:opacity .15s; } }
</style>
<div class="top">
  <span class="mark">✻</span>
  <h1>클로드 코드 온보딩 — 슬라이드 미리보기</h1>
  <span class="cnt"><span id="cur">1</span> / 38 · <span id="ttl"></span></span>
</div>
<div class="secs" id="secs"></div>
<main>
  <div class="frame"><img id="big" alt="슬라이드"></div>
  <div class="nav">
    <button id="prev">← 이전</button>
    <button id="next">다음 →</button>
    <span class="t" id="t2"></span>
    <span class="hint">키보드 ← → 로 넘길 수 있어요</span>
  </div>
  <div class="note"><div class="lbl">발표자 노트</div><p id="note"></p></div>
  <div class="strip" id="strip"></div>
</main>
<script>
const S = __SLIDES__;
const SECTIONS = __SECTIONS__;
let cur = 0;
const big = document.getElementById('big'), note = document.getElementById('note'),
      curEl = document.getElementById('cur'), ttl = document.getElementById('ttl'),
      t2 = document.getElementById('t2'), strip = document.getElementById('strip'),
      secs = document.getElementById('secs');
S.forEach((s, i) => {
  const b = document.createElement('button');
  b.innerHTML = `<img src="${s.img}" alt=""><span class="n">${i+1}</span>`;
  b.title = s.title;
  b.onclick = () => go(i);
  strip.appendChild(b);
});
SECTIONS.forEach(([idx, name]) => {
  const b = document.createElement('button');
  b.textContent = name;
  b.onclick = () => go(idx);
  secs.appendChild(b);
});
function go(i) {
  cur = (i + S.length) % S.length;
  big.src = S[cur].img;
  note.textContent = S[cur].note;
  curEl.textContent = cur + 1;
  ttl.textContent = t2.textContent = S[cur].title;
  [...strip.children].forEach((b, j) => b.classList.toggle('on', j === cur));
  let active = 0;
  SECTIONS.forEach(([idx], k) => { if (cur >= idx) active = k; });
  [...secs.children].forEach((b, k) => b.classList.toggle('on', k === active));
}
document.getElementById('prev').onclick = () => go(cur - 1);
document.getElementById('next').onclick = () => go(cur + 1);
addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') go(cur - 1);
  if (e.key === 'ArrowRight') go(cur + 1);
});
go(0);
</script>
"""
page = page.replace('__SLIDES__', json.dumps(slides, ensure_ascii=False)) \
           .replace('__SECTIONS__', json.dumps(SECTIONS, ensure_ascii=False))
out = '/tmp/claude-0/-home-user-class-picker/fe713ea4-98bf-55fc-9e5e-0097adb0f530/scratchpad/deck-preview.html'
open(out, 'w', encoding='utf-8').write(page)
print('written', out, len(page) // 1024, 'KB')
