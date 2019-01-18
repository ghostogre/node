// https://zhaoqize.github.io/puppeteer-api-zh_CN/#/
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://so.m.jd.com/webportal/channel/m_category?searchFrom=home');
  let titles = await page.$$('#category2 > li > a');
  // const _titles = await page.$$eval('#category2 > li > a', titles => {
  //   return titles.map(item => {
  //     return item.innerText
  //   })
  // });
  let array = await page.evaluate((...dom) => {
    return dom.map(async (item) => {
      item.click();
      await page.waitForRequest();
      let navImg = await page.$eval('#branchList > div.jd-category-third-promotion > img', dom => dom.src)
      return {
        title: item.innerText,
        nav_img: navImg
      }
    });
  }, ...titles);
  fs.writeFile('data/category.json', JSON.stringify(array), 'utf8', () => {
    console.log('保存完成');
  })
  // await browser.close();
})();
