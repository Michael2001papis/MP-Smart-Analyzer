/** Client access gate — static site; password is visible in source (UX layer only). */

export const GATE_STORAGE_KEY = "MP_CLIENT_GATE_V1";
export const IDLE_MS = 10 * 24 * 60 * 60 * 1000;

const CLIENT_PASSWORD = "MP321321";

const ACTIVITY_SAVE_THROTTLE_MS = 60 * 1000;
const STALE_CHECK_INTERVAL_MS = 10 * 60 * 1000;

let activityTimer = null;
let lastSavedAt = 0;
let trackingOn = false;

function readSession() {
  try {
    const raw = localStorage.getItem(GATE_STORAGE_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    if (typeof j.lastActivityAt !== "number" || Number.isNaN(j.lastActivityAt)) return null;
    return j;
  } catch {
    return null;
  }
}

export function isSessionValid() {
  const j = readSession();
  if (!j) return false;
  if (Date.now() - j.lastActivityAt > IDLE_MS) {
    localStorage.removeItem(GATE_STORAGE_KEY);
    return false;
  }
  return true;
}

function saveActivityNow() {
  const data = { lastActivityAt: Date.now() };
  try {
    localStorage.setItem(GATE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota / private mode */
  }
  lastSavedAt = Date.now();
}

function bumpActivityThrottled() {
  const now = Date.now();
  if (now - lastSavedAt >= ACTIVITY_SAVE_THROTTLE_MS) {
    saveActivityNow();
  }
}

function lockAndReload() {
  try {
    localStorage.removeItem(GATE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.location.reload();
}

function checkStaleness() {
  if (!trackingOn) return;
  if (!isSessionValid()) {
    trackingOn = false;
    lockAndReload();
  }
}

export function startActivityTracking() {
  if (trackingOn) return;
  trackingOn = true;
  lastSavedAt = 0;
  saveActivityNow();

  const onPulse = () => bumpActivityThrottled();
  ["click", "keydown", "scroll", "touchstart"].forEach((ev) => {
    document.addEventListener(ev, onPulse, { passive: true, capture: true });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkStaleness();
      bumpActivityThrottled();
    }
  });

  activityTimer = window.setInterval(() => {
    if (document.visibilityState === "visible") checkStaleness();
  }, STALE_CHECK_INTERVAL_MS);
}

function waitForPassword() {
  const root = document.getElementById("clientGateRoot");
  const input = document.getElementById("clientGatePassword");
  const btn = document.getElementById("clientGateSubmit");
  const err = document.getElementById("clientGateError");
  const form = document.getElementById("clientGateForm");

  if (!root || !input || !btn || !err) {
    console.error("clientGate: missing DOM");
    return new Promise(() => {
      /* block — missing gate markup */
    });
  }

  const showErr = (msg) => {
    err.textContent = msg;
    err.hidden = !msg;
  };

  const tryUnlock = () => {
    const v = (input.value || "").trim();
    if (v === CLIENT_PASSWORD) {
      showErr("");
      input.value = "";
      return true;
    }
    showErr(err.dataset.msgBad || "Wrong password");
    input.select();
    return false;
  };

  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      if (tryUnlock()) {
        settled = true;
        resolve();
      }
    };

    btn.addEventListener("click", done);
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      done();
    });
    input.focus();
  });
}

/**
 * Resolves when the user may use the app (existing valid session or correct password).
 */
export async function ensureUnlocked() {
  if (isSessionValid()) {
    document.documentElement.classList.add("mp-session-ok", "mp-app-ready");
    startActivityTracking();
    return;
  }

  document.documentElement.classList.remove("mp-session-ok", "mp-app-ready");
  await waitForPassword();
  saveActivityNow();
  document.documentElement.classList.add("mp-session-ok", "mp-app-ready");
  startActivityTracking();
}
