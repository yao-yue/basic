/**
 * mongoose 教学网站
 * https://mongoosejs.com
 * 
 * 
 * 1.下载安装mongoose
 *  yarn add mongoose 
 * 2.在项目中引入
 *  var mongoose = require("mongoose");
 * 3.链接Mongodb数据库
 *       mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
 *      - 如果端口号是默认端口号27017 则可以省略不写
 * 4.断开数据库链接（一般不需要调用）
 *      - MongoDB数据库，一般情况下，只需要链接一次，链接一次后，除非项目停止服务器关闭，否则链接一般不会断开
 *      mongoose.disconnect()
 * - 监听MongoDB数据库的链接状态
 *      在MongoDB对象中，有一个属性叫做connection，该对象表示的就是数据库链接
 *      通过监视该对象的状态，可以用来监听数据库的链接与断开  
 *    mongoose.connection.once("open", function() {});
 */

 var mongoose = require("mongoose");
 mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });
 mongoose.connection.once("open", function() {
    console.log('数据库链接成功~~~'); 
 });
 mongoose.disconnect();
 mongoose.connection.once("close", function() {
    console.log('数据库关闭成功~~~'); 
 });