const mongoose = require('mongoose')
require('dotenv').config()
const connect = () => {
    const gractorID = process.env.MONGO_ID
    const gractorPW = process.env.MONGO_PW
    mongoose
        .connect(
            `mongodb+srv://${gractorID}:${gractorPW}@gractor.efltyvv.mongodb.net/Gractor?retryWrites=true&w=majority`,
            { ignoreUndefined: true }
        )
        .catch((err) => {
            if (err) throw err
        })
}
console.log('MONGODB 데이터베이스에 연결되었습니다.')

module.exports = connect
