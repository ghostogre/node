// https://zhaoqize.github.io/puppeteer-api-zh_CN/#/
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://so.m.jd.com/webportal/channel/m_category?searchFrom=home');
  let nav = await page.$$('#category2 > li > a');
  let array = [];
  for (let i = 0, len = nav.length; i < len; i++) {
    await page.click(`#category${6 + i}`);
    let category = await page.evaluate((dom) => {
      let title = dom.innerText;
      let start = 1;
      let item = {
        title
      };
      let promotion = document.querySelector('#branchList > div.jd-category-third-promotion > ul > li > a');
      if (promotion) {
        item.promotion_image = promotion.children[0].src;
        item.promotion_href = promotion.href;
        start++;
      }
      let elements = document.querySelectorAll('#branchList> .jd-category-div');
      item.list = [];
      for (let j = start, len = elements.length + 1; j < len; j++) {
        let subtitle = document.querySelector(`#branchList > div:nth-child(${j}) > h4`).innerText;
        let a = document.querySelectorAll(`#branchList > div:nth-child(${j}) > ul > li > a`);
        let links = [];
        for (let n = 0, len1 = a.length; n < len1; n++) {
          links.push({
            category_href: a[n].href,
            category_image: a[n].children[0].src,
            category_name: a[n].children[1].innerText
          })
        }
        item.list.push({
          title: subtitle,
          list: links
        });
      }
      return item;
    }, nav[i]);
    array.push(category);
  }
  fs.writeFile('data/category.json', JSON.stringify(array), 'utf8', () => {
    console.log('保存完成');
  });
  await page.waitFor(1000);
  await browser.close();
})();
