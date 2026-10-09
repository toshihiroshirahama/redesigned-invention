/* =========================================================
 * 設定：ここを書き換えるだけで料金・連絡先を更新できます
 * ========================================================= */
const CONFIG = {
  // フォーム送信先。Formspree などのURLを入れると直接送信。空なら メールソフト起動（mailto）
  formEndpoint: "",
  email: "info@example.com",
};

// 修理メニュー（料金は税込工賃・部品代別。days は [最短, 最長] 日数）
// symptom: true のものは「症状から探す」にも表示されます
const MENU = {
  guitar: {
    name: "エレキギター",
    items: [
      { label: "弦高が高い・弾きにくい", min: 5500, max: 8800, days: [1, 3], symptom: true, cause: "ネックの反りやブリッジ・ナットの高さが原因のことが多く、総合調整で大きく改善します。" },
      { label: "音がビビる・詰まる", min: 5500, max: 16500, days: [1, 10], symptom: true, cause: "ネックの反り、フレットの浮き・減りが主な原因です。調整で直らない場合はすり合わせを行います。" },
      { label: "ガリ・音が途切れる", min: 3300, max: 6600, days: [1, 3], symptom: true, cause: "ポット・スイッチ・ジャックの接触不良や配線の断線が考えられます。" },
      { label: "音が出ない", min: 3300, max: 8800, days: [1, 5], symptom: true, cause: "ジャック、配線、ピックアップの断線などを順に点検して特定します。" },
      { label: "チューニングが合わない", min: 2200, max: 8800, days: [1, 3], symptom: true, cause: "オクターブ調整のズレ、ナットの溝、ペグの不良などが原因です。" },
      { label: "フレットが減った", min: 16500, max: 44000, days: [7, 21], symptom: true, cause: "減り具合によって、すり合わせ（部分修正）かリフレット（交換）をご提案します。" },
      { label: "ネック折れ・割れ", min: 22000, max: 55000, days: [14, 30], symptom: true, cause: "接着・補強で強度を回復。仕上げ（塗装）の範囲で料金が変わります。" },
      { label: "ピックアップ交換したい", min: 4400, max: 8800, days: [1, 5] },
      { label: "ナット交換", min: 8800, max: 13200, days: [3, 7] },
    ],
  },
  acoustic: {
    name: "アコースティックギター",
    items: [
      { label: "弦高が高い・弾きにくい", min: 5500, max: 13200, days: [1, 7], cause: "サドル調整・ネック調整で対応。改善しない場合はネックリセットを検討します。" },
      { label: "ブリッジが浮いている", min: 16500, max: 27500, days: [7, 14], cause: "湿度変化による剥がれ。早めの再接着で表板の割れを防げます。" },
      { label: "ボディの割れ", min: 11000, max: 33000, days: [7, 21], cause: "割れの長さ・場所によって接着とクリート補強を行います。" },
      { label: "ピックアップ取り付け", min: 8800, max: 16500, days: [3, 7] },
      { label: "フレットが減った", min: 16500, max: 49500, days: [7, 21] },
    ],
  },
  bass: {
    name: "ベース",
    items: [
      { label: "弦高が高い・弾きにくい", min: 5500, max: 8800, days: [1, 3], symptom: true, cause: "長いネックは反りやすく、季節ごとの調整がおすすめです。" },
      { label: "音がビビる・詰まる", min: 5500, max: 16500, days: [1, 10], cause: "ネックの反り、フレットの浮き・減りが主な原因です。" },
      { label: "アクティブ回路の不調・ノイズ", min: 4400, max: 11000, days: [2, 7], symptom: true, cause: "電池ボックスの接触不良、プリアンプの故障、配線不良などを点検します。" },
      { label: "ガリ・音が途切れる", min: 3300, max: 6600, days: [1, 3] },
      { label: "音が出ない", min: 3300, max: 8800, days: [1, 5] },
      { label: "フレットが減った", min: 18700, max: 49500, days: [7, 21] },
    ],
  },
  effector: {
    name: "エフェクター",
    items: [
      { label: "電源が入らない・LEDが点かない", min: 3300, max: 6600, days: [2, 7], symptom: true, cause: "DCジャックの破損、逆電圧による部品焼損、電池スナップの断線が多い原因です。" },
      { label: "踏むと音が途切れる・切り替わらない", min: 3300, max: 5500, days: [2, 5], symptom: true, cause: "フットスイッチの劣化・ハンダ割れがほとんどです。" },
      { label: "ツマミを回すとガリガリ鳴る", min: 3300, max: 5500, days: [2, 5], symptom: true, cause: "ポットの劣化・汚れ。洗浄または交換で解消します。" },
      { label: "エフェクトがかからない・音が小さい", min: 5500, max: 11000, days: [3, 10], symptom: true, cause: "回路内部の部品故障。基板を測定して不良箇所を特定します。" },
      { label: "自作キットが動かない", min: 4400, max: 8800, days: [3, 10], symptom: true, cause: "ハンダ不良・部品の向き違い・配線ミスなど。原因をレポートでお伝えします。" },
      { label: "トゥルーバイパス化したい", min: 6600, max: 9900, days: [3, 7] },
      { label: "モディファイしたい", min: 8800, max: 22000, days: [5, 14] },
    ],
  },
  ampTube: {
    name: "真空管アンプ",
    items: [
      { label: "音が出ない・電源が入らない", min: 8800, max: 33000, days: [7, 21], symptom: true, cause: "ヒューズ・真空管・電源部の故障など。高電圧部のため専門的な診断が必要です。" },
      { label: "ノイズ・ハム・ポップ音", min: 5500, max: 22000, days: [5, 14], symptom: true, cause: "真空管の劣化、電解コンデンサの劣化、アースの不良が代表的な原因です。" },
      { label: "ツマミのガリ・音が途切れる", min: 5500, max: 11000, days: [3, 10], symptom: true, cause: "ポット・ジャック・真空管ソケットの接点不良。洗浄や交換で改善します。" },
      { label: "音が小さい・歪みが変", min: 6600, max: 22000, days: [5, 14], symptom: true, cause: "パワー管の劣化やバイアスのズレ。交換とバイアス調整で本来の音に戻ります。" },
      { label: "真空管交換・バイアス調整", min: 6600, max: 11000, days: [3, 7] },
      { label: "ヴィンテージアンプ総合メンテ", min: 33000, max: 66000, days: [14, 30] },
    ],
  },
  ampSolid: {
    name: "トランジスタ／デジタルアンプ",
    items: [
      { label: "音が出ない・電源が入らない", min: 8800, max: 22000, days: [5, 14], symptom: true, cause: "電源回路やパワー部の故障。基板修理で対応可能なケースが多いです。" },
      { label: "ガリ・ノイズ", min: 5500, max: 11000, days: [3, 10], cause: "ポット・ジャックの劣化や接触不良です。" },
      { label: "スピーカーが鳴らない・ビリつく", min: 5500, max: 16500, days: [3, 14], cause: "スピーカーのコーン破れ・ボイスコイル断線など。修理または交換をご提案します。" },
    ],
  },
};

