let express = require('express')

let app = express()

app.get('/demo', (req, res) => {
    res.send('alert(1)')
})

app.listen(3000, (err) => {
    if (!err) {
        console.log("服务器启动成功");
    } else {
        console.log(err);
    }
})