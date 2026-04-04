import { ensureUnlocked } from "./clientGate.js";

await ensureUnlocked();
await import("./app.js");
