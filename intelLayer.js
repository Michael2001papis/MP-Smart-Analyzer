import { normalize } from "./rules.js";

const INPUT_TYPE = {
  he: {
    qa: "צ׳ק־ליסט / QA",
    bug_report: "באגים / יציבות",
    ui_audit: "ממשק / UX",
    status_report: "סטטוס / מסירה",
    free_text: "כללי / לא מסווג",
    invalid_input: "קלט לא תקף לניתוח",
  },
  en: {
    qa: "Checklist / QA",
    bug_report: "Bugs / stability",
    ui_audit: "UI / UX",
    status_report: "Status / delivery",
    free_text: "General / unclassified",
    invalid_input: "Not a valid analysis input",
  },
};

const SIGNAL_LABEL = {
  he: {
    frontend: "חזית / SPA",
    backend: "Backend / API",
    uiux: "ממשק וחוויית משתמש",
    stability: "יציבות ושגיאות",
    performance: "ביצועים",
    client: "מסירה ולקוח",
    deployment: "פריסה ותשתית",
    fullstack: "Full‑stack",
    security: "אבטחה",
    quality: "איכות ובדיקות",
    content: "תוכן / CMS",
    payments: "תשלומים",
    i18n: "שפות ולוקליזציה",
    monorepo: "מונורפו / כלים",
    integrations: "אינטגרציות / הודעות",
    observability: "ניטור ולוגים",
  },
  en: {
    frontend: "Frontend / SPA",
    backend: "Backend / API",
    uiux: "UI / UX",
    stability: "Stability & errors",
    performance: "Performance",
    client: "Delivery & client",
    deployment: "Deploy & infra",
    fullstack: "Full‑stack",
    security: "Security",
    quality: "Quality & testing",
    content: "Content / CMS",
    payments: "Payments",
    i18n: "i18n / locale",
    monorepo: "Monorepo / tooling",
    integrations: "Integrations / messaging",
    observability: "Observability",
  },
};

const FLAVOR_LABEL = {
  he: { technical: "דוח טכני (דגש אבחון)", business: "דוח עסקי־מסירה (דגש מסקנות)", general: "דוח כללי (דגש הכוונה)" },
  en: { technical: "Technical report (diagnosis‑leaning)", business: "Business / delivery (conclusions‑leaning)", general: "General (guidance‑leaning)" },
};

const OUT_TYPE_LABEL = {
  he: {
    instructions: "הוראות ביצוע",
    summary: "סיכום",
    client_report: "דוח ללקוח",
    checklist: "צ׳ק־ליסט",
  },
  en: {
    instructions: "Instructions",
    summary: "Summary",
    client_report: "Client report",
    checklist: "Checklist",
  },
};

