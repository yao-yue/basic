var express=require('express');//引入模块
var cheerio=require('cheerio');
var superagent=require('superagent');
var app=express();

app.get('/',function(req,res,next){
    superagent.get('https://m.4008823823.com.cn/kfcmwos/indexMenu.htm?')//请求页面地址
        .end(function(err,sres){//页面获取到的数据
            if(err) return next(err);

            var $=cheerio.load(sres.text);//用cheerio解析页面数据
            var arr=[];

            $("#app").each(function(index,element){//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
                var $eleItem=$(element).find('.scroll-tab flex flex-y li');
                arr.push(
                    {
                        title: $eleItem.text(),
                        src: $eleItem.attr('src')
                    }
                );
            });
            res.send(arr);
        })
    });
app.listen(8888, function () {
    console.log('抓取成功~~~');
});
