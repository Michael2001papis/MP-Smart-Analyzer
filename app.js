import { decide, evaluateRules, pickTemplate } from "./rules.js";
import { getTemplates } from "./templates.js";

const $ = (id) => document.getElementById(id);
const DEBUG = new URLSearchParams(window.location.search).has("debug");

const els = {
  report: $("report"),
  output: $("output"),
  debug: $("debug"),
  lang: $("lang"),
  outputLang: $("outputLang"),
  tone: $("tone"),
  outputType: $("outputType"),
  btnAnalyze: $("btnAnalyze"),
  btnCopy: $("btnCopy"),
  btnDownload: $("btnDownload"),
  btnClear: $("btnClear"),
  btnSample: $("btnSample"),
  pillDetectedKey: $("pillDetectedKey"),
  pillDetectedVal: $("pillDetectedVal"),
  pillConfidence: $("pillConfidence"),
  pillConfidenceKey: $("pillConfidenceKey"),
  pillConfidenceVal: $("pillConfidenceVal"),
  templateLine: $("templateLine"),
  templateLineKey: $("templateLineKey"),
  templateLineTitle: $("templateLineTitle"),
  status: $("status"),
  toast: $("toast"),
  panelInput: $("panelInput"),
  panelOutput: $("panelOutput"),
  charCount: $("charCount"),
  lenBadge: $("lenBadge"),
  tabInput: $("tabInput"),
  tabOutput: $("tabOutput"),
  heroTagline: $("heroTagline"),
  step1: $("step1"),
  step2: $("step2"),
  step3: $("step3"),
  inputSectionTitle: $("inputSectionTitle"),
  outputSectionTitle: $("outputSectionTitle"),
  inputHint: $("inputHint"),
  settingsBarLabel: $("settingsBarLabel"),
  lblOutputLang: $("lblOutputLang"),
  lblOutputType: $("lblOutputType"),
  lblTone: $("lblTone"),
  uiLangLabel: $("uiLangLabel"),
  debugSummary: $("debugSummary"),
  footerLegal: $("footerLegal"),
  footerNote: $("footerNote"),
};

function requireEl(name, el) {
  if (el) return el;
  throw new Error(`Missing required element: #${name}`);
}

function assertRequiredEls() {
  requireEl("report", els.report);
  requireEl("output", els.output);
  requireEl("debug", els.debug);
  requireEl("lang", els.lang);
  requireEl("outputLang", els.outputLang);
  requireEl("tone", els.tone);
  requireEl("outputType", els.outputType);
  requireEl("btnAnalyze", els.btnAnalyze);
  requireEl("btnCopy", els.btnCopy);
  requireEl("btnDownload", els.btnDownload);
  requireEl("btnClear", els.btnClear);
  requireEl("btnSample", els.btnSample);
  requireEl("pillDetectedKey", els.pillDetectedKey);
  requireEl("pillDetectedVal", els.pillDetectedVal);
  requireEl("pillConfidence", els.pillConfidence);
  requireEl("pillConfidenceKey", els.pillConfidenceKey);
  requireEl("pillConfidenceVal", els.pillConfidenceVal);
  requireEl("templateLine", els.templateLine);
  requireEl("templateLineKey", els.templateLineKey);
  requireEl("templateLineTitle", els.templateLineTitle);
  requireEl("status", els.status);
  requireEl("toast", els.toast);
  requireEl("panelInput", els.panelInput);
  requireEl("panelOutput", els.panelOutput);
  requireEl("charCount", els.charCount);
  requireEl("lenBadge", els.lenBadge);
  requireEl("tabInput", els.tabInput);
  requireEl("tabOutput", els.tabOutput);
  requireEl("heroTagline", els.heroTagline);
  requireEl("step1", els.step1);
  requireEl("step2", els.step2);
  requireEl("step3", els.step3);
  requireEl("inputSectionTitle", els.inputSectionTitle);
  requireEl("outputSectionTitle", els.outputSectionTitle);
  requireEl("inputHint", els.inputHint);
  requireEl("settingsBarLabel", els.settingsBarLabel);
  requireEl("lblOutputLang", els.lblOutputLang);
  requireEl("lblOutputType", els.lblOutputType);
  requireEl("lblTone", els.lblTone);
  requireEl("uiLangLabel", els.uiLangLabel);
  requireEl("debugSummary", els.debugSummary);
  requireEl("footerLegal", els.footerLegal);
  requireEl("footerNote", els.footerNote);
}

