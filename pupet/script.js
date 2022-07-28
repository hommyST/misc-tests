const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const url = 'https://www.citilink.ru/catalog/noutbuki/?view_type=grid&f=discount.any%2Crating.any&sorting=price_asc';

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'load', timeout: 0});
  // await page.goto('http://example.com/');
  let nouts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-params]')).map(x => x.dataset.params);
    nouts = Array.from(document.querySelectorAll('.ProductCardVertical_normal'));
    return nouts.filter(el => {
      if (el.dataset.listName) {
        return false
      }
    })
  })
  await page.screenshot({ path: 'citil.png', fullPage: true });
  // console.log(nouts)
  nouts = nouts.map(x => JSON.parse(x));
  await fs.writeFile('n1.json', JSON.stringify(nouts));

  await browser.close();
}

start();