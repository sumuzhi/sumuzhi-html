const collection = 'cities' //数据库名称
//引入mongoose
let mongoose = require('mongoose')

//引入Schema  --保安
let Schema = mongoose.Schema;

//创建一个约束对象 --保安规则
let Schema_stu = new Schema({
    code: String,
    name: String,
    province: String,
    city: String,
    county: String,
    level: Number
})

//创建模型 --将保安与要管理的数据库关联
module.exports = mongoose.model(`${collection}`, Schema_stu);