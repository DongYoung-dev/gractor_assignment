const mongoose = require('mongoose')

const usfDataSchema = new mongoose.Schema({
    region: { type: String },
    nx: { type: Number },
    ny: { type: Number },
    baseDate: { type: String },
    baseTime: { type: String },
    foreCast: { type: String },
})

const UsfData = mongoose.model('UsfData', usfDataSchema)
module.exports = UsfData
