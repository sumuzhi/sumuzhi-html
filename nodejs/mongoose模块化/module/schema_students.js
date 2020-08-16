const collection = 'students'
//引入mongoose
let mongoose = require('mongoose')

//引入Schema  --保安
let Schema = mongoose.Schema;

//创建一个约束对象 --保安规则
let Schema_stu = new Schema({
    stu_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: datetime = () => {
            var date = new Date();
            var arr = [date.getFullYear(), (date.getMonth() + 1).toString(), (date.getDate()).toString(), (date.getHours()).toString(), (date.getMinutes()).toString(), (date.getSeconds()).toString()];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].length == 1) {
                    arr[i] = "0" + arr[i];
                }
            }
            dateTime = arr[0] + "-" + arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4] + ":" + arr[5];
            return dateTime;
        }
    },
    hobbies: [String], //数组
    info: Schema.Types.Mixed //接受所有的数据类型
})

//创建模型 --将保安与要管理的数据库关联
module.exports = mongoose.model(`${collection}`, Schema_stu);