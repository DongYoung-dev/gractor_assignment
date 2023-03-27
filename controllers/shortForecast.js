const axios = require('axios')
const SfData = require('../schemas/sfData')
const moment = require('moment')
require('dotenv').config()
const fs = require('fs')
const regionXY = fs.readFileSync('datas/regionXY.json', 'utf8')

const region = ['서울특별시', '경기도', '제주특별자치도']

function getGridXY(location) {
    const target = JSON.parse(regionXY).find(
        ({ level1, level2, level3 }) =>
            location === `${level1} ${level2} ${level3}` ||
            location === `${level1} ${level2}` ||
            location === `${level1}`
    )
    return target ? { gridX: target.gridX, gridY: target.gridY } : null
}

async function getSf(req, res) {
    const serviceKey = process.env.serviceKey
    const base_date = moment().format('YYYYMMDD')
    const base_time = moment().format('HHmm')

    try {
        for (let i = 0; i < region.length; i++) {
            const nx = getGridXY(region[i]).gridX
            const ny = getGridXY(region[i]).gridY

            const sf = await axios({
                method: 'GET',
                url: `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=0200&nx=${nx}&ny=${ny}`,
            })

            const arr = sf.data.response.body.items.item
            const data = arr
                .filter(function (e) {
                    return e.fcstTime
                })
                .map(function (e) {
                    return e.fcstTime + ' - ' + e.category + ' : ' + e.fcstValue
                })
            const json = JSON.stringify(data)

            await SfData.create({
                region: region[i],
                nx,
                ny,
                baseDate: base_date,
                baseTime: base_time,
                foreCast: json,
            })
        }
        res.status(200).json({
            message: '단기예보조회를 실행하였습니다.',
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '단기예보조회에 실패하였습니다.',
        })
    }
}

async function showSf(req, res) {
    try {
        const data = await SfData.find()

        const parsedData = data.map(e => ({
            _id: e._id,
            region: e.region,
            nx: e.nx,
            ny: e.ny,
            baseDate: e.baseDate,
            baseTime: e.baseTime,
            foreCast: JSON.parse(e.foreCast)
        }))

        res.status(200).json({
            parsedData,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '수집된 단기예보 불러오기에 실패하였습니다.',
        })
    }
}

module.exports = {
    getSf,
    showSf,
}
