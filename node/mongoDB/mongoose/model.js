var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });
mongoose.connection.once("open", function() {
   console.log('数据库链接成功~~~'); 
});
var Schema = mongoose.Schema;
var stuSchema = new Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        default:"female"
    },
    address:String
});
var StuModel = mongoose.model("student", stuSchema);
/**
 * 有了model,我们就可以对数据库进行整改删查的操作
 * 
 * model.create(doc(s), [callback])
 * -用来创建一个或多个文档并添加到数据库中
 * -参数：
 *  doc: 可以是一个文档对象，也可以是一个文档对象数组
 *  callback: 回调函数
 * 
 * 
 * 查询：
 * Model.find(conditions, [projection], [options], [callback])
 *  - 查询所有符合条件的文档 最少都会返回一个数组[]
 * Model.findById(conditions, [projection], [options], [callback])
 * -
 * Model.findOne(conditions, [projection], [options], [callback])
 * 
 */


 