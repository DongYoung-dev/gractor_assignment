const axios = require('axios')
const UsfData = require('../schemas/usfData')
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

async function getUsf(req, res) {
    const serviceKey = process.env.serviceKey
    const base_date = moment().format('YYYYMMDD')
    const base_time = moment().format('HHmm')

    try {
        for (let i = 0; i < region.length; i++) {
            const nx = getGridXY(region[i]).gridX
            const ny = getGridXY(region[i]).gridY

            const usf = await axios({
                method: 'GET',
                url: `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&numOfRows=60&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`,
            })

            const arr = usf.data.response.body.items.item
            const data = arr
                .filter(function (e) {
                    return e.fcstTime
                })
                .map(function (e) {
                    return e.fcstTime + ' - ' + e.category + ' : ' + e.fcstValue
                })
            const json = JSON.stringify(data)

            await UsfData.create({
                region: region[i],
                nx,
                ny,
                baseDate: base_date,
                baseTime: base_time,
                foreCast: json,
            })
        }
        res.status(200).json({
            message: '초단기예보조회를 실행하였습니다.',
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '초단기예보조회에 실패하였습니다.',
        })
    }
}

async function showUsf(req, res) {
    try {
        const data = await UsfData.find()

        res.status(200).json({
            data,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '수집된 초단기예보 불러오기에 실패하였습니다.',
        })
    }
}

module.exports = {
    getUsf,
    showUsf,
}
