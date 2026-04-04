export const TEMPLATE_KEYS = [
  "spa_upgrade",
  "ui_ux_fix",
  "performance_fix",
  "client_report",
  "final_qa",
  "stability_fix",
  "backend_api",
  "fullstack_polish",
  "general",
];

/**
 * Each rule adds weighted evidence for templates.
 * Keep it explainable and deterministic (MVP).
 */
export const RULES = [
  // Frontend / SPA
  {
    id: "frontend_stack_react",
    // Intentionally omit bare "ui" — use ui_ux_focus for pure UI wording to avoid false SPA wins.
    whenAny: ["react", "vite", "webpack", "tsc", "spa", "frontend"],
    weights: { spa_upgrade: 2.0, ui_ux_fix: 0.5 },
    signals: ["frontend"],
  },
  {
    id: "frontend_next",
    whenAny: ["next.js", "nextjs", "vercel", "pages router", "app router"],
    weights: { spa_upgrade: 1.2, final_qa: 0.6, client_report: 0.4 },
    signals: ["frontend"],
  },

  // UI / UX focus
  {
    id: "ui_ux_focus",
    whenAny: ["ui", "ux", "design", "responsive", "layout", "typography", "spacing", "mobile", "rtl", "accessibility", "a11y"],
    weights: { ui_ux_fix: 2.0, final_qa: 0.6 },
    signals: ["uiux"],
  },

  // Performance focus
  {
    id: "performance_focus",
    whenAny: ["performance", "slow", "slowness", "lag", "lcp", "cls", "ttfb", "bundle", "heavy", "optimize", "optimization", "memory", "leak", "cpu", "perf", "slowdown"],
    weights: { performance_fix: 2.2, final_qa: 0.4 },
    signals: ["performance"],
  },

  // Backend / API focus
  {
    id: "backend_node",
    whenAny: ["node", "express", "nestjs", "jwt", "mongo", "mongodb", "mongoose", "postgres", "mysql", "redis", "api", "rest", "graphql"],
    weights: { backend_api: 2.0, fullstack_polish: 0.8 },
    signals: ["backend"],
  },
  {
    id: "backend_deploy",
    whenAny: ["vercel", "render", "railway", "fly.io", "docker", "docker-compose", "kubernetes", "nginx"],
    weights: { final_qa: 1.0, client_report: 0.7, fullstack_polish: 0.7 },
    signals: ["deployment"],
  },

  // Instability / bugs
  {
    id: "stability",
    // Avoid overly broad words like "broken"/"cannot" which appear in UI context.
    whenAny: ["error", "errors", "bug", "bugs", "unstable", "crash", "exception", "traceback", "500", "failed", "timeout", "timed out"],
    weights: { stability_fix: 2.2, final_qa: 0.8 },
    signals: ["stability"],
  },

  // Client / delivery
  {
    id: "client_delivery",
    whenAny: ["client", "handover", "delivery", "before release", "launch", "presentation", "demo", "stakeholder", "לקוח", "מסירה", "דמו", "פרזנטציה"],
    weights: { client_report: 2.0, final_qa: 1.2 },
    signals: ["client"],
  },

  // Fullstack
  {
    id: "fullstack_combo",
    whenAll: [["react", "api"], ["frontend", "backend"], ["jwt", "react"], ["mongodb", "react"]],
    weights: { fullstack_polish: 2.3, final_qa: 0.9, client_report: 0.6 },
    signals: ["fullstack"],
  },

  {
    id: "frontend_alt_stacks",
    whenAny: ["vue", "nuxt", "angular", "svelte", "solidjs", "remix", "astro"],
    weights: { spa_upgrade: 1.5, ui_ux_fix: 0.65, final_qa: 0.45 },
    signals: ["frontend"],
  },
  {
    id: "typescript_stack",
    whenAny: ["typescript", "tsx"],
    weights: { spa_upgrade: 0.85, final_qa: 0.35, stability_fix: 0.2 },
    signals: ["frontend"],
  },
  {
    id: "python_backend",
    whenAny: ["python", "django", "flask", "fastapi", "uvicorn", "gunicorn", "sqlalchemy"],
    weights: { backend_api: 2.0, fullstack_polish: 0.75 },
    signals: ["backend"],
  },
  {
    id: "security_focus",
    whenAny: ["security", "xss", "csrf", "cors", "injection", "oauth", "penetration", "cve", "vulnerability"],
    weights: { backend_api: 1.35, stability_fix: 1.1, final_qa: 0.75 },
    signals: ["security"],
  },
  {
    id: "test_ci_focus",
    whenAny: ["jest", "vitest", "playwright", "cypress", "e2e", "unit test", "github actions", "ci/cd", "gitlab ci", "pipeline"],
    weights: { final_qa: 1.85, stability_fix: 0.55, fullstack_polish: 0.45 },
    signals: ["quality"],
  },
  {
    id: "orm_data_layer",
    whenAny: ["prisma", "typeorm", "sequelize", "drizzle"],
    weights: { backend_api: 1.45, stability_fix: 0.35 },
    signals: ["backend"],
  },
  {
    id: "realtime_layer",
    whenAny: ["websocket", "socket.io", "sse", "server-sent events"],
    weights: { backend_api: 1.35, fullstack_polish: 0.55 },
    signals: ["backend"],
  },
  {
    id: "mobile_pwa",
    whenAny: ["pwa", "service worker", "capacitor", "react native", "expo", "ionic"],
    weights: { spa_upgrade: 1.0, ui_ux_fix: 1.1, final_qa: 0.7 },
    signals: ["frontend"],
  },
  {
    id: "backend_jvm_systems",
    whenAny: [
      "spring boot",
      "springboot",
      "kotlin",
      "quarkus",
      "micronaut",
      "golang",
      "actix",
      "axum",
      "asp.net",
      ".net core",
      "dotnet",
      "entity framework",
      "hibernate",
      "jdbc",
    ],
    weights: { backend_api: 1.9, fullstack_polish: 0.65, stability_fix: 0.25 },
    signals: ["backend"],
  },
  {
    id: "cms_content",
    whenAny: ["wordpress", "drupal", "contentful", "strapi", "sanity", "headless cms"],
    weights: { spa_upgrade: 1.05, backend_api: 0.85, final_qa: 0.55 },
    signals: ["content"],
  },
  {
    id: "payments_billing",
    whenAny: ["stripe", "paypal", "billing", "subscription", "checkout", "pci-dss", "pci"],
    weights: { backend_api: 1.55, stability_fix: 0.65, final_qa: 0.72 },
    signals: ["payments"],
  },
  {
    id: "i18n_locale",
    whenAny: ["i18n", "internationalization", "localization", "locale", "l10n", "translation"],
    weights: { ui_ux_fix: 1.25, spa_upgrade: 0.55, final_qa: 0.42 },
    signals: ["i18n"],
  },
  {
    id: "monorepo_tooling",
    whenAny: ["monorepo", "turborepo", "pnpm workspace", "lerna"],
    weights: { final_qa: 1.05, spa_upgrade: 0.48, stability_fix: 0.38, fullstack_polish: 0.4 },
    signals: ["monorepo"],
  },
  {
    id: "messaging_events",
    whenAny: ["kafka", "rabbitmq", "amazon sqs", "aws sqs", "sns", "pubsub", "pub/sub", "event bus", "message queue"],
    weights: { backend_api: 1.65, stability_fix: 0.48, fullstack_polish: 0.35 },
    signals: ["integrations"],
  },
  {
    id: "observability_ops",
    whenAny: ["datadog", "grafana", "prometheus", "opentelemetry", "sentry", "new relic", "logging", "structured logs"],
    weights: { stability_fix: 0.85, backend_api: 0.9, final_qa: 0.55 },
    signals: ["observability"],
  },
];

