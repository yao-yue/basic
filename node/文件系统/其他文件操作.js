var fs = require('fs');
// 检查一个文件是否存在
var isExists = fs.existsSync("123.mp3");
console.log(isExists);

// 获取文件的状态，同步与异步
// 他会给我们返回一个对象，这个对象中保存了当前对象状态的相关信息
fs.stat("a.mp3", function (err, stat) {

/**
 * size文件的大小
 * isFile() 是否是一个文件
 * isDirectory 是否是一个文件夹（目录）
 * 
 */
    console.log(stat);
});


/* fs.unlink(path, callback)
 fs.unlinkSync(path)
 删除文件
 */

 /* 
 fs.readdir(path[, options], callback)
 fs.readdir(path[, options])
- 读取一个文件的目录结构
    files是一个字符串数组，每个元素就是一个文件夹或文件的名字
 */
fs.readdir(".", function (err, files) {
    if(!err) {
        console.log(files);
    }
});

 /* 
 fs.truncate(path[, len, callback)
 fs.truncateSync(path, len)
- 截断文件，将文件截断为指定大小

fs.truncateSync(“hello.txt", 10);
 */

/*
 fs.mkdir(path[, model], callback)
 fs.mkdirSync(path[, model])
创建一个目录

删除目录redir

改名rename

 */

 /***
  * fs.watchFile(filename[, options], listener)
  * - 监视文件的修改
  * - 参数：
  *     filename 文件名
  *     options 配置选项
  *     listener 回调函数，当文件发生变化时执行
  *         在回调函数中有两个参数：
  *             curr 当前文件的状态
  *             prev 修改前文件的状态
  *                     - 这两个对象都是stats对象
  */
 fs.watchFile('hello.txt', {interval:1000}, function (curr, prev) {
     console.log("修改前文件大小：" + prev.size);
     console.log("修改后文件大小：" + curr.size);
 });