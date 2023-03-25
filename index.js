const express = require('express')
const app = express()
const Router = require('./routes')
const port = 3000

const connect = require('./schemas')
connect()

app.use('/api', Router)

app.get('/', (req, res) => {
    res.send('그렉터 입사시험 과제')
})

app.listen(port, () => {
    console.log(port, '번으로 서버가 연결되었습니다.')
    console.log(`http://localhost:${port}`)
})