export function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/\u200f|\u200e/g, "") // RLM/LRM
    .replace(/[“”]/g, '"')
    .replace(/[’‘]/g, "'")
    // Keep newlines for paragraph-aware extraction later; normalize spaces only.
    .replace(/[ \t]+/g, " ")
    .trim();
}

function includesAll(haystack, needles) {
  return needles.every((n) => haystack.includes(n));
}

function includesAny(haystack, needles) {
  return needles.some((n) => haystack.includes(n));
}

function safeLines(rawText) {
  return String(rawText || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function extractTech(text) {
  const needles = [
    "react",
    "next.js",
    "nextjs",
    "vite",
    "webpack",
    "vue",
    "nuxt",
    "angular",
    "svelte",
    "typescript",
    "node",
    "express",
    "nestjs",
    "python",
    "django",
    "flask",
    "fastapi",
    "jwt",
    "mongodb",
    "mongo",
    "mongoose",
    "postgres",
    "postgresql",
    "mysql",
    "redis",
    "graphql",
    "rest",
    "prisma",
    "docker",
    "docker-compose",
    "kubernetes",
    "nginx",
    "vercel",
  ];
  return uniq(needles.filter((n) => text.includes(n))).slice(0, 12);
}

function extractIssueLines(rawText) {
  const lines = safeLines(rawText);
  const isIssue = (l) =>
    /(^-|^•|^(\d+)[\).\]])/.test(l) &&
    /error|errors|bug|broken|failed|crash|exception|500|timeout|unstable|issue|problem|slow|performance|design|responsive|accessibility|layout|spacing|typography|rtl|נגישות|שגיאה|באג|קריסה|איטי|ביצועים|עיצוב|רספונסיב|פריסה|ריווח|טיפוגרפיה/i.test(l);
  const cleaned = lines
    .filter(isIssue)
    .map((l) => l.replace(/^(-|•)\s+/, "").replace(/^(\d+)[\).\]]\s+/, "").trim())
    .filter(Boolean);
  return cleaned.slice(0, 8);
}

