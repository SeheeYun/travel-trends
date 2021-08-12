const puppeteer = require('puppeteer');

class WebScraping {
  constructor() {
    this.browser = null;
  }

  async ScrapeData() {
    this.browser = await puppeteer.launch({ headless: true });
    const page = await this.browser.newPage();
    await page.goto(process.env.NEXT_PUBLIC_SCRAPE_URL);

    await page.click('div.set_period > div:first-child');
    await page.click(
      'div.set_period > div:first-child > ul > li:nth-child(10)'
    );
    await page.click('div.set_period > div:last-child');
    await page.click('div.set_period > div:last-child > ul > li:nth-child(2)');

    await page.waitForSelector('div.rank_top1000_scroll li');

    let ehList = await page.$$('div.rank_top1000_scroll li');
    let data = await Promise.all(
      ehList.map(eh =>
        eh.$eval('a', el => {
          return el.textContent.replace(
            /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,
            ''
          );
        })
      )
    );

    return data;
  }

  closeBrowser() {
    this.browser.close();
  }
}

export default new WebScraping();
