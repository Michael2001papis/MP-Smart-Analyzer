import { TEMPLATE_KEYS } from "./rules.js";

function softOpenHE(confidence) {
  if (typeof confidence !== "number" || confidence >= 0.48) return "";
  return `> **הערה**: התאמת התבנית חלשה — הדוח קצר או דל במילות מפתח. כדאי להוסיף סטאק, שגיאות/לוגים או מטרה מפורשת לתוכנית מדויקת יותר.\n\n`;
}

function softOpenEN(confidence) {
  if (typeof confidence !== "number" || confidence >= 0.48) return "";
  return `> **Note**: Weak template match — the report is short or sparse on keywords. Add stack, errors/logs, or a clear goal for a tighter plan.\n\n`;
}

function clientStabilityNoteHE(signals) {
  const s = Array.isArray(signals) ? signals : [];
  if (!s.includes("stability")) return "";
  return `\n## הערת עקביות\nאם מופיעות בדוח שגיאות חמורות, כשלים (למשל 500) או אי־יציבות — יש לסגור אותן לפני הצגת “סטטוס מוכן ללקוח”.\n`;
}

function clientStabilityNoteEN(signals) {
  const s = Array.isArray(signals) ? signals : [];
  if (!s.includes("stability")) return "";
  return `\n## Consistency note\nIf the report mentions severe errors (e.g. 500s), crashes, or instability, resolve those before presenting this as “client-ready” status.\n`;
}

const HE = {
  spa_upgrade: {
    title: "SPA / Frontend Upgrade",
    render: ({ tone, facts, signals, confidence }) => `${softOpenHE(confidence)}## Project Overview
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
    render: ({ tone, confidence, signals }) => `## Project Status (Client‑Ready)
להלן סטטוס מקצועי ומוכן להצגה ללקוח, כולל תמונת מצב, מטרות ושדרוגים מומלצים.
${clientStabilityNoteHE(signals)}
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
הפלט כאן הוא **נקודת פתיחה אמינה** — לא תחליף לבדיקה מעמיקה של הקוד או הסביבה.

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
  spa_upgrade: {
    title: "SPA / Frontend Upgrade",
    render: ({ tone, facts, signals, confidence }) => `${softOpenEN(confidence)}## Project Overview
The report points to a Frontend/SPA codebase that can be elevated to a cleaner, consistent, demo-ready experience.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Main Goal
Reach a **client-ready** bar: consistent UI, smooth flows, clean builds, and strong quality hygiene.

## Focus Areas
- **UI/UX consistency**: visual hierarchy, spacing, typography, responsiveness.
- **SPA flow**: navigation, state, loading/skeleton UX, friendly error states.
- **Build stability**: clean install, build verification, warning triage.

## Expected Result
A modern, stable, visually strong product that feels professional for demos and handover.

## Meta
- **Template**: SPA Upgrade
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooterEn(tone)}
`,
  },

  ui_ux_fix: {
    title: "UI/UX Fix",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Summary
The report points to a **UI/UX** focus (consistency, responsive behavior, visual hierarchy).

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Goal
Make the interface clearer, cleaner, and more consistent — without breaking core functionality.

## Recommended Actions
${renderActionsEN(facts, "ui")}

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Deliverables
- Documented UI/UX issue list
- Fixes on primary screens
- Consistent component set (buttons/inputs/cards/modals)

## Meta
- **Template**: UI/UX Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooterEn(tone)}
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

## Focus Areas
${renderActionsEN(facts, "backend")}

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Expected Result
A more stable, predictable backend with an API that is easy for the frontend to consume safely.

## Meta
- **Template**: Backend / API
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooterEn(tone)}
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
${toneFooterEn(tone)}
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

## Recommended Actions
${renderActionsEN(facts, "performance")}

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Meta
- **Template**: Performance Fix
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooterEn(tone)}
`,
  },

  client_report: {
    title: "Client Report",
    render: ({ tone, confidence, signals }) => `## Project Status (Client-Ready)
A professional status summary suitable for stakeholders: current state, goals, and recommended improvements.
${clientStabilityNoteEN(signals)}
## Current State
- Core infrastructure works, but polish is required to reach true delivery-grade product quality.

## Proposed Goal
Improve stability, UX, and visual professionalism while preserving existing business logic.

## Scope (High level)
- UI/UX polish and responsiveness
- Smoother product flow (SPA experience)
- Quality checks before release

## Next Steps
- Extract pain points from the report
- Prioritize work
- Run a fix pass followed by QA

## Meta
- **Template**: Client Report
- **Confidence**: ${confidence}
${toneFooterEn(tone)}
`,
  },

  final_qa: {
    title: "Final QA",
    render: ({ tone, confidence }) => `## Final QA Checklist (Before Delivery)

