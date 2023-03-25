// 초단기 실황

const router = require('express').Router()
const uslController = require('../controllers/ultraShortLive')

//채팅 관련
router.get('/', uslController.getUsl)
router.get('/show', uslController.showUsl)

module.exports = router
