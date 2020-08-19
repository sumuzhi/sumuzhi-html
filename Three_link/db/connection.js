//0.设置数据库连接端口及数据库
const database = 'cities'
const port = 27017
const address = 'localhost'

//1.引入模块
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); //加入这行代码即可解决

//2.链接数据库
mongoose.connect(`mongodb://${address}:${port}/${database}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//3.绑定监听
module.exports = new Promise((resolve, reject) => {
    mongoose.connection.once('open', (err) => {
        if (!err) {
            console.log(`位于${address}端口号为${port}的${database}数据库启动成功!!!`);
            resolve()
        } else {
            reject(err)
        }
    })
});