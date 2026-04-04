const HE = {
  spa_upgrade: {
    title: "SPA / Frontend Upgrade",
    render: ({ tone, facts, signals, confidence }) => `## Project Overview
הדוח מצביע על פרויקט Frontend/SPA עם בסיס קיים שאפשר לשדרג לחוויית שימוש נקייה, עקבית ומוכנה להצגה.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Main Goal
להעלות את המערכת לרמה של מוצר “מוכן לקוח”: UI עקבי, זרימה חלקה, Build נקי, וסטנדרט איכות גבוה.

## Focus Areas
- **UI/UX consistency**: היררכיה חזותית, ריווח, טיפוגרפיה, רספונסיביות.
- **SPA flow**: ניווט, מצביות (state), טעינות/שלדים, שגיאות ידידותיות.
- **Build stability**: התקנה נקייה, בדיקות build, טיפול באזהרות.

## Expected Result
מערכת מודרנית, יציבה וויזואלית חזקה שמרגישה מקצועית ומוכנה לדמו/מסירה.

## Meta
- **Template**: SPA Upgrade
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  ui_ux_fix: {
    title: "UI/UX Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
הדוח מרמז שהבעיה העיקרית היא **חוויית משתמש/עיצוב** (עקביות, רספונסיביות, היררכיה חזותית).

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## Goal
להפוך את הממשק ליותר ברור, נקי ואחיד — בלי לשבור פונקציונליות.

## Recommended Actions
${renderActionsHE(facts, "ui")}

## Report phrases (examples)
${renderQuotedIssueLinesHE(facts, reportText)}

## Deliverables
- רשימת בעיות UI/UX מתועדפת
- תיקונים במסכים המרכזיים
- סט רכיבים עקבי (Buttons/Inputs/Cards/Modals)

## Meta
- **Template**: UI/UX Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  performance_fix: {
    title: "Performance Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
הדוח מצביע על בעיית **ביצועים/איטיות**. המטרה היא לשפר מדדים וחוויית שימוש בלי לשבור פונקציונליות.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## Recommended Actions
${renderActionsHE(facts, "performance")}

## Report phrases (examples)
${renderQuotedIssueLinesHE(facts, reportText)}

## Meta
- **Template**: Performance Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  backend_api: {
    title: "Backend / API",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
הדוח מצביע על Backend/API (אימות, DB, endpoints) שצריך חיזוק איכות ויציבות.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## Focus Areas
${renderActionsHE(facts, "backend")}

## Report phrases (examples)
${renderQuotedIssueLinesHE(facts, reportText)}

## Expected Result
Backend יציב, בטוח יותר, וצפוי — עם API שקל לצרוך מה‑Frontend.

## Meta
- **Template**: Backend / API
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  stability_fix: {
    title: "Stability Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
נמצאו סימנים לבעיית **יציבות / באגים / שגיאות**. המטרה היא לעצור את הדימום לפני “שדרוגים”.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## Priority Plan
1. **Reproduce**: צעדים מדויקים לשחזור + תנאים (דפדפן/סביבה/משתמש).
2. **Stabilize**: טיפול בשגיאות קריטיות, null/undefined, קריסות, 500.
3. **Guardrails**: ולידציות, טיפול בשגיאות אחיד, timeouts, retries (איפה מתאים).
4. **Verification**: בדיקת “חזר לעבוד” + בדיקות רגרסיה בסיסיות.

## Report phrases (examples)
${renderQuotedIssueLinesHE(facts, reportText)}

## What I Need
- לוג/stack trace מלא
- פקודות הרצה/בנייה
- סביבת יעד (prod/staging/local)

## Meta
- **Template**: Stability Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  client_report: {
    title: "Client Report",
    render: ({ tone, confidence }) => `## Project Status (Client‑Ready)
להלן סטטוס מקצועי ומוכן להצגה ללקוח, כולל תמונת מצב, מטרות ושדרוגים מומלצים.

## Current State
- קיימת תשתית שעובדת, אך נדרשים ליטושים כדי להגיע לרמת מוצר “מוכן מסירה”.

## Proposed Goal
שדרוג המערכת לסטנדרט גבוה של יציבות, UX ומראה מקצועי — תוך שמירה על לוגיקה קיימת.

## Scope (High level)
- ליטוש UI/UX + רספונסיביות
- שיפור זרימת שימוש (SPA flow)
- בדיקות איכות לפני מסירה

## Next Steps
- איסוף נקודות כאב מהדוח
- תיעדוף משימות
- ביצוע סבב תיקונים + סבב QA

## Meta
- **Template**: Client Report
- **Confidence**: ${confidence}
${toneFooter(tone)}
`,
  },

  final_qa: {
    title: "Final QA",
    render: ({ tone, confidence }) => `## Final QA Checklist (Before Delivery)

## Build & Deploy
- התקנה נקייה (fresh install) ללא שגיאות
- Build/Release עובר ללא warnings קריטיים
- בדיקת production build בפועל

## Functional QA
- מסכים מרכזיים עובדים מקצה לקצה
- טפסים: ולידציות + הודעות שגיאה ברורות
- ניהול מצבי טעינה/ריק/שגיאה

## UI/UX
- עקביות רכיבים
- רספונסיביות מלאה
- נגישות בסיסית

## Stability
- טיפול בשגיאות אחיד
- לוגים מינימליים לאבחון

## Meta
- **Template**: Final QA
- **Confidence**: ${confidence}
${toneFooter(tone)}
`,
  },

  fullstack_polish: {
    title: "Fullstack Polish",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Project Overview
המערכת נראית כמו **Fullstack** (Frontend + Backend) עם בסיס טוב, אך דורשת ליטוש כדי להגיע לרמת מוצר יציב ומוכן לקוח.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## Main Goal
להביא את המערכת לחוויית שימוש “שלמה”: UI עקבי, API צפוי, יציבות גבוהה, ותהליך build/deploy נקי.

## Focus Areas
${renderActionsHE(facts, "fullstack")}

## Report phrases (examples)
${renderQuotedIssueLinesHE(facts, reportText)}

## Expected Result
מערכת מודרנית, יציבה, וייצוגית — מוכנה ל‑real world + פרזנטציה.

## Meta
- **Template**: Fullstack Polish
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  general: {
    title: "General",
    render: ({ tone, confidence, signals, facts, decision }) => `## Summary
הדוח התקבל ונותח, אבל אין מספיק אינדיקציות כדי לבחור תבנית ייעודית בביטחון גבוה.

## What was detected (from the report)
${renderDetectedHE(facts)}

## Priorities (Decision Engine)
${renderPrioritiesHE(decision)}

## What I Need Next
- מה ניסית לעשות, ומה קרה בפועל
- הודעת שגיאה/לוג רלוונטיים
- טכנולוגיות/סטאק (Frontend/Backend/DB/Deploy)

## Meta
- **Template**: General
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },
};

