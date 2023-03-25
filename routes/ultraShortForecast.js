// 초단기 예보

const router = require('express').Router()
const usfController = require('../controllers/ultraShortForecast')

//채팅 관련
router.get('/', usfController.getUsf)
router.get('/show', usfController.showUsf)

module.exports = router
