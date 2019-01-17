// https://zhaoqize.github.io/puppeteer-api-zh_CN/#/
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://so.m.jd.com/webportal/channel/m_category?searchFrom=home');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})()