const STRINGS = {
  he: {
    analyze: "נתח דוח",
    analyzing: "מנתח…",
    sample: "טען דוגמה",
    clear: "נקה",
    copy: "העתק",
    copied: "הועתק בהצלחה",
    download: "הורד .md",
    inputTab: "קלט",
    outputTab: "פלט",
    needReport: "נא להזין דוח לפני הניתוח",
    analyzeComplete: "הניתוח הושלם",
    heroTagline: "הדבק דוח → קבל פלט מובנה מיד",
    step1: "הדבק דוח",
    step2: "בחר הגדרות",
    step3: "לחץ ניתוח",
    inputTitle: "קלט",
    outputTitle: "פלט שנוצר",
    inputHintTip: "טיפ: ככל שהדוח כולל טכנולוגיות ושגיאות, הניתוח מדויק יותר.",
    settingsBar: "הגדרות",
    uiLangLabel: "ממשק",
    lblOutputLang: "שפת פלט",
    lblOutputType: "סוג פלט",
    lblTone: "טון",
    detectedKey: "מצב מזוהה",
    confidenceKey: "רמת ביטחון",
    templateLineKey: "תבנית פלט",
    confHigh: "גבוהה",
    confMid: "בינונית",
    confLow: "נמוכה",
    debugSummary: "פירוט ניתוח (debug)",
    placeholderReport:
      "הדבק כאן את דוח המצב (טקסט חופשי): סטאק, שגיאות, מטרה…",
    footerLegal: "כלי מקומי בדפדפן בלבד — בלי שרת יישום, בלי API, בלי העלאה לרשת.",
    footerNote:
      'מודולים (ESM): אם פתיחה ישירה של קובץ index.html נחסמת, השתמש/י ב-Live Server או צפייה סטטית מקומית — רק לפיתוח, לא חלק מהמוצר.',
    toneAuto: "אוטומטי",
    toneProfessional: "מקצועי",
    toneSharp: "חד",
    toneClient: "ללקוח",
    toneCursor: "ל‑AI (Cursor)",
    outLangAuto: "אוטומטי",
    outLangHe: "עברית",
    outLangEn: "English",
    outTypeAuto: "אוטומטי",
    outTypeInstructions: "הוראות ביצוע",
    outTypeSummary: "סיכום",
    outTypeClient: "דוח ללקוח",
    outTypeChecklist: "Checklist",
    chars: (n) => `${n} תווים`,
    short: "קצר",
    medium: "בינוני",
    long: "ארוך",
  },
  en: {
    analyze: "Analyze report",
    analyzing: "Analyzing…",
    sample: "Load sample",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied successfully",
    download: "Download .md",
    inputTab: "Input",
    outputTab: "Output",
    needReport: "Please enter a report first",
    analyzeComplete: "Analysis complete",
    heroTagline: "Paste your report → Get structured output instantly",
    step1: "Paste your report",
    step2: "Choose settings",
    step3: "Click Analyze",
    inputTitle: "Input",
    outputTitle: "Generated output",
    inputHintTip: "Tip: include stack, errors, and goals — the analysis gets sharper.",
    settingsBar: "Settings",
    uiLangLabel: "UI",
    lblOutputLang: "Output language",
    lblOutputType: "Output type",
    lblTone: "Tone",
    detectedKey: "Detected mode",
    confidenceKey: "Confidence",
    templateLineKey: "Output template",
    confHigh: "High",
    confMid: "Medium",
    confLow: "Low",
    debugSummary: "Analysis details (debug)",
    placeholderReport: "Paste your report here…",
    footerLegal: "Runs locally in your browser only — no app server, no API, no upload.",
    footerNote:
      "ES modules: if opening index.html directly is blocked, use Live Server or any local static preview — dev tooling only, not part of the product.",
    toneAuto: "Auto",
    toneProfessional: "Professional",
    toneSharp: "Sharp",
    toneClient: "Client-ready",
    toneCursor: "For AI (Cursor)",
    outLangAuto: "Auto",
    outLangHe: "Hebrew",
    outLangEn: "English",
    outTypeAuto: "Auto",
    outTypeInstructions: "Instructions",
    outTypeSummary: "Summary",
    outTypeClient: "Client report",
    outTypeChecklist: "Checklist",
    chars: (n) => `${n} chars`,
    short: "Short",
    medium: "Medium",
    long: "Long",
  },
};

