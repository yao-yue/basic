const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    let scrollEnable = false;
    let scrollY = 0; //每次滚动的步长
    await page.goto('https://m.4008823823.com.cn/');
    await page.click('#sectionLeft > li> span > img');
    await page.waitFor(1000);
    
      while (scrollEnable) {
        scrollEnable = await page.evaluate((scrollY) => {
          let sc = document.querySelector('#section > .scroll-tab-content');
          sc.style.transform = `translate(0px, -4000px) translateZ(0px)`;
          scrollY += 200;
          return 40000 > scrollY ? true : false
        }, scrollY);
        await page.waitFor(1000)
      }
   
      
    

    const result = await page.evaluate(() => {
      return [...document.querySelectorAll('#section > div > dl:nth-child(2) > div:nth-child(1) > div > p')].map(item => {
        return item.innerText
      })
      // return document.querySelector('#sectionLeft > li > p').innerText;
    });
    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});