const SYMPTOM_TABS = {
  guitar: ["guitar", "bass"],
  effector: ["effector"],
  amp: ["ampTube", "ampSolid"],
};

const yen = (n) => "¥" + n.toLocaleString("ja-JP");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Nav ---------- */
const toggle = $(".nav-toggle");
const navList = $("#nav-list");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", open);
  navList.classList.toggle("open", open);
});
navList.addEventListener("click", (e) => {
  if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); navList.classList.remove("open"); }
});

/* ---------- Symptoms ---------- */
function renderSymptoms(tab) {
  const grid = $("#symptom-grid");
  grid.innerHTML = "";
  SYMPTOM_TABS[tab].forEach((key) => {
    MENU[key].items.filter((i) => i.symptom).forEach((item) => {
      const d = document.createElement("details");
      d.className = "symptom";
      d.innerHTML = `
        <summary>${item.label}<br><small class="muted">${MENU[key].name}</small></summary>
        <div class="symptom-body">
          <p>${item.cause}</p>
          <p class="s-price">目安 <b>${yen(item.min)}〜${yen(item.max)}</b>／${item.days[0]}〜${item.days[1]}日</p>
          <a href="#estimate" data-inst="${key}" data-item="${item.label}">この症状で料金を試算する →</a>
        </div>`;
      grid.appendChild(d);
    });
  });
}
$$("[data-tab]").forEach((b) => b.addEventListener("click", () => {
  $$("[data-tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
  renderSymptoms(b.dataset.tab);
}));
$("#symptom-grid").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-inst]");
  if (!a) return;
  selectInstrument(a.dataset.inst, [a.dataset.item]);
});
renderSymptoms("guitar");

