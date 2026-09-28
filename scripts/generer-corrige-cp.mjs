import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("public");
const output = resolve(process.argv[2] || "sortie-pdf", "corrige-parcours-cp-v2.pdf");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml"
};

function startServer(){
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://localhost");
      const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const file = resolve(root, "." + requested);
      if(file !== root && !file.startsWith(root + sep)) throw new Error("Invalid path");
      response.writeHead(200, { "Content-Type":mimeTypes[extname(file)] || "application/octet-stream" });
      response.end(await readFile(file));
    } catch (_) {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  return new Promise(done => server.listen(0, "127.0.0.1", () => done(server)));
}

function escapeHtml(value){
  return String(value).replace(/[&<>"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" })[character]);
}

async function exportPdf(page, file){
  const options = { path:file, format:"A4", printBackground:true, preferCSSPageSize:true };
  try {
    await page.pdf(options);
    return file;
  } catch(error) {
    if(error.code !== "EBUSY") throw error;
    const versioned = file.replace(/\.pdf$/, `-${Date.now()}.pdf`);
    await page.pdf({ ...options, path:versioned });
    return versioned;
  }
}

const server = await startServer();
const address = server.address();
let browser;

try {
  await mkdir(resolve(output, ".."), { recursive:true });
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${address.port}`, { waitUntil:"domcontentloaded" });
  const worksheets = await page.evaluate(() => globalThis.lexidatelierParcoursCPV2.map(model => ({
    groupe:model.groupe,
    serie:model.serie,
    titre:model.titre,
    consigne:model.consigne,
    choix:model.choix,
    items:globalThis.lexidatelierMelangerItems(model.items, model.groupe * 1000 + model.serie)
  })));

  const cards = worksheets.map(sheet => {
    const answers = sheet.items.map((item, index) => `
      <li><strong>${index + 1}.</strong> ${escapeHtml(sheet.choix[item.bonne])}</li>`).join("");
    return `<article class="card">
      <header><span class="code">G${sheet.groupe} · S${sheet.serie}</span><h1>${escapeHtml(sheet.titre)}</h1></header>
      <ol>${answers}</ol>
    </article>`;
  });
  const pages = Array.from({ length:Math.ceil(cards.length / 48) }, (_, index) =>
    `<section class="page">${cards.slice(index * 48, index * 48 + 48).join("")}</section>`
  ).join("");

  await page.setContent(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
    @page { size:A4; margin:10mm; }
    * { box-sizing:border-box; } body { font-family:Arial, sans-serif; color:#172d38; margin:0; }
    .page { break-after:page; page-break-after:always; min-height:277mm; display:grid;
      grid-template-columns:repeat(4, 1fr); grid-template-rows:repeat(12, 1fr); gap:1mm; }
    .page:last-child { break-after:auto; page-break-after:auto; }
    .card { border:1px solid #9aaab2; padding:.75mm; overflow:hidden; }
    header { display:flex; align-items:center; gap:1px; border-bottom:1px solid #e8620c; padding-bottom:.5px; }
    .code { border:1px solid #172d38; border-radius:1px; padding:0 1px; font-size:7px; font-weight:700; white-space:nowrap; }
    h1 { margin:0; font-size:8.5px; line-height:1.05; }
    ol { columns:3; column-gap:1.5px; margin:1.5px 0 0; padding-left:7px; }
    li { break-inside:avoid; padding:0; font-size:8px; line-height:1.08; color:#a34308; }
    li strong { color:#172d38; }
  </style></head><body>${pages}</body></html>`);
  const exported = await exportPdf(page, output);
  process.stdout.write(`Generated ${worksheets.length}-sheet answer key: ${exported}\n`);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}