const EN = {
  ui_ux_fix: {
    title: "UI/UX Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
The report points to a **UI/UX** focus (consistency, responsive behavior, accessibility).

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Recommended actions
- Create a small design system (colors, typography, spacing, core components).
- Run a responsive pass (mobile → tablet → desktop).
- Add user feedback states (loading/empty/error) and consistent form validation.
- Add basic accessibility (focus-visible, labels/aria, contrast, keyboard navigation).

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Meta
- **Template**: UI/UX Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  backend_api: {
    title: "Backend / API",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
The report points to **backend/API** work (auth, DB, endpoints) that needs hardening.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Focus areas
- API contracts: validation + consistent error model.
- Auth: JWT/session, permissions, refresh flows, edge cases.
- DB: indexes, query performance, connection stability, timeouts.
- Observability: useful logs + centralized error handling.

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Meta
- **Template**: Backend / API
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  stability_fix: {
    title: "Stability Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
Signals indicate **stability / bugs / errors**. Stabilize first, then polish.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Execution plan
1. Reproduce reliably (steps + environment).
2. Fix critical failures (crashes/500/timeouts).
3. Add guardrails (validation, timeouts, retries where appropriate).
4. Verify with a small regression pass.

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Meta
- **Template**: Stability Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  performance_fix: {
    title: "Performance Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
The report points to **performance/slowness**. Measure → find bottleneck → optimize.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Recommended actions
- Baseline metrics (TTFB/LCP, slow screens/actions).
- Frontend: reduce bundle, lazy-load, caching, image optimization.
- Backend: query/index tuning, caching, avoid N+1 patterns.

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Meta
- **Template**: Performance Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },

  final_qa: {
    title: "QA Checklist",
    render: ({ tone, confidence, facts, decision }) => `## QA Checklist

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Checklist
- Fresh install/build passes cleanly
- Core flows work end-to-end
- Forms: validation + clear errors
- Loading/empty/error states covered
- Responsive pass done
- Basic accessibility pass (focus/labels/contrast)

## Meta
- **Template**: QA Checklist
- **Confidence**: ${confidence}
${toneFooter(tone)}
`,
  },

  general: {
    title: "General",
    render: ({ confidence, tone, signals, facts, decision, reportText }) => `## Summary
Report received and analyzed. Not enough strong signals to pick a specialized template with high confidence.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## What I need next
- What you tried, expected vs actual
- Relevant error/log output
- Tech stack (frontend/backend/db/deploy)

## Meta
- **Template**: General
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooter(tone)}
`,
  },
};

function toneFooter(tone) {
  if (tone === "sharp") return `\n---\n**Style**: חד — קצר, תכל׳ס, בלי מריחה.\n`;
  if (tone === "client") return `\n---\n**Style**: ללקוח — שפה נקייה, בלי ז׳רגון מיותר.\n`;
  if (tone === "cursor") return `\n---\n**Style**: ל‑AI (Cursor) — ממוקד ביצוע, נקודות מדויקות לאבחון.\n`;
  return `\n---\n**Style**: מקצועי — ברור, מסודר, פרקטי.\n`;
}

function renderList(items, empty = "—", prefix = "- ") {
  const arr = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!arr.length) return empty;
  return arr.map((x) => `${prefix}${x}`).join("\n");
}

function renderSubList(items, empty = "—") {
  return renderList(items, empty, "  - ");
}

function renderDetectedHE(facts) {
  const tech = facts?.tech || [];
  const issues = facts?.issueLines || [];
  const hints = facts?.actionHints || [];
  return [
    `- **Tech**: ${tech.length ? tech.join(", ") : "—"}`,
    `- **Signals**: ${hints.length ? hints.join(", ") : "—"}`,
    issues.length ? `- **Issues (from report)**:\n${renderSubList(issues)}` : `- **Issues (from report)**: —`,
  ].join("\n");
}

function renderDetectedEN(facts) {
  const tech = facts?.tech || [];
  const issues = facts?.issueLines || [];
  const hints = facts?.actionHints || [];
  return [
    `- **Tech**: ${tech.length ? tech.join(", ") : "—"}`,
    `- **Signals**: ${hints.length ? hints.join(", ") : "—"}`,
    issues.length ? `- **Issues (from report)**:\n${renderSubList(issues)}` : `- **Issues (from report)**: —`,
  ].join("\n");
}

function renderPrioritiesEN(decision) {
  const p = decision?.priorities || {};
  const critical = Array.isArray(p.critical) ? p.critical : [];
  const important = Array.isArray(p.important) ? p.important : [];
  const later = Array.isArray(p.later) ? p.later : [];

  const toText = (x) => (typeof x === "string" ? x : x?.en || x?.he || String(x ?? ""));

  const parts = [];
  if (critical.length) parts.push(`### Critical\n${critical.map((x) => `- ${toText(x)}`).join("\n")}`);
  if (important.length) parts.push(`### Important\n${important.map((x) => `- ${toText(x)}`).join("\n")}`);
  if (later.length) parts.push(`### Later\n${later.map((x) => `- ${toText(x)}`).join("\n")}`);
  return parts.length ? parts.join("\n\n") : "—";
}

function renderQuotedIssueLinesEN(facts, reportText) {
  const issues = (facts?.issueLines || []).filter(Boolean);
  if (issues.length) return issues.map((l) => `- \`${l.slice(0, 140)}\``).join("\n");
  const lines = String(reportText || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 2);
  return lines.length ? lines.map((l) => `- \`${l.slice(0, 140)}\``).join("\n") : "- `—`";
}

function renderActionsHE(facts, mode) {
  const hints = new Set((facts?.actionHints || []).filter(Boolean));
  const lines = [];

  if (mode === "ui" || mode === "fullstack") {
    lines.push("- **Design system קטן**: צבעים, טיפוגרפיה, ריווחים, רכיבים בסיסיים.");
    if (hints.has("ui_responsive")) lines.push("- **Responsive pass**: מובייל → טאבלט → דסקטופ (כולל RTL אם יש).");
    if (hints.has("ui_accessibility")) lines.push("- **Accessibility**: פוקוס נראה לעין, קונטרסט, ניווט מקלדת, labels/aria.");
    lines.push("- **UX pass**: מצבי שגיאה/ריק/טעינה, פידבק למשתמש, טפסים וכפתורים.");
  }

  if (mode === "backend" || mode === "fullstack") {
    lines.push("- **API contracts**: ולידציות, סכמות, הודעות שגיאה עקביות.");
    if (hints.has("backend_auth")) lines.push("- **Auth**: JWT/session, הרשאות, refresh, hardening של login.");
    if (hints.has("backend_db")) lines.push("- **DB**: אינדקסים, ביצועים, יציבות חיבורים, timeouts.");
    lines.push("- **Observability**: לוגים שימושיים, error handling מרכזי, trace בסיסי.");
  }

  if (mode === "performance") {
    lines.push("- **Quick wins**: לזהות מסכים/פעולות איטיים, למדוד לפני/אחרי.");
    lines.push("- **Frontend performance**: הקטנת bundle, lazy-load, תמונות, caching.");
    lines.push("- **Backend performance**: query optimization, אינדקסים, caching, N+1.");
    lines.push("- **UX**: skeleton/loading states, debounce, pagination.");
  }

  if (mode === "ui") return lines.join("\n");
  if (mode === "backend") return lines.join("\n");
  if (mode === "performance") return lines.join("\n");
  if (mode === "fullstack") return lines.join("\n");

  // fallback
  return "- **Next steps**: תיעדוף, ביצוע, QA.";
}

function renderQuotedIssueLinesHE(facts, reportText) {
  const issues = (facts?.issueLines || []).filter(Boolean);
  if (issues.length) {
    return issues.map((l) => `- \`${l.slice(0, 140)}\``).join("\n");
  }
  // Fallback: show first 2 non-empty lines to prove the analyzer “saw” the report (still deterministic).
  const lines = String(reportText || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 2);
  return lines.length ? lines.map((l) => `- \`${l.slice(0, 140)}\``).join("\n") : "- `—`";
}

function renderPrioritiesHE(decision) {
  const p = decision?.priorities || {};
  const critical = Array.isArray(p.critical) ? p.critical : [];
  const important = Array.isArray(p.important) ? p.important : [];
  const later = Array.isArray(p.later) ? p.later : [];

  const toText = (x) => (typeof x === "string" ? x : x?.he || x?.en || String(x ?? ""));

  const parts = [];
  if (critical.length) parts.push(`### קריטי (לעצור דימום)\n${critical.map((x) => `- ${toText(x)}`).join("\n")}`);
  if (important.length) parts.push(`### חשוב (להביא לרמה מקצועית)\n${important.map((x) => `- ${toText(x)}`).join("\n")}`);
  if (later.length) parts.push(`### בהמשך (ליטוש)\n${later.map((x) => `- ${toText(x)}`).join("\n")}`);
  return parts.length ? parts.join("\n\n") : "—";
}

export function getTemplates(lang) {
  return lang === "en" ? EN : HE;
}

