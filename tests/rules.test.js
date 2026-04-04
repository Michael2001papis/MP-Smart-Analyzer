import test from "node:test";
import assert from "node:assert/strict";
import {
  TEMPLATE_KEYS,
  normalize,
  evaluateRules,
  pickTemplate,
  decide,
} from "../rules.js";

test("normalize strips RLM/LRM and lowercases", () => {
  assert.equal(normalize("\u200fHello"), "hello");
  assert.equal(normalize("  Foo  Bar  "), "foo bar");
});

test("evaluateRules matches frontend + stability on typical report", () => {
  const a = evaluateRules(`Status: React + Vite
- errors on login and intermittent 500
`);
  assert.ok(a.matchedRules.includes("frontend_stack_react"));
  assert.ok(a.matchedRules.includes("stability"));
  assert.ok(a.signals.includes("frontend"));
  assert.ok(a.signals.includes("stability"));
});

test("evaluateRules detects python backend", () => {
  const a = evaluateRules("FastAPI service with postgres and redis");
  assert.ok(a.matchedRules.includes("python_backend"));
  assert.ok(a.matchedRules.includes("backend_node") || a.scores.backend_api > 0);
});

test("pickTemplate returns general when no rule fired", () => {
  const zeros = Object.fromEntries(TEMPLATE_KEYS.map((k) => [k, 0]));
  const r = pickTemplate(zeros, { actionHints: [] }, []);
  assert.equal(r.templateKey, "general");
  assert.equal(r.confidence, 0.25);
});

test("pickTemplate tie-break is deterministic via TEMPLATE_KEYS order", () => {
  const s = Object.fromEntries(TEMPLATE_KEYS.map((k) => [k, 0]));
  s.spa_upgrade = 2;
  s.ui_ux_fix = 2;
  const r = pickTemplate(s, { actionHints: [] }, []);
  assert.equal(r.templateKey, "spa_upgrade");
});

test("pickTemplate boosts stability_fix when stability errors hint + stability rule", () => {
  const a = evaluateRules(`React frontend
- 500 errors and timeout on save
`);
  const r = pickTemplate(a.scores, a.facts, a.matchedRules);
  assert.equal(r.templateKey, "stability_fix");
});

test("decide returns expected shape", () => {
  const a = evaluateRules("UI spacing and typography issues on mobile");
  const d = decide(a, "ui_ux_fix");
  assert.ok(typeof d.severity === "number");
  assert.ok(d.priorities && Array.isArray(d.priorities.important));
  assert.ok(d.recommendedOutputType);
  assert.ok(d.autoTone);
});

test("verifyTemplateLocaleParity: HE and EN mirror TEMPLATE_KEYS exactly", async () => {
  const { verifyTemplateLocaleParity, getTemplates } = await import("../templates.js");
  const r = verifyTemplateLocaleParity();
  assert.ok(r.ok, JSON.stringify(r));

  const he = getTemplates("he");
  const en = getTemplates("en");
  for (const key of TEMPLATE_KEYS) {
    assert.ok(he[key]?.render, `Hebrew templates missing key: ${key}`);
    assert.ok(en[key]?.render, `English templates missing key: ${key}`);
    assert.ok(typeof en[key].title === "string");
  }
});

test("javascript stack does not false-match JVM/java backend rule", () => {
  const a = evaluateRules("We use JavaScript, Node and React only");
  assert.ok(!a.matchedRules.includes("backend_jvm_systems"));
});

test("very short vague input stays general", () => {
  const a = evaluateRules("help");
  const r = pickTemplate(a.scores, a.facts, a.matchedRules);
  assert.equal(r.templateKey, "general");
});