function extractActionHints(text) {
  const hints = [];
  const add = (key) => hints.push(key);
  if (includesAny(text, ["responsive", "mobile", "layout", "rtl", "spacing", "typography"])) add("ui_responsive");
  if (includesAny(text, ["accessibility", "a11y", "contrast", "focus", "keyboard", "נגישות"])) add("ui_accessibility");
  if (includesAny(text, ["design", "ux", "ui"])) add("ui_design_system");
  if (includesAny(text, ["error", "errors", "exception", "traceback", "500", "failed", "crash", "שגיאה", "באג"])) add("stability_errors");
  if (includesAny(text, ["auth", "jwt", "login", "session"])) add("backend_auth");
  if (includesAny(text, ["db", "database", "mongo", "mongodb", "postgres", "mysql", "redis"])) add("backend_db");
  if (includesAny(text, ["performance", "slow", "ttfb", "lcp", "bundle", "optimize", "איטי", "ביצועים"])) add("performance");
  return uniq(hints);
}

function detectInputType(text, facts, signals) {
  const sig = new Set((signals || []).filter(Boolean));
  const issues = (facts?.issueLines || []).length;

  if (includesAny(text, ["qa", "checklist", "test plan", "regression", "בדיקות", "צ'ק ליסט", "צ׳ק ליסט"])) return "qa";
  if (sig.has("stability") || includesAny(text, ["bug", "bugs", "error", "errors", "exception", "traceback", "500", "failed", "timeout", "שגיאה", "באג", "קריסה"])) return "bug_report";
  if (sig.has("uiux") || includesAny(text, ["ui", "ux", "design", "responsive", "accessibility", "typography", "spacing", "layout", "rtl"])) return "ui_audit";
  if (sig.has("client") || includesAny(text, ["client", "handover", "delivery", "demo", "לקוח", "מסירה", "דמו"])) return "status_report";
  if (issues >= 3 || includesAny(text, ["frontend:", "backend:", "deploy:", "stack", "environment", "מטרה:", "frontend", "backend", "deploy"])) return "status_report";
  return "free_text";
}

function recommendOutputType(inputType, templateKey, signals, facts) {
  const sig = new Set((signals || []).filter(Boolean));
  const severity = computeSeverity(`${templateKey || ""} ${(signals || []).join(" ")}`, facts);

  if (sig.has("client") || templateKey === "client_report") return "client_report";
  if (inputType === "qa" || templateKey === "final_qa") return "checklist";
  if (inputType === "bug_report" || severity >= 0.7) return "instructions";
  if (inputType === "status_report") return "instructions";
  if (inputType === "ui_audit") return "instructions";
  return "summary";
}

function computeSeverity(text, facts) {
  // 0..1 normalized severity
  let score = 0.15;
  const issues = (facts?.issueLines || []).length;
  if (issues >= 6) score += 0.35;
  else if (issues >= 3) score += 0.22;
  else if (issues >= 1) score += 0.12;

  if (includesAny(text, ["crash", "exception", "traceback", "500", "fatal", "data loss", "security", "breach", "p0", "sev", "שגיאה", "קריסה"])) {
    score += 0.35;
  }

  const hints = new Set((facts?.actionHints || []).filter(Boolean));
  if (hints.has("stability_errors")) score += 0.18;
  if (hints.has("performance")) score += 0.10;

  return Math.max(0.1, Math.min(1, Number(score.toFixed(2))));
}

