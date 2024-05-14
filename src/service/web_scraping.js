const puppeteer = require('puppeteer');

class WebScraping {
  constructor() {
    this.browser = null;
  }

  async scrapeData() {
    return [];
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
    const page = await this.browser.newPage();
    await page.goto(process.env.NEXT_PUBLIC_SCRAPE_URL);

    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1)'
        )
        .click()
    );
    await page.waitForSelector(
      '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1) > ul > li:nth-child(10) > a'
    );
    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1) > ul > li:nth-child(10) > a'
        )
        .click()
    );
    await page.waitForSelector('a.btn_submit');
    await page.evaluate(() => document.querySelector('a.btn_submit').click());

    page.waitForTimeout(2000);

    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2)'
        )
        .click()
    );
    await page.waitForSelector(
      '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
    );
    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
        )
        .click()
    );
    await page.waitForSelector('a.btn_submit');
    await page.evaluate(() => document.querySelector('a.btn_submit').click());

    page.waitForTimeout(2000);

    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2)'
        )
        .click()
    );
    await page.waitForSelector(
      '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
    );
    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
        )
        .click()
    );
    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2)'
        )
        .click()
    );
    await page.waitForSelector(
      '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
    );
    await page.evaluate(() =>
      document
        .querySelector(
          '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(2) > a'
        )
        .click()
    );
    await page.waitForSelector('a.btn_submit');
    await page.evaluate(() => document.querySelector('a.btn_submit').click());

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
    this.browser && this.browser.close();
  }
}

export default new WebScraping();
