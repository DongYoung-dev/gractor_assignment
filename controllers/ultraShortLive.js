const axios = require('axios')
const UslData = require('../schemas/uslData')
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

async function getUsl(req, res) {
    const serviceKey = process.env.serviceKey
    const base_date = moment().format('YYYYMMDD')
    const base_time = moment().format('HHmm')

    try {
        for (let i = 0; i < region.length; i++) {
            const nx = getGridXY(region[i]).gridX
            const ny = getGridXY(region[i]).gridY

            const usl = await axios({
                method: 'GET',
                url: `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`,
            })

            data = usl.data.response.body.items.item

            await UslData.create({
                region: region[i],
                nx,
                ny,
                baseDate: base_date,
                baseTime: base_time,
                PTY: data[0].obsrValue,
                REH: data[1].obsrValue,
                RN1: data[2].obsrValue,
                T1H: data[3].obsrValue,
                UUU: data[4].obsrValue,
                VEC: data[5].obsrValue,
                VVV: data[6].obsrValue,
                WSD: data[7].obsrValue,
            })
        }

        res.status(200).json({
            message: '초단기실황조회를 실행하였습니다.',
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '초단기실황조회에 실패하였습니다.',
        })
    }
}

async function showUsl(req, res) {
    try {
        const data = await UslData.find()

        res.status(200).json({
            data,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: '수집된 초단기실황 불러오기에 실패하였습니다.',
        })
    }
}

module.exports = {
    getUsl,
    showUsl,
}