const T = {
  he: {
    title: "## קריאת מערכת (שכבת הבנה)",
    pipeline: "**מסלול:** נקלט קלט · נסרקה מבנה · זוהתה כוונה · הורכב פלט · הושלם",
    introYouth:
      "לפני הפלט המלא, המערכת מסכמת מה זיהתה מהדוח — בלי להחליף את המנוע הקיים, רק שכבת פרשנות ברורה.",
    introPro: "סיכום קריאת מערכת לפני הפלט.",
    l1: "### 1) סוג הקלט",
    l2: "### 2) מוקדי בעיה / חיכוך",
    l3: "### 3) רמת ביטחון בתאום התבנית",
    l4: "### 4) כיוון מומלץ",
    l5: "### 5) פלט מסודר",
    l5Body: "המשך המסמך למטה הוא הפלט המלא מהמנוע (תבנית + כללים).",
    l5BodyMinimalInternal:
      "במצב **מבט פנימי** החלון הראשי מציג מעטפת חיצונית בלבד. גוף הפלט המלא מהמנוע (פנימי) מופיע בסוף בלוק זה.",
    fullEngineHeader: "### גוף מלא מהמנוע (פנימי)",
    reasoning: "### מסלול החלטה (תמציתי)",
    ctx: "**הקשר שזוהה:**",
    sig: "**אותות עיקריים:**",
    dir: "**למה הכיוון הזה:**",
    noneSignals: "לא אותרו אותות חזקים מספיק — לכן נשמר כיוון כללי.",
    noIssues: "לא נמצאו שורות בעיה מפורשות; מסתמכים על אותות כלליים מהטקסט.",
    confLine: (tier, pct) => `**${tier}** (${pct}% התאמה לתבנית שנבחרה)`,
    flavorLine: "**אופי הדוח:**",
    outputShape: "**צורת פלט שנבחרה:**",
    rejectedL2: "לא נחלצו מוקדי בעיה אמינים מהקלט.",
    rejectedL4: "הזן/י דוח מצב עם מקטעים, טכנולוגיות ורשימת בעיות — ואז הרץ שוב ניתוח.",
    rejectedWhy: "הקלט נחסם בשלב בקרת איכות (כללי, לא מודל שפה חיצוני).",
    qualityHint: {
      too_short: "הטקסט קצר מדי.",
      too_few_letters: "חסר תוכן אלפביתי משמעותי.",
      noise: "נראה כמו רעש / תווים לא קריאים.",
      repetitive: "חזרתיות חשודה בטקסט.",
      repetitive_words: "מילים חוזרות מדי בלי הקשר דוח.",
      too_few_words: "מעט מדי מילים לניתוח.",
      no_clear_signal: "אין אות ברור של דוח מצב (טכנולוגיות / בעיות / מבנה).",
      ok: "",
    },
  },
  en: {
    title: "## System read (interpretation layer)",
    pipeline:
      "**Pipeline:** Input received · Structure scanned · Intent mapped · Output composed · Completed",
    introYouth:
      "Before the main document, here is what the engine inferred from your report — interpretation on top of the existing rules engine, not a replacement.",
    introPro: "Pre‑output system read.",
    l1: "### 1) Input type",
    l2: "### 2) Problem focal points",
    l3: "### 3) Template match confidence",
    l4: "### 4) Recommended direction",
    l5: "### 5) Structured output",
    l5Body: "The section below is the full engine output (template + rules).",
    l5BodyMinimalInternal:
      "In **Internal** lens the main panel shows a minimal external shell only. The full engine body (internal) is appended at the end of this block.",
    fullEngineHeader: "### Full engine body (internal)",
    reasoning: "### Decision trace (concise)",
    ctx: "**Detected context:**",
    sig: "**Main signals:**",
    dir: "**Why this direction:**",
    noneSignals: "No strong signals — staying with a general path.",
    noIssues: "No explicit issue bullets found; relying on broader cues.",
    confLine: (tier, pct) => `**${tier}** (${pct}% fit to the selected template)`,
    flavorLine: "**Report flavor:**",
    outputShape: "**Output shape:**",
    rejectedL2: "No reliable problem focal points from this input.",
    rejectedL4: "Paste a status report with sections, tech names, and bullet issues — then run analysis again.",
    rejectedWhy: "Input was stopped by local quality rules (deterministic, not a hosted LLM).",
    qualityHint: {
      too_short: "Text is too short.",
      too_few_letters: "Not enough readable letters.",
      noise: "Looks like noise / non‑readable characters.",
      repetitive: "Suspicious repetition.",
      repetitive_words: "Too few distinct words for a report.",
      too_few_words: "Too few words to analyze.",
      no_clear_signal: "No clear status‑report signal (tech / issues / structure).",
      ok: "",
    },
  },
};

function includesAny(hay, needles) {
  const h = String(hay || "");
  return needles.some((n) => h.includes(n));
}

export function getInputTypeLabel(inputType, lang) {
  const row = INPUT_TYPE[lang] || INPUT_TYPE.he;
  return row[inputType] || row.free_text;
}

export function classifyReportFlavor(norm, signals, facts) {
  const sig = new Set(signals || []);
  const n = String(norm || "");
  const techSignals = [
    "frontend",
    "backend",
    "stability",
    "performance",
    "uiux",
    "deployment",
    "security",
    "quality",
    "fullstack",
    "observability",
    "integrations",
  ];
  let tech = 0;
  for (const s of techSignals) {
    if (sig.has(s)) tech += 1;
  }
  let biz = sig.has("client") ? 2 : 0;
  if (includesAny(n, ["revenue", "roi", "kpi", "stakeholder", "executive", "business", "sales", "go to market"])) biz += 1;
  if (includesAny(n, ["לקוח", "הנהלה", "עסקי", "מכירות", "הכנסות"])) biz += 1;
  if (tech >= 2) return "technical";
  if (biz >= 2 || (sig.has("client") && tech <= 1)) return "business";
  return "general";
}

function labelSignals(signals, lang, max = 4) {
  const map = SIGNAL_LABEL[lang] || SIGNAL_LABEL.en;
  const out = [];
  for (const s of signals || []) {
    out.push(map[s] || s);
    if (out.length >= max) break;
  }
  return out;
}

/** Localized labels for UI signal chips (Output panel). */
export function getSignalDisplayLabels(signals, lang, max = 14) {
  const L = lang === "en" ? "en" : "he";
  return labelSignals(signals, L, max);
}

function confTier(confidence, lang) {
  const c = typeof confidence === "number" ? confidence : 0;
  const pct = Math.round(c * 100);
  if (lang === "en") {
    const tier = c >= 0.75 ? "High" : c >= 0.5 ? "Medium" : "Low";
    return { tier, pct };
  }
  const tier = c >= 0.75 ? "גבוהה" : c >= 0.5 ? "בינונית" : "נמוכה";
  return { tier, pct };
}

