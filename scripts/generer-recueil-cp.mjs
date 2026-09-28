import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("public");
const output = resolve(process.argv[2] || "sortie-pdf", "recueil-parcours-cp-v2.pdf");
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

async function waitForImages(page){
  await page.evaluate(async () => {
    const images = [...document.images];
    const loaded = Promise.all(images.map(image => image.complete ? undefined : new Promise(done => {
      image.addEventListener("load", done, { once:true });
      image.addEventListener("error", done, { once:true });
    })));
    await Promise.race([loaded, new Promise(done => setTimeout(done, 20000))]);
  });
}

const server = await startServer();
const address = server.address();
let browser;

try {
  await mkdir(resolve(output, ".."), { recursive:true });
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
  await page.goto(`http://127.0.0.1:${address.port}`, { waitUntil:"domcontentloaded" });
  await page.locator("#a-parcours-cp").click();
  await page.waitForTimeout(100);
  const sheetIds = await page.locator(".carte-fiche").evaluateAll(cards => cards.map(card => card.dataset.fiche));
  if(!sheetIds.length) throw new Error("The CP pack was not loaded into the application.");

  const sheets = [];
  for(const [index, sheetId] of sheetIds.entries()){
    await page.locator(`.carte-fiche[data-fiche="${sheetId}"]`).click();
    await page.locator("#fiche .exemplaire").waitFor();
    await waitForImages(page);
    sheets.push(await page.locator("#fiche").evaluate(element => element.outerHTML));
    process.stdout.write(`Sheet ${index + 1}/${sheetIds.length} added to booklet.\n`);
    await page.locator("#btn-retour").click();
    await page.locator(`.carte-fiche[data-fiche="${sheetId}"]`).waitFor();
  }

  await page.evaluate(markup => {
    const booklet = document.createElement("main");
    booklet.id = "recueil-cp";
    booklet.innerHTML = markup.map(sheet => `<section class="recueil-page">${sheet}</section>`).join("");
    document.body.appendChild(booklet);
  }, sheets);
  await page.addStyleTag({ content:`
    #recueil-cp { display:none; }
    @media print {
      #recueil-cp { display:block !important; }
      #recueil-cp .recueil-page { break-after:page; page-break-after:always; }
      #recueil-cp .recueil-page:last-child { break-after:auto; page-break-after:auto; }
      #recueil-cp .fiche { width:auto !important; min-height:auto !important; box-shadow:none; padding:0 !important; transform:none !important; }
    }
  ` });
  await page.pdf({ path:output, format:"A4", printBackground:true, preferCSSPageSize:true });
  process.stdout.write(`Generated ${sheets.length}-sheet booklet: ${output}\n`);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}