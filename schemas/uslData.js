const mongoose = require('mongoose')

const uslDataSchema = new mongoose.Schema({
    region: { type: String },
    nx: { type: Number },
    ny: { type: Number },
    baseDate: { type: String },
    baseTime: { type: String },
    PTY: { type: String },
    REH: { type: String },
    RN1: { type: String },
    T1H: { type: String },
    UUU: { type: String },
    VEC: { type: String },
    VVV: { type: String },
    WSD: { type: String },
})

const UslData = mongoose.model('UslData', uslDataSchema)
module.exports = UslData
