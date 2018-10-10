var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/test", { useNewUrlParser: true });
mongoose.connection.once("open", function() {
   console.log('数据库链接成功~~~'); 
});

//将mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;

//创建Schema(模式、约束)对象
var stuSchema = new Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        default:"female"
    },
    address:String
});

//通过Schema来创建Model
//Model代表的是数据库中的集合，通过MODEL才能对数据库进行操作
//mongoose.model(modelName, Schema);
//modelName就是要映射的集合名 mongoose会自动将集合名变成复数student->students
var StuModel = mongoose.model("student", stuSchema);
/**
 * 有了model,我们就可以对数据库进行整改删查的操作
 * 
 * model.create(doc(s), [callback])
 * -用来创建一个或多个文档并添加到数据库中
 * -参数：
 *  doc: 可以是一个文档对象，也可以是一个文档对象数组
 *  callback: 回调函数
 */




//向数据库中插入一个文档
StuModel.create({
    name:"牛有道",
    age:22,
    address:"燕国"
}, function(err) {
    if(!err) {
        console.log("插入成功~~~");
    }
});