const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://m.4008823823.com.cn/');
    await page.click('#sectionLeft > li.active > span > img');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let title = document.querySelector('#sectionLeft').src;

        return {
            title,
        }

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});
