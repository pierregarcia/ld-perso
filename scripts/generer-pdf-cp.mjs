import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("public");
const output = resolve(process.argv[2] || "sortie-pdf");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2"
};

function startServer(){
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://localhost");
      const relativePath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const file = resolve(root, "." + relativePath);
      if (file !== root && !file.startsWith(root + sep)) throw new Error("Path outside public directory");
      const content = await readFile(file);
      response.writeHead(200, { "Content-Type": mimeTypes[extname(file)] || "application/octet-stream" });
      response.end(content);
    } catch (_) {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  return new Promise(resolveServer => server.listen(0, "127.0.0.1", () => resolveServer(server)));
}

function sheetFileName(index, title){
  const slug = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  return `${String(index).padStart(2, "0")}-${slug || "fiche"}.pdf`;
}

async function exportPdf(page, file){
  const options = { path:file, format:"A4", preferCSSPageSize:true, printBackground:true };
  try {
    await page.pdf(options);
    return file;
  } catch (error) {
    if (error.code !== "EBUSY") throw error;
    const versioned = file.replace(/\.pdf$/, `-${Date.now()}.pdf`);
    await page.pdf({ ...options, path:versioned });
    return versioned;
  }
}

async function waitForImages(page){
  await page.evaluate(async () => {
    const images = [...document.images];
    const loaded = Promise.all(images.map(image => image.complete ? undefined : new Promise(resolveImage => {
      image.addEventListener("load", resolveImage, { once:true });
      image.addEventListener("error", resolveImage, { once:true });
    })));
    await Promise.race([loaded, new Promise(resolveTimeout => setTimeout(resolveTimeout, 20000))]);
  });
}

const server = await startServer();
const address = server.address();
const url = `http://127.0.0.1:${address.port}`;
let browser;
let exportTermine = false;

try {
  await mkdir(output, { recursive:true });
  process.stdout.write("Launching Chromium...\n");
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
  page.on("pageerror", error => process.stderr.write(`Page error: ${error.message}\n`));
  process.stdout.write("Opening Lexidatelier...\n");
  await page.goto(url, { waitUntil:"domcontentloaded" });
  process.stdout.write("Adding the CP pack...\n");
  await page.locator("#a-parcours-cp").click();
  await page.waitForTimeout(100);
  const sheetIds = await page.locator(".carte-fiche").evaluateAll(cards => cards.map(card => card.dataset.fiche));
  if (!sheetIds.length) throw new Error("The CP pack was not loaded into the application.");
  process.stdout.write(`${sheetIds.length} worksheets found.\n`);

  for (const [index, sheetId] of sheetIds.entries()) {
    const card = page.locator(`.carte-fiche[data-fiche="${sheetId}"]`);
    await card.click();
    await page.locator("#fiche .exemplaire").waitFor();
    await waitForImages(page);
    const title = await page.locator("#inp-titre").inputValue();
    const file = resolve(output, sheetFileName(index + 1, title));
    const exported = await exportPdf(page, file);
    process.stdout.write(`PDF ${index + 1}/${sheetIds.length}: ${exported}\n`);
    await page.locator("#btn-retour").click();
    await page.locator(`.carte-fiche[data-fiche="${sheetId}"]`).waitFor();
  }
  exportTermine = true;
} finally {
  await browser?.close();
  await new Promise(resolveServer => server.close(resolveServer));
}

if(exportTermine){
  process.stdout.write("Generating the complete answer key...\n");
  await import("./generer-corrige-cp.mjs");
  process.stdout.write("Generating the complete booklet...\n");
  await import("./generer-recueil-cp.mjs");
}