/* ---------- Simulator ---------- */
const state = { inst: null, items: new Set() };
const instWrap = $("#sim-instrument");
const itemWrap = $("#sim-items");

Object.entries(MENU).forEach(([key, v]) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "chip"; b.textContent = v.name; b.dataset.key = key;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => selectInstrument(key));
  instWrap.appendChild(b);
});

function selectInstrument(key, preselect = []) {
  state.inst = key;
  state.items = new Set(preselect);
  $$(".chip", instWrap).forEach((c) => c.setAttribute("aria-pressed", c.dataset.key === key));
  itemWrap.innerHTML = "";
  MENU[key].items.forEach((item) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = item.label;
    b.setAttribute("aria-pressed", state.items.has(item.label));
    b.addEventListener("click", () => {
      state.items.has(item.label) ? state.items.delete(item.label) : state.items.add(item.label);
      b.setAttribute("aria-pressed", state.items.has(item.label));
      updateResult();
    });
    itemWrap.appendChild(b);
  });
  updateResult();
}

function updateResult() {
  const picked = state.inst ? MENU[state.inst].items.filter((i) => state.items.has(i.label)) : [];
  const res = $("#sim-result");
  if (!picked.length) {
    $("#sim-min").textContent = "—"; $("#sim-max").textContent = "—"; $("#sim-days").textContent = "—";
    return;
  }
  const min = picked.reduce((s, i) => s + i.min, 0);
  const max = picked.reduce((s, i) => s + i.max, 0);
  const dMin = Math.max(...picked.map((i) => i.days[0]));
  const dMax = Math.max(...picked.map((i) => i.days[1]));
  $("#sim-min").textContent = yen(min);
  $("#sim-max").textContent = yen(max);
  $("#sim-days").textContent = dMin === dMax ? `${dMin}日` : `${dMin}〜${dMax}日`;
  res.classList.remove("flash"); void res.offsetWidth; res.classList.add("flash");
}

// 試算内容をフォームに引き継ぐ
$("#sim-to-form").addEventListener("click", () => {
  if (!state.inst || !state.items.size) return;
  const msg = $("#f-msg");
  const text = `【料金シミュレーター】${MENU[state.inst].name}：${[...state.items].join("、")}（目安 ${$("#sim-min").textContent}〜${$("#sim-max").textContent}）\n\n`;
  if (!msg.value.startsWith("【料金シミュレーター】")) msg.value = text + msg.value;
  if (!$("#f-gear").value) $("#f-gear").value = MENU[state.inst].name;
});


/* ---------- Self check ---------- */
const CHECKS = {
  guitar: [
    ["別のシールドケーブルで試した", "ケーブルの断線は「音が出ない・途切れる」の原因で一番多いものです。"],
    ["アンプ側・ボリュームのツマミを確認した", "ギター本体のボリュームが0になっていることもよくあります。"],
    ["アクティブ回路なら電池を新品に替えた", "電池が弱ると歪む・音が小さくなるなどの症状が出ます。"],
    ["弦を新しく張り替えた", "古い弦はチューニングが合わない・音がこもる原因になります。"],
  ],
  effector: [
    ["電池・アダプターを替えて試した", "電圧が足りないと動作が不安定になります。センターマイナスか、電圧が合っているかも確認を。"],
    ["パッチケーブルを交換した", "短いケーブルほど断線に気づきにくいものです。"],
    ["そのエフェクター単体でアンプにつないだ", "ボード上の別のエフェクターが原因のこともあります。"],
    ["ツマミ・スイッチを何度か動かした", "長く使っていないと接点が汚れているだけのことがあります。"],
  ],
  amp: [
    ["別のギター・ケーブルで試した", "アンプではなく楽器やケーブル側が原因のこともあります。"],
    ["スタンバイスイッチ・ボリュームを確認した", "真空管アンプはスタンバイをONにしないと音が出ません。"],
    ["別のコンセントにつないだ", "電源タップやノイズの多い機器の近くが原因の場合もあります。"],
    ["エフェクトループ・ヘッドホン端子に何も挿していない", "挿しっぱなしだとスピーカーから音が出ない機種があります。"],
  ],
};
function renderChecks(key) {
  const ul = $("#checklist");
  ul.innerHTML = CHECKS[key].map(([t, d], i) =>
    `<li><label><input type="checkbox" data-i="${i}"><span>${t}<small>${d}</small></span></label></li>`).join("");
  $("#check-result").innerHTML = "";
}
$("#checklist").addEventListener("change", () => {
  const boxes = $$("#checklist input");
  const done = boxes.filter((b) => b.checked).length;
  $("#check-result").innerHTML = done === boxes.length
    ? `<p>すべて試しても直らない場合は、機材本体の不具合の可能性が高いです。</p><a class="btn btn-primary" href="#estimate">料金の目安を調べる</a>`
    : `<p class="muted">${done} / ${boxes.length} 項目チェック済み</p>`;
});
$$("[data-check]").forEach((b) => b.addEventListener("click", () => {
  $$("[data-check]").forEach((x) => x.setAttribute("aria-selected", x === b));
  renderChecks(b.dataset.check);
}));
renderChecks("guitar");