function pickPriorityLine(decision, lang) {
  const p = decision?.priorities;
  if (!p) return null;
  const pick = (item) => (lang === "en" ? item?.en : item?.he) || item?.en || item?.he;
  if (p.critical?.[0]) return pick(p.critical[0]);
  if (p.important?.[0]) return pick(p.important[0]);
  if (p.later?.[0]) return pick(p.later[0]);
  return null;
}

function templateWhy(templateKey, flavor, lang, pro) {
  const en = {
    stability_fix: "Stability signals dominate — prioritize reproduction, logs, and hardening.",
    performance_fix: "Performance cues — baseline metrics first, then targeted fixes.",
    ui_ux_fix: "UI/UX weight — align layout, tokens, and responsive behavior.",
    backend_api: "Backend/API weight — contracts, data paths, and error surfaces.",
    client_report: "Delivery/client context — tighten narrative for stakeholders.",
    final_qa: "QA/checklist posture — verification steps before release.",
    spa_upgrade: "Frontend modernization track — incremental upgrades with safety rails.",
    fullstack_polish: "Cross‑stack polish — connect FE/BE/deploy concerns.",
    general: "General synthesis — balanced priorities from mixed signals.",
    invalid_input: "No template fit — input did not pass local gates.",
  };
  const he = {
    stability_fix: "אותות יציבות — קודם לשחזר, לאסוף לוגים, ולסגור שבירות קריטיות.",
    performance_fix: "אותות ביצועים — קו מדידה ואז צמצום צווארי בקבוק.",
    ui_ux_fix: "משקל ממשק — פריסה, עקביות רכיבים ורספונסיביות.",
    backend_api: "משקל Backend/API — חוזים, נתונים וטיפול בשגיאות.",
    client_report: "הקשר מסירה — ניסוח ברור לבעלי עניין.",
    final_qa: "מצב QA — בדיקות וצ׳ק־ליסט לפני שחרור.",
    spa_upgrade: "מסלול שדרוג חזית — שדרוגים הדרגתיים עם בטיחות.",
    fullstack_polish: "ליטוש Full‑stack — חיבור חזית־שרת־פריסה.",
    general: "סינתזה כללית — איזון בין אותות מעורבים.",
    invalid_input: "אין התאמת תבנית — הקלט לא עבר שערים מקומיים.",
  };
  const map = lang === "en" ? en : he;
  let line = map[templateKey] || map.general;
  if (flavor === "technical" && !pro) {
    line =
      lang === "en"
        ? `${line} (Technical report → deeper diagnosis cues in the main output.)`
        : `${line} (דוח טכני → דגש אבחון בפלט הראשי.)`;
  }
  if (flavor === "business" && !pro) {
    line =
      lang === "en"
        ? `${line} (Business/delivery tone → conclusions & handover framing.)`
        : `${line} (דוח עסקי־מסירה → מסקנות ומסגור מסירה.)`;
  }
  if (flavor === "general" && !pro) {
    line =
      lang === "en"
        ? `${line} (General input → guidance‑first structure.)`
        : `${line} (דוח כללי → הכוונה וצעדים ראשונים.)`;
  }
  if (pro) return line.split("(")[0].trim();
  return line;
}

const SHELL = {
  he: {
    title: "## מעטפת חיצונית (ממוזערת)",
    intro:
      "מסמך קצר לשיתוף חיצוני. ההיגיון המלא, רשימת הכללים והטקסט המלא מהמנוע נמצאים ב־**System Intelligence** (בלוק זה).",
    direction: "כיוון שנבחר",
    firstStep: "צעד מומלץ ראשון",
    signals: "אותות מרכזיים",
    moreInIntel: "לצעדים נוספים ולגרסה הפנימית המלאה — גלול בבלוק System Intelligence.",
  },
  en: {
    title: "## External shell (minimal)",
    intro:
      "Short outward-facing layer. Full reasoning, matched rules, and the complete engine document are in **System Intelligence** (this block).",
    direction: "Selected track",
    firstStep: "Recommended first step",
    signals: "Key signals",
    moreInIntel: "For additional steps and the full internal document — scroll within System Intelligence.",
  },
};

/**
 * Minimal markdown for the main output panel when "Internal" lens is active.
 * @param {object} res - analyze result (must include templateTitle, confidence, decision, analysis)
 * @param {string} uiLang - UI language "he"|"en"
 */
