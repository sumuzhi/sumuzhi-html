//1.引入模块
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); //加入这行代码即可解决

//2.链接数据库
mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//3.绑定监听
let myPromise = new Promise((resolve, reject) => {
    mongoose.connection.once('open', (err) => {
        if (!err) {
            console.log("数据库连接成功");
            resolve()
        } else {
            reject(err)
        }
    })
});


(async () => {

    await myPromise

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
    let student_Schema = mongoose.model('students', Schema_stu);

    //模型中有所有操控数据库的方法

    student_Schema.create({
        stu_id: '10001',
        name: 'Tom',
        age: 18,
        hobbies: ['吃饭', '睡觉'],
        info: '干啥啥不行'
    }, (err, data) => {
        if (!err) {
            console.log("数据写入成功", data);
        } else {
            console.log(err);
        }
    });

})()