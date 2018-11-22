const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://m.4008823823.com.cn/kfcmwos/indexMenu.htm?');
  const length = await page.evaluate(() => {
    return document.querySelectorAll('#sectionLeft > li').length
  })

  //有一处坑  .product:nth-child(2)这个的索引是从2开始计数
   //找到问题所在了  :nth-of-type()

  for(let i = 1; i<=length; i++) {
    let len = await page.evaluate((i) => {
      return document.querySelectorAll(`.scroll-tab-content > dl:nth-of-type(${i}) > .product`).length
    }, i)
    console.log(len)
    console.log('---------------')
    for(let j = 1; j<=len; j++){
    //   await page.click(`#sectionLeft > li:nth-of-type(${i})`)
      await page.waitFor(`#section > div > dl:nth-of-type(${i}) > .product:nth-of-type(${j}`)
      await page.hover(`#section > div > dl:nth-of-type(${i}) > .product:nth-of-type(${j})`);
    }  
  }
await page.waitFor(2000);  


  const result = await page.evaluate(() => {
    var $ = window.$
     let menu = [...document.querySelectorAll('.scroll-tab-content > dl')].map(item => {
         let dt = item.firstChild.innerText;
         let product = [...item.getElementsByClassName('product flex')].map(i => {
             let arr = []
             arr.push({
                src : i.firstChild.src,
                p : i.firstChild.alt})
            // money : $('.desc > .price > .showPrice > span > .fcm').innerText
             
            //  let p = i.getElementsByClassName('.desc .p').innerText;
            //  let money = i.getElementsByClassName('.desc > .price > .showPrice > span > .fcm').innerText;
             return arr.values
                              
         });
      return  {
          dt: dt,
          product: product
      }
    })
    return menu;
});
  browser.close();
  return result;
};

scrape().then((value) => {
  console.log(value); // Success!
});
