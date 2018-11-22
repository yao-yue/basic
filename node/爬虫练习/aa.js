const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://m.4008823823.com.cn/');
  const length = await page.evaluate(() => {
    return document.querySelectorAll('#sectionLeft > li').length
  })

  //有一处坑  不知道为什么.product:nth-child(2)这个索引是从2开始计算
   //找到问题所在了  :nth-of-type()
  // await page.hover(`#section > div > dl:nth-child(2) > .product:nth-child(2)`)

  for(let i = 1; i<=length+1; i++) {
    
    let len = await page.evaluate((i) => {
      return document.querySelectorAll(`.scroll-tab-content > dl:nth-child(${i}) > .product`).length
    }, i)
    console.log(len)
    console.log('---------------')
    for(let j = 2; j<=len; j++){
      await page.waitFor(`#section > div > dl:nth-child(${i}) > .product:nth-child(${j}`)
      await page.hover(`#section > div > dl:nth-child(${i}) > .product:nth-child(${j})`);
    }
    
  }
await page.waitFor(4000);  

  let $ = cheerio.load(page)
  const result = await page.evaluate(($) => {
    let a = $(`#section > div > dl:nth-child(2) > .product:nth-child(2)`).innerText
    return a
    //  return  [...document.querySelectorAll('.scroll-tab-content > dl > .product > .desc > p')].map(item => {
    //   return item.innerText
    // })
  }, $);
  browser.close();
  return result;
};

scrape().then((value) => {
  console.log(value); // Success!
});

