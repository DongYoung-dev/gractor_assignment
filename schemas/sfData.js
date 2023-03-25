const mongoose = require('mongoose')

const sfDataSchema = new mongoose.Schema({
    region: { type: String },
    nx: { type: Number },
    ny: { type: Number },
    baseDate: { type: String },
    baseTime: { type: String },
    foreCast: { type: String },
})

const SfData = mongoose.model('SfData', sfDataSchema)
module.exports = SfData
