let db = require('./db/connection')

let student_schema = require('./module/schema_students')

;
(async () => {
    await db
    // student_schema.create({
    //     stu_id: '10006',
    //     name: 'Jerrys',
    //     age: 17,
    //     hobbies: ['篮球', '睡觉'],
    //     info: '吃饭'
    // }, (err, data) => {
    //     if (!err) {
    //         console.log("数据写入成功", data);
    //     } else {
    //         console.log(err);
    //     }
    // });
    let result = student_schema.findOne({
        name: 'Jerrys'
    }, {
        stu_id: 1,
        name: 1,
        _id: 0
    })
    console.log(await result);
})()