
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const url = require('url');
const request =require('request');
const kfcUrl = 'https://m.4008823823.com.cn/';
 
let ssr = [];
let allUrl = [];
let curCount = 0;
 
//for循环把五页的页面循环出来
    superagent.get(kfcUrl)
//通过superagent去请求每一页
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
//cheerio  nodejs版的JQ 
            let $ = cheerio.load(res.text);
//获取首页所有的链接
            $('.scroll-tab-nav').each(function (idx, element) {
                let $element = $(element);
                let href = url.resolve(hupuUrl2, $element.attr('href'));
                allUrl.push(href);
                curCount++;
//获取到此url，异步进行以下操作，此操作为进入到这个帖子中爬取数据
                superagent.get(href)
                    .end(function (err, res) {
                        if(err){
                            return console.error(err);
                        }
                        let $ = cheerio.load(res.text);
                        let add = href;
                        let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
                        let tximg = $('.headpic:first-child>img').attr('src');//用户头像
                        let txname = $('.j_u:first-child').attr('uname');//用户ID
                        let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');//爆照图1
                        let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');//爆照图2
                        let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');//爆照图3
                        ssr.push({
                            'tx': tximg,
                            'name': txname,
                            'pic': contentimg1,contentimg2,contentimg3
                        });
//把数据存储到一个对象里
                        let stad = {
                            "address": add,
                            "title":title,
                            "ID" : txname,
                            "touxiang" : tximg,
                            "pic1" : contentimg1,
                            "pic2" : contentimg2,
                            "pic3" : contentimg3
                        };
                        let picArr = [contentimg1,contentimg2,contentimg3];
                        //console.log(stad);
//通过fs模块把数据写入本地json
                        fs.appendFile('data/a.json', JSON.stringify(stad) ,'utf-8', function (err) {
                            if(err) throw new Error("appendFile failed...");
                            //console.log("数据写入success...");
                        });
                    })
                });
            });
    