function detectedModeLabel(inputType, lang) {
  const map = {
    he: {
      qa: "צ׳ק־ליסט / QA",
      bug_report: "באגים / יציבות",
      ui_audit: "ממשק / UX",
      status_report: "סטטוס / מסירה",
      free_text: "כללי / לא מסווג",
    },
    en: {
      qa: "Checklist / QA",
      bug_report: "Bugs / stability",
      ui_audit: "UI / UX",
      status_report: "Status / delivery",
      free_text: "General / unclassified",
    },
  };
  const row = map[lang] || map.he;
  return row[inputType] || row.free_text;
}

function sampleReport() {
  return `
דוח מצב — Fullstack (דוגמה)

Frontend:
- React + Vite
- UI responsive אבל לא עקבי, יש בעיות ריווח וטיפוגרפיה

Backend:
- Node.js + Express
- MongoDB + JWT
- יש כמה errors מדי פעם (500), ואי יציבות ב-login

Deploy:
- Vercel

מטרה:
להכין את המערכת למסירה ללקוח + דמו
`.trim();
}

function toPrettyJson(obj) {
  return JSON.stringify(obj, null, 2);
}

function resolveOutputLang(selection, facts, uiLang) {
  if (selection && selection !== "auto") return selection;
  const hasHe = Boolean(facts?.hasHebrew);
  const hasEn = Boolean(facts?.hasEnglish);
  if (hasHe && !hasEn) return "he";
  if (hasEn && !hasHe) return "en";
  return uiLang || "he";
}

function resolveOutputType(selection, decision) {
  if (selection && selection !== "auto") return selection;
  return decision?.recommendedOutputType || "summary";
}

function toSummaryMarkdown(markdown) {
  const text = String(markdown || "");
  const lines = text.split("\n");
  const keepHeadings = new Set([
    "## Summary",
    "## Project Overview",
    "## What was detected (from the report)",
    "## Priorities (Decision Engine)",
    "## Goal",
    "## Main Goal",
    "## Expected Result",
    "## Next Steps",
    "## Meta",
  ]);

  const out = [];
  let keep = false;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      keep = keepHeadings.has(line.trim());
    }
    if (keep) out.push(line);
  }
  return out.length ? out.join("\n").trim() : text.trim();
}

function computeResponse(reportText, lang, tone) {
  const analysis = evaluateRules(reportText);
  const { templateKey, confidence } = pickTemplate(analysis.scores, analysis.facts, analysis.matchedRules);
  const decision = decide(analysis, templateKey);

  const effectiveTone = tone === "auto" ? decision.autoTone : tone;

  const effectiveOutputLang = resolveOutputLang(els.outputLang.value, analysis.facts, lang);
  const effectiveOutputType = resolveOutputType(els.outputType.value, decision);

  const templates = getTemplates(effectiveOutputLang);
  const chosenKey =
    effectiveOutputType === "client_report"
      ? "client_report"
      : effectiveOutputType === "checklist"
        ? "final_qa"
        : templateKey;

  const template = templates[chosenKey];
  if (!template?.render) {
    throw new Error(
      `Missing template for lang=${String(effectiveOutputLang)} key=${String(chosenKey)}. Run npm test to verify HE/EN parity.`,
    );
  }
  const markdown = template.render({
    tone: effectiveTone,
    confidence,
    facts: analysis.facts,
    signals: analysis.signals,
    decision,
    reportText,
  });

  const finalMarkdown =
    effectiveOutputType === "summary" ? toSummaryMarkdown(markdown) : String(markdown || "");

  return {
    markdown: finalMarkdown,
    templateKey: chosenKey,
    confidence,
    analysis,
    decision,
    tone: effectiveTone,
    outputLang: effectiveOutputLang,
    outputType: effectiveOutputType,
    templateTitle: template.title,
  };
}

