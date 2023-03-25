// 단기 예보

const router = require('express').Router()
const sfController = require('../controllers/shortForecast')

//채팅 관련
router.get('/', sfController.getSf)
router.get('/show', sfController.showSf)

module.exports = router
