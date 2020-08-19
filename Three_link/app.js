let express = require('express')
let db = require('./db/connection')
let citiesModule = require('./module/schema_students')

let app = express()

;
(async () => {

    await db //等待数据库连接

    app.get('/getAllProvince', (req, res) => {
        citiesModule.find({
            level: 1 //查找省份信息,并投影相关字段,省份代码,省份名字
        }, {
            name: 1,
            province: 1,
            _id: 0
        }, (err, data) => {
            if (!err) {
                res.json({ //使用res.json将获取到的信息以json数据格式返回,json数据格式优势较大
                    state: 1,
                    data
                })
                // console.log(typeof (JSON.stringify(data)));
            } else {
                console.log(err);
                res.json({
                    state: 0
                })
            }

        })
    })

})()

app.listen(3000, (err) => {
    if (!err) {
        console.log("服务器启动成功");
    } else {
        console.log(err);
    }
})