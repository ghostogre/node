// https://zhaoqize.github.io/puppeteer-api-zh_CN/#/
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://so.m.jd.com/webportal/channel/m_category?searchFrom=home');
  await page.screenshot({path: 'example.png'});
  // let titles = await page.$$('#category2 > li > a');
  const _titles = await page.$$eval('#category2 > li > a', titles => {
    return titles.map(item => {
      return item.innerText
    })
  });
  const array = _titles.map((item, index) => {
    return {
      title: item
    }
  })
  // let array = await page.evaluate((...dom) => {
  //   return dom.map((item) => {
  //     return {
  //       title: item.innerText
  //     }
  //   });
  // }, ...titles);
  fs.writeFile('data/category.json', JSON.stringify(array), 'utf8', () => {
    console.log('保存完成');
  })
  await browser.close();
})();