function setOutputInsights(inputType, templateTitle, confidence) {
  const s = STRINGS[els.lang.value] || STRINGS.he;
  const lang = els.lang.value;

  els.pillDetectedKey.textContent = s.detectedKey;
  els.pillConfidenceKey.textContent = s.confidenceKey;
  els.templateLineKey.textContent = s.templateLineKey;

  if (inputType) {
    els.pillDetectedVal.textContent = detectedModeLabel(inputType, lang);
  } else {
    els.pillDetectedVal.textContent = "—";
  }

  els.pillConfidence.classList.remove("is-high", "is-mid", "is-low");
  if (typeof confidence === "number") {
    const tierLabel = confidence >= 0.75 ? s.confHigh : confidence >= 0.5 ? s.confMid : s.confLow;
    els.pillConfidenceVal.textContent = `${tierLabel} · ${Math.round(confidence * 100)}%`;
    if (confidence >= 0.75) els.pillConfidence.classList.add("is-high");
    else if (confidence >= 0.5) els.pillConfidence.classList.add("is-mid");
    else els.pillConfidence.classList.add("is-low");
  } else {
    els.pillConfidenceVal.textContent = "—";
  }

  if (templateTitle) {
    els.templateLineTitle.textContent = templateTitle;
    els.templateLine.hidden = false;
  } else {
    els.templateLineTitle.textContent = "—";
    els.templateLine.hidden = true;
  }
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

function downloadMarkdown(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function setStatus(message, kind = "info") {
  els.status.textContent = message || "";
  els.status.classList.remove("is-error", "is-success");
  if (kind === "error") els.status.classList.add("is-error");
  if (kind === "success") els.status.classList.add("is-success");
}

let toastTimer = null;
function showToast(message) {
  if (!message) return;
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 1200);
}

function setPanelsState({ input = "normal", output = "normal" } = {}) {
  els.panelInput.classList.remove("is-error", "is-success");
  els.panelOutput.classList.remove("is-error", "is-success");
  if (input === "error") els.panelInput.classList.add("is-error");
  if (input === "success") els.panelInput.classList.add("is-success");
  if (output === "error") els.panelOutput.classList.add("is-error");
  if (output === "success") els.panelOutput.classList.add("is-success");
}

function setButtonsState() {
  const hasOutput = Boolean((els.output.value || "").trim());
  els.btnCopy.disabled = !hasOutput;
  els.btnDownload.disabled = !hasOutput;
}

let outputAnimToken = 0;
function shouldReduceMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

async function typeOutput(text) {
  const token = ++outputAnimToken;

  const full = typeof text === "string" ? text : String(text ?? "");
  const reduce = shouldReduceMotion();
  const longText = full.length > 6000;

  // If user prefers reduced motion (or it's huge), render instantly.
  if (reduce || longText) {
    els.output.value = full;
    setButtonsState();
    return;
  }

  // During animation: keep actions disabled until content exists.
  els.output.value = "";
  setButtonsState();

  const total = full.length;
  // Paragraph-aware speed: more paragraphs => faster typing.
  const paragraphs = Math.max(
    1,
    full
      .split(/\n\s*\n/g)
      .map((p) => p.trim())
      .filter(Boolean).length
  );

  // Base speed by length (smooth for short outputs).
  let chunk = total > 2500 ? 24 : total > 1200 ? 14 : 8;
  let delayMs = total > 2500 ? 6 : total > 1200 ? 10 : 14;

  // Speed boost factor: 1..3 based on paragraph count.
  // 1-2 paragraphs: normal
  // 3-6 paragraphs: faster
  // 7+ paragraphs: fastest
  const speedFactor = paragraphs >= 7 ? 3 : paragraphs >= 3 ? 2 : 1;
  chunk = Math.min(48, Math.round(chunk * speedFactor));
  delayMs = Math.max(4, Math.round(delayMs / speedFactor));

  for (let i = 0; i < total; i += chunk) {
    if (token !== outputAnimToken) return; // cancelled by a new analysis
    els.output.value = full.slice(0, i + chunk);
    setButtonsState();
    await new Promise((r) => setTimeout(r, delayMs));
  }

  // Ensure final text is exact.
  if (token === outputAnimToken) {
    els.output.value = full;
    setButtonsState();
  }
}

function setActiveTab(which) {
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  if (!isMobile) return;
  const inputActive = which === "input";

  els.tabInput.classList.toggle("is-active", inputActive);
  els.tabOutput.classList.toggle("is-active", !inputActive);
  els.panelInput.classList.toggle("is-hidden", !inputActive);
  els.panelOutput.classList.toggle("is-hidden", inputActive);
}

function updateCounts() {
  const s = STRINGS[els.lang.value] || STRINGS.he;
  const n = (els.report.value || "").length;
  els.charCount.textContent = s.chars(n);

  let key = "short";
  if (n > 1200) key = "long";
  else if (n > 400) key = "medium";

  els.lenBadge.classList.remove("is-short", "is-medium", "is-long");
  els.lenBadge.classList.add(key === "short" ? "is-short" : key === "medium" ? "is-medium" : "is-long");
  els.lenBadge.textContent = key === "short" ? s.short : key === "medium" ? s.medium : s.long;
}

function applyLanguageUI() {
  const lang = els.lang.value;
  const s = STRINGS[lang] || STRINGS.he;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";

  els.heroTagline.textContent = s.heroTagline;
  els.step1.textContent = s.step1;
  els.step2.textContent = s.step2;
  els.step3.textContent = s.step3;
  els.inputSectionTitle.textContent = s.inputTitle;
  els.outputSectionTitle.textContent = s.outputTitle;
  els.inputHint.textContent = s.inputHintTip;
  els.settingsBarLabel.textContent = s.settingsBar;
  els.uiLangLabel.textContent = s.uiLangLabel;
  els.lblOutputLang.textContent = s.lblOutputLang;
  els.lblOutputType.textContent = s.lblOutputType;
  els.lblTone.textContent = s.lblTone;
  els.debugSummary.textContent = s.debugSummary;
  els.report.placeholder = s.placeholderReport;
  els.footerLegal.textContent = s.footerLegal;
  els.footerNote.textContent = s.footerNote;

  els.pillDetectedKey.textContent = s.detectedKey;
  els.pillConfidenceKey.textContent = s.confidenceKey;
  els.templateLineKey.textContent = s.templateLineKey;

  els.btnAnalyze.textContent = s.analyze;
  els.btnSample.textContent = s.sample;
  els.btnClear.textContent = s.clear;
  els.btnCopy.textContent = s.copy;
  els.btnDownload.textContent = s.download;
  els.tabInput.textContent = s.inputTab;
  els.tabOutput.textContent = s.outputTab;

  if (els.tone?.options?.length) {
    const map = {
      auto: s.toneAuto,
      professional: s.toneProfessional,
      sharp: s.toneSharp,
      client: s.toneClient,
      cursor: s.toneCursor,
    };
    for (const opt of Array.from(els.tone.options)) {
      if (map[opt.value]) opt.textContent = map[opt.value];
    }
  }

  if (els.outputLang?.options?.length) {
    const map = { auto: s.outLangAuto, he: s.outLangHe, en: s.outLangEn };
    for (const opt of Array.from(els.outputLang.options)) {
      if (map[opt.value]) opt.textContent = map[opt.value];
    }
  }

  if (els.outputType?.options?.length) {
    const map = {
      auto: s.outTypeAuto,
      instructions: s.outTypeInstructions,
      summary: s.outTypeSummary,
      client_report: s.outTypeClient,
      checklist: s.outTypeChecklist,
    };
    for (const opt of Array.from(els.outputType.options)) {
      if (map[opt.value]) opt.textContent = map[opt.value];
    }
  }

  updateCounts();
  setButtonsState();
}

async function analyze() {
  const reportText = els.report.value || "";
  const lang = els.lang.value;
  const tone = els.tone.value;
  const s = STRINGS[lang] || STRINGS.he;

  if (!reportText.trim()) {
    els.output.value = "";
    setOutputInsights(null, null, null);
    els.debug.textContent = "";
    setPanelsState({ input: "error", output: "normal" });
    setStatus(s.needReport, "error");
    els.report.focus();
    setButtonsState();
    return;
  }

  // Loading micro-feedback (subtle, deterministic)
  els.btnAnalyze.classList.add("btn-loading");
  els.btnAnalyze.disabled = true;
  els.btnAnalyze.textContent = s.analyzing;
  setStatus(s.analyzing, "info");
  setPanelsState({ input: "normal", output: "normal" });
  // Cancel any previous output animation.
  outputAnimToken++;

  try {
    if (DEBUG) {
      els.debug.textContent = toPrettyJson({
        step: "start",
        reportLength: reportText.length,
        lang,
        tone,
      });
    }

    await new Promise((r) => setTimeout(r, 650));

    const res = computeResponse(reportText, lang, tone);
    const markdown = typeof res.markdown === "string" ? res.markdown : String(res.markdown ?? "");
    await typeOutput(markdown);

    if (DEBUG) {
      console.log("analyze_result", res);
    }

    setOutputInsights(res.decision?.inputType, res.templateTitle, res.confidence);
    els.debug.textContent = toPrettyJson({
      templateKey: res.templateKey,
      confidence: res.confidence,
      decision: res.decision,
      tone: res.tone,
      outputLang: res.outputLang,
      outputType: res.outputType,
      matchedRules: res.analysis.matchedRules,
      signals: res.analysis.signals,
      scores: res.analysis.scores,
      facts: res.analysis.facts,
    });

    // Success state + subtle flash
    setPanelsState({ input: "success", output: "success" });
    els.panelOutput.classList.remove("flash");
    // Force reflow for repeated flashes
    void els.panelOutput.offsetWidth;
    els.panelOutput.classList.add("flash");
    setStatus(s.analyzeComplete, "success");
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    console.error("analyze_failed", err);
    // Cancel any in-progress typing and show error immediately.
    outputAnimToken++;
    els.output.value = lang === "en" ? `Analysis failed: ${msg}` : `הניתוח נכשל: ${msg}`;
    els.debug.textContent = DEBUG
      ? (err && err.stack ? String(err.stack) : msg)
      : toPrettyJson({ error: msg });
    setOutputInsights(null, null, null);
    setPanelsState({ input: "normal", output: "error" });
    setStatus(lang === "en" ? "Analysis failed. Check debug/console." : "הניתוח נכשל. בדוק debug/console.", "error");
    setButtonsState();
  } finally {
    // Restore analyze button
    els.btnAnalyze.classList.remove("btn-loading");
    els.btnAnalyze.disabled = false;
    els.btnAnalyze.textContent = s.analyze;
  }
}

els.btnAnalyze.addEventListener("click", analyze);

els.btnClear.addEventListener("click", () => {
  els.report.value = "";
  els.output.value = "";
  els.debug.textContent = "";
  setOutputInsights(null, null, null);
  setPanelsState({ input: "normal", output: "normal" });
  setStatus("", "info");
  updateCounts();
  setButtonsState();
});

els.btnSample.addEventListener("click", () => {
  els.report.value = sampleReport();
  updateCounts();
  setPanelsState({ input: "normal", output: "normal" });
  setStatus("", "info");
  setActiveTab("input");
});

els.btnCopy.addEventListener("click", async () => {
  const s = STRINGS[els.lang.value] || STRINGS.he;
  const text = els.output.value || "";
  if (!text.trim()) return;
  await copyToClipboard(text);
  showToast(s.copied);
});

els.btnDownload.addEventListener("click", () => {
  const content = els.output.value || "";
  if (!content.trim()) return;
  downloadMarkdown(`mp-smart-analysis_${nowStamp()}.md`, content);
});

// Auto-analyze on settings change (lightweight)
els.lang.addEventListener("change", () => {
  applyLanguageUI();
  // keep current output but update pills prefixes
  const current = els.output.value || "";
  if (current.trim()) analyze();
});
els.tone.addEventListener("change", () => {
  const current = els.report.value || "";
  if (current.trim()) analyze();
});
els.outputLang.addEventListener("change", () => {
  applyLanguageUI();
  const current = els.report.value || "";
  if (current.trim()) analyze();
});
els.outputType.addEventListener("change", () => {
  applyLanguageUI();
  const current = els.report.value || "";
  if (current.trim()) analyze();
});

els.report.addEventListener("input", () => {
  updateCounts();
  if ((els.report.value || "").trim()) {
    els.panelInput.classList.remove("is-error");
    setStatus("", "info");
  }
});

els.tabInput.addEventListener("click", () => setActiveTab("input"));
els.tabOutput.addEventListener("click", () => setActiveTab("output"));
window.addEventListener("resize", () => setActiveTab("input"));

// Initial state
try {
  assertRequiredEls();
} catch (e) {
  console.error("ui_init_failed", e);
  const msg = e && e.message ? e.message : String(e);
  // Best-effort surfacing (avoid throwing and killing the module)
  if (els.status) {
    els.status.textContent = msg;
    els.status.classList.add("is-error");
  }
}
applyLanguageUI();
setOutputInsights(null, null, null);
updateCounts();
setButtonsState();
setActiveTab("input");