export function buildMinimalExternalMarkdown(res, uiLang) {
  const L = uiLang === "en" ? "en" : "he";
  const shell = SHELL[L];
  const outLang = res.outputLang === "en" ? "en" : "he";
  const lines = [];
  lines.push(shell.title);
  lines.push("");
  lines.push(shell.intro);
  lines.push("");
  const { tier, pct } = confTier(res.confidence, outLang);
  const confBit = outLang === "en" ? `${tier} · ${pct}% fit` : `${tier} · ${pct}% התאמה`;
  lines.push(`- **${shell.direction}:** ${res.templateTitle || "—"} (${confBit})`);
  const pri = pickPriorityLine(res.decision, outLang);
  if (pri) lines.push(`- **${shell.firstStep}:** ${pri}`);
  const sigs = labelSignals(res.analysis?.signals || [], outLang, 6);
  if (sigs.length) {
    lines.push(`- **${shell.signals}:** ${sigs.join(outLang === "en" ? "; " : " · ")}`);
  }
  lines.push("");
  lines.push(shell.moreInIntel);
  return lines.join("\n");
}

/**
 * Deterministic "simulated intelligence" brief on top of rules output.
 * @param {object} res - computeResponse result
 * @param {string} reportText - raw user input
 * @param {{ experienceMode?: 'youth'|'pro', appendFullEngineOutput?: boolean }} opts
 */
export function buildIntelBriefMarkdown(res, reportText, opts = {}) {
  const lang = res.outputLang === "en" ? "en" : "he";
  const t = T[lang];
  const pro = opts.experienceMode === "pro";
  const appendFull = Boolean(opts.appendFullEngineOutput && res.fullMarkdown);
  const norm = normalize(reportText);
  const analysis = res.analysis || {};
  const decision = res.decision || {};
  const signals = analysis.signals || [];
  const facts = analysis.facts || {};
  const flavor = classifyReportFlavor(norm, signals, facts);
  const flavorText = FLAVOR_LABEL[lang][flavor];
  const outType = OUT_TYPE_LABEL[lang][res.outputType] || res.outputType;

  const lines = [];
  lines.push(t.pipeline);
  lines.push("");
  lines.push(t.title);
  lines.push("");
  if (!pro) {
    lines.push(t.introYouth);
    lines.push("");
  } else {
    lines.push(t.introPro);
    lines.push("");
  }

  const inputType = decision.inputType || facts.inputType || "free_text";
  lines.push(t.l1);
  lines.push(`- **${getInputTypeLabel(inputType, lang)}**`);

  lines.push("");
  lines.push(t.l2);
  if (res.isRejectedInput) {
    const qh = t.qualityHint[res.quality?.code] || "";
    lines.push(`- ${t.rejectedL2}`);
    if (qh) lines.push(`- ${qh}`);
  } else {
    const issues = (facts.issueLines || []).slice(0, 4);
    if (issues.length) {
      for (const line of issues) {
        lines.push(`- ${line}`);
      }
    } else {
      const labs = labelSignals(signals, lang, 5);
      if (labs.length) {
        lines.push(`- ${labs.join(lang === "en" ? "; " : " · ")}`);
      } else {
        lines.push(`- ${t.noIssues}`);
      }
    }
  }

  lines.push("");
  lines.push(t.l3);
  const { tier, pct } = confTier(res.confidence, lang);
  lines.push(`- ${t.confLine(tier, pct)}`);
  lines.push(`- ${t.flavorLine} ${flavorText}`);

  lines.push("");
  lines.push(t.l4);
  if (res.isRejectedInput) {
    lines.push(`- ${t.rejectedL4}`);
  } else {
    const pri = pickPriorityLine(decision, lang);
    const why = templateWhy(res.templateKey, flavor, lang, pro);
    if (pri) lines.push(`- ${pri}`);
    if (pro) {
      lines.push(`- ${why} · ${outType}`);
    } else {
      lines.push(`- ${why}`);
      lines.push(`- ${t.outputShape} ${outType}`);
    }
  }

  lines.push("");
  lines.push(t.l5);
  lines.push(appendFull ? t.l5BodyMinimalInternal : t.l5Body);

  const sigLabs = labelSignals(signals, lang, 6);
  const sigJoined = sigLabs.length ? sigLabs.join(lang === "en" ? ", " : ", ") : t.noneSignals;
  const dirLine = res.isRejectedInput ? t.rejectedWhy : templateWhy(res.templateKey, flavor, lang, true);

  lines.push("");
  if (pro) {
    lines.push(
      lang === "en"
        ? `**Trace:** ${flavorText} · ${sigJoined} · ${dirLine}`
        : `**מסלול החלטה:** ${flavorText} · ${sigJoined} · ${dirLine}`,
    );
  } else {
    lines.push(t.reasoning);
    lines.push("");
    lines.push(`${t.ctx} ${flavorText}`);
    lines.push(`${t.sig} ${sigJoined}`);
    lines.push(`${t.dir} ${dirLine}`);
  }

  if (appendFull) {
    lines.push("");
    lines.push(t.fullEngineHeader);
    lines.push("");
    lines.push(String(res.fullMarkdown || "").trimEnd());
  }

  return lines.join("\n");
}
