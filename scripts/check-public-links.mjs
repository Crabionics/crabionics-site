import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(".next/server/app");
const pages = new Map();
async function walk(dir) {
  for (const file of await readdir(dir, {withFileTypes:true})) {
    const filename = path.join(dir,file.name);
    if (file.isDirectory()) await walk(filename);
    else if (file.name.endsWith(".html")) {
      const route = "/" + path.relative(root,filename).replaceAll(path.sep,"/").replace(/\.html$/,"").replace(/^index$/,"");
      pages.set(route, await readFile(filename,"utf8"));
    }
  }
}
await walk(root);
const errors = [];
for (const [route, html] of pages) {
  if (/^\/(control-tower|early-access\/confirm|early-access\/review|sign-)/.test(route)) continue;
  for (const match of html.matchAll(/href="([^" ]+)"/g)) {
    const href = match[1].replaceAll("&amp;","&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(href,`https://www.crabionics.com${route}`);
    const targetHtml = pages.get(target.pathname);
    if (target.hash && targetHtml && !targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`)) errors.push(`${route}: missing anchor ${href}`);
    if (!target.hash && !targetHtml && !/\.[a-z0-9]+$|^\/(api|sign-|control-tower)|^\/early-access\/review|^\/solutions\/aquaos$/.test(target.pathname)) errors.push(`${route}: missing built destination ${href}`);
  }
}
if (errors.length) { console.error([...new Set(errors)].join("\n")); process.exitCode=1; }
else console.log(`Public link and anchor check passed across ${pages.size} built pages.`);
