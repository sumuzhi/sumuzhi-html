//1.引入核心模块
let http = require('http')

let server = http.createServer((request, response) => {
    response.setHeader('content-type','text/html;charset=utf-8')
    response.end('<h1>hello nodejs</h1>')

})
server.listen(3000, (err) => {
    if (!err) {
        console.log("服务器启动成功");
    } else {
        console.log(err);
    }
})