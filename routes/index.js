const router = require('express').Router()

const shortForecast = require('./shortForecast')
const ultraShortForecast = require('./ultraShortForecast')
const ultraShortLive = require('./ultraShortLive')

router.use('/shortForecast', shortForecast)
router.use('/ultraShortForecast', ultraShortForecast)
router.use('/ultraShortLive', ultraShortLive)

module.exports = router