/* ---------- 修理前後の音（assets/audio/case1-before.mp3 などを置くと再生されます） ---------- */
const player = new Audio();
let playingBtn = null;
const stopPlaying = () => { if (playingBtn) playingBtn.classList.remove("playing"); playingBtn = null; };
player.addEventListener("ended", stopPlaying);
$$(".listen button").forEach((btn) => btn.addEventListener("click", () => {
  if (playingBtn === btn) { player.pause(); stopPlaying(); return; }
  const wrap = btn.closest(".listen");
  stopPlaying();
  player.src = `assets/audio/${wrap.dataset.case}-${btn.dataset.ab}.mp3`;
  player.play().then(() => { playingBtn = btn; btn.classList.add("playing"); }).catch(() => {
    if (!$(".listen-note", wrap)) wrap.insertAdjacentHTML("beforeend", '<p class="listen-note">音源は準備中です。</p>');
  });
}));

/* ---------- Flow switch ---------- */
$$(".flow-switch button").forEach((b) => b.addEventListener("click", () => {
  $$(".flow-switch button").forEach((x) => x.setAttribute("aria-selected", x === b));
  $$("[data-flow-panel]").forEach((p) => (p.hidden = p.dataset.flowPanel !== b.dataset.flow));
}));

/* ---------- Contact form ---------- */
const form = $("#contact-form");
const status = $("#form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ok = true;
  $$("[required]", form).forEach((f) => {
    const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) { status.className = "form-status err"; status.textContent = "必須項目を入力してください。"; return; }

  const data = Object.fromEntries(new FormData(form));
  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!r.ok) throw new Error();
      form.reset();
      status.className = "form-status ok";
      status.textContent = "送信しました。折り返しご連絡いたします。";
    } catch {
      status.className = "form-status err";
      status.textContent = "送信に失敗しました。お手数ですがLINEまたはお電話でご連絡ください。";
    }
    return;
  }
  const body = `お名前：${data.name}\nメール：${data.email}\n電話：${data.tel}\nご依頼方法：${data.method}\n機材：${data.gear}\n\n${data.message}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("修理のお見積もり依頼")}&body=${encodeURIComponent(body)}`;
  status.className = "form-status ok";
  status.textContent = "メールソフトが開きます。内容を確認して送信してください。";
});

/* ---------- FAQ 構造化データ（Google検索のFAQ表示用） ---------- */
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: $$(".faq details").map((d) => ({
    "@type": "Question",
    name: $("summary", d).textContent.trim(),
    acceptedAnswer: { "@type": "Answer", text: $("p", d).textContent.trim() },
  })),
};
const ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify(faq);
document.head.appendChild(ld);

/* ---------- Reveal on scroll ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".promise-list li, .unique-card, .price-card, .case, .flow-list li, .worry-list li").forEach((el) => {
    el.classList.add("reveal"); io.observe(el);
  });
}

$("#year").textContent = new Date().getFullYear();