function computePriorityPlan(facts, signals) {
  const hints = new Set((facts?.actionHints || []).filter(Boolean));
  const sig = new Set((signals || []).filter(Boolean));

  const critical = [];
  const important = [];
  const later = [];

  if (hints.has("stability_errors") || sig.has("stability")) {
    critical.push({ he: "לייצב קודם: לשחזר, לאסוף stack trace/לוגים, ולסגור שגיאות 500/קריסות.", en: "Stabilize first: reproduce, capture logs/stack traces, and close critical 500/crash/timeouts." });
    important.push({ he: "לאחד טיפול שגיאות (error handling) ולהוסיף guardrails (ולידציות/timeouts).", en: "Unify error handling and add guardrails (validation/timeouts) to prevent repeats." });
  }

  if (hints.has("backend_auth"))
    important.push({ he: "להקשיח Auth/Login (JWT/session, הרשאות, תרחישי קצה, refresh).", en: "Harden Auth/Login (JWT/session, permissions, edge cases, refresh flows)." });
  if (hints.has("backend_db"))
    important.push({ he: "לבדוק DB: אינדקסים/שאילתות/זמני תגובה/connection stability.", en: "Review DB: indexes/queries/latency and connection stability." });

  if (hints.has("performance") || sig.has("performance")) {
    important.push({ he: "להגדיר מדידה: לפני/אחרי (TTFB/LCP/זמנים במסכים) ולזהות bottleneck.", en: "Set a baseline (TTFB/LCP/action timings) and identify the bottleneck." });
    later.push({ he: "אופטימיזציות: caching/lazy-load/פיצול bundle/אינדקסים לפי הצורך.", en: "Optimize: caching/lazy-load/bundle splitting/index tuning as needed." });
  }

  if (hints.has("ui_responsive") || sig.has("uiux") || sig.has("frontend")) {
    important.push({ he: "לעשות Responsive pass (מובייל→דסקטופ) וליישר ריווחים/טיפוגרפיה.", en: "Run a responsive pass (mobile→desktop) and align spacing/typography." });
  }
  if (hints.has("ui_accessibility"))
    later.push({ he: "סבב נגישות בסיסית: focus-visible, labels/aria, קונטרסט, ניווט מקלדת.", en: "Basic accessibility pass: focus-visible, labels/aria, contrast, keyboard navigation." });
  if (hints.has("ui_design_system"))
    later.push({ he: "להגדיר design system קטן לרכיבים (Buttons/Inputs/Cards) כדי לייצר עקביות.", en: "Define a small design system (buttons/inputs/cards) for consistency." });

  if (sig.has("client")) {
    important.push({ he: "לייצר deliverables למסירה: סטטוס, תיעדוף, צ׳ק-ליסט QA, והכנה לדמו.", en: "Prepare client deliverables: status, priorities, QA checklist, and demo readiness." });
  }

  const uniqueByHe = (arr) => {
    const seen = new Set();
    const out = [];
    for (const item of arr) {
      const key = typeof item === "string" ? item : item?.he || JSON.stringify(item);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
    return out;
  };

  return {
    critical: uniqueByHe(critical).slice(0, 4),
    important: uniqueByHe(important).slice(0, 6),
    later: uniqueByHe(later).slice(0, 6),
  };
}

function computeResponseMode(templateKey, signals, severity) {
  const sig = new Set((signals || []).filter(Boolean));
  if (sig.has("client") || templateKey === "client_report") return "client_report";
  if (templateKey === "final_qa") return "qa";
  if (templateKey === "stability_fix" || severity >= 0.7) return "fix";
  if (templateKey === "performance_fix" || sig.has("performance")) return "performance";
  return "polish";
}

function computeAutoTone(templateKey, signals, severity, facts) {
  const sig = new Set((signals || []).filter(Boolean));
  const hints = new Set((facts?.actionHints || []).filter(Boolean));
  if (sig.has("client") || templateKey === "client_report") return "client";
  if (severity >= 0.75 || hints.has("stability_errors")) return "sharp";
  return "professional";
}

export function evaluateRules(reportText) {
  const raw = String(reportText || "");
  const text = normalize(raw);
  const evidence = {
    scores: Object.fromEntries(TEMPLATE_KEYS.map((k) => [k, 0])),
    matchedRules: [],
    signals: new Set(),
    facts: {
      length: text.length,
      hasHebrew: /[\u0590-\u05FF]/.test(text),
      hasEnglish: /[a-z]/.test(text),
      tech: [],
      issueLines: [],
      actionHints: [],
      inputType: "free_text",
    },
  };

  for (const rule of RULES) {
    const anyOk = rule.whenAny ? includesAny(text, rule.whenAny) : true;
    const allGroupsOk = rule.whenAll
      ? rule.whenAll.some((group) => includesAll(text, group))
      : true;

    if (anyOk && allGroupsOk) {
      for (const [k, w] of Object.entries(rule.weights || {})) {
        if (k in evidence.scores) evidence.scores[k] += w;
      }
      for (const s of rule.signals || []) evidence.signals.add(s);
      evidence.matchedRules.push(rule.id);
    }
  }

  evidence.facts.tech = extractTech(text);
  evidence.facts.issueLines = extractIssueLines(raw);
  evidence.facts.actionHints = extractActionHints(text);
  // Input type is computed after rules (uses signals + extracted hints).
  evidence.facts.inputType = detectInputType(text, evidence.facts, Array.from(evidence.signals));

  return {
    ...evidence,
    signals: Array.from(evidence.signals),
  };
}

export function decide(analysis, templateKey) {
  const signals = analysis?.signals || [];
  const facts = analysis?.facts || {};
  // Minimal deterministic decision layer (based on extracted facts + selected template).
  const severity = computeSeverity(`${templateKey || ""} ${(signals || []).join(" ")}`, facts);
  const mode = computeResponseMode(templateKey, signals, severity);
  const autoTone = computeAutoTone(templateKey, signals, severity, facts);
  const priorities = computePriorityPlan(facts, signals);
  const inputType = facts?.inputType || detectInputType("", facts, signals);
  const recommendedOutputType = recommendOutputType(inputType, templateKey, signals, facts);

  return {
    templateKey: templateKey || "general",
    inputType,
    responseMode: mode,
    severity,
    autoTone,
    recommendedOutputType,
    priorities,
  };
}

/**
 * Short / non-technical reports get a modest **general** boost so we do not
 * over-fit a specialized template from one accidental keyword.
 */
function applySparseReportBias(base, facts, matchedRules) {
  const len = Number(facts?.length) || 0;
  const ruleCount = Array.isArray(matchedRules) ? matchedRules.length : 0;
  const techCount = (facts?.tech || []).length;
  const issueCount = (facts?.issueLines || []).length;

  const verySparse = len < 64 && ruleCount <= 1 && techCount === 0 && issueCount === 0;
  const sparse = len < 120 && ruleCount <= 2 && techCount <= 1 && issueCount <= 1;

  if (verySparse) base.general += 1.05;
  else if (sparse) base.general += 0.52;
}

/**
 * Context boosts reduce “coin toss” when multiple templates tie on keywords.
 * Tie-break uses TEMPLATE_KEYS order (deterministic).
 */
export function pickTemplate(scores, facts = null, matchedRules = null) {
  const base = { ...(scores || {}) };
  for (const k of TEMPLATE_KEYS) {
    if (!(k in base)) base[k] = 0;
    else base[k] = Number(base[k]) || 0;
  }

  const hints = new Set(facts?.actionHints || []);
  const rules = new Set(matchedRules || []);

  if (hints.has("stability_errors") && rules.has("stability")) {
    base.stability_fix += 0.48;
  }
  if (hints.has("performance") && rules.has("performance_focus")) {
    base.performance_fix += 0.28;
  }
  if (rules.has("ui_ux_focus") && !rules.has("stability")) {
    base.ui_ux_fix += 0.18;
  }
  if (rules.has("fullstack_combo") || (rules.has("backend_node") && rules.has("frontend_stack_react"))) {
    base.fullstack_polish += 0.22;
  }

  applySparseReportBias(base, facts, matchedRules);

  const entries = TEMPLATE_KEYS.map((k) => [k, base[k]]);
  entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return TEMPLATE_KEYS.indexOf(a[0]) - TEMPLATE_KEYS.indexOf(b[0]);
  });

  const [bestKey, bestScore] = entries[0] || ["general", 0];
  const secondScore = entries[1]?.[1] ?? 0;
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  if (!total || bestScore <= 0) {
    return { templateKey: "general", confidence: 0.25 };
  }

  const margin = bestScore - secondScore;
  const share = bestScore / total;
  let confidence = 0.28 + 0.44 * Math.min(1, share * 1.15) + 0.24 * Math.min(1, margin / 2.8);
  if (margin < 0.2 && share < 0.42) confidence -= 0.07;
  confidence = Math.min(0.95, Math.max(0.25, confidence));
  return { templateKey: bestKey, confidence: Number(confidence.toFixed(2)) };
}

