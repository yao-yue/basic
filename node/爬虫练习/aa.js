const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://m.4008823823.com.cn/');
  const length = await page.evaluate(() => {
    return document.querySelectorAll('#sectionLeft > li').length
  })
 
  for(let i = 1; i<=length; i++) {
    await page.click(`#sectionLeft > li:nth-child(${i})`)
    let len = await page.evaluate((i) => {
      return document.querySelectorAll(`.scroll-tab-content > dl:nth-child(${i}) > .product`).length
    }, i)
    console.log(len)
    console.log('---------------')
    for(let j = 1; j<=len; j++){
      console.log(j)
      await page.click(`.scroll-tab-content > dl:nth-child(${i})>.product:nth-child(${j})`);
    }
    setTimeout(() => {},600);
  }


  // await page.evaluate(() => {
  //   let sc = document.querySelector('#section > .scroll-tab-content');
  //   while(scrollY < 40000){
  //     sc.style.transform = `translate(0px, -${scrollY}px) translateZ(0px)`;
  //     scrollY += 500;
  //   }
  // })
await page.waitFor(10000);  


  const result = await page.evaluate(() => {
     return  [...document.querySelectorAll('.scroll-tab-content > dl > .product > .desc > p')].map(item => {
      return item.innerText
    })
  });
  browser.close();
  return result;
};

scrape().then((value) => {
  console.log(value); // Success!
});
