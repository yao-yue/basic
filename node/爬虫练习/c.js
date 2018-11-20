var express=require('express');//引入模块
var cheerio=require('cheerio');
var superagent=require('superagent');
var app=express();

app.get('/',function(req,res,next){
    superagent.get('https://m.4008823823.com.cn/')//请求页面地址
        .end(function(err,obj){//页面获取到的数据
            if(err) return next(err);

            var $=cheerio.load(obj.text);//用cheerio解析页面数据
            var arr=[];
            let title = $('#sectionLeft > li.active > span > img').find('src');

            $("#sectionLeft > li.active > span > img").each(function(index,element){
                console.log(index)
                console.log(element);
                var $eleItem=$(element).find('img');
                arr.push({
                    title
                })
            });
            res.send(arr);
        })
    });
app.listen(8888, function () {
    console.log('抓取成功~~~');
});