## Build & Deploy
- Fresh install completes without errors
- Build/release passes without critical warnings
- Validate production build behavior in a realistic environment

## Functional QA
- Core screens work end-to-end
- Forms: validation + clear error messaging
- Loading/empty/error states handled intentionally

## UI/UX
- Component consistency
- Full responsive coverage
- Basic accessibility hygiene

## Stability
- Consistent error handling patterns
- Logs sufficient for diagnosis (without noise)

## Meta
- **Template**: Final QA
- **Confidence**: ${confidence}
${toneFooterEn(tone)}
`,
  },

  fullstack_polish: {
    title: "Fullstack Polish",
    render: ({ tone, facts, signals, confidence, reportText, decision }) => `## Project Overview
The system reads as **fullstack** (frontend + backend) with a solid base, but needs polish for stable, client-ready delivery.

## What was detected (from the report)
${renderDetectedEN(facts)}

## Priorities (Decision Engine)
${renderPrioritiesEN(decision)}

## Main Goal
Deliver an end-to-end experience: consistent UI, predictable APIs, high stability, and clean build/deploy.

## Focus Areas
${renderActionsEN(facts, "fullstack")}

## Report phrases (examples)
${renderQuotedIssueLinesEN(facts, reportText)}

## Expected Result
A modern, stable, presentable system ready for real-world use and stakeholder demos.

## Meta
- **Template**: Fullstack Polish
- **Confidence**: ${confidence}
- **Signals**: ${signals.join(", ") || "—"}
${toneFooterEn(tone)}
`,
  },

  general: {
    title: "General",
    render: ({ confidence, tone, signals, facts, decision, reportText }) => `## Summary
