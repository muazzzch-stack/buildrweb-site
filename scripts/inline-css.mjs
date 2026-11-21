// Post-build: inline the (small) stylesheet into every prerendered page so CSS no longer blocks first paint.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = "dist/client";
if (!existsSync(root)) process.exit(0);
const walk = (dir) => readdirSync(dir).flatMap((name) => { const p = join(dir, name); return statSync(p).isDirectory() ? walk(p) : [p]; });
let count = 0;
for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  let html = readFileSync(file, "utf8");
  html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (tag) => {
    const href = /href="([^"]+)"/.exec(tag)?.[1];
    if (!href || !href.startsWith("/assets/")) return tag;
    const path = join(root, href);
    if (!existsSync(path)) return tag;
    count++;
    return `<style data-inlined>${readFileSync(path, "utf8")}</style>`;
  });
  writeFileSync(file, html);
}
console.log(`[inline-css] inlined stylesheet into ${count} page(s)`);
