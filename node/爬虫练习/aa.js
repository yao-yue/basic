const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
  
    await page.goto('https://m.4008823823.com.cn/');
    await page.click('#sectionLeft > li> span > img');
    await page.waitFor(1000);
    
      for(let i = 0; i< 40000; i+200) {
        scrollEnable = await page.evaluate(() => {
          let sc = document.querySelector('#section > .scroll-tab-content');
          sc.style.transform = `translate(0px, -${i}px) translateZ(0px)`;
        });
        await page.waitFor(600)
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