Report received and analyzed. Not enough strong signals to pick a specialized template with high confidence.
This output is a **reliable starting point** — not a substitute for hands-on review of code and environment.

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
${toneFooterEn(tone)}
`,
  },
};

function toneFooter(tone) {
  if (tone === "sharp") return `\n---\n**Style**: חד — קצר, תכל׳ס, בלי מריחה.\n`;
  if (tone === "client") return `\n---\n**Style**: ללקוח — שפה נקייה, בלי ז׳רגון מיותר.\n`;
  if (tone === "cursor") return `\n---\n**Style**: ל‑AI (Cursor) — ממוקד ביצוע, נקודות מדויקות לאבחון.\n`;
  return `\n---\n**Style**: מקצועי — ברור, מסודר, פרקטי.\n`;
}

function toneFooterEn(tone) {
  if (tone === "sharp") return `\n---\n**Style**: Sharp — short, direct, no fluff.\n`;
  if (tone === "client") return `\n---\n**Style**: Client-ready — clean language, minimal jargon.\n`;
  if (tone === "cursor") return `\n---\n**Style**: For AI (Cursor) — execution-focused, precise diagnostic points.\n`;
  return `\n---\n**Style**: Professional — clear, structured, practical.\n`;
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

function renderActionsEN(facts, mode) {
  const hints = new Set((facts?.actionHints || []).filter(Boolean));
  const lines = [];

  if (mode === "ui" || mode === "fullstack") {
    lines.push("- **Small design system**: colors, typography, spacing, core components.");
    if (hints.has("ui_responsive")) lines.push("- **Responsive pass**: mobile → tablet → desktop (include RTL if applicable).");
    if (hints.has("ui_accessibility")) lines.push("- **Accessibility**: visible focus, contrast, keyboard navigation, labels/aria.");
    lines.push("- **UX pass**: loading/empty/error states, user feedback, forms and actions.");
  }

  if (mode === "backend" || mode === "fullstack") {
    lines.push("- **API contracts**: validation, schemas, consistent error responses.");
    if (hints.has("backend_auth")) lines.push("- **Auth**: JWT/session, permissions, refresh flows, login hardening.");
    if (hints.has("backend_db")) lines.push("- **DB**: indexes, query performance, connection stability, timeouts.");
    lines.push("- **Observability**: actionable logs, centralized error handling, basic tracing.");
  }

  if (mode === "performance") {
    lines.push("- **Quick wins**: identify slow screens/actions, measure before/after.");
    lines.push("- **Frontend performance**: smaller bundles, lazy-load, images, caching.");
    lines.push("- **Backend performance**: query tuning, indexes, caching, avoid N+1.");
    lines.push("- **UX**: skeletons/loading states, debounce, pagination where needed.");
  }

  if (mode === "ui" || mode === "backend" || mode === "performance" || mode === "fullstack") {
    return lines.join("\n");
  }
  return "- **Next steps**: prioritize, execute, QA.";
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

const INVALID_COPY = {
  he: {
    header: "## הקלט לא נחשב כדוח מצב תקף",
    lead:
      "הכלי עובד לפי **זיהוי דטרמיניסטי**: מילות מפתח, טכנולוגיות, ושורות בעיה בטקסט. מה שהדבקת **לא נראה כמו דוח אתר/מוצר** שניתן לבסס עליו תוצאה אמינה — לכן **לא נוצר דוח מקצועי** (ולא “מילאנו מילים סתם”).",
    why: "### למה זה נחסם",
    expect: "### מה כן להדביק (דוגמה למבנה)",
    expectBullets: `- Frontend / Backend / Deploy (או מטרה ברורה)\n- טכנולוגיות: React, Node, DB, Vercel…\n- בעיות כרשימה: שגיאות, 500, UI שבור, איטיות`,
    note:
      "### חשוב להבין\nהמערכת **לא קוראת כמו אדם** ולא מבינה שיח חופשי עמוק. ככל שיש בדוח **יותר אותות קונקרטיים** — הניתוח והפלט יהיו קשורים יותר למה שכתבת.",
    reasons: {
      too_short: "הטקסט קצר מדי — אין מספיק הקשר כדי לסווג אותו כדוח.",
      too_few_letters: "כמעט אין אותיות (עברית/אנגלית) — נראה כמו רעש ולא כמו דוח.",
      noise: "יותר מדי תווים מיוחדים או סימנים בלי תוכן מילולי ברור.",
      repetitive: "חזרות חזקות על אותו תו או דפוס — לא נראה כמו דוח אמיתי.",
      too_few_words: "מעט מדי מילים; דוח מצב בדרך כלל כולל כמה משפטים או רשימות.",
      repetitive_words: "חזרות על אותן מילים בלי תוכן מהותי.",
      no_clear_signal:
        "לא זוהו טכנולוגיות, שורות בעיה או מילות מפתח שהמנוע מזהה — אי אפשר לייצר תוכנית רלוונטית לטקסט הזה.",
      default: "הקלט לא עומד בסף המינימלי לדוח שניתן לנתח.",
    },
  },
  en: {
    header: "## This input is not a valid status report",
    lead:
      "This tool uses **deterministic matching** (keywords, stack hints, issue lines). What you pasted **does not read like a real site/product report** we can trust — so **no professional brief was generated** (we are not fabricating a report).",
    why: "### Why it was blocked",
    expect: "### What to paste (structure hint)",
    expectBullets: `- Sections like Frontend / Backend / Deploy (or a clear goal)\n- Tech names: React, Node, DB, hosting…\n- Issues as bullets: errors, 500s, broken UI, slowness`,
    note:
      "### Please note\nThe analyzer **does not read like a human** and does not deeply “understand” free chat. More **concrete signals** in your text → more relevant output.",
    reasons: {
      too_short: "The text is too short — not enough context to treat it as a report.",
      too_few_letters: "Almost no letters (Latin/Hebrew) — looks like noise, not a report.",
      noise: "Too many symbols / special characters without clear wording.",
      repetitive: "Heavy repetition of the same character or pattern — unlikely to be a real report.",
      too_few_words: "Too few words; status reports usually include sentences or lists.",
      repetitive_words: "Repeated words without meaningful substance.",
      no_clear_signal:
        "No technologies, issue lines, or recognizable keywords were found — we cannot produce a relevant plan from this text.",
      default: "The input does not meet the minimum bar for analyzable report text.",
    },
  },
};

/** Markdown shown when input fails quality / signal checks (HE/EN). */
export function getInvalidInputMarkdown(lang, code) {
  const pack = lang === "en" ? INVALID_COPY.en : INVALID_COPY.he;
  const reason = pack.reasons[code] || pack.reasons.default;
  return [
    pack.header,
    "",
    pack.lead,
    "",
    pack.why,
    reason,
    "",
    pack.expect,
    pack.expectBullets,
    "",
    pack.note,
  ].join("\n");
}

export function getTemplates(lang) {
  return lang === "en" ? EN : HE;
}

/** Ensures every canonical template key exists in both locales (no silent cross-language fallback). */
export function verifyTemplateLocaleParity() {
  const missingHe = TEMPLATE_KEYS.filter((k) => !HE[k]?.render);
  const missingEn = TEMPLATE_KEYS.filter((k) => !EN[k]?.render);
  const extraHe = Object.keys(HE).filter((k) => !TEMPLATE_KEYS.includes(k));
  const extraEn = Object.keys(EN).filter((k) => !TEMPLATE_KEYS.includes(k));
  return {
    ok: missingHe.length === 0 && missingEn.length === 0 && extraHe.length === 0 && extraEn.length === 0,
    missingHe,
    missingEn,
    extraHe,
    extraEn,
  };
}

