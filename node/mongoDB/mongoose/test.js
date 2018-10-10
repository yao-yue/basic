require("./tools/connection");
var students = require("./model/students");

students.find({}, function (err, docs) {
    if(!err) {
        console.log(docs);
    }
})
